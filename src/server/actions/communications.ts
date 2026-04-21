"use server";
import {
  createSupportTicket as createSupportTicketService,
  sendBroadcastNotification as sendBroadcastNotificationService,
} from "@/services/communications-service";

export async function createSupportTicket(data: any, societyId: string, authUserId: string) {
  return createSupportTicketService(data, societyId, authUserId);
}

export async function sendBroadcastNotification(data: any, societyId: string, authUserId: string) {
  return sendBroadcastNotificationService(data, societyId, authUserId);
}
