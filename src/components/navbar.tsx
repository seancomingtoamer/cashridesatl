"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Cash Rides ATL"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-white">
              Cash Rides <span className="text-green">ATL</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/drivers"
              className="text-gray-400 hover:text-green transition-colors font-medium"
            >
              Drivers
            </Link>
            <Link
              href="/riders"
              className="text-gray-400 hover:text-green transition-colors font-medium"
            >
              Riders
            </Link>
            <Link
              href="/about"
              className="text-gray-400 hover:text-green transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/drivers"
              className="bg-green hover:bg-green-dark text-black font-bold px-5 py-2 rounded-lg transition-colors"
            >
              Join Now
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 border-t border-white/10 mt-2">
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/drivers"
                className="text-gray-400 hover:text-green transition-colors font-medium px-2"
                onClick={() => setOpen(false)}
              >
                Drivers
              </Link>
              <Link
                href="/riders"
                className="text-gray-400 hover:text-green transition-colors font-medium px-2"
                onClick={() => setOpen(false)}
              >
                Riders
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-green transition-colors font-medium px-2"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                href="/drivers"
                className="bg-green hover:bg-green-dark text-black font-bold px-5 py-2 rounded-lg transition-colors text-center"
                onClick={() => setOpen(false)}
              >
                Join Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
