import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Cash Rides ATL"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-white">
                Cash Rides <span className="text-green">ATL</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Atlanta&apos;s community ride network. Connecting riders with
              verified local drivers.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Links</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/drivers"
                className="text-gray-400 hover:text-green text-sm transition-colors"
              >
                Driver Membership
              </Link>
              <Link
                href="/riders"
                className="text-gray-400 hover:text-green text-sm transition-colors"
              >
                Request a Ride
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-green text-sm transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-green text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://t.me/+b3_v1rIaub82NzVh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green text-sm transition-colors"
              >
                Telegram Group
              </a>
              <a
                href="mailto:cashridesatl@agentmail.to"
                className="text-gray-400 hover:text-green text-sm transition-colors"
              >
                cashridesatl@agentmail.to
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Cash Rides ATL. All rights
            reserved. Cash Rides ATL is a technology platform that operates as a
            community bulletin board / directory service only. We are not a
            transportation company.{" "}
            <Link href="/terms" className="text-green hover:underline">
              Full Terms
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
