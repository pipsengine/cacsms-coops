"use client";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createSocietyAction } from "@/server/actions/onboarding";
import { Loader2, Building, ShieldCheck } from "lucide-react";

export default function OnboardingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  
  if (!user) {
    router.push("/login");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      registrationNumber: formData.get("registrationNumber") as string,
      type: formData.get("type") as string,
    };

    const res = await createSocietyAction(data, {
      uid: user.uid,
      email: user.email!,
      name: user.displayName || "Admin",
    });

    if (res.success) {
      router.push(`/dashboard`);
    } else {
      setError(res.error || "An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  const types = ["MULTIPURPOSE", "STAFF", "THRIFT_CREDIT", "FARMERS", "MARKET", "TRANSPORT", "ARTISAN", "HOUSING"];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-blue-100 p-2 rounded-lg">
            <Building className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Setup your Cooperative</h1>
            <p className="text-sm text-slate-500">Register your society to begin using the platform.</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-orange-50 text-orange-700 text-sm rounded-lg border border-orange-100 flex items-start space-x-3">
             <ShieldCheck className="h-5 w-5 flex-shrink-0" />
             <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cooperative Name</label>
            <input 
              required 
              name="name" 
              type="text" 
              placeholder="e.g. Acme Staff Cooperative Society" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Registration Number (Optional)</label>
            <input 
              name="registrationNumber" 
              type="text" 
              placeholder="e.g. RC-123456" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cooperative Category</label>
            <select 
              name="type" 
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white"
            >
              {types.map(t => (
                <option key={t} value={t}>{t.replace("_", " ")}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
            {isSubmitting ? "Provisioning..." : "Create Workspace"}
          </button>
        </form>
      </div>
    </div>
  );
}
