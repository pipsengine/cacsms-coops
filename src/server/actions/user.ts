"use server";
import { prisma } from "@/infrastructure/prisma/client";

export async function getUserProfile(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        memberships: {
          include: {
            society: true,
          }
        }
      }
    });
    return { success: true, user };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { success: false, error: "Failed to fetch profile" };
  }
}
