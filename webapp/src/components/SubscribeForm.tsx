"use client";

import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "You’re in. Check your inbox.");
        setEmail("");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-3 shadow-[0_0_40px_rgba(168,85,247,0.18)] backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="flex-1 rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-white placeholder-zinc-500 focus:border-purple-400/70 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 font-semibold text-white transition-all hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Joining..." : "Join Free"}
        </button>
      </form>
      <p className="mt-2 text-xs text-zinc-500">No spam. Weekly high-signal breakdowns only.</p>
      {message && <p className="mt-2 text-sm text-zinc-300">{message}</p>}
    </div>
  );
}
