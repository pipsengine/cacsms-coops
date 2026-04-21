import { prisma } from "@/infrastructure/prisma/client";
import { logAudit } from "@/services/audit-service";

export async function createSocietyAction(data: {
  name: string;
  registrationNumber: string;
  type: string;
  acronym?: string;
  dateOfEstablishment?: string;
  contactPhone?: string;
}, userDetails: { uid: string; email: string; name: string }) {
  try {
    const user = await prisma.user.upsert({
      where: { email: userDetails.email },
      update: {},
      create: {
        id: userDetails.uid,
        email: userDetails.email,
        firstName: userDetails.name.split(" ")[0] || "Admin",
        lastName: userDetails.name.split(" ").slice(1).join(" ") || "",
      }
    });

    const society = await prisma.society.create({
      data: {
        name: data.name,
        type: data.type as any,
        registrationNumber: data.registrationNumber,
        acronym: data.acronym,
        dateOfEstablishment: data.dateOfEstablishment ? new Date(data.dateOfEstablishment) : null,
        contactPhone: data.contactPhone,
      }
    });

    const membership = await prisma.membership.create({
      data: {
        userId: user.id,
        societyId: society.id,
        role: "PRESIDENT",
        status: "ACTIVE",
        memberNumber: "ADM-001"
      }
    });

    await prisma.memberProfile.create({
      data: { membershipId: membership.id }
    });

    await logAudit(society.id, user.id, "SOCIETY_CREATED", "SOCIETY", society.id, {
      name: society.name,
      type: society.type
    });

    return { success: true, societyId: society.id };
  } catch (error: any) {
    console.error("Prisma error:", error);
    if (error.message?.includes("Can't reach database server")) {
      return { success: false, error: "Database not connected. Please configure your PostgreSQL DATABASE_URL in Secrets." };
    }
    return { success: false, error: error.message || "Failed to create society." };
  }
}
