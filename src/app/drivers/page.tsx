import {
  Shield,
  Mail,
  BadgeCheck,
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  Clock,
} from "lucide-react";

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

      {/* Pricing Card */}
      <section className="px-4 pb-20">
        <div className="max-w-lg mx-auto">
          <div className="bg-gradient-to-b from-[#1f1f1f] to-[#161616] rounded-3xl border border-green/20 overflow-hidden shadow-2xl shadow-green/5">
            <div className="bg-green/10 px-8 py-4 border-b border-green/20">
              <div className="flex items-center justify-between">
                <span className="text-green font-bold text-sm uppercase tracking-wider">
                  Founding Driver Membership
                </span>
                <span className="bg-green text-black text-xs font-bold px-3 py-1 rounded-full">
                  BETA
                </span>
              </div>
            </div>

            <div className="px-8 py-10">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-black text-white">$5</span>
                <span className="text-gray-400 text-lg">/month</span>
              </div>
              <p className="text-gray-400 text-sm mb-1">
                Founding rate. Increases to{" "}
                <span className="text-white font-medium">$12/mo</span> after
                beta.
              </p>
              <p className="text-green text-sm font-medium mb-8">
                Lock in your rate today.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  {
                    icon: Mail,
                    title: "Instant Ride Alerts",
                    desc: "Every ride request sent to your email as it comes in",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Verified Driver Badge",
                    desc: "Build trust with riders — they know you're legit",
                  },
                  {
                    icon: TrendingUp,
                    title: "Priority Listing",
                    desc: "Featured on our website for riders to find you",
                  },
                  {
                    icon: Shield,
                    title: "Verified Network",
                    desc: "Only paid, vetted members get ride dispatch",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green/10 rounded-lg flex items-center justify-center shrink-0">
                      <item.icon className="text-green" size={20} />
                    </div>
                    <div>
                      <div className="text-white font-medium">{item.title}</div>
                      <div className="text-gray-400 text-sm">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={STRIPE_PAYMENT_LINK}
                className="block w-full bg-green hover:bg-green-dark text-black font-bold py-4 rounded-xl text-lg text-center transition-all hover:scale-[1.02]"
              >
                Join Now — $5/mo
              </a>

              <p className="text-gray-400 text-xs text-center mt-4">
                Cancel anytime. Secure payment via Stripe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Onboarding Works */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-14">
            How to Get Started
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-white font-bold mb-2">Pay Membership</h3>
              <p className="text-gray-400 text-sm">
                Click the join button above. Secure checkout through Stripe.
                $5/mo founding rate.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-white font-bold mb-2">Get Verified</h3>
              <p className="text-gray-400 text-sm">
                We&apos;ll confirm your payment and add you to the verified
                driver network within 24 hours.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green text-black rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-white font-bold mb-2">Start Earning</h3>
              <p className="text-gray-400 text-sm">
                Ride requests go straight to your email. Accept what works for
                you. Keep 100% of every fare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
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
      <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#0f1a0f]">
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
            Join now and keep the founding rate as long as you&apos;re a member.
          </p>
          <a
            href={STRIPE_PAYMENT_LINK}
            className="inline-flex items-center gap-2 bg-green hover:bg-green-dark text-black font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
          >
            Become a Verified Driver <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
