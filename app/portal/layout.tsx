"use client";
import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { LogOut, Home, Key, Loader2, ArrowRight, Wallet, UserCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/firebase";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-emerald-600" /></div>;
  }

  if (!user) {
    router.push("/login?redirect=/portal");
    return null;
  }

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  const navItems = [
     { name: "My Account", href: "/portal", icon: Home },
     { name: "Loans", href: "/portal/loans", icon: Wallet },
     { name: "Support", href: "/portal/support", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
       <header className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                 <div className="h-8 w-8 bg-emerald-600 rounded flex items-center justify-center text-white font-bold text-lg leading-none">
                   C
                 </div>
                 <span className="font-bold text-slate-900 tracking-tight text-lg">MyCoop</span>
              </div>
              <div className="flex items-center space-x-6">
                 {navItems.map(item => (
                    <Link key={item.name} href={item.href} className={`text-sm font-medium transition ${pathname === item.href ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'}`}>
                       {item.name}
                    </Link>
                 ))}
                 <div className="h-6 w-px bg-slate-200 mx-2"></div>
                 <button onClick={handleLogout} className="text-slate-500 hover:text-slate-900 flex items-center transition">
                    <LogOut className="h-5 w-5" />
                 </button>
              </div>
          </div>
       </header>

       <main className="flex-1 py-10 px-4">
          <div className="max-w-6xl mx-auto">
             {children}
          </div>
       </main>
    </div>
  );
}
