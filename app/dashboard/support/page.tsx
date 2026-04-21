"use client";
import { LifeBuoy, Bell, Ticket, Activity, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SupportDashboard() {
  const [activeTab, setActiveTab] = useState("TICKETS");

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Support & Communications</h1>
          <p className="text-slate-500 text-sm">Manage member inquiries, SLAs, and mass notifications.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Send Broadcast
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-rose-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
             <LifeBuoy className="h-16 w-16" />
          </div>
          <div>
            <p className="text-3xl font-bold text-rose-600 mb-1">5</p>
            <h3 className="text-slate-700 font-medium">Unresolved Tickets</h3>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-3xl font-bold text-slate-900 mb-1">94%</p>
            <h3 className="text-slate-500 text-sm font-medium">Resolution under 24hrs</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-3xl font-bold text-slate-900 mb-1">1,240</p>
            <h3 className="text-slate-500 text-sm font-medium">SMS Sent This Month</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-3xl font-bold text-slate-900 mb-1">0</p>
            <h3 className="text-slate-500 text-sm font-medium">Integration Errors</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200 bg-slate-50">
           <button 
             onClick={() => setActiveTab("TICKETS")}
             className={`px-6 py-4 font-medium text-sm flex items-center ${activeTab === 'TICKETS' ? 'bg-white border-t-2 border-t-blue-600 text-blue-600 -mb-px border-r border-slate-200' : 'text-slate-600 hover:text-slate-900 border-r border-slate-200'}`}
           >
             <Ticket className="h-4 w-4 mr-2" /> Member Tickets
           </button>
           <button 
             onClick={() => setActiveTab("NOTIFICATIONS")}
             className={`px-6 py-4 font-medium text-sm flex items-center ${activeTab === 'NOTIFICATIONS' ? 'bg-white border-t-2 border-t-blue-600 text-blue-600 -mb-px' : 'text-slate-600 hover:text-slate-900'}`}
           >
             <Activity className="h-4 w-4 mr-2" /> Notification Logs
           </button>
        </div>

        <div className="p-0">
            {activeTab === "TICKETS" ? (
               <table className="w-full text-left text-sm whitespace-nowrap">
                   <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                     <tr>
                       <th className="px-6 py-4">Ticket / Subject</th>
                       <th className="px-6 py-4">Member</th>
                       <th className="px-6 py-4">Category</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4">Wait Time</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 bg-white">
                     <tr className="hover:bg-slate-50 transition cursor-pointer">
                        <td className="px-6 py-4">
                           <div className="font-medium text-slate-900">Wrong deduction on August Payroll</div>
                           <div className="text-xs text-slate-500 font-mono mt-0.5">#TCK-X0921</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">Sarah Jenkins</td>
                        <td className="px-6 py-4"><span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">PAYMENT_ISSUE</span></td>
                        <td className="px-6 py-4"><span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded font-bold tracking-wide">OPEN</span></td>
                        <td className="px-6 py-4 text-slate-500">2 hours</td>
                     </tr>
                     <tr className="hover:bg-slate-50 transition cursor-pointer">
                        <td className="px-6 py-4">
                           <div className="font-medium text-slate-900">How do I increase my shares online?</div>
                           <div className="text-xs text-slate-500 font-mono mt-0.5">#TCK-X0884</div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">Michael Okon</td>
                        <td className="px-6 py-4"><span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded font-medium">GENERAL</span></td>
                        <td className="px-6 py-4"><span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold tracking-wide">RESOLVED</span></td>
                        <td className="px-6 py-4 text-slate-500">-</td>
                     </tr>
                   </tbody>
               </table>
            ) : (
               <div className="p-12 text-center text-slate-500">
                  <PhoneCall className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                  <p>No recent SMS or Push broadcasts sent.</p>
               </div>
            )}
        </div>
      </div>
    </div>
  )
}
