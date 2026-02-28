import {
  Shield,
  Mail,
  BadgeCheck,
  TrendingUp,
  Star,
  CheckCircle,
  Clock,
} from "lucide-react";
import { DriverForm } from "@/components/driver-form";
import { ScrollToTop } from "@/components/scroll-to-top";

const STRIPE_PAYMENT_LINK = "#"; // TODO: Replace with Stripe payment link

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
          <p className="text-gray-400 mb-10">
            No app. No commission. No boss. Just you and the road.
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
                Sign Up Free, Then Upgrade
              </h2>
              <p className="text-gray-400 mb-6">
                Every driver starts with a free signup. Once you&apos;re in, upgrade to
                <span className="text-green font-medium"> Verified Driver</span> status
                for $5/mo to unlock ride dispatch and priority listing.
              </p>
            </div>

            <div className="bg-[#1f1f1f] rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-bold">Free Driver</span>
                <span className="text-gray-400 text-sm">$0</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green" />
                  Community Telegram access
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green" />
                  See ride requests in group chat
                </li>
              </ul>
            </div>

            <div className="bg-[#1f1f1f] rounded-2xl p-6 border border-green/20 relative">
              <div className="absolute -top-3 right-4">
                <span className="bg-green text-black text-xs font-bold px-3 py-1 rounded-full">
                  RECOMMENDED
                </span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-bold">Verified Driver</span>
                <span className="text-green font-bold">$5/mo</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green" />
                  Everything in Free
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={14} className="text-green" />
                  Instant ride alerts to your email
                </li>
                <li className="flex items-center gap-2">
                  <BadgeCheck size={14} className="text-green" />
                  Verified driver badge
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-green" />
                  Priority listing on website
                </li>
                <li className="flex items-center gap-2">
                  <Shield size={14} className="text-green" />
                  Verified network access
                </li>
              </ul>
              <p className="text-xs text-gray-400 mt-4">
                Founding rate. Increases to $12/mo after beta. Lock it in now.
              </p>
            </div>

            <div className="bg-[#1f1f1f] rounded-2xl p-6 border border-white/5">
              <h3 className="text-white font-bold mb-3">How it works:</h3>
              <ol className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
                <li>Sign up free with the form</li>
                <li>Get your welcome email with Telegram invite</li>
                <li>Upgrade link in your email to go Verified ($5/mo)</li>
                <li>Start getting ride alerts + verified badge</li>
              </ol>
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
                a: "Instant ride request email dispatch, a verified driver badge, priority listing on our website, and access to the verified driver network. You keep 100% of every fare — we never take commissions.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. Cancel through your Stripe dashboard at any time. No contracts, no cancellation fees.",
              },
              {
                q: "What if I'm already in the Telegram group?",
                a: "The free Telegram group stays open for community chat and ride requests. The paid membership adds email dispatch, verified status, and priority listing — the tools that actually help you get rides.",
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
            Sign up free above, then upgrade to Verified in your welcome email. Founding members keep $5/mo for life.
          </p>
          <ScrollToTop label="Sign Up Now" />
        </div>
      </section>
    </div>
  );
}
