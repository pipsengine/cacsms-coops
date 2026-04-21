"use server";
import {
  applyForLoan as applyForLoanService,
  createLoanProduct as createLoanProductService,
  getLoanOverviewData as getLoanOverviewDataService,
  getLoanProducts as getLoanProductsService,
} from "@/services/loan-service";

export async function getLoanOverviewData(societyId: string) {
  return getLoanOverviewDataService(societyId);
}

export async function getLoanProducts(societyId: string) {
  return getLoanProductsService(societyId);
}

export async function createLoanProduct(data: any, societyId: string, authUserId: string) {
  return createLoanProductService(data, societyId, authUserId);
}

export async function applyForLoan(data: any, societyId: string, authUserId: string) {
  return applyForLoanService(data, societyId, authUserId);
}