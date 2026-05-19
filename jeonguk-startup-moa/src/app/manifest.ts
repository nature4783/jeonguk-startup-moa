import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "전국창업모아",
    short_name: "창업모아",
    description: "창업 준비, 커뮤니티, 가이드, 양도양수 매물을 모은 창업 플랫폼",
    lang: "ko-KR",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f6f8fc",
    theme_color: "#0647c7",
    categories: ["business", "productivity", "social"],
    icons: [
      {
        src: "/app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/brand/brand-icon.png",
        sizes: "150x150",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
    ],
    shortcuts: [
      {
        name: "속닥방",
        short_name: "속닥방",
        description: "창업 고민과 후기를 나누는 커뮤니티",
        url: "/community",
        icons: [{ src: "/app-icon.svg", sizes: "any", type: "image/svg+xml" }],
      },
      {
        name: "검수 매물",
        short_name: "매물",
        description: "공개 가능한 범위로 정제된 창업 매물",
        url: "/listings",
        icons: [{ src: "/app-icon.svg", sizes: "any", type: "image/svg+xml" }],
      },
      {
        name: "상담 신청",
        short_name: "상담",
        description: "창업 상담과 상세자료 요청",
        url: "/consultation",
        icons: [{ src: "/app-icon.svg", sizes: "any", type: "image/svg+xml" }],
      },
    ],
  };
}
