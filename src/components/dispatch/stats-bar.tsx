import { Car, Users, BarChart3, DollarSign } from "lucide-react";

interface Stats {
  activeRides: number;
  driversOnShift: number;
  todayRides: number;
  todayRevenue: number;
}

export function StatsBar({ stats }: { stats: Stats }) {
  const items = [
    { label: "Active Rides", value: stats.activeRides, icon: Car, color: "text-green" },
    { label: "Drivers On Shift", value: stats.driversOnShift, icon: Users, color: "text-blue-400" },
    { label: "Today", value: stats.todayRides, icon: BarChart3, color: "text-yellow-400" },
    { label: "Revenue", value: `$${stats.todayRevenue}`, icon: DollarSign, color: "text-green" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-[#1f1f1f] rounded-xl border border-white/5 px-4 py-3 flex items-center gap-3"
        >
          <div className={`${item.color} bg-white/5 rounded-lg p-2`}>
            <item.icon size={18} />
          </div>
          <div>
            <div className="text-xl font-bold text-white">{item.value}</div>
            <div className="text-xs text-gray-400">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
