"use server";
import { createSocietyAction as createSocietyActionService } from "@/services/onboarding-service";

export async function createSocietyAction(data: {
  name: string;
  registrationNumber: string;
  type: string;
  acronym?: string;
  dateOfEstablishment?: string;
  contactPhone?: string;
}, userDetails: { uid: string; email: string; name: string }) {
  return createSocietyActionService(data, userDetails);
}
