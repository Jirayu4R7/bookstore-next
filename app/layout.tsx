import type { Metadata } from "next";
import { Noto_Sans_Thai, Mitr } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/footer";
import NavBar from "@/app/components/navbar";
import siteMetadata from "@/lib/data/siteMetadata";
import { Toaster } from "@/app/components/ui/toaster";
import StoreProvider from "./StoreProvider";
import WishlistStore from "./wishlist/ui/wishlist-store";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai"],
  display: "swap",
});

const mitr = Mitr({
  variable: "--font-mitr",
  subsets: ["thai"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `${siteMetadata.titleTemplate} | %s `,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "th-TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "กองดอง - Your Ultimate Destination for Books",
      template: "%s | กองดอง",
    },
    description:
      "Discover your next favorite book at กองดอง! Browse our wide selection of bestsellers, new releases, and rare finds. Feed your reading passion!",
    creator: "@SatNaingDev",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/default-og.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/icon.png`,
    shortcut: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/favicon.ico`,
    apple: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/apple-touch-icon.png`,
    other: [
      {
        rel: "icon",
        sizes: "16x16",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/favicon-16x16.png`,
      },
      {
        rel: "icon",
        sizes: "32x32",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/favicon-32x32.png`,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={`${notoSansThai.variable} ${mitr.variable}`}>
          <div className="flex min-h-screen flex-col">
            <WishlistStore />
            <NavBar />
            <Toaster />
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
