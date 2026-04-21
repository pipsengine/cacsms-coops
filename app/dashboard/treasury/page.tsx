"use client";
import { Receipt, Coins, PiggyBank, ArrowDownRight, ArrowUpRight, PlusCircle, Link as LinkIcon, Loader2 } from "lucide-react";
import LinkWrapper from "next/link";
import { useState, useEffect } from "react";
import { getTreasuryOverviewData } from "@/app/actions/treasury";
import { getOrCreateDefaultSociety } from "@/app/actions/context";
import { useAuth } from "@/lib/auth-context";

export default function TreasuryDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
     totalSavings: 0,
     totalShares: 0,
     recentTransactions: [] as any[]
  });

  useEffect(() => {
    let mounted = true;
    async function load() {
       if (!user?.uid) return;
       try {
           const societyId = await getOrCreateDefaultSociety(user.uid, user.email || "test", user.displayName || "Testing");
           const sumData = await getTreasuryOverviewData(societyId);
           if (mounted && sumData.success) {
               setData({
                  totalSavings: sumData.totalSavings || 0,
                  totalShares: sumData.totalShares || 0,
                  recentTransactions: sumData.recentTransactions || []
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
     return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Treasury & Collections</h1>
          <p className="text-slate-500 text-sm">Monitor savings, share capital, and manage periodic runs.</p>
        </div>
        <div className="flex items-center space-x-3">
          <LinkWrapper href="/dashboard/treasury/products" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition shadow-sm">
            Contribution Products
          </LinkWrapper>
          <LinkWrapper href="/dashboard/treasury/post" className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition flex items-center shadow-sm">
            <PlusCircle className="h-5 w-5 mr-2" />
            Post Transaction
          </LinkWrapper>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-emerald-900">
             <PiggyBank className="h-24 w-24" />
          </div>
          <div className="flex items-center mb-4 relative z-10">
             <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700 mr-3"><PiggyBank className="h-5 w-5" /></div>
             <h3 className="font-semibold text-slate-900 text-lg">Total Savings</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1 relative z-10">₦{data.totalSavings.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          <div className="flex items-center text-sm text-emerald-600 font-medium relative z-10">
            <ArrowUpRight className="h-4 w-4 mr-1" /> Dynamic System Summation
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center mb-4">
             <div className="bg-blue-100 p-2 rounded-lg text-blue-700 mr-3"><Coins className="h-5 w-5" /></div>
             <h3 className="font-semibold text-slate-900 text-lg">Share Capital</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900 mb-1">₦{data.totalShares.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          <div className="flex items-center text-sm text-emerald-600 font-medium">
            <ArrowUpRight className="h-4 w-4 mr-1" /> Equity Book Value
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center mb-4 opacity-50">
             <div className="bg-rose-100 p-2 rounded-lg text-rose-700 mr-3"><ArrowDownRight className="h-5 w-5" /></div>
             <h3 className="font-semibold text-slate-900 text-lg">Outstanding Arrears</h3>
          </div>
          <p className="text-3xl font-bold text-slate-400 mb-1">₦--</p>
          <div className="flex items-center text-sm text-slate-400 font-medium">
             (Arrears calculation runs nightly)
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h2 className="font-bold text-lg text-slate-900">Recent Receipts</h2>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View Register &rarr;</button>
        </div>
        
        {data.recentTransactions.length === 0 ? (
            <div className="p-12 text-center">
                <div className="mx-auto h-16 w-16 bg-slate-50 border border-slate-100 flex items-center justify-center rounded-full mb-4">
                   <Receipt className="h-8 w-8 text-slate-300" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No transactions posted</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Once cash or transfers are posted to member ledgers, their receipts will populate here automatically.</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-white text-slate-500 font-medium border-b border-slate-100">
                     <tr>
                        <th className="px-6 py-4">Receipt No.</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Member</th>
                        <th className="px-6 py-4">Product / Type</th>
                        <th className="px-6 py-4">Amount</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {data.recentTransactions.map(tx => (
                          <tr key={tx.id} className="hover:bg-slate-50 transition">
                              <td className="px-6 py-4 font-mono text-emerald-600 font-medium text-xs">
                                  {tx.receipt?.receiptNumber || tx.receiptNumber || tx.reference}
                              </td>
                              <td className="px-6 py-4 text-slate-500 text-xs">
                                  {new Date(tx.transactionDate).toLocaleString()}
                              </td>
                              <td className="px-6 py-4 font-medium text-slate-800">
                                  {tx.membership?.user?.firstName} {tx.membership?.user?.lastName}
                                  <div className="text-xs text-slate-500 font-normal">{tx.membership?.memberNumber}</div>
                              </td>
                              <td className="px-6 py-4">
                                  <div>{tx.product?.name || "General Deposit"}</div>
                                  <div className="text-xs text-slate-500">Method: {tx.paymentMethod}</div>
                              </td>
                              <td className="px-6 py-4 font-bold text-slate-900">
                                  ₦{tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                              </td>
                          </tr>
                      ))}
                   </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
}
