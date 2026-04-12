"use client";

import { useState } from "react";
import { X, Calendar, Clock, MapPin, User, Phone } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const FLEETS = ["Wheels on Demand", "Cash Rides"];

interface ShiftManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function ShiftManagerModal({ isOpen, onClose, onCreated }: ShiftManagerModalProps) {
  const [formData, setFormData] = useState({
    driverName: "",
    driverPhone: "",
    fleet: "Wheels on Demand",
    days: [] as string[],
    startTime: "6:00 AM",
    endTime: "6:00 PM",
    areas: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter((d) => d !== day) : [...prev.days, day],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Create one shift record per selected day
      const promises = formData.days.map((day) =>
        fetch("/api/dispatch/shifts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            driverName: formData.driverName,
            driverPhone: formData.driverPhone,
            fleet: formData.fleet,
            day,
            startTime: formData.startTime,
            endTime: formData.endTime,
            areas: formData.areas,
          }),
        })
      );

      await Promise.all(promises);
      setFormData({ driverName: "", driverPhone: "", fleet: "Wheels on Demand", days: [], startTime: "6:00 AM", endTime: "6:00 PM", areas: "" });
      setStatus("idle");
      onCreated();
      onClose();
    } catch {
      setStatus("error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#1a1a1a] border border-white/10 rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <Calendar className="text-blue-400" size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Add Shift Block</h2>
              <p className="text-sm text-gray-400">Schedule a driver for shifts</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Driver Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
              <User size={14} /> Driver Name
            </label>
            <input
              type="text"
              required
              value={formData.driverName}
              onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green transition-colors"
              placeholder="e.g. Antonio"
            />
          </div>

          {/* Driver Phone */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
              <Phone size={14} /> Driver Phone
            </label>
            <input
              type="tel"
              value={formData.driverPhone}
              onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green transition-colors"
              placeholder="(404) 555-0000"
            />
          </div>

          {/* Fleet */}
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">Fleet</label>
            <div className="grid grid-cols-2 gap-2">
              {FLEETS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormData({ ...formData, fleet: f })}
                  className={`py-2 rounded-xl font-bold text-sm transition-all ${
                    formData.fleet === f ? "bg-green text-black" : "bg-[#2a2a2a] text-gray-400 border border-white/10"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Days */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
              <Calendar size={14} /> Days
            </label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                    formData.days.includes(day) ? "bg-green text-black" : "bg-[#2a2a2a] text-gray-400 border border-white/10"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
                <Clock size={14} /> Start
              </label>
              <input
                type="text"
                required
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green transition-colors"
                placeholder="6:00 AM"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
                <Clock size={14} /> End
              </label>
              <input
                type="text"
                required
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green transition-colors"
                placeholder="6:00 PM"
              />
            </div>
          </div>

          {/* Areas */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
              <MapPin size={14} /> Coverage Areas
            </label>
            <input
              type="text"
              required
              value={formData.areas}
              onChange={(e) => setFormData({ ...formData, areas: e.target.value })}
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green transition-colors"
              placeholder="South Atlanta, East Point, College Park"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending" || formData.days.length === 0}
            className="w-full bg-green hover:bg-green-dark disabled:opacity-50 text-black font-bold py-4 rounded-xl text-lg transition-all"
          >
            {status === "sending" ? "Creating..." : `Add Shifts (${formData.days.length} days)`}
          </button>

          {status === "error" && (
            <p className="text-red-400 text-center text-sm">Failed to create shifts. Try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
