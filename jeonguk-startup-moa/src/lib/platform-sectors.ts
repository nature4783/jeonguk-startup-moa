import {
  BadgeCheck,
  Banknote,
  Building2,
  ClipboardCheck,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export type PlatformSector = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone: string;
  links: {
    label: string;
    href: string;
  }[];
};

export const platformSectors: PlatformSector[] = [
  {
    id: "prepare",
    title: "창업준비",
    eyebrow: "START",
    description: "처음 무엇부터 해야 할지 로드맵과 단계별 가이드로 정리합니다.",
    href: "/roadmap",
    icon: ClipboardCheck,
    tone: "bg-amber-100 text-amber-950",
    links: [
      { label: "내 로드맵", href: "/roadmap" },
      { label: "창업 가이드", href: "/guides" },
    ],
  },
  {
    id: "listing",
    title: "매물·상권",
    eyebrow: "MARKET",
    description: "검수 매물, 후보 비교, 상권 질문을 한 곳에서 확인합니다.",
    href: "/listings",
    icon: Building2,
    tone: "bg-emerald-100 text-emerald-950",
    links: [
      { label: "검수 매물", href: "/listings" },
      { label: "비교함", href: "/compare" },
    ],
  },
  {
    id: "money",
    title: "자금·지원",
    eyebrow: "MONEY",
    description: "권리금, 운영자금, 정책자금, 지원사업 정보를 따로 모읍니다.",
    href: "/guides",
    icon: Banknote,
    tone: "bg-sky-100 text-sky-950",
    links: [
      { label: "자금 가이드", href: "/guides" },
      { label: "정책 상담", href: "/consultation?type=condition_request" },
    ],
  },
  {
    id: "partners",
    title: "업체·혜택",
    eyebrow: "PARTNER",
    description: "인테리어, 물류, 마케팅, 세무처럼 필요한 파트너를 비교합니다.",
    href: "/partners",
    icon: BadgeCheck,
    tone: "bg-rose-100 text-rose-950",
    links: [
      { label: "추천 업체", href: "/partners" },
      { label: "상담 신청", href: "/consultation" },
    ],
  },
  {
    id: "community",
    title: "커뮤니티",
    eyebrow: "TALK",
    description: "질문, 후기, 상권 이야기, 운영 노하우를 창업자들과 나눕니다.",
    href: "/community",
    icon: MessageCircle,
    tone: "bg-violet-100 text-violet-950",
    links: [
      { label: "질문 보기", href: "/community" },
      { label: "질문 남기기", href: "/consultation?type=condition_request" },
    ],
  },
];
