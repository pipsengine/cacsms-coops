"use client";
import { ArrowLeft, Target, Settings, Plus } from "lucide-react";
import Link from "next/link";

export default function ContributionProductsPage() {
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex items-center space-x-4 mb-6">
        <Link href="/dashboard/treasury" className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition text-slate-600">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Contribution Products</h1>
          <p className="text-slate-500 text-sm">Define savings, shares, dues, and levy constraints.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div className="flex items-center bg-white px-3 py-1.5 rounded border border-slate-200 shadow-sm text-sm font-medium text-slate-700">
            <Settings className="h-4 w-4 mr-2" /> Parameters
          </div>
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition flex items-center">
            <Plus className="h-4 w-4 mr-1" /> New Product
          </button>
        </div>
        <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Frequency</th>
                <th className="px-6 py-4">Amount Rule</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              <tr className="hover:bg-slate-50 transition">
                 <td className="px-6 py-4 font-medium text-slate-900">Ordinary Shares</td>
                 <td className="px-6 py-4"><span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold tracking-wide">SHARES</span></td>
                 <td className="px-6 py-4">ONCE</td>
                 <td className="px-6 py-4">VARIABLE</td>
                 <td className="px-6 py-4 text-emerald-600 font-medium">Active</td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                 <td className="px-6 py-4 font-medium text-slate-900">Monthly Savings</td>
                 <td className="px-6 py-4"><span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold tracking-wide">SAVINGS</span></td>
                 <td className="px-6 py-4">MONTHLY</td>
                 <td className="px-6 py-4 flex items-center">FIXED <span className="text-slate-400 ml-2">(₦50.00)</span></td>
                 <td className="px-6 py-4 text-emerald-600 font-medium">Active</td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                 <td className="px-6 py-4 font-medium text-slate-900">Late Default Fine</td>
                 <td className="px-6 py-4"><span className="px-2.5 py-1 bg-red-50 text-red-700 rounded-full text-xs font-semibold tracking-wide">FINE</span></td>
                 <td className="px-6 py-4">ONE_TIME</td>
                 <td className="px-6 py-4 flex items-center">FIXED <span className="text-slate-400 ml-2">(₦10.00)</span></td>
                 <td className="px-6 py-4 text-emerald-600 font-medium">Active</td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}
