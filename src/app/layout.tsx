import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = "https://carterwoods.cc";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Carter Woods — Canadian XC Mountain Bike",
  description:
    "Official website of Carter Woods. 7x World Cup winner, 6x Canadian National Champion. Giant Factory Off-Road Team. Cumberland, BC.",
  keywords: [
    "Carter Woods",
    "mountain bike",
    "XC",
    "cross country",
    "MTB",
    "Giant Factory Off-Road Team",
    "Canadian cyclist",
    "World Cup",
    "Cumberland BC",
    "XCO",
    "XCC",
  ],
  authors: [{ name: "Carter Woods" }],
  creator: "Carter Woods",
  openGraph: {
    title: "Carter Woods — Canadian XC Mountain Bike",
    description:
      "7x World Cup winner. 6x National Champion. Cumberland, BC to the world stage.",
    url: siteUrl,
    siteName: "Carter Woods",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Carter Woods crossing the finish line at Albstadt, arms spread wide",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carter Woods — Canadian XC Mountain Bike",
    description:
      "7x World Cup winner. 6x National Champion. Cumberland, BC to the world stage.",
    images: ["/og-image.jpg"],
    creator: "@carterwoodsrace",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Carter Woods",
              url: siteUrl,
              image: `${siteUrl}/og-image.jpg`,
              jobTitle: "Professional Mountain Bike Racer",
              description:
                "Canadian XC mountain bike racer. 7x World Cup winner, 6x National Champion. Giant Factory Off-Road Team.",
              birthDate: "2001-12-21",
              birthPlace: {
                "@type": "Place",
                name: "Cumberland, British Columbia, Canada",
              },
              nationality: {
                "@type": "Country",
                name: "Canada",
              },
              affiliation: {
                "@type": "SportsTeam",
                name: "Giant Factory Off-Road Team",
              },
              sameAs: [
                "https://www.instagram.com/carterwoodsmtb/",
                "https://x.com/carterwoodsrace",
              ],
              sport: "Cross-country mountain biking",
            }),
          }}
        />
      </head>
      <body className="bg-bg text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
