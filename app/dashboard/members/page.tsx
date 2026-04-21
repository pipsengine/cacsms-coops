"use client";
import { Plus, Search, Filter, Loader2, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMembersBySociety } from "@/app/actions/members";
import { getOrCreateDefaultSociety } from "@/app/actions/context";
import { useAuth } from "@/lib/auth-context";

export default function MembersPage() {
  const { user } = useAuth();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    async function loadData() {
      if (!user) return;
      try {
        const societyId = await getOrCreateDefaultSociety(user.uid, user.email || "test@local", user.displayName || "Testing");
        const list = await getMembersBySociety(societyId);
        
        if (mounted) {
           setMembers(list);
           setLoading(false);
        }
      } catch (e) {
         console.error(e);
         if(mounted) setLoading(false);
      }
    }
    
    loadData();
    return () => { mounted = false; };
  }, [user]);

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Directory</h1>
          <p className="text-slate-500 text-sm">Manage members, update profiles, and track statuses.</p>
        </div>
        
        <Link 
          href="/dashboard/members/new"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Member
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50">
           <div className="relative w-full sm:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Search names, IDs, email..."
               className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
             />
           </div>
           <button className="inline-flex items-center px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium bg-white hover:bg-slate-50 transition w-full sm:w-auto text-slate-700">
             <Filter className="h-4 w-4 mr-2 text-slate-400" />
             Filters
           </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-500 font-medium border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Member Info</th>
                <th className="px-6 py-4">System ID</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {members.length === 0 ? (
                 <tr>
                   <td colSpan={5} className="px-6 py-12 text-center">
                     <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-slate-50 border border-slate-100 mb-3 text-slate-400">
                       <UserIcon className="h-5 w-5" />
                     </div>
                     <h3 className="text-slate-900 font-medium mb-1">No members found</h3>
                     <p className="text-slate-500 text-sm">Get started by registering a new member.</p>
                   </td>
                 </tr>
               ) : (
                 members.map(member => (
                    <tr key={member.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                         <div className="font-medium text-slate-900 flex items-center">
                            <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center mr-3 text-xs border border-blue-200">
                               {member.user?.firstName?.charAt(0)}{member.user?.lastName?.charAt(0)}
                            </div>
                            {member.user?.firstName} {member.user?.lastName}
                         </div>
                         <div className="text-xs text-slate-500 mt-1 ml-11">{member.user?.email || member.user?.phoneNumber}</div>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-600">{member.memberNumber || "PENDING"}</td>
                      <td className="px-6 py-4"><span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-700 rounded border border-slate-200">{member.role}</span></td>
                      <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-2 py-1 rounded border ${
                              member.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                              member.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-rose-50 text-rose-700 border-rose-200'
                          }`}>
                             {member.status}
                          </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                         {new Date(member.joinedAt).toLocaleDateString()}
                      </td>
                    </tr>
                 ))
               )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
