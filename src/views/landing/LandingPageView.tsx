"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ShieldCheck, Users, Banknote, ArrowRight } from "lucide-react";

export default function LandingPageView() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="px-8 py-6 flex items-center justify-between border-b border-slate-100 bg-white/90 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="text-emerald-600 h-9 w-9" />
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">Cacsms Coops</span>
        </div>
        <div className="flex space-x-4">
          <Link href="/login" className="px-5 py-2 text-base font-semibold text-emerald-700 hover:text-white hover:bg-emerald-600 border border-emerald-600 rounded-lg transition-colors">Log in</Link>
          <Link href="/register" className="px-5 py-2 text-base font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow transition-colors">Get Started</Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4 bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden">
        {/* Animated SVG background */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-70 z-0" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1440 560" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="1200" cy="100" r="200" fill="#10B981" fillOpacity="0.10" />
            <circle cx="200" cy="500" r="200" fill="#2563EB" fillOpacity="0.09" />
            <ellipse cx="720" cy="300" rx="400" ry="120" fill="#f0fdfa" fillOpacity="0.7" />
          </svg>
        </div>
        <section className="w-full max-w-5xl py-32 relative z-10 flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 drop-shadow-xl"
          >
            Empowering <span className="text-emerald-600">Cooperatives</span><br />for the Next Generation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-slate-700 mb-12 max-w-2xl mx-auto"
          >
            All-in-one platform to digitize, manage, and grow your cooperative society. Secure, scalable, and future-ready.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/register" className="inline-flex items-center px-12 py-5 text-xl font-bold bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-2xl">
              Get Started Now <ArrowRight className="ml-4 h-7 w-7" />
            </Link>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="w-full max-w-6xl grid md:grid-cols-3 gap-10 py-20 relative z-10">
          <div className="flex flex-col items-center text-center bg-white/95 rounded-2xl shadow-lg p-10 border border-slate-100 hover:shadow-2xl transition">
            <Users className="h-10 w-10 text-emerald-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Membership Mastery</h3>
            <p className="text-slate-600 text-base">Comprehensive lifecycle management from onboarding to legacy members, with automated workflows.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-white/95 rounded-2xl shadow-lg p-10 border border-slate-100 hover:shadow-2xl transition">
            <Banknote className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Treasury & Credit</h3>
            <p className="text-slate-600 text-base">Track savings, shares, dues, and loans with real-time analytics and powerful admin tools.</p>
          </div>
          <div className="flex flex-col items-center text-center bg-white/95 rounded-2xl shadow-lg p-10 border border-slate-100 hover:shadow-2xl transition">
            <ShieldCheck className="h-10 w-10 text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Governance & Audit</h3>
            <p className="text-slate-600 text-base">Transparent meetings, resolutions, and audit trails for compliance and trust.</p>
          </div>
        </section>

        {/* Trust/Testimonials Section */}
        <section className="w-full max-w-4xl mx-auto py-12 relative z-10">
          <div className="bg-white/95 rounded-xl shadow-lg p-10 border border-slate-100 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-left">
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Trusted by forward-thinking cooperatives</h4>
              <p className="text-slate-600 text-lg italic">“Cacsms Coops has transformed our operations, making everything seamless, secure, and future-proof.”</p>
              <span className="block mt-4 text-emerald-700 font-bold">— Cooperative Society Leader</span>
            </div>
            <div className="flex-shrink-0">
              <ShieldCheck className="h-16 w-16 text-emerald-600" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-base mt-10 border-t border-slate-800">
        <p>© 2026 Cacsms Coops Platform. All rights reserved.</p>
        <p className="mt-2 text-slate-500">
          Developed and Powered by <a href="https://www.cacsms.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-medium">Cacsms Limited</a>
        </p>
      </footer>
    </div>
  );
}
