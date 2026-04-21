import { prisma } from "@/database/client";
import { logAudit } from "@/lib/audit";

export async function getAccountingOverviewData(societyId: string) {
  try {
    const bankAccounts = await prisma.bankAccount.findMany({
      where: { societyId }
    });
    const totalCash = bankAccounts.reduce((sum, account) => sum + account.balance, 0);

    const recentJournals = await prisma.journalEntry.findMany({
      where: { societyId },
      orderBy: { date: "desc" },
      take: 5,
      include: { lines: { include: { account: true } } }
    });

    const vouchers = await prisma.expenseVoucher.findMany({
      where: { societyId, status: "APPROVED" }
    });
    const totalExpenses = vouchers.reduce((sum, voucher) => sum + voucher.amount, 0);

    return {
      success: true,
      bankAccountsCount: bankAccounts.length,
      totalCash,
      totalExpenses,
      recentJournals
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createExpenseVoucher(data: any, societyId: string, authUserId: string) {
  try {
    const voucher = await prisma.expenseVoucher.create({
      data: {
        societyId,
        voucherNo: `EV-${Date.now().toString(36).toUpperCase()}`,
        amount: parseFloat(data.amount),
        category: data.category,
        payee: data.payee,
        description: data.description,
        requestedBy: authUserId
      }
    });

    await logAudit(societyId, authUserId, "VOUCHER_CREATED", "EXPENSE_VOUCHER", voucher.id, { amount: voucher.amount });
    return { success: true, voucher };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function postJournalEntry(data: any, societyId: string, authUserId: string) {
  try {
    const totalDebit = data.lines.reduce((sum: number, line: any) => sum + (line.debit || 0), 0);
    const totalCredit = data.lines.reduce((sum: number, line: any) => sum + (line.credit || 0), 0);

    if (totalDebit !== totalCredit) {
      throw new Error("Journal entry doesn't balance.");
    }

    const journal = await prisma.journalEntry.create({
      data: {
        societyId,
        description: data.description,
        reference: data.reference,
        postedById: authUserId,
        lines: {
          create: data.lines.map((line: any) => ({
            accountId: line.accountId,
            debit: line.debit || 0,
            credit: line.credit || 0
          }))
        }
      }
    });

    await logAudit(societyId, authUserId, "JOURNAL_POSTED", "JOURNAL_ENTRY", journal.id, {});
    return { success: true, journal };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}