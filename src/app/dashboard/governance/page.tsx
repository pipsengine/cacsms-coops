"use client";
import { UsersRound, Settings, CheckSquare, MessageSquare } from "lucide-react";

export default function GovernanceDashboard() {
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Governance & Meetings</h1>
          <p className="text-slate-500 text-sm">AGM Scheduling, Electronic Voting, and Compliance documents.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
             <div className="bg-slate-100 p-3 rounded-full text-slate-700 mb-3"><UsersRound className="h-6 w-6" /></div>
             <h3 className="font-semibold text-slate-900">Meetings Calendar</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
             <div className="bg-slate-100 p-3 rounded-full text-slate-700 mb-3"><CheckSquare className="h-6 w-6" /></div>
             <h3 className="font-semibold text-slate-900">Internal Resolutions</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
             <div className="bg-slate-100 p-3 rounded-full text-slate-700 mb-3"><MessageSquare className="h-6 w-6" /></div>
             <h3 className="font-semibold text-slate-900">Dispute & Compliance</h3>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
             <div className="bg-slate-100 p-3 rounded-full text-slate-700 mb-3"><Settings className="h-6 w-6" /></div>
             <h3 className="font-semibold text-slate-900">Committee Settings</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="font-bold text-lg text-slate-900">Upcoming Assembly</h2>
          <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">Active Compliance</span>
        </div>
        <div className="p-8">
            <h3 className="text-xl font-bold text-slate-900">Annual General Meeting (AGM) 2026</h3>
            <p className="text-slate-500 mt-1 mb-4">December 15, 2026 • Main Cooperative Hall</p>
            <div className="bg-slate-50 border border-slate-200 rounded p-4 text-sm text-slate-700">
                Awaiting Agenda formulation and preliminary distribution.
            </div>
        </div>
      </div>
    </div>
  )
}
