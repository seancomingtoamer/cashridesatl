"use client";

import { useState } from "react";
import { X, UserCheck, Search } from "lucide-react";
import type { AirtableRecord } from "@/lib/airtable";

interface AssignModalProps {
  isOpen: boolean;
  rideId: string;
  shifts: AirtableRecord[];
  onClose: () => void;
  onAssigned: () => void;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function AssignModal({ isOpen, rideId, shifts, onClose, onAssigned }: AssignModalProps) {
  const [assigning, setAssigning] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const todayDay = DAYS[new Date().getDay()];

  // Show on-shift drivers first, then all shift entries
  const onShift = shifts.filter(
    (s) => (s.fields.Day as string) === todayDay && (s.fields.Status as string) === "Active"
  );

  const filtered = onShift.filter((s) => {
    const name = (s.fields.Driver_Name as string).toLowerCase();
    return name.includes(search.toLowerCase());
  });

  const handleAssign = async (shift: AirtableRecord) => {
    setAssigning(shift.id);
    try {
      const res = await fetch(`/api/dispatch/rides/${rideId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driverName: shift.fields.Driver_Name,
          driverPhone: shift.fields.Driver_Phone,
          fleet: shift.fields.Fleet || "Wheels on Demand",
        }),
      });
      if (res.ok) {
        onAssigned();
        onClose();
      }
    } catch {
      // ignore
    } finally {
      setAssigning(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-2xl max-h-[80vh] overflow-hidden">
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green/20 rounded-xl flex items-center justify-center">
              <UserCheck className="text-green" size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Assign Driver</h2>
              <p className="text-sm text-gray-400">On shift now ({todayDay})</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b border-white/5">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search drivers..."
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green/50 transition-colors"
              autoFocus
            />
          </div>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto max-h-[50vh]">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No drivers on shift right now</p>
            </div>
          ) : (
            filtered.map((shift) => (
              <button
                key={shift.id}
                onClick={() => handleAssign(shift)}
                disabled={assigning === shift.id}
                className="w-full flex items-center justify-between bg-[#1f1f1f] hover:bg-[#2a2a2a] rounded-xl border border-white/5 px-4 py-3 transition-colors text-left disabled:opacity-50"
              >
                <div>
                  <span className="font-bold text-white">{shift.fields.Driver_Name as string}</span>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {shift.fields.Areas as string} | {shift.fields.Start_Time as string}-{shift.fields.End_Time as string}
                  </div>
                  {(shift.fields.Fleet as string) && (
                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded mt-1 inline-block">
                      {shift.fields.Fleet as string}
                    </span>
                  )}
                </div>
                <span className="text-green text-sm font-bold">
                  {assigning === shift.id ? "..." : "Assign"}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
