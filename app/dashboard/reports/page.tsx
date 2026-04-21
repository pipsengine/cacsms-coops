"use client";
import { useAuth } from "@/lib/auth-context";
import { Download, FileText, PieChart, Users, Banknote, ShieldAlert, BookOpen, Clock, Loader2, Search } from "lucide-react";
import { useState } from "react";

export default function ReportsDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState<string | null>(null);

  const handleExport = (reportName: string) => {
    setLoading(reportName);
    // Simulate network delay for export generation
    setTimeout(() => {
      setLoading(null);
    }, 2000);
  };

  const reportCategories = [
    {
      category: "Membership & Demographics",
      icon: <Users className="h-5 w-5 text-blue-600" />,
      bg: "bg-blue-50",
      reports: [
        { id: "member_register", name: "Comprehensive Member Register", desc: "Full list of all active members, contact details, and dates joined." },
        { id: "kyc_status", name: "KYC & Compliance Status", desc: "List of members missing required documentation or approvals." }
      ]
    },
    {
      category: "Treasury & Savings",
      icon: <Banknote className="h-5 w-5 text-emerald-600" />,
      bg: "bg-emerald-50",
      reports: [
        { id: "savings_report", name: "Monthly Savings Report", desc: "Detailed breakdown of savings balances and recent deposits." },
        { id: "shares_report", name: "Share Capital Register", desc: "Equity holding distribution and dividend calculation sheet." },
        { id: "arrears_report", name: "Outstanding Arrears", desc: "List of missed contributions, fines, and dues." }
      ]
    },
    {
      category: "Credit Operations",
      icon: <PieChart className="h-5 w-5 text-purple-600" />,
      bg: "bg-purple-50",
      reports: [
        { id: "loan_portfolio", name: "Active Loan Portfolio", desc: "All currently active loans with principal, interest, and tenor." },
        { id: "overdue_loans", name: "Delinquency & Overdue", desc: "Loans past due, including guarantor exposure details." },
        { id: "loan_disbursement", name: "Disbursement History", desc: "Historical record of all approved and funded loans." }
      ]
    },
    {
      category: "Accounting & Financials",
      icon: <BookOpen className="h-5 w-5 text-amber-600" />,
      bg: "bg-amber-50",
      reports: [
        { id: "trial_balance", name: "Trial Balance", desc: "List of closing balances of ledger accounts." },
        { id: "balance_sheet", name: "Balance Sheet", desc: "Statement of the financial position of the cooperative." },
        { id: "pnl", name: "Income and Expenditure", desc: "Profit & loss statement for the selected financial period." }
      ]
    },
    {
      category: "Governance & Operations",
      icon: <ShieldAlert className="h-5 w-5 text-rose-600" />,
      bg: "bg-rose-50",
      reports: [
        { id: "attendance", name: "Meeting Attendance", desc: "Participation records for Annual General Meetings and committees." },
        { id: "compliance", name: "Statutory Compliance Due", desc: "Upcoming regulatory deadlines and audit submissions." },
        { id: "audit_trail", name: "System Audit Trail", desc: "Chronological log of system actions performed by administrative users." }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-500 text-sm">Generate and export official financial, operational, and compliance reports.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input type="text" placeholder="Search reports..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center shadow-sm">
            <Clock className="h-4 w-4 mr-2" />
            Scheduled Reports
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {reportCategories.map((category, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="px-6 py-4 border-b border-slate-200 flex items-center bg-slate-50">
                <div className={`p-2 rounded-lg ${category.bg} mr-3`}>
                   {category.icon}
                </div>
                <h2 className="font-bold text-slate-900">{category.category}</h2>
             </div>
             <div className="divide-y divide-slate-100">
                {category.reports.map((report) => (
                   <div key={report.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-slate-50/50 transition">
                      <div className="mb-4 sm:mb-0 max-w-2xl">
                         <h3 className="font-semibold text-slate-900 text-base mb-1">{report.name}</h3>
                         <p className="text-sm text-slate-500">{report.desc}</p>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                         <button 
                            onClick={() => handleExport(report.id + "_pdf")}
                            disabled={loading !== null}
                            className="px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded font-medium text-sm hover:bg-slate-50 transition flex items-center disabled:opacity-50"
                         >
                            {loading === report.id + "_pdf" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileText className="h-4 w-4 mr-2 text-rose-500" />}
                            PDF
                         </button>
                         <button 
                            onClick={() => handleExport(report.id + "_excel")}
                            disabled={loading !== null}
                            className="px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded font-medium text-sm hover:bg-slate-50 transition flex items-center disabled:opacity-50"
                         >
                            {loading === report.id + "_excel" ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Download className="h-4 w-4 mr-2 text-emerald-500" />}
                            Excel
                         </button>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
