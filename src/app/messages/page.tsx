"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profil from "@/api/services/portfolio.service";
import {
  Send,
  CheckCircle,
  AlertCircle,
  AppWindow,
  User,
  Mail,
  MessageSquare,
  Clock,
  Shield,
} from "lucide-react";
import Loader from "@/components/ui/loader";

export default function MessagePage() {
  const [form, setForm] = useState({
    author: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [rateLimitError, setRateLimitError] = useState(false);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  // Rate limit constants
  const RATE_LIMIT_MINUTES = 30; // 30 daqiqa
  const STORAGE_KEY = "last_message_time";

  const isBrowser = typeof window !== "undefined";
  // Check if user can send message
  const canSendMessage = (): {
    allowed: boolean;
    remainingMinutes?: number;
  } => {
    const lastMessageTime = isBrowser
      ? localStorage.getItem(STORAGE_KEY)
      : null;

    if (!lastMessageTime) {
      return { allowed: true };
    }

    const lastTime = parseInt(lastMessageTime, 10);
    const currentTime = Date.now();
    const minutesPassed = (currentTime - lastTime) / (1000 * 60);

    if (minutesPassed >= RATE_LIMIT_MINUTES) {
      return { allowed: true };
    }

    const remainingMinutes = Math.ceil(RATE_LIMIT_MINUTES - minutesPassed);
    return { allowed: false, remainingMinutes };
  };

  // Update remaining time every second
  useEffect(() => {
    const updateRemainingTime = () => {
      const { allowed, remainingMinutes } = canSendMessage();
      if (!allowed && remainingMinutes) {
        setRemainingTime(remainingMinutes);
        setRateLimitError(true);
      } else {
        setRemainingTime(null);
        setRateLimitError(false);
      }
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Clear success/error messages after 3 seconds
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (success || error) {
      timeout = setTimeout(() => {
        setSuccess(false);
        setError(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [success, error]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveMessageTime = () => {
    const currentTime = Date.now();
    localStorage.setItem(STORAGE_KEY, currentTime.toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check rate limit first
    const { allowed, remainingMinutes } = canSendMessage();

    if (!allowed) {
      setRateLimitError(true);
      setRemainingTime(remainingMinutes || null);
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError(false);
    setRateLimitError(false);

    try {
      const messageData = await profil.sendMessage(form);
      setSuccess(true);
      console.log(messageData);

      // Save current time to localStorage after successful send
      saveMessageTime();

      // Reset form
      setForm({ author: "", email: "", message: "" });

      // Update remaining time display
      const { allowed: nowAllowed, remainingMinutes: nowRemaining } =
        canSendMessage();
      if (!nowAllowed && nowRemaining) {
        setRemainingTime(nowRemaining);
        setRateLimitError(true);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Format remaining time
  const formatRemainingTime = (minutes: number): string => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
    return `${minutes} minutes`;
  };

  if (loading) {
    return <Loader fullScreen={true} text="Message sneding..." />;
  }

  return (
    <section className="h-full flex flex-col px-4 sm:px-6 py-4 sm:py-8 overflow-hidden">
      <div className="max-w-xl w-full mx-auto flex-1 flex flex-col min-h-0">
        {/* macOS Style Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 sm:mb-6 flex-shrink-0"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs text-white/40 font-medium">
              Messages.app
            </span>
            <div className="w-12" />
          </div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white/90 tracking-tight">
              Contact Me
            </h1>
            <p className="text-white/40 text-xs sm:text-sm mt-0.5 sm:mt-1 flex items-center justify-center gap-1">
              <Shield size={12} />
              Rate limit: {RATE_LIMIT_MINUTES} minutes between messages
            </p>
          </div>
        </motion.div>

        {/* Message Form Card */}
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
              {/* Rate Limit Warning Banner */}
              {rateLimitError && remainingTime && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
                >
                  <div className="flex items-center gap-2 text-yellow-400 text-xs">
                    <Clock size={14} />
                    <span>
                      Rate limit active — please wait{" "}
                      {formatRemainingTime(remainingTime)} before sending
                      another message
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Name Input */}
                <div className="group relative">
                  <label className="block text-white/50 text-xs mb-1.5 flex items-center gap-1.5">
                    <User size={12} />
                    Your name
                  </label>
                  <input
                    type="text"
                    name="author"
                    placeholder="John Doe"
                    value={form.author}
                    onChange={handleChange}
                    required
                    disabled={rateLimitError}
                    className="w-full p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/30 focus:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email Input */}
                <div className="group relative">
                  <label className="block text-white/50 text-xs mb-1.5 flex items-center gap-1.5">
                    <Mail size={12} />
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="hello@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={rateLimitError}
                    className="w-full p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/30 focus:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Message Input */}
                <div className="group relative">
                  <label className="block text-white/50 text-xs mb-1.5 flex items-center gap-1.5">
                    <MessageSquare size={12} />
                    Your message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    disabled={rateLimitError}
                    className="w-full p-2.5 sm:p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:border-white/30 focus:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading || rateLimitError}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full py-2.5 sm:p-3 rounded-xl font-semibold text-sm
                    transition-all duration-200
                    flex items-center justify-center gap-2
                    ${
                      loading || rateLimitError
                        ? "bg-white/20 text-white/50 cursor-not-allowed"
                        : "bg-white text-black hover:bg-white/90"
                    }
                  `}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : rateLimitError && remainingTime ? (
                    <>
                      <Clock size={14} />
                      Wait {formatRemainingTime(remainingTime)}
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle size={16} />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {/* Success/Error Messages */}
                <AnimatePresence>
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 text-green-400 text-xs bg-green-400/10 rounded-lg p-2"
                    >
                      <CheckCircle size={14} />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2 text-red-400 text-xs bg-red-400/10 rounded-lg p-2"
                    >
                      <AlertCircle size={14} />
                      Failed to send message. Please try again.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Last message time indicator */}
              {!rateLimitError &&
                isBrowser &&
                localStorage.getItem(STORAGE_KEY) && (
                  <div className="mt-4 pt-3 border-t border-white/10">
                    <div className="flex justify-center text-[10px] text-white/20">
                      ✓ Message sent recently — next message available in{" "}
                      {RATE_LIMIT_MINUTES} minutes
                    </div>
                  </div>
                )}

              {/* Decorative Line */}
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex justify-center gap-2 text-[10px] text-white/20">
                  <span>✉️</span>
                  <span>•</span>
                  <span>💬</span>
                  <span>•</span>
                  <span>🛡️</span>
                  <span>•</span>
                  <span>⏱️</span>
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
              <span>Contact form</span>
              <span>•</span>
              <span>Rate limited: {RATE_LIMIT_MINUTES}m</span>
            </div>
            <div className="flex items-center gap-1">
              <AppWindow size={10} />
              <span className="hidden xs:inline">Messages.app</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
