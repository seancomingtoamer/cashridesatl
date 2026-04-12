"use client";

import { useState } from "react";
import { Lock, AlertCircle } from "lucide-react";

export function AuthGate({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/dispatch/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onAuth();
      } else {
        setError("Invalid password");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="text-green" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">Dispatch Dashboard</h1>
          <p className="text-gray-400 text-sm mt-1">Cash Rides ATL</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter dispatch password"
            className="w-full bg-[#1f1f1f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green transition-colors text-center"
            autoFocus
          />
          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm justify-center">
              <AlertCircle size={14} /> {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-green hover:bg-green-dark disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-colors"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}
