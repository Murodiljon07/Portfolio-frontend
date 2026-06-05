"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Shield,
  AppWindow,
  KeyRound,
  AlertCircle,
  CheckCircle,
  Fingerprint,
} from "lucide-react";
import { auth } from "@/api/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    secondPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setErrorMessage("");

    try {
      const data = await auth.login(form);

      router.push("/admin");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full flex flex-col px-4 sm:px-6 py-4 sm:py-8 overflow-hidden">
      <div className="max-w-md w-full mx-auto flex-1 flex flex-col min-h-0">
        {/* macOS Style Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6 flex-shrink-0"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs text-white/40 font-medium">
              Login.app
            </span>
            <div className="w-12" />
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                <Shield size={28} className="text-white/70" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90 tracking-tight">
              Admin Access
            </h1>
            <p className="text-white/40 text-xs sm:text-sm mt-0.5 sm:mt-1">
              Enter your credentials to continue
            </p>
          </div>
        </motion.div>

        {/* Login Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 flex items-center justify-center pb-4"
        >
          <div className="relative w-full">
            {/* Card Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-white/0 via-white/5 to-white/0 rounded-2xl blur-xl" />

            {/* Main Card */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-7">
              {/* Error Banner */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20"
                  >
                    <div className="flex items-center gap-2 text-red-400 text-xs">
                      <AlertCircle size={14} />
                      <span>{errorMessage}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Email Input */}
                <div className="group relative">
                  <label className="block text-white/50 text-xs mb-1.5 flex items-center gap-1.5">
                    <Mail size={12} />
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="admin@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/30 focus:bg-white/10"
                  />
                </div>

                {/* Password Input */}
                <div className="group relative">
                  <label className="block text-white/50 text-xs mb-1.5 flex items-center gap-1.5">
                    <Lock size={12} />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={handleChange}
                      required
                      autoComplete="current-password"
                      className="w-full p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/30 focus:bg-white/10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Second Password Input */}
                <div className="group relative">
                  <label className="block text-white/50 text-xs mb-1.5 flex items-center gap-1.5">
                    <KeyRound size={12} />
                    Second Password (2FA)
                  </label>
                  <div className="relative">
                    <input
                      type={showSecondPassword ? "text" : "password"}
                      name="secondPassword"
                      placeholder="••••••••"
                      value={form.secondPassword}
                      onChange={handleChange}
                      required
                      className="w-full p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/30 focus:bg-white/10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecondPassword(!showSecondPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition"
                    >
                      {showSecondPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full py-2.5 sm:p-3 rounded-xl font-semibold text-sm
                    transition-all duration-200
                    flex items-center justify-center gap-2
                    ${
                      loading
                        ? "bg-white/20 text-white/50 cursor-not-allowed"
                        : "bg-white text-black hover:bg-white/90"
                    }
                  `}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Shield size={14} />
                      Login
                    </>
                  )}
                </motion.button>
              </form>

              {/* Security Info */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="flex justify-center gap-3 text-[10px] text-white/20">
                  <div className="flex items-center gap-1">
                    <Fingerprint size={10} />
                    <span>Secure connection</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Shield size={10} />
                    <span>2FA enabled</span>
                  </div>
                </div>
              </div>

              {/* Decorative Line */}
              <div className="mt-3 pt-2 border-t border-white/5">
                <div className="flex justify-center gap-2 text-[10px] text-white/20">
                  <span>🔐</span>
                  <span>•</span>
                  <span>🛡️</span>
                  <span>•</span>
                  <span>⚡</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* macOS Style Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-shrink-0 mt-3 pt-2 border-t border-white/5"
        >
          <div className="flex justify-between items-center text-[9px] sm:text-xs text-white/30">
            <div className="flex items-center gap-2 sm:gap-3">
              <span>Admin portal</span>
              <span>•</span>
              <span>Secure login</span>
            </div>
            <div className="flex items-center gap-1">
              <AppWindow size={10} />
              <span className="hidden xs:inline">Login.app</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
