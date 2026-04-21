"use client";
import { Wallet, Coins, PiggyBank, ArrowDownRight, ArrowUpRight, Activity, HandCoins, AlertCircle, Loader2 } from "lucide-react";
import LinkWrapper from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { getPortalOverviewData } from "@/server/actions/portal";

export default function PortalDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
     let mounted = true;
     async function load() {
        if (!user?.uid) return;
        try {
            const res = await getPortalOverviewData(user.uid);
            if (mounted) {
                if (res.success) {
                    setData(res);
                } else {
                    setError(res.error || "Failed to load portal data");
                }
                setLoading(false);
            }
        } catch(e) {
            if (mounted) {
                setError("An unexpected error occurred.");
                setLoading(false);
            }
        }
     }
     load();
     return () => { mounted = false; };
  }, [user]);

  if (loading) {
     return <div className="flex justify-center p-24"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>;
  }

  if (error || !data) {
     return (
        <div className="bg-rose-50 text-rose-600 p-6 rounded-xl border border-rose-100 flex items-start">
            <AlertCircle className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
            <div>
               <h3 className="font-bold text-lg mb-1">Access Error</h3>
               <p>{error || "We could not find your membership record. Please ensure you are logged in with the email registered at your cooperative."}</p>
            </div>
        </div>
     )
  }

  const { membership, recentTransactions } = data;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, {membership.user.firstName}!</h1>
        <p className="text-slate-500 font-medium">Member ID: {membership.memberNumber || membership.id.substring(0,8)} &bull; {membership.society.name}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 rounded-2xl shadow-sm text-white">
          <div className="flex items-center mb-4 opacity-80">
             <PiggyBank className="h-5 w-5 mr-3" />
             <h3 className="font-semibold text-sm uppercase tracking-wider">Total Savings</h3>
          </div>
          <p className="text-4xl font-bold mb-1">₦{membership.totalSavings.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          <div className="flex justify-between items-end mt-6 text-emerald-100">
             <span className="text-sm font-medium">Available for Withdrawal</span>
             <button className="text-xs font-bold uppercase tracking-wide bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition">Request</button>
          </div>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl shadow-sm text-white">
          <div className="flex items-center mb-4 opacity-80">
             <Coins className="h-5 w-5 mr-3" />
             <h3 className="font-semibold text-sm uppercase tracking-wider">Share Capital</h3>
          </div>
          <p className="text-4xl font-bold mb-1">₦{membership.totalShares.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
          <div className="flex justify-between items-end mt-6 text-slate-400">
             <span className="text-sm font-medium">Equity Value</span>
             <span className="text-emerald-400 font-medium text-sm">+3.2% Div</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center mb-4 text-slate-500">
             <Activity className="h-5 w-5 mr-3" />
             <h3 className="font-semibold text-sm uppercase tracking-wider">Active Loans</h3>
          </div>
          <p className="text-4xl font-bold text-slate-900 mb-1">
             ₦{membership.loansAsBorrower?.reduce((sum: number, l: any) => sum + (l.balance || 0), 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
          </p>
          <div className="flex justify-between items-end mt-6">
             <span className="text-sm font-medium text-slate-500">{membership.loansAsBorrower?.length} Active Facility</span>
             <LinkWrapper href="/portal/loans" className="text-xs font-bold uppercase tracking-wide text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded transition">Manage</LinkWrapper>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
          <div>
              <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
                  <LinkWrapper href="/portal/ledger" className="text-sm font-medium text-blue-600 hover:underline">Full Statement</LinkWrapper>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 {recentTransactions.length === 0 ? (
                     <div className="p-8 text-center text-slate-500 text-sm">No recent transactions found on your ledger.</div>
                 ) : (
                     <div className="divide-y divide-slate-100">
                        {recentTransactions.map((tx: any) => (
                            <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                                <div className="flex items-center">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${tx.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                       {tx.type === 'CREDIT' ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{tx.product?.name || "General Deposit"}</p>
                                        <p className="text-xs text-slate-500">{new Date(tx.transactionDate).toLocaleDateString()} &bull; {tx.receiptNumber || tx.reference}</p>
                                    </div>
                                </div>
                                <div className={`font-bold ${tx.type === 'CREDIT' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                    {tx.type === 'CREDIT' ? '+' : '-'}₦{tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                </div>
                            </div>
                        ))}
                     </div>
                 )}
              </div>
          </div>

          <div>
              <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900">Guarantor Obligations</h2>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 {membership.loansAsGuarantor?.length === 0 ? (
                     <div className="p-8 text-center text-slate-500 text-sm">You are not backing any loans.</div>
                 ) : (
                     <div className="divide-y divide-slate-100">
                        {membership.loansAsGuarantor?.map((g: any) => (
                            <div key={g.id} className="p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
                                       <HandCoins className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{g.loan?.membership?.user?.firstName} {g.loan?.membership?.user?.lastName}</p>
                                        <p className="text-xs text-slate-500">Status: {g.status}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900">₦{g.amountPledged.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                                    <p className="text-xs text-slate-500">Pledged</p>
                                </div>
                            </div>
                        ))}
                     </div>
                 )}
              </div>
          </div>
      </div>
    </>
  );
}
