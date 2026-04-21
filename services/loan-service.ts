import { prisma } from "@/database/client";
import { logAudit } from "@/lib/audit";

export async function getLoanOverviewData(societyId: string) {
  try {
    const queue = await prisma.loan.findMany({
      where: { societyId, status: { in: ["PENDING_GUARANTOR", "SUBMITTED", "APPROVED"] } },
      orderBy: { appliedAt: "desc" },
      include: {
        membership: { include: { user: true } },
        product: true,
        guarantors: { include: { membership: { include: { user: true } } } }
      }
    });

    const activeLoans = await prisma.loan.findMany({
      where: { societyId, status: "DISBURSED" },
      select: { balance: true }
    });

    const totalActiveBalance = activeLoans.reduce((sum, loan) => sum + loan.balance, 0);

    return {
      success: true,
      queue,
      activeLoansCount: activeLoans.length,
      totalActiveBalance
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getLoanProducts(societyId: string) {
  return prisma.loanProduct.findMany({
    where: { societyId }
  });
}

export async function createLoanProduct(data: any, societyId: string, authUserId: string) {
  try {
    const product = await prisma.loanProduct.create({
      data: {
        societyId,
        name: data.name,
        description: data.description,
        minAmount: parseFloat(data.minAmount),
        maxAmount: parseFloat(data.maxAmount),
        interestRate: parseFloat(data.interestRate),
        interestType: data.interestType,
        minTenureMonths: parseInt(data.minTenureMonths),
        maxTenureMonths: parseInt(data.maxTenureMonths),
        savingsRatio: data.savingsRatio ? parseFloat(data.savingsRatio) : null,
        requiresGuarantor: data.requiresGuarantor === "true",
        guarantorCount: parseInt(data.guarantorCount || "0"),
        processingFee: parseFloat(data.processingFee || "0")
      }
    });

    await logAudit(societyId, authUserId, "LOAN_PRODUCT_CREATED", "LOAN_PRODUCT", product.id, { name: product.name });
    return { success: true, product };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function applyForLoan(data: any, societyId: string, authUserId: string) {
  try {
    const membership = await prisma.membership.findUnique({
      where: { id: data.membershipId },
    });
    const product = await prisma.loanProduct.findUnique({
      where: { id: data.productId }
    });

    if (!membership || !product) {
      throw new Error("Invalid request");
    }

    if (product.savingsRatio && membership.totalSavings * product.savingsRatio < parseFloat(data.principalAmount)) {
      throw new Error(`Amount exceeds savings multiplier. Your max allowed is $${(membership.totalSavings * product.savingsRatio).toFixed(2)}`);
    }

    const loan = await prisma.loan.create({
      data: {
        societyId,
        membershipId: data.membershipId,
        productId: data.productId,
        principalAmount: parseFloat(data.principalAmount),
        balance: parseFloat(data.principalAmount),
        purpose: data.purpose,
        tenureMonths: parseInt(data.tenureMonths),
        status: product.requiresGuarantor ? "PENDING_GUARANTOR" : "SUBMITTED"
      }
    });

    if (product.requiresGuarantor && data.guarantors && Array.isArray(data.guarantors)) {
      for (const guarantorMembershipId of data.guarantors) {
        await prisma.guarantor.create({
          data: {
            loanId: loan.id,
            membershipId: guarantorMembershipId,
            amountPledged: parseFloat(data.principalAmount) / data.guarantors.length
          }
        });
      }
    }

    await logAudit(societyId, authUserId, "LOAN_APPLIED", "LOAN", loan.id, { amount: loan.principalAmount });
    return { success: true, loanId: loan.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}