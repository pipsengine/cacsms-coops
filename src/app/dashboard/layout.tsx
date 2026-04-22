"use client";
import { useAuth } from "@/infrastructure/auth/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, ShieldCheck, Loader2, Home, Users, Banknote, Settings, Menu, MessageSquare, X, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/infrastructure/firebase/client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isSuperAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  const nav = [
    { name: "Overview", href: "/dashboard", icon: Home },
    { name: "Members", href: "/dashboard/members", icon: Users },
    { name: "Treasury", href: "/dashboard/treasury", icon: Banknote },
    { name: "Loans & Credit", href: "/dashboard/loans", icon: Banknote },
    { name: "Accounting", href: "/dashboard/accounting", icon: Banknote },
    { name: "Governance", href: "/dashboard/governance", icon: Users },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Support", href: "/dashboard/support", icon: MessageSquare },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  if (isSuperAdmin) {
    // Add Platform Management for Global Admins
    nav.unshift({ name: "Platform Admin", href: "/dashboard/admin", icon: ShieldCheck });
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 text-white">
          <ShieldCheck className={`h-6 w-6 mr-2 ${isSuperAdmin ? "text-amber-500" : "text-blue-500"}`} />
          <span className="font-bold tracking-wide">CACSMS</span>
          {isSuperAdmin && (
            <span className="ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">PRO</span>
          )}
        </div>
        
        <div className="p-4 border-b border-slate-800">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            {isSuperAdmin ? "Global Control" : "My Coops"}
          </p>
          <div className={`rounded px-3 py-2 text-sm font-medium truncate ${isSuperAdmin ? "bg-amber-900/20 text-amber-500 border border-amber-500/10" : "bg-slate-800 text-white"}`}>
            {isSuperAdmin ? "All Societies" : "Admin Workspace"}
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className={`h-5 w-5 mr-3 ${isActive ? "text-white" : "text-slate-400"}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="mb-4 px-3 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            Powered by <br/>
            <a href="https://www.cacsms.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400">Cacsms Limited</a>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="md:hidden">
            <Menu className="h-6 w-6 text-slate-600" />
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-3">
             <div className="text-sm font-medium text-slate-700 hidden sm:block">{user.displayName || user.email}</div>
             {user.photoURL ? (
               <Image src={user.photoURL} alt="Avatar" width={32} height={32} className="h-8 w-8 rounded-full border border-slate-200" referrerPolicy="no-referrer" />
             ) : (
               <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                 {user.email?.charAt(0).toUpperCase()}
               </div>
             )}
          </div>
        </header>
        <div className="p-6 md:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
