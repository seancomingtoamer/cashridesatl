export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400 mb-12">
            Last updated: February 28, 2026
          </p>

          <div className="space-y-10 text-gray-300 leading-relaxed">
            {/* Platform Disclaimer */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Platform Disclaimer
              </h2>
              <div className="bg-[#1f1f1f] rounded-xl p-6 border border-yellow-500/20 mb-4">
                <p className="text-yellow-400 font-medium mb-3">
                  IMPORTANT — PLEASE READ CAREFULLY
                </p>
                <p className="text-gray-300">
                  Cash Rides ATL (&ldquo;the Platform&rdquo;, &ldquo;we&rdquo;,
                  &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a{" "}
                  <strong className="text-white">
                    technology platform that operates solely as a community
                    bulletin board and directory service
                  </strong>
                  . We are NOT a transportation company, transportation network
                  company (TNC), taxi service, rideshare company, or common
                  carrier of any kind.
                </p>
              </div>
            </section>

            {/* Nature of Service */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Nature of Service
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">1.</span>
                  <span>
                    Cash Rides ATL provides a community bulletin board where
                    individuals can post and view ride requests and driver
                    availability information. We facilitate connections between
                    riders and drivers through our Telegram community and email
                    dispatch system.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">2.</span>
                  <span>
                    We do not employ, contract, manage, supervise, or control any
                    drivers. Drivers listed on our platform are independent
                    individuals who have chosen to subscribe to our directory
                    service.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">3.</span>
                  <span>
                    We do not own, lease, or operate any vehicles used for
                    transportation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">4.</span>
                  <span>
                    All ride arrangements, including pricing, pickup times,
                    routes, and payment, are made directly between riders and
                    drivers. Cash Rides ATL is not a party to any transportation
                    agreement.
                  </span>
                </li>
              </ul>
            </section>

            {/* No Warranties */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                No Warranties or Guarantees
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">1.</span>
                  <span>
                    We do not screen, background check, insure, license, or
                    certify any driver listed on our platform. The
                    &ldquo;Verified&rdquo; badge indicates only that a driver has
                    subscribed to our paid membership — it does not constitute a
                    safety certification, background check, or endorsement.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">2.</span>
                  <span>
                    We make no representations or warranties regarding the
                    safety, reliability, punctuality, quality, or legality of any
                    transportation services arranged through information posted
                    on our platform.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">3.</span>
                  <span>
                    We do not guarantee the availability of drivers, the accuracy
                    of any information posted by users, or the completion of any
                    ride.
                  </span>
                </li>
              </ul>
            </section>

            {/* Assumption of Risk */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Assumption of Risk
              </h2>
              <p className="mb-4">
                By using Cash Rides ATL, you acknowledge and agree that:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">1.</span>
                  <span>
                    You use this platform and arrange rides at your own risk.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">2.</span>
                  <span>
                    You are solely responsible for evaluating the suitability,
                    safety, and trustworthiness of any driver or rider you
                    connect with through this platform.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">3.</span>
                  <span>
                    Cash Rides ATL is not responsible for any personal injury,
                    property damage, theft, accident, dispute, or other loss
                    arising from any ride arranged through information on our
                    platform.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">4.</span>
                  <span>
                    We are not responsible for payment disputes between riders
                    and drivers. All payment terms are between the parties
                    directly.
                  </span>
                </li>
              </ul>
            </section>

            {/* Driver Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Driver Responsibilities
              </h2>
              <p className="mb-4">
                Drivers who subscribe to our membership agree that:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">1.</span>
                  <span>
                    They are solely responsible for maintaining valid
                    driver&apos;s licenses, vehicle registration, insurance, and
                    any other permits or licenses required by applicable law.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">2.</span>
                  <span>
                    They are independent individuals and not employees,
                    contractors, or agents of Cash Rides ATL.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">3.</span>
                  <span>
                    They set their own pricing, schedules, routes, and terms of
                    service. Cash Rides ATL does not control driver pricing or
                    availability.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">4.</span>
                  <span>
                    They are responsible for compliance with all applicable
                    local, state, and federal laws.
                  </span>
                </li>
              </ul>
            </section>

            {/* Membership */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Membership & Payments
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">1.</span>
                  <span>
                    Driver membership is a recurring monthly subscription billed
                    through Stripe. You may cancel at any time.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">2.</span>
                  <span>
                    Membership fees are for access to our directory and dispatch
                    services only. They do not constitute payment for
                    transportation services.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green mt-1">3.</span>
                  <span>
                    Refund requests are handled on a case-by-case basis. Contact
                    us at cashridesatl@agentmail.to.
                  </span>
                </li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Limitation of Liability
              </h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, CASH RIDES ATL, ITS
                OWNERS, OPERATORS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY
                DIRECT, INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE
                PLATFORM OR ANY TRANSPORTATION SERVICES ARRANGED THROUGH
                INFORMATION ON THE PLATFORM. THIS INCLUDES BUT IS NOT LIMITED TO
                PERSONAL INJURY, PROPERTY DAMAGE, THEFT, FRAUD, OR ANY OTHER
                LOSS.
              </p>
            </section>

            {/* Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless Cash Rides ATL, its
                owners, operators, and affiliates from any claims, damages,
                losses, liabilities, and expenses (including legal fees) arising
                from your use of the platform, your violation of these terms, or
                any transportation arrangement you make through the platform.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Changes to Terms
              </h2>
              <p>
                We may update these terms at any time. Continued use of the
                platform after changes are posted constitutes acceptance of the
                new terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Contact
              </h2>
              <p>
                Questions about these terms? Contact us at{" "}
                <a
                  href="mailto:cashridesatl@agentmail.to"
                  className="text-green hover:underline"
                >
                  cashridesatl@agentmail.to
                </a>
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Governing Law
              </h2>
              <p>
                These terms are governed by and construed in accordance with the
                laws of the State of Georgia, without regard to conflict of law
                principles. Any disputes shall be resolved in the courts of
                Fulton County, Georgia.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
