import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[var(--rule)] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Colophon mast */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="caption mb-3">THE COLOPHON</span>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              alt="Cash Rides ATL"
              width={40}
              height={40}
              className="rounded-sm border border-[var(--rule)]"
            />
            <span className="font-display text-2xl tracking-tight text-ink">
              Cash Rides <span className="text-green italic">ATL</span>
            </span>
          </div>
          <p className="font-display italic text-ink-soft max-w-xl text-lg leading-snug">
            A community ride directory, published from a dispatch desk in
            Atlanta, Georgia.
          </p>
        </div>

        <div className="rule-double mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="caption mb-3">Sections</div>
            <div className="flex flex-col gap-2">
              <Link href="/drivers" className="text-ink-soft hover:text-green transition-colors">
                Drivers
              </Link>
              <Link href="/drivers/meet" className="text-ink-soft hover:text-green transition-colors">
                The Roster
              </Link>
              <Link href="/riders" className="text-ink-soft hover:text-green transition-colors">
                Riders
              </Link>
              <Link href="/about" className="text-ink-soft hover:text-green transition-colors">
                About
              </Link>
            </div>
          </div>

          <div>
            <div className="caption mb-3">The Desk</div>
            <div className="flex flex-col gap-2">
              <a
                href="https://t.me/+b3_v1rIaub82NzVh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-soft hover:text-green transition-colors"
              >
                Telegram Wire
              </a>
              <a
                href="mailto:cashridesatl@agentmail.to"
                className="text-ink-soft hover:text-green transition-colors"
              >
                Dispatch Inbox
              </a>
              <Link href="/drivers/verify" className="text-ink-soft hover:text-green transition-colors">
                Submit Documents
              </Link>
            </div>
          </div>

          <div>
            <div className="caption mb-3">Notices</div>
            <div className="flex flex-col gap-2">
              <Link href="/terms" className="text-ink-soft hover:text-green transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          <div>
            <div className="caption mb-3">Published</div>
            <div className="text-ink-soft leading-relaxed">
              Atlanta, GA
              <br />
              Daily dispatch
              <br />
              <span className="caption caption-green mt-2 inline-block">
                EST. 2026
              </span>
            </div>
          </div>
        </div>

        <div className="rule-top mt-10 pt-6">
          <p className="caption leading-relaxed text-center max-w-3xl mx-auto normal-case tracking-normal text-[11px]">
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
