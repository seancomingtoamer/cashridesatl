"use client";

import { useState } from "react";
import { X, Plus, MapPin, Phone, User, Users, Clock } from "lucide-react";

interface NewRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export function NewRideModal({ isOpen, onClose, onCreated }: NewRideModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: "",
    dropoff: "",
    when: "asap",
    scheduledDateTime: "",
    passengers: "1",
    notes: "",
    source: "Phone",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/dispatch/rides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({ name: "", phone: "", pickup: "", dropoff: "", when: "asap", scheduledDateTime: "", passengers: "1", notes: "", source: "Phone" });
        setStatus("idle");
        onCreated();
        onClose();
      } else {
        setStatus("error");
      }
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
            <div className="w-10 h-10 bg-green/20 rounded-xl flex items-center justify-center">
              <Plus className="text-green" size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">New Ride</h2>
              <p className="text-sm text-gray-400">Manual dispatch entry</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Source */}
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">Source</label>
            <div className="grid grid-cols-3 gap-2">
              {["Phone", "Telegram", "Website"].map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setFormData({ ...formData, source: src })}
                  className={`py-2 rounded-lg text-sm font-bold transition-all ${
                    formData.source === src ? "bg-green text-black" : "bg-[#2a2a2a] text-gray-400 border border-white/10"
                  }`}
                >
                  {src}
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
              <User size={14} /> Rider Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green transition-colors"
              placeholder="Rider name"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
              <Phone size={14} /> Phone
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green transition-colors"
              placeholder="(404) 555-0000"
            />
          </div>

          {/* Pickup */}
          <div>
            <label className="flex items-center gap-2 text-green text-sm font-medium mb-2">
              <MapPin size={14} /> Pickup
            </label>
            <input
              type="text"
              required
              value={formData.pickup}
              onChange={(e) => setFormData({ ...formData, pickup: e.target.value })}
              className="w-full bg-[#2a2a2a] border border-green/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green transition-colors"
              placeholder="Pickup address or landmark"
            />
          </div>

          {/* Dropoff */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
              <MapPin size={14} /> Dropoff
            </label>
            <input
              type="text"
              required
              value={formData.dropoff}
              onChange={(e) => setFormData({ ...formData, dropoff: e.target.value })}
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green transition-colors"
              placeholder="Dropoff address or landmark"
            />
          </div>

          {/* When */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
              <Clock size={14} /> When
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["asap", "scheduled"].map((w) => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setFormData({ ...formData, when: w })}
                  className={`py-3 rounded-xl font-bold text-sm transition-all ${
                    formData.when === w ? "bg-green text-black" : "bg-[#2a2a2a] text-gray-400 border border-white/10"
                  }`}
                >
                  {w === "asap" ? "ASAP" : "Schedule"}
                </button>
              ))}
            </div>
            {formData.when === "scheduled" && (
              <input
                type="datetime-local"
                required
                value={formData.scheduledDateTime}
                onChange={(e) => setFormData({ ...formData, scheduledDateTime: e.target.value })}
                className="mt-3 w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green transition-colors"
              />
            )}
          </div>

          {/* Passengers */}
          <div>
            <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
              <Users size={14} /> Passengers
            </label>
            <div className="grid grid-cols-4 gap-2">
              {["1", "2", "3", "4+"].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFormData({ ...formData, passengers: num })}
                  className={`py-3 rounded-xl font-bold text-sm transition-all ${
                    formData.passengers === num ? "bg-green text-black" : "bg-[#2a2a2a] text-gray-400 border border-white/10"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-gray-400 text-sm font-medium mb-2 block">Notes (optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="w-full bg-[#2a2a2a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green transition-colors resize-none"
              placeholder="Any special requests?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-green hover:bg-green-dark disabled:opacity-50 text-black font-bold py-4 rounded-xl text-lg transition-all"
          >
            {status === "sending" ? "Creating..." : "Create Ride"}
          </button>

          {status === "error" && (
            <p className="text-red-400 text-center text-sm">Failed to create ride. Try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
