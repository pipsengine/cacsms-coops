import { prisma } from "@/database/client";
import { logAudit } from "@/lib/audit";

export async function getMembersBySociety(societyId: string) {
  return prisma.membership.findMany({
    where: { societyId },
    include: {
      profile: true,
      user: true,
      branch: true
    },
    orderBy: { joinedAt: "desc" }
  });
}

export async function createMemberAction(data: any, authUserId: string, societyId: string) {
  try {
    const adminMembership = await prisma.membership.findFirst({
      where: { userId: authUserId, societyId }
    });

    if (!adminMembership && authUserId !== data.email) {
    }

    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
      }
    });

    const membership = await prisma.membership.create({
      data: {
        userId: user.id,
        societyId,
        memberNumber: data.memberNumber || null,
        role: data.role || "MEMBER",
        status: data.status || "PENDING",
        branchId: data.branchId || null
      }
    });

    await prisma.memberProfile.create({
      data: {
        membershipId: membership.id,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        maritalStatus: data.maritalStatus,
        occupation: data.occupation,
        employer: data.employer,
        residentialAddress: data.residentialAddress,
        nextOfKinName: data.nextOfKinName,
        nextOfKinPhone: data.nextOfKinPhone,
        nextOfKinRelation: data.nextOfKinRelation
      }
    });

    await logAudit(societyId, authUserId, "MEMBER_CREATED", "MEMBERSHIP", membership.id, { email: data.email });
    return { success: true, membershipId: membership.id };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to add member" };
  }
}