import "./globals.css";
import type { Metadata } from "next";
import { Anton } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";

import Header from "@/components/Header";
import { ThemeProvider } from "./theme-provider";

const anton = Anton({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "My App Title",
  description: "My app description",
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
