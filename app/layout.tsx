// app/layout.tsx
import "./globals.css";
import Providers from "./providers";
import type { Metadata } from "next";
import { Noto_Sans, Orbitron } from "next/font/google";

export const metadata: Metadata = {
  title: "BANMAO RPS — XLayer",
  description: "Play Rock–Paper–Scissors using $BANMAO on XLayer",
};

const noto = Noto_Sans({
  subsets: ["latin", "latin-ext", "vietnamese", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-sans",
});
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-title",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${noto.variable} ${orbitron.variable}`}>
      <head>
        {/* Quan trọng cho mobile modal / deeplink */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
