"use server";
import { prisma } from "@/database/client";

export async function logAudit(
  societyId: string,
  userId: string | null,
  action: string,
  entityType: string,
  entityId: string | null = null,
  details: any = null
) {
  try {
    await prisma.auditLog.create({
      data: {
        societyId,
        userId,
        action,
        entityType,
        entityId,
        details: details ? JSON.stringify(details) : null,
      }
    });
  } catch (error) {
    console.error("Audit Logging Failed:", error);
  }
}
