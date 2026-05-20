import type { Metadata, Viewport } from "next";
import { AppSplash } from "@/components/layout/AppSplash";
import { ServiceWorkerRegister } from "@/components/layout/ServiceWorkerRegister";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.changupmoa.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "전국창업모아 | 창업 매물·AI추천·상담 신청",
    template: "%s | 전국창업모아",
  },
  description:
    "전국 프랜차이즈 양도양수 실매물을 지역, 업종, 월매출, 권리금 기준으로 검색하고 창업 상담을 신청하는 사이트입니다.",
  applicationName: "전국창업모아",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/app-icon.svg",
    apple: "/brand/brand-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "전국창업모아",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "전국창업모아 | 창업 매물·AI추천·상담 신청",
    description:
      "전국 프랜차이즈 양도양수 실매물을 지역, 업종, 월매출, 권리금 기준으로 검색하고 창업 상담을 신청하는 사이트입니다.",
    url: siteUrl,
    siteName: "전국창업모아",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "전국창업모아 | 창업 매물·AI추천·상담 신청",
    description:
      "전국 프랜차이즈 양도양수 실매물을 지역, 업종, 월매출, 권리금 기준으로 검색하고 창업 상담을 신청하는 사이트입니다.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0647c7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <ServiceWorkerRegister />
        <AppSplash />
        {children}
      </body>
    </html>
  );
}
