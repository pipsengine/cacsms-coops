"use client";
import { ArrowLeft, CreditCard, Download, ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function MemberLedgerPage() {
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
            <Link href="/dashboard/members" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition text-slate-600">
               <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
               <h1 className="text-2xl font-bold text-slate-900">Financial Ledger: John Doe</h1>
               <p className="text-slate-500 text-sm">Status: <span className="text-emerald-600 font-medium">Active</span> | ID: ADM-001</p>
            </div>
        </div>
        <button className="px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export Statement
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm md:col-span-1">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Savings Balance</h3>
          <p className="text-2xl font-bold text-emerald-600">₦4,500.00</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm md:col-span-1">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Shares Holding</h3>
          <p className="text-2xl font-bold text-blue-600">₦1,000.00</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm md:col-span-1">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Unpaid Arrears</h3>
          <p className="text-2xl font-bold text-rose-600">₦50.00</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm md:col-span-1">
          <h3 className="text-slate-500 text-sm font-medium mb-1">Dues/Fines YTD</h3>
          <p className="text-2xl font-bold text-slate-900">₦120.00</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
           <h2 className="font-bold text-slate-900 flex items-center"><CreditCard className="h-5 w-5 mr-2 text-slate-400" /> Transaction History</h2>
        </div>
        <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Receipt No.</th>
                <th className="px-6 py-4">Narration / Product</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr className="hover:bg-slate-50 transition">
                 <td className="px-6 py-4 text-slate-500">Oct 12, 2026</td>
                 <td className="px-6 py-4 font-mono text-xs text-blue-600">RCP-M2F8A-X9A</td>
                 <td className="px-6 py-4 font-medium text-slate-800">Monthly Savings Deposit</td>
                 <td className="px-6 py-4 font-medium text-emerald-600 flex items-center"><ArrowUpRight className="h-4 w-4 mr-1"/> ₦100.00</td>
                 <td className="px-6 py-4 text-emerald-600 font-medium text-xs">COMPLETED</td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                 <td className="px-6 py-4 text-slate-500">Oct 05, 2026</td>
                 <td className="px-6 py-4 font-mono text-xs text-blue-600">RCP-M2C1Z-V2B</td>
                 <td className="px-6 py-4 font-medium text-slate-800">Late Meeting Fine</td>
                 <td className="px-6 py-4 font-medium text-rose-600 flex items-center"><ArrowDownRight className="h-4 w-4 mr-1"/> ₦10.00</td>
                 <td className="px-6 py-4 text-emerald-600 font-medium text-xs">COMPLETED</td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}
