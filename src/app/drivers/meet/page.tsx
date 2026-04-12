import { listPublishedDrivers } from "@/lib/airtable";
import { Shield, Star, MapPin, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

export default async function MeetTheDriversPage() {
  const records = await listPublishedDrivers();

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Hero */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green/10 text-green px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Shield size={16} />
            Verified &amp; Vetted
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Meet the <span className="text-green">Drivers</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Every driver on this page has been personally verified by our team.
            Real Atlanta neighbors, ready to ride.
          </p>
        </div>
      </section>

      {/* Driver Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          {records.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg mb-4">
                Our first verified driver cohort is coming soon.
              </p>
              <Link
                href="/drivers/verify"
                className="inline-flex items-center gap-2 bg-green text-black font-bold py-3 px-8 rounded-xl hover:bg-green/90 transition-colors"
              >
                Get Verified Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {records.map((r) => {
                const d = r.fields;
                const photoUrl = d.Photo?.[0]?.url;
                const isSpotlight = d.Spotlight;

                return (
                  <div
                    key={r.id}
                    className={`bg-[#1f1f1f] rounded-2xl overflow-hidden border ${
                      isSpotlight
                        ? "border-green/30 shadow-lg shadow-green/5"
                        : "border-white/5"
                    }`}
                  >
                    {/* Photo */}
                    <div className="relative h-48 bg-[#0a0a0a]">
                      {photoUrl ? (
                        <Image
                          src={photoUrl}
                          alt={d.Name || "Driver"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Car size={48} className="text-gray-700" />
                        </div>
                      )}
                      {isSpotlight && (
                        <div className="absolute top-3 right-3 bg-green text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Star size={12} />
                          SPOTLIGHT
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {d.Name}
                      </h3>

                      {d.Vehicle && (
                        <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-2">
                          <Car size={14} />
                          {d.Vehicle}
                        </div>
                      )}

                      {d.Service_Zones && d.Service_Zones.length > 0 && (
                        <div className="flex items-start gap-1.5 text-gray-400 text-sm mb-3">
                          <MapPin size={14} className="shrink-0 mt-0.5" />
                          <span>{d.Service_Zones.join(", ")}</span>
                        </div>
                      )}

                      {d.Personal_Statement && (
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                          {d.Personal_Statement}
                        </p>
                      )}

                      <div className="mt-4 flex items-center gap-2">
                        <Shield size={14} className="text-green" />
                        <span className="text-green text-xs font-medium">
                          Verified Driver
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#111111]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Want to join the roster?
          </h2>
          <p className="text-gray-400 mb-6">
            Submit your documents and get verified. It takes about 10 minutes.
          </p>
          <Link
            href="/drivers/verify"
            className="inline-flex items-center gap-2 bg-green text-black font-bold py-3 px-8 rounded-xl hover:bg-green/90 transition-colors"
          >
            <Shield size={18} />
            Get Verified
          </Link>
        </div>
      </section>
    </div>
  );
}
