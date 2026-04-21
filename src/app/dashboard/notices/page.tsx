"use client";
import { ArrowLeft, Megaphone, Save, Loader2, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NoticesPage() {
  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Announcements</h1>
          <p className="text-slate-500 text-sm">Send notices to branches, committees, or all members.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center">
            <Megaphone className="h-5 w-5 mr-2" />
            New Notice
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-6">
        <div className="text-center py-12">
            <div className="mx-auto h-16 w-16 bg-blue-50 flex items-center justify-center rounded-full mb-4">
               <Megaphone className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No Active Notices</h3>
            <p className="text-slate-500 max-w-sm mx-auto">There are currently no active announcements for your cooperative society.</p>
        </div>
      </div>
    </div>
  );
}
