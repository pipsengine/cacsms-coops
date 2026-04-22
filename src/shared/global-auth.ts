import { prisma } from "@/infrastructure/prisma/client";

/**
 * Global Authorization Helper
 * Ensures that SuperAdmins can bypass typical tenant restrictions.
 */
export async function authorizeAction(authUserId: string, societyId?: string) {
  const user = await prisma.user.findUnique({
    where: { id: authUserId },
    include: {
      memberships: societyId ? {
        where: { societyId }
      } : false
    }
  });

  if (!user) {
    throw new Error("Unauthorized: User record not found.");
  }

  // 1. Global Admin Check: If they are a SuperAdmin, they are authorized for ANY society or platform action.
  if (user.isSuperAdmin) {
    return { 
      authorized: true, 
      isSuperAdmin: true, 
      user,
      role: "SUPER_ADMIN" 
    };
  }

  // 2. Society-Specific Check: If a societyId is provided, check if the user has a membership there.
  if (societyId) {
    const membership = user.memberships?.[0];
    if (!membership) {
      throw new Error("Unauthorized: You do not have access to this cooperative.");
    }
    return { 
      authorized: true, 
      isSuperAdmin: false, 
      user, 
      membership,
      role: membership.role 
    };
  }

  // 3. Platform Check: If no societyId is provided, and they aren't a SuperAdmin, they are limited.
  return { 
    authorized: false, 
    isSuperAdmin: false, 
    user,
    role: "USER" 
  };
}
