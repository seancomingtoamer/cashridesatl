"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, LogOut } from "lucide-react";
import { StatsBar } from "./stats-bar";
import { RideQueue } from "./ride-queue";
import { ShiftPanel } from "./shift-panel";
import { DriverRoster } from "./driver-roster";
import { QuickActions } from "./quick-actions";
import { NewRideModal } from "./new-ride-modal";
import { AssignModal } from "./assign-modal";
import { ShiftManagerModal } from "./shift-manager-modal";
import type { AirtableRecord } from "@/lib/airtable";

interface Stats {
  activeRides: number;
  driversOnShift: number;
  todayRides: number;
  todayRevenue: number;
}

export function Dashboard() {
  const [rides, setRides] = useState<AirtableRecord[]>([]);
  const [shifts, setShifts] = useState<AirtableRecord[]>([]);
  const [drivers, setDrivers] = useState<AirtableRecord[]>([]);
  const [stats, setStats] = useState<Stats>({ activeRides: 0, driversOnShift: 0, todayRides: 0, todayRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [clock, setClock] = useState(new Date());

  // Modals
  const [newRideOpen, setNewRideOpen] = useState(false);
  const [assignRideId, setAssignRideId] = useState<string | null>(null);
  const [shiftManagerOpen, setShiftManagerOpen] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      const [ridesRes, shiftsRes, driversRes, statsRes] = await Promise.all([
        fetch("/api/dispatch/rides"),
        fetch("/api/dispatch/shifts"),
        fetch("/api/dispatch/drivers"),
        fetch("/api/dispatch/stats"),
      ]);

      const [ridesData, shiftsData, driversData, statsData] = await Promise.all([
        ridesRes.json(),
        shiftsRes.json(),
        driversRes.json(),
        statsRes.json(),
      ]);

      if (ridesData.records) setRides(ridesData.records);
      if (shiftsData.records) setShifts(shiftsData.records);
      if (driversData.records) setDrivers(driversData.records);
      if (statsData.activeRides !== undefined) setStats(statsData);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load + auto-refresh
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchAll]);

  // Clock
  useEffect(() => {
    const interval = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (rideId: string, status: string) => {
    try {
      await fetch(`/api/dispatch/rides/${rideId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Status: status }),
      });
      fetchAll();
    } catch (err) {
      console.error("Status change error:", err);
    }
  };

  const handleAssignFromShift = (driverName: string, driverPhone: string) => {
    // Find the first "New" ride and assign it
    const newRide = rides.find((r) => r.fields.Status === "New");
    if (!newRide) return;

    fetch(`/api/dispatch/rides/${newRide.id}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ driverName, driverPhone, fleet: "Wheels on Demand" }),
    }).then(() => fetchAll());
  };

  const handleLogout = () => {
    localStorage.removeItem("dispatch_auth");
    window.location.reload();
  };

  const timeStr = clock.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true, timeZone: "America/New_York" });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-green border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm">Loading dispatch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#111] border-b border-white/10 px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-white">CASH RIDES ATL <span className="text-green">DISPATCH</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-mono text-gray-400">{timeStr} ET</span>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-colors ${
                autoRefresh ? "bg-green/20 text-green" : "bg-[#2a2a2a] text-gray-400"
              }`}
            >
              Auto: {autoRefresh ? "ON" : "OFF"}
            </button>
            <button
              onClick={() => { setLoading(true); fetchAll(); }}
              className="text-gray-400 hover:text-white transition-colors p-1.5"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-red-400 transition-colors p-1.5"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="p-4 lg:p-6 space-y-6">
        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Ride Queue (60%) */}
          <div className="lg:col-span-3">
            <RideQueue
              rides={rides}
              onAssign={(rideId) => setAssignRideId(rideId)}
              onStatusChange={handleStatusChange}
            />
          </div>

          {/* Right: Shifts + Drivers + Actions (40%) */}
          <div className="lg:col-span-2 space-y-2">
            <ShiftPanel
              shifts={shifts}
              rides={rides}
              onAssignToDriver={handleAssignFromShift}
            />
            <DriverRoster drivers={drivers} />
            <QuickActions
              onNewRide={() => setNewRideOpen(true)}
              onManageShifts={() => setShiftManagerOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <NewRideModal
        isOpen={newRideOpen}
        onClose={() => setNewRideOpen(false)}
        onCreated={fetchAll}
      />
      <AssignModal
        isOpen={!!assignRideId}
        rideId={assignRideId || ""}
        shifts={shifts}
        onClose={() => setAssignRideId(null)}
        onAssigned={fetchAll}
      />
      <ShiftManagerModal
        isOpen={shiftManagerOpen}
        onClose={() => setShiftManagerOpen(false)}
        onCreated={fetchAll}
      />
    </div>
  );
}
