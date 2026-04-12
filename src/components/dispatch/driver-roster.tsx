"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { DriverCard } from "./driver-card";
import type { AirtableRecord } from "@/lib/airtable";

interface DriverRosterProps {
  drivers: AirtableRecord[];
}

export function DriverRoster({ drivers }: DriverRosterProps) {
  const [search, setSearch] = useState("");

  const filtered = drivers.filter((d) => {
    const name = ((d.fields.Name || d.fields.Full_Name || d.fields.Driver_Name || "") as string).toLowerCase();
    const notes = ((d.fields.Notes || "") as string).toLowerCase();
    const q = search.toLowerCase();
    return name.includes(q) || notes.includes(q);
  });

  return (
    <div className="space-y-3 mt-6">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">All Drivers</h3>
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search drivers..."
          className="w-full bg-[#1f1f1f] border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green/50 transition-colors"
        />
      </div>
      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">No drivers found</p>
        ) : (
          filtered.map((d) => <DriverCard key={d.id} driver={d} />)
        )}
      </div>
    </div>
  );
}
