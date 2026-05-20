import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TruthMarket — AI-Powered Prediction Markets on GenLayer",
  description:
    "The world's first prediction market where outcomes are resolved autonomously by AI Validators on GenLayer. No oracles, no humans — just AI consensus.",
  keywords: "prediction market, AI, GenLayer, blockchain, betting, decentralized",
  openGraph: {
    title: "TruthMarket — AI-Powered Prediction Markets",
    description: "Markets resolved by autonomous AI consensus on GenLayer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
