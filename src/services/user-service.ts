import { prisma } from "@/infrastructure/prisma/client";

/**
 * PROTECTED_EMAILS: A list of system-critical accounts that cannot be deleted.
 */
export const PROTECTED_EMAILS = ["admin@cacsms.com", "cacsms@local.host"];

export async function deleteUser(userId: string, requestedByUserId: string) {
  const userToDelete = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userToDelete) {
    throw new Error("User not found.");
  }

  // Security Check: Prevent deletion of Super Administrators or protected emails
  if (userToDelete.isSuperAdmin || PROTECTED_EMAILS.includes(userToDelete.email)) {
    throw new Error("This is a protected system account and cannot be deleted.");
  }

  // Additional logic for deletion can go here (e.g., checking if requestedBy is SuperAdmin)
  return prisma.user.delete({
    where: { id: userId },
  });
}

export async function ensureSuperAdmin() {
  const email = "admin@cacsms.com";
  
  return prisma.user.upsert({
    where: { email },
    update: {
      isSuperAdmin: true,
    },
    create: {
      email,
      firstName: "Super",
      lastName: "Admin",
      isSuperAdmin: true,
    },
  });
}
