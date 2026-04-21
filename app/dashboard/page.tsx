import { Activity, Users, PiggyBank, Target } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Cooperative Dashboard</h1>
          <p className="text-slate-500">Welcome back. Here is the overview of your society.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <div className="bg-blue-50 p-3 rounded-lg"><Users className="h-6 w-6 text-blue-600" /></div>
             <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Members</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">2,450</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <div className="bg-emerald-50 p-3 rounded-lg"><PiggyBank className="h-6 w-6 text-emerald-600" /></div>
             <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+5.2%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Savings Pool</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">₦450,200</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <div className="bg-purple-50 p-3 rounded-lg"><Activity className="h-6 w-6 text-purple-600" /></div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Active Loans</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">1,120</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-4">
             <div className="bg-orange-50 p-3 rounded-lg"><Target className="h-6 w-6 text-orange-600" /></div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Delinquency Rate</h3>
          <p className="text-3xl font-bold text-slate-900 mt-1">1.4%</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h2>
        <div className="text-slate-500 py-8 text-center text-sm border-2 border-dashed border-slate-100 rounded-lg">
          No recent activity to show yet. Live data will populate here.
        </div>
      </div>
    </div>
  );
}
