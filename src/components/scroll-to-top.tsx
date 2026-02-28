"use client";

import { ArrowRight } from "lucide-react";

export function ScrollToTop({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 bg-green hover:bg-green-dark text-black font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 cursor-pointer"
    >
      {label} <ArrowRight size={20} />
    </button>
  );
}
