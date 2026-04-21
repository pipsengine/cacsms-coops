"use server";
import {
  createContributionProduct as createContributionProductService,
  getContributionProducts as getContributionProductsService,
  getTreasuryOverviewData as getTreasuryOverviewDataService,
  postTransaction as postTransactionService,
} from "@/services/treasury-service";

export async function getTreasuryOverviewData(societyId: string) {
  return getTreasuryOverviewDataService(societyId);
}

export async function getContributionProducts(societyId: string) {
  return getContributionProductsService(societyId);
}

export async function createContributionProduct(data: any, societyId: string, authUserId: string) {
  return createContributionProductService(data, societyId, authUserId);
}

export async function postTransaction(data: any, societyId: string, authUserId: string) {
  return postTransactionService(data, societyId, authUserId);
}