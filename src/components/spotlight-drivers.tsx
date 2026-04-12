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
            className="bg-[#1f1f1f] rounded-2xl h-64 animate-pulse border border-white/5"
          />
        ))}
      </div>
    );
  }

  if (drivers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">
          Our first verified driver cohort is launching soon. Stay tuned.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {drivers.map((d) => (
        <div
          key={d.id}
          className="bg-[#1f1f1f] rounded-2xl overflow-hidden border border-green/20 shadow-lg shadow-green/5"
        >
          <div className="relative h-40 bg-[#0a0a0a]">
            {d.photo ? (
              <img
                src={d.photo}
                alt={d.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Car size={40} className="text-gray-700" />
              </div>
            )}
            {d.spotlight && (
              <div className="absolute top-3 right-3 bg-green text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <Star size={10} />
                SPOTLIGHT
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-white font-bold mb-1">{d.name}</h3>
            {d.vehicleType && (
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                <Car size={12} />
                {d.vehicleType}
              </div>
            )}
            {d.serviceZones.length > 0 && (
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-2">
                <MapPin size={12} />
                {d.serviceZones.slice(0, 2).join(", ")}
              </div>
            )}
            {d.bio && (
              <p className="text-gray-300 text-sm line-clamp-2">{d.bio}</p>
            )}
            <div className="mt-3 flex items-center gap-1.5">
              <Shield size={12} className="text-green" />
              <span className="text-green text-xs font-medium">Verified</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
