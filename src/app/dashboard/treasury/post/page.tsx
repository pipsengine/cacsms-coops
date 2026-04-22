"use client";
import { ArrowLeft, Save, Loader2, CheckCircle2 } from "lucide-react";
import LinkWrapper from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMembersBySociety } from "@/server/actions/members";
import { getContributionProducts, postTransaction } from "@/server/actions/treasury";
import { getOrCreateDefaultSociety } from "@/server/actions/context";

export default function PostTransactionPage() {
  const router = useRouter();
  // const { data: session } = useSession();
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [receiptUrl, setReceiptUrl] = useState("");

  const [members, setMembers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    membershipId: "",
    productId: "",
    amount: "",
    paymentMethod: "BANK_TRANSFER",
    narration: "",
    reference: ""
  });

  useEffect(() => {
    let mounted = true;
    async function init() {
      if (!user) return;
      try {
        const societyId = await getOrCreateDefaultSociety(user.uid, user.email || "test@local", user.displayName || "Testing");
        const [memberList, productList] = await Promise.all([
          getMembersBySociety(societyId),
          getContributionProducts(societyId)
        ]);

        if (mounted) {
          setMembers(memberList);
          setProducts(productList);
          
          if (productList.length === 0) {
            // Need a default product to avoid blocking the workflow if none exist
            // Normally handled by the "Create Product" page
          }
        }
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        if (mounted) setFetching(false);
      }
    }
    
    init();
    return () => { mounted = false; };
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        setError("You must be logged in.");
        return;
    }

    setLoading(true);
    setError("");

    try {
      const societyId = await getOrCreateDefaultSociety(user.uid, user.email || "admin@example.com", user.displayName || "Admin User");
      
      const selectedProduct = products.find(p => p.id === formData.productId);
      const productCategory = selectedProduct?.type?.includes("SHARE") ? "SHARES" : "SAVINGS"; // heuristic based on standard cooperative typing

      const submitData = {
          ...formData,
          type: "CREDIT",
          productCategory,
          reference: formData.reference || `REF-${Math.floor(Math.random() * 1000000)}`
      };

      const res = await postTransaction(submitData, societyId, user.uid);
      
      if (res.success) {
        setSuccess(true);
        setReceiptUrl(res.receipt?.receiptNumber || formData.reference);
      } else {
        setError(res.error || "Failed to post transaction");
      }
    } catch (err: any) {
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
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Transaction Posted Successfully!</h1>
            <p className="text-slate-500 mb-8">The member&apos;s ledger has been credited and a receipt was generated.</p>
            
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl inline-block text-left mb-8 w-full max-w-sm">
                <p className="text-sm text-slate-500 font-medium mb-1">Receipt Number</p>
                <p className="text-xl font-mono text-slate-900 mb-4">{receiptUrl}</p>
                <LinkWrapper href="/dashboard/treasury" className="w-full text-center block px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition">
                   Return to Treasury
                </LinkWrapper>
            </div>
        </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center space-x-4 mb-6">
        <LinkWrapper href="/dashboard/treasury" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition text-slate-600">
          <ArrowLeft className="h-5 w-5" />
        </LinkWrapper>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Post Transaction</h1>
          <p className="text-slate-500 text-sm">Credit a member&apos;s ledger for savings, shares, or fees.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
         {error && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 text-sm mb-6">
                {error}
            </div>
         )}
         {products.length === 0 && (
            <div className="bg-amber-50 text-amber-700 p-4 rounded-xl border border-amber-100 text-sm mb-6">
                <strong>No active contribution products found!</strong> You should create a Savings or Shares product in the Treasury settings first, otherwise this transaction won&apos;t link to a product. (Proceeding without a product ID is allowed for general deposits but not recommended).
            </div>
         )}

         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Member *</label>
                   <select required name="membershipId" value={formData.membershipId} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="">Select a member...</option>
                      {members.map(m => (
                         <option key={m.id} value={m.id}>{m.memberNumber || m.id.substring(0,8)} - {m.user?.firstName} {m.user?.lastName}</option>
                      ))}
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Contribution Type (Product) *</label>
                   <select name="productId" value={formData.productId} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="">Select product (Optional defaults to General)</option>
                      {products.map(p => (
                         <option key={p.id} value={p.id}>{p.name} ({p.type})</option>
                      ))}
                   </select>
                </div>

                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Amount *</label>
                   <div className="relative">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₦</span>
                     <input required type="number" step="0.01" name="amount" value={formData.amount} onChange={handleChange} className="w-full pl-8 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Payment Method *</label>
                   <select required name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-blue-600">
                      <option value="BANK_TRANSFER">Bank Transfer / Deposit</option>
                      <option value="PAYROLL_DEDUCTION">Payroll Deduction</option>
                      <option value="CASH">Cash</option>
                      <option value="CARD">Card / Online</option>
                   </select>
                </div>
            </div>

            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">Narration / Memo</label>
               <textarea rows={3} name="narration" value={formData.narration} onChange={handleChange} placeholder="e.g. Monthly savings deposit for August 2026" className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 resize-none"></textarea>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
               <button disabled={loading} type="submit" className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 flex items-center transition disabled:opacity-50">
                 {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2"/> : <Save className="h-5 w-5 mr-2" />}
                 Post & Build Receipt
               </button>
            </div>
         </form>
      </div>
    </div>
  )
}
