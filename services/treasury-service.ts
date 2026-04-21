import { prisma } from "@/database/client";
import { logAudit } from "@/lib/audit";
import { generateReceiptNumber } from "@/utilities/receipts";

export async function getTreasuryOverviewData(societyId: string) {
  try {
    const aggregate = await prisma.membership.aggregate({
      where: { societyId },
      _sum: {
        totalSavings: true,
        totalShares: true
      }
    });

    const recentTransactions = await prisma.transaction.findMany({
      where: { societyId },
      orderBy: { transactionDate: "desc" },
      take: 5,
      include: {
        membership: {
          include: { user: true }
        },
        product: true,
        receipt: true
      }
    });

    return {
      success: true,
      totalSavings: aggregate._sum.totalSavings || 0,
      totalShares: aggregate._sum.totalShares || 0,
      recentTransactions
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getContributionProducts(societyId: string) {
  return prisma.contributionProduct.findMany({
    where: { societyId }
  });
}

export async function createContributionProduct(data: any, societyId: string, authUserId: string) {
  try {
    const product = await prisma.contributionProduct.create({
      data: {
        societyId,
        name: data.name,
        description: data.description,
        type: data.type,
        frequency: data.frequency,
        isMandatory: data.isMandatory === "true",
        amountType: data.amountType,
        defaultAmount: data.defaultAmount ? parseFloat(data.defaultAmount) : null
      }
    });

    await logAudit(societyId, authUserId, "PRODUCT_CREATED", "CONTRIBUTION_PRODUCT", product.id, { name: product.name });
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function postTransaction(data: any, societyId: string, authUserId: string) {
  try {
    const receiptNo = generateReceiptNumber();

    const result = await prisma.$transaction(async (tx) => {
      const transaction = await tx.transaction.create({
        data: {
          societyId,
          membershipId: data.membershipId,
          productId: data.productId || null,
          amount: parseFloat(data.amount),
          type: data.type,
          paymentMethod: data.paymentMethod,
          reference: data.reference,
          narration: data.narration,
          postedById: authUserId,
          receiptNumber: receiptNo
        }
      });

      const receipt = await tx.receipt.create({
        data: {
          transactionId: transaction.id,
          receiptNumber: receiptNo
        }
      });

      if (data.type === "CREDIT") {
        if (data.productCategory === "SAVINGS") {
          await tx.membership.update({
            where: { id: data.membershipId },
            data: { totalSavings: { increment: parseFloat(data.amount) } }
          });
        } else if (data.productCategory === "SHARES") {
          await tx.membership.update({
            where: { id: data.membershipId },
            data: { totalShares: { increment: parseFloat(data.amount) } }
          });
        }
      } else if (data.type === "DEBIT") {
        if (data.productCategory === "SAVINGS") {
          await tx.membership.update({
            where: { id: data.membershipId },
            data: { totalSavings: { decrement: parseFloat(data.amount) } }
          });
        } else if (data.productCategory === "SHARES") {
          await tx.membership.update({
            where: { id: data.membershipId },
            data: { totalShares: { decrement: parseFloat(data.amount) } }
          });
        }
      }

      return { transaction, receipt };
    });

    await logAudit(societyId, authUserId, "TRANSACTION_POSTED", "TRANSACTION", result.transaction.id, {
      amount: data.amount,
      receiptUrl: result.receipt.receiptNumber
    });

    return { success: true, receipt: result.receipt };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}