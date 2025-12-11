import Providers from "@/components/providers";
import { ProgressBar } from "@/components/progress-bar";
import { TConfig } from "@/stores/config";
import { env } from "@/constants/env";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Suspense } from "react";
import "@/styles/globals.css";
import "@bprogress/core/css";

const fontInter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const fontPoppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_FE_URL),
  title: "Nodewave",
  description: "Node Solusi Indonesia",
  openGraph: {
    title: "Nodewave",
    description: "Node Solusi Indonesia",
    url: "https://nodewave.id",
    images: [
      {
        url: "/banner.png",
        alt: "Nodewave",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nodewave",
    description: "Node Solusi Indonesia",
    images: [
      {
        url: "/banner.png",
        alt: "Nodewave",
      },
    ],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = {
    title: metadata?.title,
    description: metadata?.description,
  };

  return (
    <html lang="en">
      <body
        className={`${fontInter.variable} ${fontPoppins.variable} font-inter antialiased`}
      >
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        <Providers config={config as TConfig}>{children}</Providers>
      </body>
    </html>
  );
}
