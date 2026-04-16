import {
  Shield,
  Mail,
  BadgeCheck,
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { DriverForm } from "@/components/driver-form";
import { ScrollToTop } from "@/components/scroll-to-top";
import {
  Caption,
  SectionMasthead,
  PullQuote,
  HorizontalRule,
} from "@/components/editorial";

export default function DriversPage() {
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
      <section className="py-16 px-4 paper-grain">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Caption className="caption-green">
              DRIVER BULLETIN &middot; FOUNDING ROSTER
            </Caption>
            <Caption className="hidden sm:block">ISSUED {today}</Caption>
          </div>

          <div className="rule-double mb-10" />

          <div className="max-w-3xl">
            <p className="caption mb-5">A NOTICE TO ATLANTA DRIVERS</p>

            <h1 className="font-display text-[3rem] sm:text-[5.5rem] lg:text-[6.5rem] leading-[0.95] tracking-tight text-ink mb-6">
              Drive on{" "}
              <span className="italic font-display-wonk text-green">
                your terms.
              </span>
            </h1>

            <p className="font-display italic text-2xl sm:text-3xl text-ink-soft leading-snug mb-6 max-w-2xl">
              Join Atlanta&rsquo;s verified driver network. Get ride requests
              straight to your inbox. Keep every dollar you earn.
            </p>
            <p className="text-ink-muted text-base mb-10 max-w-2xl">
              No app. No commission. No boss. Just you, the road, and a
              dispatch desk watching your back.
            </p>

            <Link
              href="/drivers/verify"
              className="group inline-flex items-center gap-3 bg-green hover:bg-green-dark text-black font-semibold px-7 py-4 rounded-sm tracking-wide transition-all"
            >
              <Shield size={18} />
              Start Driver Spotlight &mdash; $5/mo
              <ArrowRight
                size={18}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
            <p className="caption mt-4">
              Verification required &middot; Upload docs, subscribe, go live.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FORM + OFFER ================= */}
      <section className="px-4 pb-20 border-t border-[var(--rule)] pt-20">
        <div className="max-w-6xl mx-auto">
          <SectionMasthead
            bulletinNo="01"
            label="SUBMIT YOUR INTEREST"
            date={today}
          />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <Caption className="mb-3">FORM A &middot; COMMUNITY INTAKE</Caption>
              <h2 className="font-display text-3xl text-ink mb-3 tracking-tight">
                Drop your info.
              </h2>
              <p className="text-ink-soft mb-8 leading-relaxed">
                Tell us where you drive and when you&rsquo;re out. We&rsquo;ll
                add you to the free Telegram wire and follow up about
                verification.
              </p>
              <DriverForm />
            </div>

            <div className="space-y-8">
              <div>
                <Caption className="mb-3">
                  FORM B &middot; DRIVER SPOTLIGHT
                </Caption>
                <h2 className="font-display text-3xl text-ink mb-3 tracking-tight">
                  Driver Spotlight &mdash; launching now.
                </h2>
                <p className="text-ink-soft leading-relaxed">
                  One paid product. One clear path. Upload your documents at the
                  verification portal, subscribe to Driver Spotlight for $5/mo,
                  and once Sean approves your docs your featured listing goes
                  live on the Roster.
                </p>
              </div>

              <div className="border border-[var(--rule)] bg-[#111] p-7 relative">
                <div className="absolute -top-3 left-6">
                  <span className="stamp bg-[#0a0a0a]">
                    FOUNDING RATE
                  </span>
                </div>

                <div className="flex items-end justify-between mb-6 pt-2">
                  <div>
                    <div className="caption mb-1">MEMBERSHIP</div>
                    <span className="font-display text-2xl text-ink tracking-tight">
                      Driver Spotlight
                    </span>
                  </div>
                  <span className="font-display text-4xl text-green italic tracking-tight">
                    $5<span className="text-lg text-ink-muted not-italic">/mo</span>
                  </span>
                </div>

                <ul className="space-y-3 text-sm text-ink-soft">
                  {[
                    { icon: Shield, text: "Full document verification (required)" },
                    { icon: BadgeCheck, text: "Verified driver badge" },
                    { icon: TrendingUp, text: "Featured Spotlight on the Roster" },
                    { icon: Mail, text: "Instant ride alerts to your email" },
                    { icon: CheckCircle, text: "Keep 100% of every fare — no commissions" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <Icon size={15} className="text-green shrink-0 mt-0.5" />
                        <span>{item.text}</span>
                      </li>
                    );
                  })}
                </ul>

                <p className="caption mt-6 normal-case tracking-normal text-[11px]">
                  Founding rate. Increases to $12/mo after beta. Lock it in now.
                </p>

                <Link
                  href="/drivers/verify"
                  className="mt-5 block w-full text-center bg-green text-black font-semibold py-3 px-6 rounded-sm hover:bg-green-dark transition-colors tracking-wide"
                >
                  Start Verification &rarr; Get Spotlight
                </Link>
                <p className="caption mt-3 text-center normal-case tracking-normal text-[11px]">
                  Docs first, payment second &mdash; both required to go live.
                </p>
              </div>

              <div className="border-l-2 border-green pl-5 py-2">
                <Caption className="mb-3">THE PROCESS</Caption>
                <ol className="space-y-3 text-sm text-ink-soft">
                  {[
                    "Upload license, registration, and insurance at the verification portal.",
                    "Subscribe to Driver Spotlight ($5/mo) on the confirmation screen.",
                    "Sean reviews your docs within 24 hours.",
                    "Spotlight goes live on the Roster. Ride alerts start flowing.",
                  ].map((step, i) => (
                    <li key={i} className="flex items-baseline gap-3">
                      <span className="caption caption-green shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PULL QUOTE ================= */}
      <section className="py-10 px-4 border-t border-[var(--rule)]">
        <PullQuote attribution="Sean Broughton, Founder">
          &ldquo;I built this for my neighbors. Every driver on the roster is
          someone I&rsquo;d put my own family in the car with.&rdquo;
        </PullQuote>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-20 px-4 border-t border-[var(--rule)] bg-paper">
        <div className="max-w-4xl mx-auto">
          <SectionMasthead bulletinNo="02" label="COMMON QUESTIONS" />

          <div className="mt-10">
            <h2 className="font-display text-4xl sm:text-5xl text-ink tracking-tight leading-[1.05] mb-12">
              The answers,{" "}
              <span className="italic font-display-wonk text-green">
                on record.
              </span>
            </h2>

            <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {[
                {
                  q: "Why is there a membership fee?",
                  a: "The membership fee keeps the network high-quality and organized. It weeds out tire-kickers and ensures every driver in the network is serious. You're investing in a verified, trusted platform that riders rely on.",
                },
                {
                  q: "What's included in the membership?",
                  a: "Instant ride request email dispatch, a verified driver badge, priority listing on the Roster, and access to the verified driver network. You keep 100% of every fare — we never take commissions.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Yes. Cancel through your Stripe dashboard at any time. No contracts, no cancellation fees.",
                },
                {
                  q: "What if I'm already in the Telegram group?",
                  a: "The free Telegram wire stays open for community chat and ride requests. The paid membership adds email dispatch, verified status, and priority listing — the tools that actually help you get rides.",
                },
                {
                  q: "Why $5/mo? Will it go up?",
                  a: "We're in beta. $5/mo is the founding member rate. Once we hit our targets, the price increases to $12/mo. Founding members keep their $5 rate as long as they stay subscribed.",
                },
              ].map((item, i) => (
                <details
                  key={i}
                  className="group py-6"
                >
                  <summary className="flex items-start gap-4 cursor-pointer list-none">
                    <span className="caption caption-green shrink-0 mt-1">
                      Q.{String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl text-ink tracking-tight leading-tight flex-1 group-open:text-green transition-colors">
                      {item.q}
                    </h3>
                    <span className="caption group-open:rotate-45 transition-transform text-2xl leading-none">
                      +
                    </span>
                  </summary>
                  <p className="text-ink-soft leading-relaxed mt-4 pl-12 text-base">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 px-4 border-t border-[var(--rule)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green/[0.02] to-green/[0.05]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-green mb-4">
            <Clock size={16} />
            <Caption className="caption-green">Founding rate won&rsquo;t last forever</Caption>
          </div>

          <h2 className="font-display text-5xl sm:text-6xl text-ink tracking-tight leading-[1.05] mb-6">
            Lock in $5/mo{" "}
            <span className="italic font-display-wonk text-green">
              before it&rsquo;s $12.
            </span>
          </h2>
          <p className="text-ink-soft text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Founding members keep $5/mo for life. Verification required &mdash;
            upload docs, subscribe, you&rsquo;re live once Sean approves.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/drivers/verify"
              className="inline-flex items-center justify-center gap-2 bg-green text-black font-semibold py-4 px-7 rounded-sm hover:bg-green-dark transition-colors tracking-wide"
            >
              <BadgeCheck size={18} />
              Start Driver Spotlight &mdash; $5/mo
            </Link>
            <ScrollToTop label="Join Community Waitlist" />
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
