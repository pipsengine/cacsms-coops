"use client";
import { ArrowLeft, Save, Loader2, Info, CheckCircle2 } from "lucide-react";
import LinkWrapper from "next/link";
import { useState, useEffect } from "react";
import { getMembersBySociety } from "@/app/actions/members";
import { getLoanProducts, applyForLoan } from "@/app/actions/loans";
import { getOrCreateDefaultSociety } from "@/app/actions/context";
import { useAuth } from "@/lib/auth-context";

export default function NewLoanApplication() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [members, setMembers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
      membershipId: "",
      productId: "",
      principalAmount: "",
      tenureMonths: "",
      purpose: "",
  });

  const [guarantors, setGuarantors] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
        if (!user) return;
        try {
            const societyId = await getOrCreateDefaultSociety(user.uid, user.email || "test", user.displayName || "Testing");
            const [mList, pList] = await Promise.all([
                getMembersBySociety(societyId),
                getLoanProducts(societyId)
            ]);
            if (mounted) {
                setMembers(mList);
                setProducts(pList);
                setFetching(false);
            }
        } catch(e) {
            console.error(e);
            if (mounted) setFetching(false);
        }
    }
    loadData();
    return () => { mounted = false; };
  }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((current) => ({ ...current, [name]: value }));

        if (name !== "productId") {
            return;
        }

        const product = products.find((item) => item.id === value);
        if (product?.requiresGuarantor) {
            setGuarantors(new Array(product.guarantorCount || 1).fill(""));
            return;
        }

        setGuarantors([]);
    };

  const handleGuarantorChange = (index: number, val: string) => {
      const newG = [...guarantors];
      newG[index] = val;
      setGuarantors(newG);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError("");

    try {
        const societyId = await getOrCreateDefaultSociety(user.uid, user.email || "test", user.displayName || "Test");
        
        // Filter out empty guarantors to avoid validation fails if optional
        const validGuarantors = guarantors.filter(g => g !== "");

        const res = await applyForLoan({
           ...formData,
           guarantors: validGuarantors
        }, societyId, user.uid);

        if (res.success) {
            setSuccess(true);
        } else {
            setError(res.error || "Failed to submit loan");
        }
    } catch(err: any) {
        setError(err.message || "An unexpected error occurred");
    } finally {
        setLoading(false);
    }
  };

  if (fetching) {
     return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  if (success) {
      return (
          <div className="max-w-2xl mx-auto mt-16 text-center">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                 <CheckCircle2 className="h-10 w-10" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Application Submitted!</h1>
              <p className="text-slate-500 mb-8">The loan is now in the queue. Guarantors must confirm their pledges before final approval.</p>
              
              <LinkWrapper href="/dashboard/loans" className="w-full max-w-sm mx-auto text-center block px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition">
                 Return to Credit Operations
              </LinkWrapper>
          </div>
      )
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center space-x-4 mb-6">
        <LinkWrapper href="/dashboard/loans" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition text-slate-600">
          <ArrowLeft className="h-5 w-5" />
        </LinkWrapper>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">New Loan Application</h1>
          <p className="text-slate-500 text-sm">Underwrite a new requested loan for a cooperative member.</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl mb-6 flex items-start">
         <Info className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
         <p className="text-sm">The built-in eligibility engine will automatically verify the Member&apos;s savings-to-loan ratio and previous default history upon submission. If they are ineligible based on current rules, the application will be rejected instantly.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
         {error && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 text-sm mb-6">
                {error}
            </div>
         )}
         {products.length === 0 && (
            <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-100 text-sm mb-6">
                <strong>No active loan products found!</strong> You must create a Loan Product in the limits & rules settings before an application can be processed.
            </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Applicant *</label>
                   <select required name="membershipId" value={formData.membershipId} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="">Select a member...</option>
                      {members.map(m => (
                          <option key={m.id} value={m.id}>{m.memberNumber || m.id.substring(0,8)} - {m.user?.firstName} {m.user?.lastName}</option>
                      ))}
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Loan Product *</label>
                   <select required name="productId" value={formData.productId} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="">Select loan policy...</option>
                      {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name} ({p.savingsRatio ? `${p.savingsRatio}x Savings` : 'Fixed'})</option>
                      ))}
                   </select>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Requested Principal *</label>
                   <div className="relative">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₦</span>
                     <input required type="number" step="0.01" name="principalAmount" value={formData.principalAmount} onChange={handleChange} className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Tenure (Months) *</label>
                   <input required type="number" min="1" max="120" name="tenureMonths" value={formData.tenureMonths} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                
                <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-slate-700 mb-1">Purpose of Loan *</label>
                   <textarea rows={3} required name="purpose" value={formData.purpose} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600"></textarea>
                </div>
                
                {guarantors.length > 0 && (
                    <div className="md:col-span-2 pt-4 border-t">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Guarantor Selection</h3>
                        <p className="text-sm text-slate-500 mb-4">This product requires cross-guaranteeing. Select members to vouch for the default risk.</p>
                        <div className="space-y-4">
                            {guarantors.map((g, idx) => (
                                <div key={idx}>
                                   <label className="block text-sm font-medium text-slate-700 mb-1">Guarantor {idx + 1}</label>
                                   <select required value={g} onChange={(e) => handleGuarantorChange(idx, e.target.value)} className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-gray-400">
                                      <option value="">Select guarantor...</option>
                                      {members.filter(m => m.id !== formData.membershipId).map(m => (
                                          <option key={m.id} value={m.id}>{m.memberNumber || m.id.substring(0,8)} - {m.user?.firstName} {m.user?.lastName}</option>
                                      ))}
                                   </select>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-end pt-6 border-t mt-6">
               <button disabled={loading} type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center transition disabled:opacity-50">
                 {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2"/> : <Save className="h-5 w-5 mr-2" />}
                 Submit Application
               </button>
            </div>
         </form>
      </div>
    </div>
  )
}
