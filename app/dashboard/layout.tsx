"use client";
import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, ShieldCheck, Loader2, Home, Users, Banknote, Settings, Menu, MessageSquare, X, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/firebase";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
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

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800 text-white">
          <ShieldCheck className="h-6 w-6 text-blue-500 mr-2" />
          <span className="font-bold tracking-wide">CACSMS</span>
        </div>
        
        <div className="p-4 border-b border-slate-800">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">My Coops</p>
          <div className="bg-slate-800 rounded px-3 py-2 text-sm text-white font-medium truncate">
            {/* Ideally fetched from user profile */}
            Admin Workspace
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
