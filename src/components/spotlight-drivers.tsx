"use client";

import { useEffect, useState } from "react";
import { Shield, Car, MapPin, Star } from "lucide-react";

interface Driver {
  id: string;
  name: string;
  bio: string;
  photo: string | null;
  vehicleType: string;
  serviceZones: string[];
  spotlight: boolean;
}

export function SpotlightDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/drivers")
      .then((r) => r.json())
      .then((data) => {
        setDrivers((data.drivers || []).slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border border-[var(--rule)] bg-[#111] h-80 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (drivers.length === 0) {
    return (
      <div className="text-center py-10 border border-[var(--rule)] bg-paper">
        <p className="caption mb-3">ROSTER PENDING</p>
        <p className="font-display italic text-2xl text-ink-soft">
          First cohort launching soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {drivers.map((d, idx) => {
        const dispatchNo = String(idx + 1).padStart(3, "0");
        const primaryZone = d.serviceZones[0]?.toUpperCase();
        return (
          <article
            key={d.id}
            className={`border bg-[#111] overflow-hidden ${
              d.spotlight
                ? "border-green/40 shadow-[0_0_0_1px_rgba(34,197,94,0.1)]"
                : "border-[var(--rule)]"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--rule)] bg-[#0a0a0a]">
              <span className={`caption ${d.spotlight ? "caption-green" : ""}`}>
                DISPATCH #{dispatchNo}
              </span>
              {d.spotlight && (
                <div className="flex items-center gap-1 caption caption-green">
                  <Star size={10} fill="currentColor" />
                  SPOTLIGHT
                </div>
              )}
            </div>

            <div className="relative h-48 bg-[#0a0a0a] overflow-hidden">
              {d.photo ? (
                <>
                  <img
                    src={d.photo}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-50"
                  />
                  <img
                    src={d.photo}
                    alt={d.name}
                    className="relative w-full h-full object-contain"
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Car size={40} className="text-ink-muted/30" />
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-display text-xl text-ink tracking-tight leading-tight mb-3">
                {d.name}
              </h3>

              <div className="space-y-1.5 mb-3">
                {d.vehicleType && (
                  <div className="flex items-center gap-2 text-ink-soft text-xs">
                    <Car size={12} className="text-ink-muted" />
                    {d.vehicleType}
                  </div>
                )}
                {d.serviceZones.length > 0 && (
                  <div className="flex items-center gap-2 text-ink-soft text-xs">
                    <MapPin size={12} className="text-ink-muted" />
                    {d.serviceZones.slice(0, 2).join(", ")}
                  </div>
                )}
              </div>

              {d.bio && (
                <p className="text-ink-soft text-sm leading-relaxed line-clamp-2 italic font-display border-l-2 border-[var(--rule)] pl-3">
                  &ldquo;{d.bio}&rdquo;
                </p>
              )}

              <div className="mt-4 pt-3 border-t border-[var(--rule)] flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Shield size={11} className="text-green" />
                  <span className="caption caption-green">VERIFIED</span>
                </div>
                {primaryZone && <span className="caption">{primaryZone}</span>}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
