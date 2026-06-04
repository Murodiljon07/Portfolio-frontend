"use client";

import { useState } from "react";
import profil from "@/api/services/portfolio.service";

export default function MessagePage() {
  const [form, setForm] = useState({
    author: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const messageData = await profil.sendMessage(form);

      setSuccess(true);
      console.log(messageData);

      setForm({ author: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full flex items-center justify-center px-6">
      <div className="w-full max-w-xl backdrop-blur-md bg-white/10 border border-white/10 rounded-3xl p-8">
        <h1 className="text-4xl font-black text-white text-center mb-8">
          Contact Me
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.author}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 text-white outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white/10 text-white outline-none"
          />

          <textarea
            name="message"
            placeholder="Your message..."
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full p-3 rounded-xl bg-white/10 text-white outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3
              rounded-xl
              bg-white
              text-black
              font-bold
              hover:scale-[1.02]
              transition
              disabled:opacity-50
            "
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-green-400 text-center">
              Message sent successfully ✅
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
