import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  DollarSign,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt="Atlanta skyline"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-[#0a0a0a]/40 to-[#0a0a0a]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20">
          <div className="mb-6">
            <Image
              src="/logo.jpg"
              alt="Cash Rides ATL"
              width={120}
              height={120}
              className="rounded-2xl mx-auto shadow-2xl shadow-green/20"
              priority
            />
          </div>

          <h1 className="text-5xl sm:text-7xl font-black text-white mb-6 leading-tight">
            Cash Rides{" "}
            <span className="text-green">ATL</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Atlanta&apos;s Verified Driver Network
          </p>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Real drivers. Real community. No middleman. Connect directly with
            verified local drivers who know ATL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/drivers"
              className="bg-green hover:bg-green-dark text-black font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              Become a Driver <ArrowRight size={20} />
            </Link>
            <Link
              href="/riders"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all border border-white/20"
            >
              Need a Ride?
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-green text-sm font-medium">
            <Shield size={16} />
            <span>Founding Member Rate: $5/mo (increases to $12 after beta)</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-center mb-14 max-w-xl mx-auto">
            Simple, direct, and built for Atlanta.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1f1f1f] rounded-2xl p-8 border border-white/5 text-center">
              <div className="w-14 h-14 bg-green/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Users className="text-green" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                1. Join the Network
              </h3>
              <p className="text-gray-400">
                Drivers join as verified members. Riders join the free Telegram
                community.
              </p>
            </div>

            <div className="bg-[#1f1f1f] rounded-2xl p-8 border border-white/5 text-center">
              <div className="w-14 h-14 bg-green/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Zap className="text-green" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                2. Ride Requests Go Out
              </h3>
              <p className="text-gray-400">
                When someone needs a ride, our system alerts all verified
                drivers instantly via email.
              </p>
            </div>

            <div className="bg-[#1f1f1f] rounded-2xl p-8 border border-white/5 text-center">
              <div className="w-14 h-14 bg-green/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <DollarSign className="text-green" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                3. Connect Directly
              </h3>
              <p className="text-gray-400">
                Driver and rider connect directly. Cash payment. No app fees. No
                surge pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 px-4 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-14">
            Why Drivers Choose Cash Rides ATL
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              "Keep 100% of your fares — no commissions",
              "Instant ride alerts sent to your email",
              "Verified driver badge for trust and credibility",
              "Cash payments — get paid same day",
              "No app downloads or complicated onboarding",
              "Growing community of Atlanta riders",
              "Priority listing on our website",
              "Founding member rate locked in",
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

          <div className="text-center mt-12">
            <Link
              href="/drivers"
              className="bg-green hover:bg-green-dark text-black font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              Join as a Driver <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-14">
            The ATL Network
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-black text-green mb-2">17+</div>
              <div className="text-gray-400">Community Members</div>
            </div>
            <div>
              <div className="text-4xl font-black text-green mb-2">24/7</div>
              <div className="text-gray-400">Ride Request Dispatch</div>
            </div>
            <div>
              <div className="text-4xl font-black text-green mb-2">$0</div>
              <div className="text-gray-400">Commission on Fares</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#0f1a0f]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Roll?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Whether you drive or ride, Cash Rides ATL keeps it simple. No apps.
            No surge. Just community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/drivers"
              className="bg-green hover:bg-green-dark text-black font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
            >
              Driver Membership — $5/mo
            </Link>
            <Link
              href="/riders"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all border border-white/20"
            >
              Request a Ride — Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
