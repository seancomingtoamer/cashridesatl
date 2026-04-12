const STATUS_COLORS: Record<string, string> = {
  New: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Dispatched: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Accepted: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  "In Progress": "bg-green/20 text-green border-green/30",
  Completed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  "No Show": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Active: "bg-green/20 text-green border-green/30",
  Off: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  "On Break": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

export function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${colors}`}>
      {status}
    </span>
  );
}
