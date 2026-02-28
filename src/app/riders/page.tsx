import {
  MessageCircle,
  DollarSign,
  Shield,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { RiderForm } from "@/components/rider-form";
import { ScrollToTop } from "@/components/scroll-to-top";

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
            verified local drivers who know Atlanta.
          </p>
          <p className="text-gray-400 mb-10">
            Always free for riders. Sign up and we&apos;ll send you the invite.
          </p>
        </div>
      </section>

      {/* Two Column: Form + Info */}
      <section className="px-4 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Signup Form */}
          <div>
            <RiderForm />
          </div>

          {/* How It Works */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                How It Works
              </h2>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green text-black rounded-full flex items-center justify-center shrink-0 text-lg font-bold">
                1
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Sign Up Here</h3>
                <p className="text-gray-400 text-sm">
                  Fill out the form with your info. Takes 30 seconds.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green text-black rounded-full flex items-center justify-center shrink-0 text-lg font-bold">
                2
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Check Your Email</h3>
                <p className="text-gray-400 text-sm">
                  You&apos;ll get a welcome email with the Telegram group invite link.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green text-black rounded-full flex items-center justify-center shrink-0 text-lg font-bold">
                3
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Post Your Ride Request</h3>
                <p className="text-gray-400 text-sm">
                  Drop your pickup, destination, and time in the group. A verified driver will respond.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green text-black rounded-full flex items-center justify-center shrink-0 text-lg font-bold">
                4
              </div>
              <div>
                <h3 className="text-white font-bold mb-1">Pay Cash</h3>
                <p className="text-gray-400 text-sm">
                  Agree on price with your driver. Pay cash. No app fees. No surge.
                </p>
              </div>
            </div>

            {/* Posting Template */}
            <div className="bg-[#1f1f1f] rounded-2xl p-6 border border-white/10">
              <h3 className="text-green font-bold text-sm uppercase tracking-wider mb-4">
                Ride Request Format
              </h3>
              <div className="font-mono text-sm text-gray-300 space-y-1">
                <p><span className="text-gray-500">From:</span> [Pickup location]</p>
                <p><span className="text-gray-500">To:</span> [Destination]</p>
                <p><span className="text-gray-500">When:</span> [Date & time]</p>
                <p><span className="text-gray-500">Riders:</span> [Number of people]</p>
                <p><span className="text-gray-500">Budget:</span> [What you can pay]</p>
                <p><span className="text-gray-500">Contact:</span> [Phone or DM]</p>
              </div>
              <p className="text-gray-400 text-xs mt-3">
                Use this template in the Telegram group for fastest response.
              </p>
            </div>
          </div>
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
            Sign up above and check your email for the Telegram invite. Your first ride is minutes away.
          </p>
          <ScrollToTop label="Sign Up — Free" />
        </div>
      </section>
    </div>
  );
}
