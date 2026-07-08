import {
  Shield,
  Mail,
  BadgeCheck,
  TrendingUp,
  Star,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { DriverForm } from "@/components/driver-form";
import { ScrollToTop } from "@/components/scroll-to-top";

export default function DriversPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green/10 text-green px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star size={16} />
            Founding Member Rate — Limited Time
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
            Drive on <span className="text-green">Your Terms</span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Join Atlanta&apos;s verified driver network. Get ride requests sent
            straight to your inbox. Keep every dollar you earn.
          </p>
          <p className="text-gray-400 mb-6">
            No app. No commission. No boss. Just you and the road.
          </p>
          <Link
            href="/drivers/verify"
            className="inline-flex items-center gap-2 bg-green hover:bg-green-dark text-black font-bold px-6 py-3 rounded-xl transition-colors"
          >
            <Shield size={18} />
            Start Driver Spotlight — $5/mo
            <ArrowRight size={16} />
          </Link>
          <p className="text-gray-500 text-sm mt-3">
            Verification required. Upload docs → subscribe → go live.
          </p>
        </div>
      </section>

      {/* Two Column: Form + Benefits */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Signup Form */}
          <div>
            <DriverForm />
          </div>

          {/* Benefits + Upgrade Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Driver Spotlight — Launching Now
              </h2>
              <p className="text-gray-400 mb-6">
                One paid product, one clear path. Upload your documents at the
                <span className="text-green font-medium"> verification portal</span>,
                subscribe to Driver Spotlight for $5/mo, and once Sean approves your
                docs your featured listing goes live on Meet the Drivers.
              </p>
            </div>

            <div className="bg-[#1f1f1f] rounded-2xl p-6 border border-green/30 relative">
              <div className="absolute -top-3 right-4">
                <span className="bg-green text-black text-xs font-bold px-3 py-1 rounded-full">
                  FOUNDING RATE
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-bold text-lg">Driver Spotlight</span>
                <span className="text-green font-bold text-xl">$5/mo</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green" />
                  Access to the drivers&apos; community group on Telegram
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={14} className="text-green" />
                  Full document verification (required for listing)
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck size={14} className="text-green" />
                  Verified driver badge
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-green" />
                  Featured Spotlight placement on Meet the Drivers
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-green" />
                  Instant ride alerts to your email
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green" />
                  Keep 100% of every fare — no commissions
                </li>
              </ul>
              <p className="text-xs text-gray-400 mt-4">
                Founding rate. Increases to $12/mo after beta. Lock it in now.
              </p>
              <Link
                href="/drivers/verify"
                className="mt-4 block w-full text-center bg-green text-black font-bold py-3 px-6 rounded-xl hover:bg-green/90 transition-colors"
              >
                Start Verification → Get Spotlight
              </Link>
              <p className="text-[11px] text-gray-500 mt-2 text-center">
                Docs first, payment second — both required to go live.
              </p>
            </div>

            <div className="bg-[#1f1f1f] rounded-2xl p-6 border border-white/5">
              <h3 className="text-white font-bold mb-3">How Driver Spotlight works:</h3>
              <ol className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
                <li>Upload license, registration, and insurance at the verification portal</li>
                <li>Subscribe to Driver Spotlight ($5/mo) on the confirmation screen</li>
                <li>Your personal invite to the drivers&apos; group arrives by email within a minute</li>
                <li>Sean reviews your docs within 24 hours</li>
                <li>Your Spotlight listing goes live on Meet the Drivers and ride alerts start flowing</li>
              </ol>
              <p className="text-xs text-gray-500 mt-4">
                Not ready to upload docs yet? The form on the left gets you membership
                first — group access and ride dispatches for $5/mo. You can verify for
                your public listing whenever you&apos;re ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-14">
            Common Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Why is there a membership fee?",
                a: "The membership fee keeps the network high-quality and organized. It weeds out tire-kickers and ensures every driver in the network is serious. You're investing in a verified, trusted platform that riders rely on.",
              },
              {
                q: "What's included in the membership?",
                a: "Access to the drivers' community group on Telegram, instant ride request email dispatch, a verified driver badge (after doc verification), and priority listing on our website. You keep 100% of every fare — we never take commissions.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. Cancel through your Stripe dashboard at any time. No contracts, no cancellation fees.",
              },
              {
                q: "What if I'm already in the Telegram group?",
                a: "The group is moving to paid driver membership. If you joined as a founding driver, activate your $5/mo membership to keep your spot — you'll be grandfathered at the founding rate. Riders always ride free and keep full group access.",
              },
              {
                q: "Why $5/mo? Will it go up?",
                a: "We're in beta. $5/mo is the founding member rate. Once we hit our targets, the price increases to $12/mo. But founding members keep their $5 rate as long as they stay subscribed.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#1f1f1f] rounded-xl p-6 border border-white/5"
              >
                <h3 className="text-white font-bold mb-2">{item.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#111111] to-[#0f1a0f]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-gold mb-4">
            <Clock size={20} />
            <span className="font-medium">
              Founding rate won&apos;t last forever
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Lock In $5/mo Before It&apos;s $12
          </h2>
          <p className="text-gray-400 mb-8">
            Founding members keep $5/mo for life. Verification required — upload
            docs, subscribe, and you&apos;re live once Sean approves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/drivers/verify"
              className="inline-flex items-center justify-center gap-2 bg-green text-black font-bold py-3 px-8 rounded-xl hover:bg-green/90 transition-colors"
            >
              <BadgeCheck size={18} />
              Start Driver Spotlight — $5/mo
            </Link>
            <ScrollToTop label="Join Community Waitlist" />
          </div>
        </div>
      </section>
    </div>
  );
}
