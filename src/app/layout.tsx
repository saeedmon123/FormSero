import type { Metadata } from "next";
import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://formsero.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Beyond the Prompt — Build Exceptional Websites with Claude Code | FORMSERO",
  description:
    "Beyond the Prompt is the professional Claude Code system for building exceptional websites: design intelligence, component research, motion architecture, and 3D — not another prompt collection.",
  openGraph: {
    title: "Beyond the Prompt — FORMSERO",
    description:
      "The professional Claude Code system for building exceptional websites. Design intelligence, motion architecture, and 3D — beyond the prompt.",
    url: siteUrl,
    siteName: "FORMSERO",
    images: ["/images/og.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond the Prompt — FORMSERO",
    description:
      "The professional Claude Code system for building exceptional websites.",
    images: ["/images/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-ivory selection:bg-signal selection:text-black">
        <CustomCursor />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
