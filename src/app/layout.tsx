import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import ClientWrapper from "../components/ClientWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LiveGG - Valorant Esports",
  description: "Stay updated with Valorant esports matches, events, and news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>
          <Navbar />
          <main>{children}</main>
        </ClientWrapper>
      </body>
    </html>
  );
}