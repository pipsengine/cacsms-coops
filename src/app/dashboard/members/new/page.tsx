"use client";
import { ArrowLeft, Save, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMemberAction } from "@/server/actions/members";
import { getOrCreateDefaultSociety } from "@/server/actions/context";

export default function NewMemberPage() {
  const router = useRouter();
  // const { data: session } = useSession();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    memberNumber: "",
    role: "MEMBER",
    status: "ACTIVE",
    gender: "",
    dateOfBirth: "",
    maritalStatus: "",
    occupation: "",
    employer: "",
    residentialAddress: "",
    nextOfKinName: "",
    nextOfKinPhone: "",
    nextOfKinRelation: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        setError("You must be logged in to test this.");
        return;
    }

    setLoading(true);
    setError("");

    try {
      // Ensure we have a valid environment/society to map this member to
      const societyId = await getOrCreateDefaultSociety(user.uid, user.email || "admin@example.com", user.displayName || "Admin User");

      const res = await createMemberAction(formData, user.uid, societyId);
      
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard/members");
        }, 1500);
      } else {
        setError(res.error || "Failed to create member");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
      return (
          <div className="max-w-2xl mx-auto mt-24 text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                 <CheckCircle2 className="h-10 w-10" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Member Registered!</h1>
              <p className="text-slate-500">The member directory and accounting sequences have been updated.</p>
          </div>
      )
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/dashboard/members" className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-50 transition text-slate-500">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Register New Member</h1>
          <p className="text-slate-500 text-sm">Add a new record to the cooperative registry.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {error && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 text-sm">
                {error}
            </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-base font-semibold text-slate-900">Personal Information</h2>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">First Name <span className="text-rose-500">*</span></label>
              <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Last Name <span className="text-rose-500">*</span></label>
              <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address <span className="text-rose-500">*</span></label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number <span className="text-rose-500">*</span></label>
              <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white">
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
              <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-base font-semibold text-slate-900">Employment & Address</h2>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Occupation</label>
              <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Employer / Business</label>
              <input type="text" name="employer" value={formData.employer} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Residential Address</label>
              <textarea name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm resize-none"></textarea>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-base font-semibold text-slate-900">Next of Kin & Emergency Contact</h2>
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input type="text" name="nextOfKinName" value={formData.nextOfKinName} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <input type="tel" name="nextOfKinPhone" value={formData.nextOfKinPhone} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Relationship</label>
              <input type="text" name="nextOfKinRelation" value={formData.nextOfKinRelation} onChange={handleChange} placeholder="e.g. Spouse, Sibling" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-base font-semibold text-slate-900">System & Governance Mapping</h2>
          </div>
          <div className="p-6 grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Member ID / Number</label>
              <input type="text" name="memberNumber" value={formData.memberNumber} onChange={handleChange} placeholder="Automatic if blank" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Cooperative Role</label>
              <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white">
                <option value="MEMBER">Standard Member</option>
                <option value="PRESIDENT">President</option>
                <option value="TREASURER">Treasurer</option>
                <option value="SECRETARY">Secretary</option>
                <option value="LOAN_OFFICER">Loan Officer</option>
                <option value="GUEST">Guest / Probation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Initial Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-white">
                <option value="PENDING">Pending Documents</option>
                <option value="ACTIVE">Active (Instant KYC)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-5 w-5 mr-2 animate-spin" /> : <Save className="h-5 w-5 mr-2" />}
            {loading ? "Processing Ledger..." : "Admit Member"}
          </button>
        </div>

      </form>
    </div>
  );
}
