import type { Metadata, Viewport } from "next";
import { AppSplash } from "@/components/layout/AppSplash";
import { ServiceWorkerRegister } from "@/components/layout/ServiceWorkerRegister";
import "./globals.css";

export const metadata: Metadata = {
  title: "전국창업모아",
  description: "창업 준비, 커뮤니티, 가이드, 양도양수 매물을 모은 창업 플랫폼",
  applicationName: "전국창업모아",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/app-icon.svg",
    apple: "/brand/brand-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: "전국창업모아",
    statusBarStyle: "default",
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
