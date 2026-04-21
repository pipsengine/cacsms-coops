import { prisma } from "@/infrastructure/prisma/client";

export async function getPortalOverviewData(authUserId: string) {
  try {
    const membership = await prisma.membership.findFirst({
      where: { userId: authUserId },
      include: {
        society: true,
        user: true,
        loansAsBorrower: {
          where: { status: { notIn: ["REJECTED"] } },
          orderBy: { appliedAt: "desc" },
          include: { product: true }
        },
        loansAsGuarantor: {
          include: { loan: { include: { membership: { include: { user: true } } } } }
        }
      }
    });

    if (!membership) {
      return { success: false, notFound: true, error: "No membership found. Please contact administration to link your email." };
    }

    const recentTransactions = await prisma.transaction.findMany({
      where: { membershipId: membership.id },
      orderBy: { transactionDate: "desc" },
      take: 5,
      include: { product: true }
    });

    return {
      success: true,
      membership,
      recentTransactions
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
