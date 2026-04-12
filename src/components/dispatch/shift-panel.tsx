"use client";

import { ShiftCard } from "./shift-card";
import type { AirtableRecord } from "@/lib/airtable";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface ShiftPanelProps {
  shifts: AirtableRecord[];
  rides: AirtableRecord[];
  onAssignToDriver: (driverName: string, driverPhone: string) => void;
}

export function ShiftPanel({ shifts, rides, onAssignToDriver }: ShiftPanelProps) {
  const now = new Date();
  const todayDay = DAYS[now.getDay()];

  // Filter shifts that are active TODAY and currently within time range
  const onShiftNow = shifts.filter((s) => {
    const day = s.fields.Day as string;
    const status = s.fields.Status as string;
    return day === todayDay && status === "Active";
  });

  // Count today's rides per driver
  const todayStr = now.toISOString().split("T")[0];
  const driverRideCounts: Record<string, number> = {};
  rides.forEach((r) => {
    const driver = r.fields.Assigned_Driver as string;
    const created = r.fields.Created_At as string;
    if (driver && created?.startsWith(todayStr)) {
      driverRideCounts[driver] = (driverRideCounts[driver] || 0) + 1;
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">On Shift Now</h2>
        <span className="text-xs text-gray-400">{todayDay}</span>
      </div>

      {onShiftNow.length === 0 ? (
        <div className="text-center py-8 text-gray-500 bg-[#1f1f1f] rounded-xl border border-white/5">
          <p className="text-sm">No drivers on shift right now</p>
          <p className="text-xs mt-1 text-gray-600">Add shifts via Manage Shifts</p>
        </div>
      ) : (
        <div className="space-y-3">
          {onShiftNow.map((shift) => (
            <ShiftCard
              key={shift.id}
              shift={shift}
              rideCount={driverRideCounts[shift.fields.Driver_Name as string] || 0}
              onAssignToDriver={onAssignToDriver}
            />
          ))}
        </div>
      )}
    </div>
  );
}
