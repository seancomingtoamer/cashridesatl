import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  DollarSign,
  Users,
  Zap,
  ArrowRight,
  Star,
} from "lucide-react";
import { SpotlightDrivers } from "@/components/spotlight-drivers";
import {
  Caption,
  SectionMasthead,
  PullQuote,
  HorizontalRule,
} from "@/components/editorial";

export default function Home() {
  const today = new Date()
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-ink">
      {/* ================= HERO / MASTHEAD ================= */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden paper-grain">
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/hero-bg.png"
            alt=""
            fill
            className="object-cover opacity-[0.12]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 via-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Issue header */}
          <div className="flex items-center justify-between mb-10">
            <Caption>VOL. I &middot; ISSUE 01</Caption>
            <Caption className="caption-green">
              THE ATLANTA DISPATCH BULLETIN
            </Caption>
            <Caption className="hidden sm:block">ISSUED {today}</Caption>
          </div>

          <div className="rule-double mb-10" />

          {/* Main masthead */}
          <div className="text-center mb-10">
            <h1 className="font-display text-[3.75rem] sm:text-[6.5rem] lg:text-[8.5rem] leading-[0.9] tracking-tight text-ink mb-4">
              Cash Rides
              <span className="block text-green italic font-display-wonk">
                Atlanta
              </span>
            </h1>
            <div className="rule-top max-w-xl mx-auto pt-4">
              <p className="caption">
                A Directory of Verified Local Drivers &middot; Since 2026
              </p>
            </div>
          </div>

          {/* Subhead / lede */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="font-display italic text-2xl sm:text-3xl text-ink-soft leading-snug mb-6">
              No apps. No surge. No middleman. Just real Atlanta drivers and
              riders connecting direct &mdash; the way the city already does it.
            </p>
            <p className="text-ink-muted text-base">
              Pay cash, Zelle, or CashApp. Every driver personally verified by
              the dispatch desk.
            </p>
          </div>

          {/* CTAs — dual-primary */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Link
              href="/riders"
              className="group bg-green hover:bg-green-dark text-black font-semibold px-7 py-4 rounded-sm text-base tracking-wide transition-all flex items-center justify-center gap-2 min-w-[240px]"
            >
              Request a Ride &mdash; Free
              <ArrowRight
                size={18}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            <Link
              href="/drivers"
              className="group bg-cream hover:bg-ink text-black font-semibold px-7 py-4 rounded-sm text-base tracking-wide transition-all flex items-center justify-center gap-2 min-w-[240px] border border-cream"
            >
              Drive &amp; Earn
              <ArrowRight
                size={18}
                className="text-green group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>

          <p className="mt-6 caption text-center">
            Free for riders &middot; Drivers start free &middot; Spotlight
            listing $5/mo
          </p>
        </div>
      </section>

      {/* ================= FROM THE DISPATCH DESK ================= */}
      <section className="py-20 px-4 border-t border-[var(--rule)]">
        <div className="max-w-3xl mx-auto">
          <SectionMasthead
            bulletinNo="01"
            label="FROM THE DISPATCH DESK"
            date={today}
          />

          <div className="mt-10">
            <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink mb-2 tracking-tight">
              Why I started this.
            </h2>
            <p className="caption mb-8">
              BY SEAN BROUGHTON &middot; FOUNDER, ATL
            </p>

            <div className="space-y-5 text-lg leading-[1.7] text-ink-soft">
              <p className="dropcap">
                Atlanta already runs on community. Your neighbor gives you a
                lift. You Venmo your cousin after he drops you at the airport.
                The corner store has a guy. We&rsquo;ve been doing rideshare
                since before Uber existed &mdash; we just didn&rsquo;t call it
                that.
              </p>
              <p>
                Cash Rides ATL is a directory. Not an app. Not a middleman. A
                list of Atlanta drivers I have personally verified &mdash;
                license, registration, insurance, and a face-to-face conviction
                that they&rsquo;ll treat you right. Riders get the list free.
                Drivers keep 100% of every fare.
              </p>
              <p>
                If you&rsquo;re driving with us, you&rsquo;re on my roster. If
                you&rsquo;re riding with us, you&rsquo;re riding with someone I
                trust.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--rule)] flex items-center justify-between">
              <span className="caption">&mdash; FILED FROM ATLANTA, GA</span>
              <Link
                href="/about"
                className="caption caption-green hover:underline inline-flex items-center gap-1"
              >
                Read more <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 px-4 border-t border-[var(--rule)] bg-paper">
        <div className="max-w-6xl mx-auto">
          <SectionMasthead bulletinNo="02" label="HOW THE NETWORK WORKS" />

          <div className="mt-10 mb-14 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-5xl sm:text-6xl text-ink tracking-tight leading-[1.05]">
              Three steps.
              <span className="block italic font-display-wonk text-green">
                No app required.
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-[var(--rule)]">
            {[
              {
                n: "01",
                title: "Join the network",
                body: "Drivers submit documents for verification. Riders join the free Telegram wire or request rides direct from the site.",
                icon: Users,
              },
              {
                n: "02",
                title: "Request goes out",
                body: "When someone needs a ride, it goes out on the Telegram wire to every verified driver in the zone. No middleman app routing the call — the network sees it direct.",
                icon: Zap,
              },
              {
                n: "03",
                title: "Connect direct",
                body: "Driver and rider talk, meet, ride. Pay cash, Zelle, or CashApp. No app fees. No commission. No surge.",
                icon: DollarSign,
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="px-6 py-4 md:py-2">
                  <div className="flex items-start gap-4 mb-5">
                    <span className="font-display text-6xl text-green/80 leading-none italic">
                      {s.n}
                    </span>
                    <Icon className="text-ink-muted mt-2" size={22} />
                  </div>
                  <h3 className="font-display text-2xl text-ink mb-3 tracking-tight">
                    {s.title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PULL QUOTE ================= */}
      <section className="py-10 px-4 border-t border-[var(--rule)]">
        <PullQuote attribution="Sean Broughton, Founder">
          &ldquo;If you&rsquo;re riding with us, you&rsquo;re riding with
          someone I trust. That&rsquo;s the whole company.&rdquo;
        </PullQuote>
      </section>

      {/* ================= WHY JOIN ================= */}
      <section className="py-20 px-4 border-t border-[var(--rule)] bg-paper">
        <div className="max-w-6xl mx-auto">
          <SectionMasthead bulletinNo="03" label="WHY ATLANTA CHOOSES CASH RIDES" />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <Caption className="mb-4">FOR RIDERS</Caption>
              <h3 className="font-display text-3xl text-ink mb-6 tracking-tight">
                Free. Always. Period.
              </h3>
              <ul className="space-y-4">
                {[
                  "Always free — no rider fees, ever",
                  "No surge pricing, no matter when",
                  "Pay cash, Zelle, or CashApp — your call",
                  "Verified local drivers who know ATL",
                ].map((item, i) => (
                  <li key={i} className="flex items-baseline gap-3 text-ink-soft">
                    <span className="caption caption-green shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/riders"
                className="mt-8 inline-flex items-center gap-2 caption caption-green border-b border-green pb-1 hover:gap-3 transition-all"
              >
                Request a ride <ArrowRight size={14} />
              </Link>
            </div>

            <div>
              <Caption className="mb-4">FOR DRIVERS</Caption>
              <h3 className="font-display text-3xl text-ink mb-6 tracking-tight">
                Keep 100% of every fare.
              </h3>
              <ul className="space-y-4">
                {[
                  "No commissions, ever — the fare is yours",
                  "Instant ride alerts straight to your email",
                  "Get paid same day — cash, Zelle, CashApp",
                  "No app downloads, no rider rating games",
                ].map((item, i) => (
                  <li key={i} className="flex items-baseline gap-3 text-ink-soft">
                    <span className="caption caption-green shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/drivers"
                className="mt-8 inline-flex items-center gap-2 caption caption-green border-b border-green pb-1 hover:gap-3 transition-all"
              >
                Start driving <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="py-20 px-4 border-t border-[var(--rule)]">
        <div className="max-w-5xl mx-auto">
          <SectionMasthead bulletinNo="04" label="BY THE NUMBERS" />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 sm:divide-x divide-[var(--rule)] text-center">
            {[
              { n: "18+", label: "Members in the network" },
              { n: "24/7", label: "Dispatch hours" },
              { n: "$0", label: "Commission on fares" },
            ].map((s, i) => (
              <div key={i} className="px-6">
                <div className="font-display text-7xl text-green italic tracking-tight mb-3 leading-none">
                  {s.n}
                </div>
                <div className="caption">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SPOTLIGHT DRIVERS ================= */}
      <section className="py-20 px-4 border-t border-[var(--rule)] bg-paper">
        <div className="max-w-6xl mx-auto">
          <SectionMasthead bulletinNo="05" label="THE ROSTER — SPOTLIGHT" />

          <div className="mt-10 mb-12 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-5xl sm:text-6xl text-ink tracking-tight leading-[1.05] mb-4">
              Meet the{" "}
              <span className="italic font-display-wonk text-green">
                drivers.
              </span>
            </h2>
            <p className="text-ink-soft text-lg">
              Personally vetted. Personally verified. The full roster of
              Atlanta drivers on the network.
            </p>
          </div>

          <SpotlightDrivers />

          <div className="text-center mt-10">
            <Link
              href="/drivers/meet"
              className="inline-flex items-center gap-2 caption caption-green border-b border-green pb-1 hover:gap-3 transition-all"
            >
              See the full roster <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CLOSING CTA ================= */}
      <section className="py-24 px-4 border-t border-[var(--rule)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green/[0.02] to-green/[0.04]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Caption className="caption-green mb-6">
            LAST CALL &middot; FOUNDING ROSTER
          </Caption>
          <h2 className="font-display text-5xl sm:text-6xl text-ink tracking-tight leading-[1.05] mb-6">
            Ready to{" "}
            <span className="italic font-display-wonk text-green">roll?</span>
          </h2>
          <p className="text-ink-soft text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you drive or ride, Cash Rides ATL keeps it simple. Real
            people, real city, real connections. Join us.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch">
            <Link
              href="/riders"
              className="bg-green hover:bg-green-dark text-black font-semibold px-7 py-4 rounded-sm tracking-wide transition-all min-w-[240px] text-center"
            >
              Request a Ride &mdash; Free
            </Link>
            <Link
              href="/drivers"
              className="bg-cream hover:bg-ink text-black font-semibold px-7 py-4 rounded-sm tracking-wide transition-all min-w-[240px] text-center border border-cream"
            >
              Drive &amp; Earn
            </Link>
          </div>

          <HorizontalRule className="mt-16 max-w-md mx-auto" />
          <p className="caption mt-6">
            &mdash; END OF BULLETIN &mdash;
          </p>
        </div>
      </section>
    </div>
  );
}
