import Providers from "@/components/providers";
import { ProgressBar } from "@/components/progress-bar";
import { TConfig } from "@/stores/config";
import { env } from "@/constants/env";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Suspense } from "react";
import "@/styles/globals.css";
import "@bprogress/core/css";

const fontPoppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_FE_URL),
  title: "CAK Investment Club",
  description: "Your learning investment community",
  openGraph: {
    title: "CAK Investment Club",
    description: "Your learning investment community",
    url: "https://cakinvestmentclub.com/",
    images: [
      {
        url: "/banner.png",
        alt: "CAK Investment Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CAK Investment Club",
    description: "Your learning investment community",
    images: [
      {
        url: "/banner.png",
        alt: "CAK Investment Club",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
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
      <body className={`${fontPoppins.variable} font-poppins antialiased`}>
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        <Providers config={config as TConfig}>{children}</Providers>
      </body>
    </html>
  );
}
