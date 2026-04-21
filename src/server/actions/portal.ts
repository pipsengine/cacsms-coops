"use server";
import { getPortalOverviewData as getPortalOverviewDataService } from "@/services/portal-service";

export async function getPortalOverviewData(authUserId: string) {
  return getPortalOverviewDataService(authUserId);
}
