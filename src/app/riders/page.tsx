import {
  MessageCircle,
  DollarSign,
  Shield,
  MapPin,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function RidersPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
            Need a Ride in <span className="text-green">ATL</span>?
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Skip the apps. Skip the surge pricing. Connect directly with
            verified local drivers in our Telegram community.
          </p>
          <p className="text-gray-400 mb-10">
            Always free for riders. No downloads. No accounts. Just ask.
          </p>

          <a
            href="https://t.me/+b3_v1rIaub82NzVh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green hover:bg-green-dark text-black font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
          >
            Join the Telegram Group <ArrowRight size={20} />
          </a>
          <p className="text-gray-400 text-sm mt-4">
            Free to join. Post your ride request anytime.
          </p>
        </div>
      </section>

      {/* How to Request */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-14">
            How to Request a Ride
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-green/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="text-green" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                1. Join Telegram
              </h3>
              <p className="text-gray-400">
                Click the link above to join our free community group. Takes 10
                seconds.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-green/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <MapPin className="text-green" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                2. Post Your Request
              </h3>
              <p className="text-gray-400">
                Share where you&apos;re going, when, and how many riders. Use
                the posting format below.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-green/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <DollarSign className="text-green" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                3. Pay Cash
              </h3>
              <p className="text-gray-400">
                A verified driver responds. Agree on price. Pay cash. No app
                fees. No surge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posting Template */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Ride Request Format
          </h2>
          <div className="bg-[#1f1f1f] rounded-2xl p-8 border border-white/10 font-mono text-sm">
            <div className="text-green mb-1">RIDE REQUEST</div>
            <div className="text-gray-300 space-y-1">
              <p>
                <span className="text-gray-400">From:</span> [Pickup location]
              </p>
              <p>
                <span className="text-gray-400">To:</span> [Destination]
              </p>
              <p>
                <span className="text-gray-400">When:</span> [Date & time]
              </p>
              <p>
                <span className="text-gray-400">Riders:</span> [Number of
                people]
              </p>
              <p>
                <span className="text-gray-400">Budget:</span> [What you can
                pay]
              </p>
              <p>
                <span className="text-gray-400">Contact:</span> [Phone or DM]
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-sm text-center mt-4">
            Copy this template when posting in the Telegram group. The more
            detail, the faster you get a driver.
          </p>
        </div>
      </section>

      {/* Why Cash Rides */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-14">
            Why Riders Love Cash Rides ATL
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              "Always free for riders — no fees ever",
              "No app required — just Telegram",
              "Cash payment — no card on file",
              "No surge pricing or hidden charges",
              "Local drivers who know Atlanta",
              "Direct communication with your driver",
              "Verified driver network for safety",
              "Available 24/7 — post anytime",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle
                  className="text-green shrink-0 mt-0.5"
                  size={20}
                />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Shield className="text-green mx-auto mb-6" size={48} />
          <h2 className="text-3xl font-bold text-white mb-4">Stay Safe</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            We vet our drivers through a paid membership process, but you should
            always take standard safety precautions when meeting anyone new.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
            {[
              "Share your ride details with someone you trust",
              "Verify the driver matches their profile",
              "Agree on price before getting in",
              "Trust your instincts — cancel if something feels off",
            ].map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-[#1f1f1f] rounded-xl p-4 border border-white/5"
              >
                <CheckCircle
                  className="text-green shrink-0 mt-0.5"
                  size={16}
                />
                <span className="text-gray-300 text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#0f1a0f]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Get Your Next Ride
          </h2>
          <p className="text-gray-400 mb-8">
            Join the Telegram group, post your request, and a verified driver
            will respond. It&apos;s that simple.
          </p>
          <a
            href="https://t.me/+b3_v1rIaub82NzVh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green hover:bg-green-dark text-black font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
          >
            Join Telegram — Free <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </div>
  );
}
