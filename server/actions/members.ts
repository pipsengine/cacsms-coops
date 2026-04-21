"use server";
import {
  createMemberAction as createMemberActionService,
  getMembersBySociety as getMembersBySocietyService,
} from "@/services/member-service";

export async function getMembersBySociety(societyId: string) {
  return getMembersBySocietyService(societyId);
}

export async function createMemberAction(data: any, authUserId: string, societyId: string) {
  return createMemberActionService(data, authUserId, societyId);
}