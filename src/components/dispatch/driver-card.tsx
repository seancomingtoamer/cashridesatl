"use client";

import { Phone, MapPin } from "lucide-react";
import type { AirtableRecord } from "@/lib/airtable";

interface DriverCardProps {
  driver: AirtableRecord;
}

export function DriverCard({ driver }: DriverCardProps) {
  const f = driver.fields;
  const name = (f.Name || f.Full_Name || f.Driver_Name || "") as string;
  const phone = (f.Phone || f.Driver_Phone || "") as string;
  const areas = (f.Areas || f.Area || "") as string;
  const notes = (f.Notes || "") as string;

  return (
    <div className="flex items-center justify-between bg-[#1a1a1a] rounded-lg px-3 py-2.5 border border-white/5">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white truncate">{name}</span>
          {notes.toLowerCase().includes("wheels on demand") && (
            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded font-medium">WoD</span>
          )}
        </div>
        {areas && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <MapPin size={10} />
            <span className="truncate">{areas}</span>
          </div>
        )}
      </div>
      {phone && (
        <a
          href={`tel:${phone}`}
          className="shrink-0 p-2 text-gray-400 hover:text-green transition-colors"
        >
          <Phone size={14} />
        </a>
      )}
    </div>
  );
}
