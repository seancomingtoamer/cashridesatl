"use client";

import { useState } from "react";
import { RideCard } from "./ride-card";
import type { AirtableRecord } from "@/lib/airtable";

const TABS = ["New", "Dispatched", "In Progress", "All"] as const;

interface RideQueueProps {
  rides: AirtableRecord[];
  onAssign: (rideId: string) => void;
  onStatusChange: (rideId: string, status: string) => void;
}

export function RideQueue({ rides, onAssign, onStatusChange }: RideQueueProps) {
  const [activeTab, setActiveTab] = useState<string>("New");

  const filtered = activeTab === "All"
    ? rides
    : rides.filter((r) => r.fields.Status === activeTab);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Ride Queue</h2>
        <span className="text-sm text-gray-400">{filtered.length} rides</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {TABS.map((tab) => {
          const count = tab === "All"
            ? rides.length
            : rides.filter((r) => r.fields.Status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-green text-black"
                  : "bg-[#2a2a2a] text-gray-400 hover:text-white"
              }`}
            >
              {tab} {count > 0 && <span className="ml-1">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Ride list */}
      <div className="space-y-3 max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No rides</p>
            <p className="text-sm mt-1">{activeTab === "New" ? "Waiting for ride requests..." : `No ${activeTab.toLowerCase()} rides`}</p>
          </div>
        ) : (
          filtered.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride as AirtableRecord<never>}
              onAssign={onAssign}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
