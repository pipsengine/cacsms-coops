"use client";
import { HandCoins, Activity, Target, ShieldAlert, ArrowRight, Settings, Loader2 } from "lucide-react";
import LinkWrapper from "next/link";
import { useState, useEffect } from "react";
import { getLoanOverviewData } from "@/app/actions/loans";
import { getOrCreateDefaultSociety } from "@/app/actions/context";
import { useAuth } from "@/lib/auth-context";

export default function LoansDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
     queue: [] as any[],
     activeLoansCount: 0,
     totalActiveBalance: 0
  });

  useEffect(() => {
     let mounted = true;
     async function load() {
        if (!user?.uid) return;
        try {
           const societyId = await getOrCreateDefaultSociety(user.uid, user.email || "test", user.displayName || "Testing");
           const sumData = await getLoanOverviewData(societyId);
           if (mounted && sumData.success) {
               setData({
                  queue: sumData.queue || [],
                  activeLoansCount: sumData.activeLoansCount || 0,
                  totalActiveBalance: sumData.totalActiveBalance || 0
               });
               setLoading(false);
           }
        } catch(e) {
           console.error(e);
           if (mounted) setLoading(false);
        }
     }
     load();
     return () => { mounted = false; };
  }, [user]);

  if (loading) {
     return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Credit Operations & Loans</h1>
          <p className="text-slate-500 text-sm">Manage credit underwriting, guarantors, arrears, and active loans.</p>
        </div>
        <div className="flex items-center space-x-3">
          <LinkWrapper href="/dashboard/loans/products" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition flex items-center shadow-sm">
            <Settings className="h-4 w-4 mr-2 text-slate-400" />
            Loan Limits & Rules
          </LinkWrapper>
          <LinkWrapper href="/dashboard/loans/apply" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
            New Loan Request
          </LinkWrapper>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
             <div className="bg-amber-100 p-2 rounded-lg text-amber-700"><HandCoins className="h-6 w-6" /></div>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{data.queue.length}</p>
            <h3 className="text-slate-500 text-sm font-medium">Pending Review</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
             <div className="bg-blue-100 p-2 rounded-lg text-blue-700"><Activity className="h-6 w-6" /></div>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 mb-1">{data.activeLoansCount}</p>
            <h3 className="text-slate-500 text-sm font-medium">Active Loans</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
             <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700"><Target className="h-6 w-6" /></div>
          </div>
          <div>
             <p className="text-2xl font-bold text-slate-900 mb-1">₦{data.totalActiveBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
             <h3 className="text-slate-500 text-sm font-medium">Active Portfolio</h3>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
             <div className="bg-rose-100 p-2 rounded-lg text-rose-700"><ShieldAlert className="h-6 w-6" /></div>
             <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full opacity-50">Nightly Sync</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-400 mb-1">₦--</p>
            <h3 className="text-slate-400 text-sm font-medium">Overdue / Delinquent</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="font-bold text-lg text-slate-900">Application Queue</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All Queue &rarr;</button>
        </div>
        
        {data.queue.length === 0 ? (
            <div className="p-12 text-center">
                <div className="mx-auto h-16 w-16 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-full mb-4">
                   <HandCoins className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No applications in queue</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Loan applications submitted by members will appear here for guarantor checks and committee review.</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4">Applicant</th>
                        <th className="px-6 py-4">Loan Type</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Guarantors</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                       {data.queue.map(loan => {
                           const confirmedCount = loan.guarantors.filter((g: any) => g.status === "APPROVED").length;
                           const totalGuarantors = loan.guarantors.length;
                           return (
                               <tr key={loan.id} className="hover:bg-slate-50 transition">
                                 <td className="px-6 py-4">
                                    <p className="font-medium text-slate-900">{loan.membership?.user?.firstName} {loan.membership?.user?.lastName}</p>
                                    <p className="text-xs text-slate-500">{loan.membership?.memberNumber}</p>
                                 </td>
                                 <td className="px-6 py-4 text-slate-600">{loan.product?.name || "General Loan"}</td>
                                 <td className="px-6 py-4 font-semibold text-slate-800">₦{loan.principalAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                                 <td className="px-6 py-4">
                                    {totalGuarantors > 0 ? (
                                        <span className={`font-medium text-xs px-2 py-1 rounded ${confirmedCount >= totalGuarantors ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>
                                            {confirmedCount} / {totalGuarantors} Confirmed
                                        </span>
                                    ) : (
                                        <span className="text-slate-500 text-xs">N/A</span>
                                    )}
                                 </td>
                                 <td className="px-6 py-4">
                                     <span className={`font-medium text-xs px-2 py-1 rounded ${loan.status === 'PENDING_GUARANTOR' ? 'text-blue-600 bg-blue-50' : loan.status === 'SUBMITTED' ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50'}`}>
                                        {loan.status.replace("_", " ")}
                                     </span>
                                 </td>
                                 <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 font-medium hover:text-blue-800 transition">Review &rarr;</button>
                                 </td>
                              </tr>
                           )
                       })}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  )
}
