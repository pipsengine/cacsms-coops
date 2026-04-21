"use client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getMembersBySociety } from "@/server/actions/members";
import { getOrCreateDefaultSociety } from "@/server/actions/context";
import { useAuth } from "@/infrastructure/auth/auth-context";
import MembersListView from "@/views/members/MembersListView";

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

  return <MembersListView members={members} />;
}
