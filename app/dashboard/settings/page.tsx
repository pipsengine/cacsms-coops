"use client";
import { Settings as SettingsIcon, Shield, Database, LayoutDashboard, Key, HardDrive, Smartphone, CreditCard, Palette, Activity } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "Institutional Profile", icon: <LayoutDashboard className="h-5 w-5 mr-3" /> },
    { id: "branding", name: "White Label Branding", icon: <Palette className="h-5 w-5 mr-3 text-slate-400" /> },
    { id: "security", name: "Roles & Device Management", icon: <Shield className="h-5 w-5 mr-3 text-slate-400" /> },
    { id: "data", name: "Import & Migration", icon: <Database className="h-5 w-5 mr-3 text-slate-400" /> },
    { id: "archive", name: "Archive & Restore", icon: <HardDrive className="h-5 w-5 mr-3 text-slate-400" /> },
    { id: "api", name: "API Keys & Integrations", icon: <Key className="h-5 w-5 mr-3 text-slate-400" /> },
    { id: "logs", name: "Integration Logs & Jobs", icon: <Activity className="h-5 w-5 mr-3 text-slate-400" /> },
    { id: "billing", name: "Subscription Billing", icon: <CreditCard className="h-5 w-5 mr-3 text-slate-400" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
        <p className="text-slate-500 text-sm">Manage tenant profile, system configuration, security, and billing.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-1 bg-white p-3 rounded-xl shadow-sm border border-slate-200 h-fit">
           {tabs.map((tab) => (
             <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-3 font-medium rounded-lg transition ${activeTab === tab.id ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
             >
               {tab.icon} {tab.name}
             </button>
           ))}
        </div>

        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 min-h-[500px]">
           {activeTab === "profile" && (
             <>
               <h2 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">Institutional Profile</h2>
               <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Cooperative Name</label>
                       <input type="text" disabled defaultValue="Acme Staff Cooperative" className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-500" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Registration/License Number</label>
                       <input type="text" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Primary Email</label>
                       <input type="email" className="w-full px-4 py-2 border border-slate-200 rounded-lg" />
                    </div>
                    <div>
                       <label className="block text-sm font-medium text-slate-700 mb-1">Operational Currency</label>
                       <select className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white" defaultValue="NGN">
                          <option value="NGN">NGN (₦)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                       </select>
                    </div>
                 </div>

                 <div className="pt-4 flex justify-end">
                    <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">Save Changes</button>
                 </div>
               </div>
             </>
           )}

           {activeTab === "branding" && (
              <>
                 <h2 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">White Label Branding</h2>
                 <p className="text-sm text-slate-500 mb-6">Customize the portal colors, logos, and communication templates to match your organization&apos;s brand identity. (Enterprise &amp; Pro Plans only)</p>
                 <div className="grid gap-6 md:grid-cols-2">
                    <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                        <h3 className="font-semibold text-slate-900 mb-2">Corporate Logo</h3>
                        <div className="h-24 w-full border-2 border-dashed border-slate-300 rounded mb-3 flex items-center justify-center text-slate-400 bg-white">Upload PNG/SVG</div>
                        <button className="text-blue-600 text-sm font-medium">Browse Files...</button>
                    </div>
                    <div className="border border-slate-200 rounded-lg p-5 bg-slate-50">
                        <h3 className="font-semibold text-slate-900 mb-2">Brand Colors</h3>
                        <div className="flex gap-3 mb-3">
                            <div className="h-10 w-10 rounded border border-slate-200 bg-blue-600"></div>
                            <div className="h-10 w-10 rounded border border-slate-200 bg-emerald-500"></div>
                            <div className="h-10 w-10 rounded border border-slate-200 bg-slate-900"></div>
                        </div>
                        <button className="text-blue-600 text-sm font-medium">Edit Brand Variables...</button>
                    </div>
                 </div>
              </>
           )}

           {activeTab === "security" && (
              <>
                 <h2 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">Roles & Device Management</h2>
                 <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-4 mb-6 text-sm">
                    Device Management allows you to restrict administrator login to approved office IPs and verified MAC addresses.
                 </div>
                 <div className="overflow-x-auto border border-slate-200 rounded-xl mb-6">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                       <thead className="bg-slate-50 border-b border-slate-200">
                          <tr><th className="px-4 py-3">Device Name</th><th className="px-4 py-3">Last IP</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Action</th></tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          <tr><td className="px-4 py-3">Win-Admin-HQ</td><td className="px-4 py-3 font-mono text-xs">192.168.1.45</td><td className="px-4 py-3 text-emerald-600">Trusted</td><td className="px-4 py-3 text-rose-600 cursor-pointer">Revoke</td></tr>
                          <tr><td className="px-4 py-3">MacBook-Finance</td><td className="px-4 py-3 font-mono text-xs">10.0.0.12</td><td className="px-4 py-3 text-amber-600">Pending Approval</td><td className="px-4 py-3 text-blue-600 cursor-pointer">Approve</td></tr>
                       </tbody>
                    </table>
                 </div>
                 <button className="px-4 py-2 border border-slate-200 bg-white shadow-sm rounded-lg font-medium text-sm">Configure Role Permissions</button>
              </>
           )}

           {activeTab === "data" && (
              <>
                 <h2 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">Data Migration & Import History</h2>
                 <p className="text-sm text-slate-500 mb-6">Bulk upload tools for legacy records, payroll deductions, and historical ledger entries.</p>
                 <div className="flex gap-4 mb-8">
                     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm">New Bulk Import</button>
                     <button className="px-4 py-2 border border-slate-200 bg-white rounded-lg font-medium text-sm">Download Templates</button>
                 </div>
                 <h3 className="font-semibold text-slate-900 mb-3">Recent Imports</h3>
                 <div className="border border-slate-200 rounded-xl overflow-hidden text-sm">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center hover:bg-slate-50 transition">
                       <div><p className="font-medium">August_Payroll_Deductions.csv</p><p className="text-xs text-slate-500">Aug 24, 2026 - 450 records processed</p></div>
                       <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded text-xs">Success</span>
                    </div>
                    <div className="p-4 flex justify-between items-center hover:bg-slate-50 transition">
                       <div><p className="font-medium">Legacy_Loan_Balances.xlsx</p><p className="text-xs text-slate-500">Jul 12, 2026 - 120 records processed (3 failed)</p></div>
                       <span className="text-amber-600 bg-amber-50 px-2 py-1 rounded text-xs">Partial Success</span>
                    </div>
                 </div>
              </>
           )}

           {activeTab === "archive" && (
              <>
                 <h2 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">Archive & Restore Storage</h2>
                 <p className="text-sm text-slate-500 mb-6">Manage system backups, compliance retention archives, and cold storage.</p>
                 <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-center space-y-4">
                     <HardDrive className="h-10 w-10 text-slate-400 mx-auto" />
                     <p className="font-medium text-slate-900">Next Automated Snapshot: Tonight at 02:00 AM</p>
                     <p className="text-sm text-slate-500">You currently have 14 snapshots available for point-in-time recovery spanning the last 30 days.</p>
                     <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium">Trigger Manual Backup</button>
                 </div>
              </>
           )}

           {activeTab === "api" && (
              <>
                 <h2 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">API Keys & External Integrations</h2>
                 <p className="text-sm text-slate-500 mb-6">Manage credentials to integrate the CACSMS engine with mobile apps, ERPs, or Payment Gateways.</p>
                 <div className="border border-slate-200 p-4 rounded-xl mb-6">
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <h3 className="font-bold text-slate-900">Live Production Key</h3>
                          <p className="text-xs font-mono text-slate-500 mt-1 mt-1">pk_live_8f7b...9w2x</p>
                       </div>
                       <button className="text-rose-600 text-sm font-medium px-3 py-1 bg-rose-50 rounded">Roll Key</button>
                    </div>
                    <p className="text-xs text-slate-400">Created: Jan 10, 2026 - Last Used: 2 mins ago</p>
                 </div>
                 <button className="px-4 py-2 border border-slate-200 bg-white shadow-sm rounded-lg font-medium text-sm mb-8">+ Generate Test Key</button>

                 <h3 className="font-semibold text-slate-900 mb-4">Connected Integrations</h3>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="border border-slate-200 p-4 rounded-lg flex justify-between items-center bg-slate-50">
                         <span className="font-medium">Remita Payments</span>
                         <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                     </div>
                     <div className="border border-slate-200 p-4 rounded-lg flex justify-between items-center bg-slate-50">
                         <span className="font-medium">Termii SMS Gateway</span>
                         <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                     </div>
                 </div>
              </>
           )}

           {activeTab === "logs" && (
              <>
                 <h2 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">Integration Logs & Failed Jobs Monitor</h2>
                 <p className="text-sm text-slate-500 mb-4">Review system events, external API call traces, and background worker queues.</p>
                 
                 <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-emerald-400 h-64 overflow-y-auto mb-4">
                    <p className="text-slate-500">[2026-04-21 15:44:02] INFO: System Started Job Queue Workers</p>
                    <p>[2026-04-21 15:45:12] SUCCESS: Handled Webhook from Payment Gateway (trx_99X1)</p>
                    <p className="text-rose-400">[2026-04-21 15:52:00] ERROR: Termii SMS Delivery Timeout for +234800000000</p>
                    <p>[2026-04-21 16:01:05] SUCCESS: Nightly Delinquency Check Completed (0ms)</p>
                    <p>[2026-04-21 16:15:06] INFO: Admin accessed logs view</p>
                 </div>
                 <div className="flex gap-3">
                     <button className="px-4 py-2 border border-slate-200 rounded text-sm bg-white hover:bg-slate-50 font-medium">Download Full Logs</button>
                     <button className="px-4 py-2 bg-rose-50 text-rose-600 rounded text-sm font-medium">Retry Failed Jobs (1)</button>
                 </div>
              </>
           )}

           {activeTab === "billing" && (
              <>
                 <h2 className="text-lg font-bold text-slate-900 mb-6 border-b pb-4">Subscription Billing</h2>
                 <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-6 text-white mb-8">
                     <p className="text-blue-100 text-sm font-medium mb-1">Current Plan</p>
                     <p className="text-3xl font-bold mb-4">Enterprise Edition</p>
                     <div className="flex justify-between items-center text-sm">
                         <span>Next billing cycle: Nov 1, 2026</span>
                         <span className="bg-white/20 px-3 py-1 rounded-full">₦150,000 / month</span>
                     </div>
                 </div>

                 <h3 className="font-semibold text-slate-900 mb-4">Billing History</h3>
                 <div className="border border-slate-200 rounded-xl overflow-hidden text-sm">
                    <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                       <div><p className="font-medium">Oct 1, 2026</p><p className="text-xs text-slate-500">Invoice #INV-202610-045</p></div>
                       <div className="flex items-center gap-4">
                           <span>₦150,000</span>
                           <span className="text-blue-600 cursor-pointer">PDF</span>
                       </div>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                       <div><p className="font-medium">Sep 1, 2026</p><p className="text-xs text-slate-500">Invoice #INV-202609-045</p></div>
                       <div className="flex items-center gap-4">
                           <span>₦150,000</span>
                           <span className="text-blue-600 cursor-pointer">PDF</span>
                       </div>
                    </div>
                 </div>
              </>
           )}

        </div>
      </div>
    </div>
  )
}
