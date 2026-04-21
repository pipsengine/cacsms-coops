"use client";
import { Receipt, BarChart3, PieChart, Landmark, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getAccountingOverviewData } from "@/server/actions/accounting";
import { getOrCreateDefaultSociety } from "@/server/actions/context";
import { useAuth } from "@/lib/auth-context";

export default function AccountingDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
     bankAccountsCount: 0,
     totalCash: 0,
     totalExpenses: 0,
     recentJournals: [] as any[]
  });

  useEffect(() => {
     let mounted = true;
     async function load() {
        if (!user?.uid) return;
        try {
           const societyId = await getOrCreateDefaultSociety(user.uid, user.email || "test", user.displayName || "Testing");
           const sumData = await getAccountingOverviewData(societyId);
           if (mounted && sumData.success) {
               setData({
                  bankAccountsCount: sumData.bankAccountsCount || 0,
                  totalCash: sumData.totalCash || 0,
                  totalExpenses: sumData.totalExpenses || 0,
                  recentJournals: sumData.recentJournals || []
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Institution Accounting</h1>
          <p className="text-slate-500 text-sm">Main Chart of Accounts, Ledgers, and Cash Flow mapping.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center mb-4">
             <div className="bg-blue-100 p-2 rounded-lg text-blue-700 mr-3"><Landmark className="h-6 w-6" /></div>
             <h3 className="font-semibold text-slate-900 text-lg">Banks & Cash</h3>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 mb-1">₦{data.totalCash.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            <h3 className="text-blue-600 text-sm font-medium">Synced accounts ({data.bankAccountsCount})</h3>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center mb-4 opacity-50">
             <div className="bg-emerald-100 p-2 rounded-lg text-emerald-700 mr-3"><BarChart3 className="h-6 w-6" /></div>
             <h3 className="font-semibold text-slate-900 text-lg">Income</h3>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-400 mb-1">₦--</p>
            <h3 className="text-slate-400 text-sm font-medium">P&L Calculation</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center mb-4">
             <div className="bg-rose-100 p-2 rounded-lg text-rose-700 mr-3"><PieChart className="h-6 w-6" /></div>
             <h3 className="font-semibold text-slate-900 text-lg">Expenses</h3>
          </div>
          <div>
             <p className="text-2xl font-bold text-slate-900 mb-1">₦{data.totalExpenses.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
             <h3 className="text-slate-500 text-sm font-medium">Approved Vouchers</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
          <h2 className="font-bold text-lg text-slate-900">Recent Ledger Postings</h2>
        </div>
        
        {data.recentJournals.length === 0 ? (
            <div className="p-12 text-center">
                <div className="mx-auto h-16 w-16 bg-slate-100 flex items-center justify-center rounded-full mb-4">
                   <Receipt className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900">No recent entries</h3>
                <p className="text-slate-500 max-w-sm mx-auto">Journals and automated ledger entries map here.</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-white text-slate-500 font-medium border-b border-slate-100">
                     <tr>
                        <th className="px-6 py-4">Ref / Date</th>
                        <th className="px-6 py-4">Description</th>
                        <th className="px-6 py-4">Entries</th>
                        <th className="px-6 py-4 border-l bg-slate-50">Debit</th>
                        <th className="px-6 py-4 bg-slate-50">Credit</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {data.recentJournals.map(j => {
                          const totalDebit = j.lines.reduce((s: number, l: any) => s + l.debit, 0);
                          const totalCredit = j.lines.reduce((s: number, l: any) => s + l.credit, 0);
                          return (
                              <tr key={j.id} className="hover:bg-slate-50 transition">
                                  <td className="px-6 py-4">
                                      <p className="font-mono text-xs text-blue-600 font-medium">{j.reference}</p>
                                      <p className="text-xs text-slate-500">{new Date(j.date).toLocaleDateString()}</p>
                                  </td>
                                  <td className="px-6 py-4 text-slate-800">{j.description}</td>
                                  <td className="px-6 py-4 text-slate-500 text-xs">{j.lines.length} lines</td>
                                  <td className="px-6 py-4 border-l bg-slate-50 font-medium text-slate-900">
                                      ₦{totalDebit.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                  </td>
                                  <td className="px-6 py-4 bg-slate-50 font-medium text-slate-900">
                                      ₦{totalCredit.toLocaleString(undefined, {minimumFractionDigits: 2})}
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
