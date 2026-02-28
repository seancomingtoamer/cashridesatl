"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const NEIGHBORHOODS = [
  "Downtown / Midtown",
  "Buckhead",
  "West End / SWATS",
  "East Atlanta / EAV",
  "College Park / East Point",
  "Decatur / Stone Mountain",
  "Sandy Springs / Dunwoody",
  "Marietta / Smyrna",
  "South Fulton",
  "Airport (ATL)",
  "Other",
];

export function RiderForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    neighborhood: "",
    frequency: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(
        "https://seanpro.app.n8n.cloud/webhook/cashrides-rider",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Signup failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-gradient-to-b from-[#1f1f1f] to-[#161616] rounded-3xl border border-green/20 p-10 text-center shadow-2xl shadow-green/5">
        <CheckCircle className="text-green mx-auto mb-4" size={48} />
        <h3 className="text-2xl font-bold text-white mb-3">
          You&apos;re In!
        </h3>
        <p className="text-gray-300 mb-2">
          Check your email for the Telegram group invite and how to request your first ride.
        </p>
        <p className="text-green text-sm font-medium">
          Welcome to Cash Rides ATL.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-b from-[#1f1f1f] to-[#161616] rounded-3xl border border-green/20 overflow-hidden shadow-2xl shadow-green/5"
    >
      <div className="bg-green/10 px-8 py-4 border-b border-green/20">
        <div className="flex items-center justify-between">
          <span className="text-green font-bold text-sm uppercase tracking-wider">
            Sign Up for Rides
          </span>
          <span className="bg-green text-black text-xs font-bold px-3 py-1 rounded-full">
            FREE
          </span>
        </div>
      </div>

      <div className="px-8 py-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green/50 transition-colors"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green/50 transition-colors"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green/50 transition-colors"
            placeholder="(404) 555-1234"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Your Neighborhood
          </label>
          <select
            required
            value={form.neighborhood}
            onChange={(e) => setForm({ ...form, neighborhood: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green/50 transition-colors"
          >
            <option value="">Where are you located?</option>
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            How Often Do You Need Rides?
          </label>
          <select
            required
            value={form.frequency}
            onChange={(e) => setForm({ ...form, frequency: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green/50 transition-colors"
          >
            <option value="">Select frequency</option>
            <option value="Daily">Daily</option>
            <option value="Few times a week">Few times a week</option>
            <option value="Weekly">Weekly</option>
            <option value="A few times a month">A few times a month</option>
            <option value="Occasionally">Occasionally</option>
          </select>
        </div>

        {errorMsg && (
          <p className="text-red-400 text-sm">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-green hover:bg-green-dark text-black font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Signing Up...
            </>
          ) : (
            "Sign Up — Free"
          )}
        </button>

        <p className="text-gray-400 text-xs text-center">
          You&apos;ll get a welcome email with the Telegram group invite and how to request rides.
        </p>
      </div>
    </form>
  );
}
