import { prisma } from "@/database/client";
import { logAudit } from "@/lib/audit";

export async function createSupportTicket(data: any, societyId: string, authUserId: string) {
  try {
    const ticket = await prisma.supportTicket.create({
      data: {
        societyId,
        membershipId: data.membershipId,
        subject: data.subject,
        description: data.description,
        category: data.category,
        priority: data.priority || "MEDIUM",
        messages: {
          create: [
            {
              senderId: authUserId,
              message: data.description
            }
          ]
        }
      }
    });

    await logAudit(societyId, authUserId, "TICKET_OPENED", "SUPPORT_TICKET", ticket.id, { subject: ticket.subject });
    return { success: true, ticket };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function sendBroadcastNotification(data: any, societyId: string, authUserId: string) {
  try {
    const members = await prisma.membership.findMany({
      where: { societyId, status: "ACTIVE" },
      select: { userId: true }
    });

    await prisma.notification.createMany({
      data: members.map((member) => ({
        societyId,
        userId: member.userId,
        title: data.title,
        message: data.message,
        type: data.type || "SYSTEM"
      }))
    });

    if (data.sendSMS) {
      await prisma.integrationLog.create({
        data: {
          societyId,
          service: "TWILIO_SMS",
          status: "QUEUED",
          payload: JSON.stringify({ count: members.length, text: data.message })
        }
      });
    }

    await logAudit(societyId, authUserId, "BROADCAST_SENT", "NOTIFICATION", null, { count: members.length });
    return { success: true, count: members.length };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}