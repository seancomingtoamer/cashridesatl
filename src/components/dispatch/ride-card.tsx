"use client";

import { MapPin, Phone, Users, Clock, UserCheck } from "lucide-react";
import { StatusBadge } from "./status-badge";
import type { AirtableRecord } from "@/lib/airtable";

interface RideFields {
  Rider_Name: string;
  Rider_Phone: string;
  Pickup: string;
  Dropoff: string;
  When: string;
  Scheduled_DateTime: string;
  Passengers: number;
  Notes: string;
  Status: string;
  Assigned_Driver: string;
  Assigned_Driver_Phone: string;
  Fleet: string;
  Source: string;
  Platform_Fee: number;
  Created_At: string;
}

interface RideCardProps {
  ride: AirtableRecord<RideFields>;
  onAssign: (rideId: string) => void;
  onStatusChange: (rideId: string, status: string) => void;
}

const NEXT_STATUS: Record<string, string> = {
  New: "Dispatched",
  Dispatched: "Accepted",
  Accepted: "In Progress",
  "In Progress": "Completed",
};

export function RideCard({ ride, onAssign, onStatusChange }: RideCardProps) {
  const f = ride.fields;
  const isActive = f.Status !== "Completed" && f.Status !== "Cancelled" && f.Status !== "No Show";
  const nextStatus = NEXT_STATUS[f.Status];

  const timeAgo = f.Created_At ? getTimeAgo(f.Created_At) : "";

  return (
    <div className={`bg-[#1f1f1f] rounded-xl border ${
      f.Status === "New" ? "border-yellow-500/30" :
      f.Status === "Dispatched" ? "border-blue-500/30" :
      f.Status === "In Progress" ? "border-green/30" :
      "border-white/5"
    } p-4 space-y-3`}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{f.Rider_Name}</span>
            <StatusBadge status={f.Status} />
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
            <span>{f.When === "Scheduled" ? `Scheduled: ${f.Scheduled_DateTime}` : "ASAP"}</span>
            {f.Source && <span className="text-gray-500">{f.Source}</span>}
            {timeAgo && <span className="text-gray-500">{timeAgo}</span>}
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Users size={14} />
          <span className="text-sm">{f.Passengers || 1}</span>
        </div>
      </div>

      {/* Route */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={14} className="text-green shrink-0" />
          <span className="text-white truncate">{f.Pickup}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={14} className="text-gray-400 shrink-0" />
          <span className="text-gray-300 truncate">{f.Dropoff}</span>
        </div>
      </div>

      {/* Assigned driver */}
      {f.Assigned_Driver && (
        <div className="flex items-center gap-2 text-sm text-blue-400 bg-blue-500/10 rounded-lg px-3 py-1.5">
          <UserCheck size={14} />
          <span className="font-medium">{f.Assigned_Driver}</span>
          {f.Fleet && <span className="text-xs text-blue-300">({f.Fleet})</span>}
        </div>
      )}

      {/* Notes */}
      {f.Notes && (
        <p className="text-xs text-gray-400 bg-[#161616] rounded-lg px-3 py-2">{f.Notes}</p>
      )}

      {/* Actions */}
      {isActive && (
        <div className="flex gap-2 pt-1">
          {f.Status === "New" && (
            <button
              onClick={() => onAssign(ride.id)}
              className="flex-1 bg-green/20 hover:bg-green/30 text-green text-sm font-bold py-2 rounded-lg transition-colors"
            >
              Assign Driver
            </button>
          )}
          {f.Rider_Phone && (
            <a
              href={`tel:${f.Rider_Phone}`}
              className="flex items-center justify-center gap-1.5 bg-[#2a2a2a] hover:bg-[#333] text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
            >
              <Phone size={14} /> Call
            </a>
          )}
          {nextStatus && f.Status !== "New" && (
            <button
              onClick={() => onStatusChange(ride.id, nextStatus)}
              className="flex-1 bg-[#2a2a2a] hover:bg-[#333] text-white text-sm font-medium py-2 rounded-lg transition-colors"
            >
              {nextStatus === "Completed" ? "Complete" : `Mark ${nextStatus}`}
            </button>
          )}
          {isActive && f.Status !== "New" && (
            <button
              onClick={() => onStatusChange(ride.id, "Cancelled")}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium py-2 px-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function getTimeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
