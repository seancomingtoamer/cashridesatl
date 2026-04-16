import { listPublishedDrivers } from "@/lib/airtable";
import { Shield, Star, MapPin, Car, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Caption,
  SectionMasthead,
  HorizontalRule,
} from "@/components/editorial";

export const revalidate = 60;

export default async function MeetTheDriversPage() {
  const records = await listPublishedDrivers();
  const today = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-ink pt-28">
      {/* ================= HERO ================= */}
      <section className="py-14 px-4 paper-grain">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Caption className="caption-green">
              THE ROSTER &middot; VERIFIED DRIVERS
            </Caption>
            <Caption className="hidden sm:block">ISSUED {today}</Caption>
          </div>

          <div className="rule-double mb-10" />

          <div className="max-w-3xl">
            <p className="caption mb-5">DIRECTORY</p>

            <h1 className="font-display text-[3rem] sm:text-[5.5rem] lg:text-[6.5rem] leading-[0.95] tracking-tight text-ink mb-6">
              Meet the{" "}
              <span className="italic font-display-wonk text-green">
                drivers.
              </span>
            </h1>

            <p className="font-display italic text-xl sm:text-2xl text-ink-soft leading-snug mb-4 max-w-2xl">
              Every driver on this page has been personally verified by the
              dispatch desk &mdash; license, registration, insurance, and a
              handshake.
            </p>
            <p className="text-ink-muted text-base max-w-2xl">
              Real Atlanta neighbors. Ready to ride.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ROSTER ================= */}
      <section className="px-4 pb-20 border-t border-[var(--rule)] pt-16">
        <div className="max-w-6xl mx-auto">
          <SectionMasthead
            bulletinNo="01"
            label={`${records.length} DRIVERS ON ACTIVE DUTY`}
            date={today}
          />

          <div className="mt-10">
            {records.length === 0 ? (
              <div className="text-center py-20 border border-[var(--rule)] bg-paper">
                <Caption className="mb-4">ROSTER PENDING</Caption>
                <p className="font-display text-3xl text-ink-soft italic mb-6">
                  The first cohort is coming soon.
                </p>
                <Link
                  href="/drivers/verify"
                  className="inline-flex items-center gap-2 bg-green text-black font-semibold py-3 px-7 rounded-sm hover:bg-green-dark transition-colors tracking-wide"
                >
                  Get Verified Now <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {records.map((r, idx) => {
                  const d = r.fields;
                  const photoUrl = d.Photo?.[0]?.url;
                  const isSpotlight = d.Spotlight;
                  const dispatchNo = String(idx + 1).padStart(3, "0");
                  const name = (d.Name || "DRIVER").toString();
                  const areas = d["Areas Served"]?.toString().split(",")[0]?.trim().toUpperCase();

                  return (
                    <article
                      key={r.id}
                      className={`border bg-[#111] overflow-hidden transition-all group ${
                        isSpotlight
                          ? "border-green/40 shadow-[0_0_0_1px_rgba(34,197,94,0.1)]"
                          : "border-[var(--rule)]"
                      }`}
                    >
                      {/* Bulletin caption bar */}
                      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--rule)] bg-[#0a0a0a]">
                        <Caption className={isSpotlight ? "caption-green" : ""}>
                          DISPATCH #{dispatchNo}
                        </Caption>
                        {isSpotlight && (
                          <div className="flex items-center gap-1 caption caption-green">
                            <Star size={10} fill="currentColor" />
                            SPOTLIGHT
                          </div>
                        )}
                      </div>

                      {/* Photo with blurred-fill */}
                      <div className="relative h-56 bg-[#0a0a0a] overflow-hidden">
                        {photoUrl ? (
                          <>
                            <Image
                              src={photoUrl}
                              alt=""
                              aria-hidden="true"
                              fill
                              className="object-cover scale-110 blur-xl opacity-50"
                              unoptimized
                            />
                            <Image
                              src={photoUrl}
                              alt={name}
                              fill
                              className="object-contain relative z-10"
                              unoptimized
                            />
                          </>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car size={48} className="text-ink-muted/30" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <h3 className="font-display text-2xl text-ink tracking-tight leading-tight mb-3">
                          {name}
                        </h3>

                        <div className="space-y-2 mb-4">
                          {d.Vehicle && (
                            <div className="flex items-center gap-2 text-ink-soft text-sm">
                              <Car size={13} className="text-ink-muted" />
                              {d.Vehicle}
                            </div>
                          )}
                          {d["Areas Served"] && (
                            <div className="flex items-start gap-2 text-ink-soft text-sm">
                              <MapPin size={13} className="text-ink-muted shrink-0 mt-0.5" />
                              <span>{d["Areas Served"]}</span>
                            </div>
                          )}
                        </div>

                        {d.Personal_Statement && (
                          <p className="text-ink-soft text-sm leading-relaxed line-clamp-3 border-l-2 border-[var(--rule)] pl-3 italic font-display">
                            &ldquo;{d.Personal_Statement}&rdquo;
                          </p>
                        )}

                        <div className="mt-5 pt-4 border-t border-[var(--rule)] flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <Shield size={12} className="text-green" />
                            <span className="caption caption-green">
                              VERIFIED
                            </span>
                          </div>
                          {areas && (
                            <span className="caption">{areas}</span>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="py-20 px-4 border-t border-[var(--rule)] bg-paper">
        <div className="max-w-3xl mx-auto text-center">
          <SectionMasthead
            bulletinNo="02"
            label="OPEN CALL FOR DRIVERS"
            className="mb-10"
          />

          <h2 className="font-display text-5xl sm:text-6xl text-ink tracking-tight leading-[1.05] mb-6">
            Want to join{" "}
            <span className="italic font-display-wonk text-green">
              the roster?
            </span>
          </h2>
          <p className="text-ink-soft text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Submit your documents and get verified. It takes about ten minutes.
            Once approved, you&rsquo;re on the wall.
          </p>

          <Link
            href="/drivers/verify"
            className="inline-flex items-center gap-2 bg-green text-black font-semibold py-4 px-7 rounded-sm hover:bg-green-dark transition-colors tracking-wide"
          >
            <Shield size={18} />
            Get Verified
          </Link>

          <HorizontalRule className="mt-16 max-w-md mx-auto" />
          <p className="caption mt-6">&mdash; END OF BULLETIN &mdash;</p>
        </div>
      </section>
    </div>
  );
}
