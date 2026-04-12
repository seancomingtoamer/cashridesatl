"use client";

import { Plus, Calendar, MessageCircle, DollarSign } from "lucide-react";

interface QuickActionsProps {
  onNewRide: () => void;
  onManageShifts: () => void;
}

export function QuickActions({ onNewRide, onManageShifts }: QuickActionsProps) {
  return (
    <div className="space-y-3 mt-6">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={onNewRide}
          className="flex items-center gap-2 bg-green/20 hover:bg-green/30 text-green text-sm font-bold py-3 px-4 rounded-xl transition-colors"
        >
          <Plus size={16} /> New Ride
        </button>
        <button
          onClick={onManageShifts}
          className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-sm font-bold py-3 px-4 rounded-xl transition-colors"
        >
          <Calendar size={16} /> Add Shifts
        </button>
        <a
          href="https://t.me/+b3_v1rIaub82NzVh"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#333] text-white text-sm font-medium py-3 px-4 rounded-xl transition-colors"
        >
          <MessageCircle size={16} /> Telegram
        </a>
        <a
          href="https://airtable.com/appfs1MJL9BzZrpOx"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#333] text-white text-sm font-medium py-3 px-4 rounded-xl transition-colors"
        >
          <DollarSign size={16} /> Airtable
        </a>
      </div>
    </div>
  );
}
