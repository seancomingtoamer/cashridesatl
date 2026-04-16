import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Script from "next/script";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cash Rides ATL — Atlanta Dispatch Bulletin",
  description:
    "The community ride network for Atlanta. A directory of verified local drivers — no apps, no surge, no middleman. Published from the dispatch desk.",
  keywords: [
    "Atlanta rides",
    "cash rides Atlanta",
    "ATL driver network",
    "community rides",
    "Atlanta transportation",
  ],
  openGraph: {
    title: "Cash Rides ATL — Atlanta Dispatch Bulletin",
    description:
      "The community ride network for Atlanta. A directory of verified local drivers.",
    url: "https://cashridesatl.com",
    siteName: "Cash Rides ATL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G682S5CJMF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G682S5CJMF');
          `}
        </Script>
      </head>
      <body
        className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
