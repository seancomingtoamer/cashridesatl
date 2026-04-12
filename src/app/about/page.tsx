import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Users, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 leading-tight">
              Built for <span className="text-green">Atlanta</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Cash Rides ATL started from a simple idea: Atlanta deserves a ride
              network that actually works for the people who live here.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden mb-14 h-64 sm:h-80">
            <Image
              src="/hero-bg.png"
              alt="Atlanta skyline"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8 text-gray-300 text-lg leading-relaxed">
            <p>
              The big ride apps take 25-40% of every fare. Surge pricing hits
              when you need a ride most. And if you&apos;re a driver, you&apos;re
              working for an algorithm — not yourself.
            </p>
            <p>
              Cash Rides ATL flips that. We connect Atlanta riders directly with
              local drivers. No middleman taking a cut. No surge pricing. No
              corporate algorithms deciding what you earn.
            </p>
            <p>
              We&apos;re not trying to replace Uber or Lyft. We&apos;re building
              something different — a{" "}
              <span className="text-white font-semibold">
                community-powered network
              </span>{" "}
              where drivers keep 100% of their fares and riders pay fair prices.
            </p>
            <p>
              Our verified membership model keeps the network safe and
              organized. Paid drivers are committed, vetted, and trusted by the
              community. Riders know they&apos;re connecting with real people,
              not anonymous strangers.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-[#111111] mt-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-14">
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-green/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Heart className="text-green" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Community First
              </h3>
              <p className="text-gray-400">
                We exist because of Atlanta&apos;s people. Every decision we
                make puts the community&apos;s needs first.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-green/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <MapPin className="text-green" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Atlanta Born
              </h3>
              <p className="text-gray-400">
                Built in Atlanta, for Atlanta. Our drivers know the city because
                they live here.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-green/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Users className="text-green" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Fair for Everyone
              </h3>
              <p className="text-gray-400">
                Drivers keep every dollar. Riders pay fair prices. No one gets
                squeezed by algorithms or surge fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join the Movement
          </h2>
          <p className="text-gray-400 mb-8">
            We&apos;re just getting started. Be part of Atlanta&apos;s
            community ride network.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/drivers"
              className="inline-flex items-center justify-center gap-2 bg-green hover:bg-green-dark text-black font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105"
            >
              Drive with Us <ArrowRight size={20} />
            </Link>
            <Link
              href="/riders"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all border border-white/20"
            >
              Ride with Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
