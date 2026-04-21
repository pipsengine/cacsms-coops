import { prisma } from "@/database/client";

export async function getCurrentSocietyId(authUserId: string) {
  const membership = await prisma.membership.findFirst({
    where: { userId: authUserId },
    select: { societyId: true }
  });

  return membership?.societyId || null;
}

export async function getOrCreateDefaultSociety(authUserId: string, email: string, name: string) {
  let membership = await prisma.membership.findFirst({
    where: { userId: authUserId },
    include: { society: true }
  });

  if (!membership) {
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        id: authUserId,
      },
      create: {
        id: authUserId,
        email,
        firstName: name?.split(" ")[0] || "Admin",
        lastName: name?.split(" ")[1] || "User",
      }
    });

    const society = await prisma.society.create({
      data: {
        name: "Blueprint Demo Cooperative",
        registrationNumber: "C-2026-001",
        currency: "USD"
      }
    });

    membership = await prisma.membership.create({
      data: {
        userId: user.id,
        societyId: society.id,
        role: "PRESIDENT",
        status: "ACTIVE",
        memberNumber: "ADM-001"
      },
      include: { society: true }
    });
  }

  return membership.societyId;
}