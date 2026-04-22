"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LandingPageView from "@/views/landing/LandingPageView";

export default function LandingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null; // or a loading spinner if you prefer
  }

  if (session?.user) {
    router.push("/dashboard");
    return null;
  }

  return <LandingPageView />;
}
