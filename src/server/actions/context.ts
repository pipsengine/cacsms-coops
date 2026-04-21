"use server";
import {
  getCurrentSocietyId as getCurrentSocietyIdService,
  getOrCreateDefaultSociety as getOrCreateDefaultSocietyService,
} from "@/services/context-service";

export async function getCurrentSocietyId(authUserId: string) {
  return getCurrentSocietyIdService(authUserId);
}

export async function getOrCreateDefaultSociety(authUserId: string, email: string, name: string) {
  return getOrCreateDefaultSocietyService(authUserId, email, name);
}
