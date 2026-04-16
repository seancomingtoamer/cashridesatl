"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date()
        .toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase()
    );
  }, []);

  const links = [
    { href: "/drivers", label: "Drivers" },
    { href: "/drivers/meet", label: "The Roster" },
    { href: "/riders", label: "Riders" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-[var(--rule)]">
      {/* Masthead strip */}
      <div className="hidden sm:block border-b border-[var(--rule)]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <span className="caption">VOL. I &middot; ISSUE 01</span>
          <span className="caption caption-green">
            THE ATLANTA DISPATCH BULLETIN
          </span>
          <span className="caption">{today}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="Cash Rides ATL"
              width={40}
              height={40}
              className="rounded-sm border border-[var(--rule)]"
            />
            <span className="font-display text-xl tracking-tight text-ink group-hover:text-green transition-colors">
              Cash Rides <span className="text-green italic">ATL</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-ink-soft hover:text-green transition-colors font-medium tracking-wide"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/drivers/verify"
              className="caption caption-green border border-green px-3 py-1.5 rounded-sm hover:bg-green hover:text-black transition-colors"
            >
              Get Verified
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-ink"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 border-t border-[var(--rule)] mt-2">
            <div className="flex flex-col gap-3 pt-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-ink-soft hover:text-green transition-colors font-medium px-2"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/drivers/verify"
                className="caption caption-green border border-green px-3 py-2 rounded-sm text-center mx-2 mt-2"
                onClick={() => setOpen(false)}
              >
                Get Verified
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
