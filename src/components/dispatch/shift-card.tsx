"use client";

import { Phone, MapPin, Clock, Car } from "lucide-react";
import { StatusBadge } from "./status-badge";
import type { AirtableRecord } from "@/lib/airtable";

interface ShiftCardProps {
  shift: AirtableRecord;
  rideCount: number;
  onAssignToDriver: (driverName: string, driverPhone: string) => void;
}

export function ShiftCard({ shift, rideCount, onAssignToDriver }: ShiftCardProps) {
  const f = shift.fields;
  const name = f.Driver_Name as string;
  const phone = f.Driver_Phone as string;
  const areas = f.Areas as string;
  const startTime = f.Start_Time as string;
  const endTime = f.End_Time as string;
  const status = f.Status as string;

  return (
    <div className="bg-[#1f1f1f] rounded-xl border border-green/20 p-4 space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{name}</span>
            <StatusBadge status={status} />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
            <Clock size={12} />
            <span>{startTime} - {endTime}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <Car size={14} />
          <span>{rideCount} today</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <MapPin size={12} className="text-green shrink-0" />
        <span className="truncate">{areas}</span>
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={() => onAssignToDriver(name, phone)}
          className="flex-1 bg-green/20 hover:bg-green/30 text-green text-sm font-bold py-2 rounded-lg transition-colors"
        >
          Assign
        </button>
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center justify-center gap-1.5 bg-[#2a2a2a] hover:bg-[#333] text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
          >
            <Phone size={14} /> Call
          </a>
        )}
      </div>
    </div>
  );
}
