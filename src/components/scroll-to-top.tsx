"use client";

import { ArrowRight } from "lucide-react";

export function ScrollToTop({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center justify-center gap-2 border border-ink/30 hover:border-green hover:text-green text-ink font-semibold py-4 px-7 rounded-sm tracking-wide transition-all cursor-pointer"
    >
      {label} <ArrowRight size={20} />
    </button>
  );
}
