"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { ShieldCheck, Users, Banknote, ArrowRight } from "lucide-react";

export default function LandingPageView() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b bg-white">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="text-blue-600 h-8 w-8" />
          <span className="text-xl font-bold text-slate-800 tracking-tight">Cacsms Coops</span>
        </div>
        <div className="flex space-x-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Log in</Link>
          <Link href="/login" className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Get Started</Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            The Operating System for <br className="hidden md:block"/> Modern Cooperatives
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
          >
            Digitize your cooperative society workflow. Manage savings, loans, and governance in one secure, future-ready multi-tenant platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/login" className="inline-flex items-center px-8 py-3 text-lg font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
              Start your Cooperative <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </section>

        <section className="bg-white py-20 border-t">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-blue-50 flex items-center justify-center rounded-2xl mb-6">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Membership Mastery</h3>
              <p className="text-slate-600 text-base">Comprehensive lifecycle management from probational members to retired legacy members.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-emerald-50 flex items-center justify-center rounded-2xl mb-6">
                <Banknote className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Treasury & Credit</h3>
              <p className="text-slate-600 text-base">Accurately track savings, shares, dues, levies and powerfully administer loan portfolios.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-indigo-50 flex items-center justify-center rounded-2xl mb-6">
                <ShieldCheck className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Governance & Audit</h3>
              <p className="text-slate-600 text-base">Ensure zero-trust transparency with robust meeting records, resolutions, and audit trails.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>© 2026 Cacsms Coops Platform. All rights reserved.</p>
        <p className="mt-2 text-slate-500">
          Developed and Powered by <a href="https://www.cacsms.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-400 font-medium">Cacsms Limited</a>
        </p>
      </footer>
    </div>
  );
}
