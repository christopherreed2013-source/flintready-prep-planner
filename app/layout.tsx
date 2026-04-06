import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlintReady Prep Planner — Build Your Survival Checklist",
  description:
    "Answer 7 questions and get a personalized emergency preparedness checklist tailored to your household, location, and threat concerns. Free, printable, and built by FlintReady.",
  openGraph: {
    title: "FlintReady Prep Planner",
    description: "Your personalized survival checklist — built in 60 seconds.",
    siteName: "FlintReady",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
