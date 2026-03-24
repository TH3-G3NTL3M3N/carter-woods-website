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

export const metadata: Metadata = {
  title: "Carter Woods — Canadian XC Mountain Bike",
  description:
    "Official website of Carter Woods. 5x World Cup winner, 6x Canadian National Champion. Giant Factory Off-Road Team.",
  openGraph: {
    title: "Carter Woods — Canadian XC Mountain Bike",
    description: "5x World Cup winner. Cumberland, BC to the world stage.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebas.variable} ${jetbrains.variable}`}>
      <body className="bg-bg text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
