"use client";
import { useAuth } from "@/infrastructure/auth/auth-context";
import { useRouter } from "next/navigation";
import LandingPageView from "@/views/landing/LandingPageView";

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (!loading && user) {
    router.push("/dashboard");
    return null;
  }

  return <LandingPageView />;
}
