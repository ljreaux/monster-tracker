import "./globals.css";
import type { Metadata } from "next";
import { Anton } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";

import Header from "@/components/Header";
import { ThemeProvider } from "./theme-provider";

const anton = Anton({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Monster Tracker",
  description:
    "Track and record your monster sightings with detailed information and D&D 5E data integration.",
  openGraph: {
    title: "Monster Tracker",
    description:
      "Log your monster sightings, view detailed information, and enhance your records with D&D 5E data.",
    url: "https://yourdomain.com/monster-tracker", // Replace with your actual URL
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Monster Tracker",
    description:
      "Track your monster sightings with detailed information and D&D 5E integration.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={anton.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <Header />
            {children}
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
