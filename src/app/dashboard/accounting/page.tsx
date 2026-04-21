"use client";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getAccountingOverviewData } from "@/server/actions/accounting";
import { getOrCreateDefaultSociety } from "@/server/actions/context";
import { useAuth } from "@/infrastructure/auth/auth-context";
import AccountingDashboardView from "@/views/accounting/AccountingDashboardView";

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

  return <AccountingDashboardView data={data} />;
}
