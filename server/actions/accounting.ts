"use server";
import {
  createExpenseVoucher as createExpenseVoucherService,
  getAccountingOverviewData as getAccountingOverviewDataService,
  postJournalEntry as postJournalEntryService,
} from "@/services/accounting-service";

export async function getAccountingOverviewData(societyId: string) {
  return getAccountingOverviewDataService(societyId);
}

export async function createExpenseVoucher(data: any, societyId: string, authUserId: string) {
  return createExpenseVoucherService(data, societyId, authUserId);
}

export async function postJournalEntry(data: any, societyId: string, authUserId: string) {
  return postJournalEntryService(data, societyId, authUserId);
}