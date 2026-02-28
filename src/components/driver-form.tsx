"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const AREAS = [
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
];

export function DriverForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    areasServed: [] as string[],
    vehicleType: "",
    availableHours: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function toggleArea(area: string) {
    setForm((prev) => ({
      ...prev,
      areasServed: prev.areasServed.includes(area)
        ? prev.areasServed.filter((a) => a !== area)
        : [...prev.areasServed, area],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.areasServed.length === 0) {
      setErrorMsg("Select at least one area you serve.");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(
        "https://seanpro.app.n8n.cloud/webhook/cashrides-driver",
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
          Check your email for next steps and your invite to the community.
        </p>
        <p className="text-green text-sm font-medium">
          Want verified status + ride dispatch? Upgrade info is in your welcome email.
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
            Join the Driver Network
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
            Vehicle Type
          </label>
          <select
            required
            value={form.vehicleType}
            onChange={(e) => setForm({ ...form, vehicleType: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green/50 transition-colors"
          >
            <option value="">Select vehicle</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Van">Van / Minivan</option>
            <option value="Truck">Truck</option>
            <option value="Luxury">Luxury</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Areas You Serve
          </label>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => toggleArea(area)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                  form.areasServed.includes(area)
                    ? "bg-green/20 border-green/40 text-green"
                    : "bg-[#0a0a0a] border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            Available Hours
          </label>
          <select
            required
            value={form.availableHours}
            onChange={(e) =>
              setForm({ ...form, availableHours: e.target.value })
            }
            className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green/50 transition-colors"
          >
            <option value="">When are you available?</option>
            <option value="Mornings (6am-12pm)">Mornings (6am-12pm)</option>
            <option value="Afternoons (12pm-6pm)">Afternoons (12pm-6pm)</option>
            <option value="Evenings (6pm-12am)">Evenings (6pm-12am)</option>
            <option value="Late Night (12am-6am)">Late Night (12am-6am)</option>
            <option value="Weekdays Only">Weekdays Only</option>
            <option value="Weekends Only">Weekends Only</option>
            <option value="Flexible / Anytime">Flexible / Anytime</option>
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
          You&apos;ll get a welcome email with the Telegram invite and info about upgrading to Verified Driver status.
        </p>
      </div>
    </form>
  );
}
