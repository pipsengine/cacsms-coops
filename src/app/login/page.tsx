"use client";
import { useAuth } from "@/infrastructure/auth/auth-context";
import { auth } from "@/infrastructure/firebase/client";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Loader2, Mail, Lock, Chrome, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register" | "reset">("login");
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (user) {
    router.push("/dashboard");
    return null;
  }

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push("/onboarding");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during sign in.");
      setIsLoggingIn(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError(null);

    try {
      if (authMode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/dashboard");
      } else if (authMode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/onboarding");
      } else {
        await sendPasswordResetEmail(auth, email);
        setError("Password reset link sent to your email.");
        setAuthMode("login");
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-50 p-3 rounded-2xl">
              <ShieldCheck className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {authMode === "login" ? "Welcome back" : authMode === "register" ? "Create account" : "Reset password"}
          </h2>
          <p className="text-slate-500 mt-1">
            {authMode === "login" ? "Access your cooperative dashboard" : authMode === "register" ? "Join the platform today" : "We'll send you a recovery link"}
          </p>
        </div>

        {error && (
          <div className={`mb-6 p-3 rounded-lg text-sm border ${error.includes("sent") ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <AnimatePresence mode="wait">
            {authMode === "register" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
                    placeholder="John Doe"
                  />
                  <ArrowRight className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
                placeholder="name@company.com"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            </div>
          </div>

          {authMode !== "reset" && (
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium text-slate-700">Password</label>
                {authMode === "login" && (
                  <button 
                    type="button"
                    onClick={() => setAuthMode("reset")}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200 disabled:opacity-50"
          >
            {isLoggingIn ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : null}
            {authMode === "login" ? "Sign In" : authMode === "register" ? "Create Account" : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400">Or continue with</span>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoggingIn}
          className="mt-6 w-full flex items-center justify-center py-3 px-4 border border-slate-200 rounded-xl bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
        >
          <Chrome className="h-5 w-5 mr-3 text-blue-600" />
          Google Workspace
        </button>

        <p className="mt-8 text-center text-sm text-slate-500">
          {authMode === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => setAuthMode("register")} className="text-blue-600 font-bold hover:underline">Sign up</button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setAuthMode("login")} className="text-blue-600 font-bold hover:underline">Sign in</button>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}

