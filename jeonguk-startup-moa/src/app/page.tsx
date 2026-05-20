import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  BriefcaseBusiness,
  Calculator,
  ChevronRight,
  ClipboardCheck,
  Heart,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { communityPosts } from "@/lib/community";
import { getListingStats, getPublicListings } from "@/lib/public-listings";

export const metadata: Metadata = {
  title: "전국창업모아 | 창업 매물·AI추천·상담 신청",
  description:
    "전국창업모아에서 실매물, AI 창업 매물 추천, 창업 가이드와 상담 신청을 한 번에 확인하세요.",
  alternates: {
    canonical: "/",
  },
};

type Shortcut = {
  title: string;
  href: string;
  icon: LucideIcon;
  accent: string;
};

type TopicCard = {
  title: string;
  href: string;
  label: string;
  icon: LucideIcon;
};

const searchChips = [
  { label: "창업 질문", href: "/community" },
  { label: "상권 분석", href: "/community" },
  { label: "창업 가이드", href: "/guides" },
  { label: "양도양수 매물", href: "/listings" },
];

const shortcuts: Shortcut[] = [
  {
    title: "질문방",
    href: "/community",
    icon: MessageCircle,
    accent: "bg-[#00a7b5]",
  },
  {
    title: "로드맵",
    href: "/roadmap",
    icon: ClipboardCheck,
    accent: "bg-[#0b66e4]",
  },
  {
    title: "AI추천",
    href: "/ai-recommend",
    icon: Sparkles,
    accent: "bg-[#8b5cf6]",
  },
  {
    title: "실매물",
    href: "/listings",
    icon: Store,
    accent: "bg-[#5b5ce2]",
  },
];

const platformTopics: TopicCard[] = [
  {
    title: "창업 준비",
    href: "/roadmap",
    label: "START",
    icon: BriefcaseBusiness,
  },
  {
    title: "상권·입지",
    href: "/community",
    label: "TALK",
    icon: UsersRound,
  },
  {
    title: "자금 계획",
    href: "/compare",
    label: "MONEY",
    icon: Calculator,
  },
  {
    title: "계약 검토",
    href: "/guides",
    label: "CHECK",
    icon: ShieldCheck,
  },
];

const guideCards = [
  { title: "매물보다 먼저 정해야 할 것", href: "/roadmap", meta: "4분" },
  { title: "권리금 낮은 매장의 함정", href: "/guides", meta: "5분" },
  { title: "상담 전 공개정보 보는 법", href: "/guides", meta: "3분" },
];

export default function Home() {
  const listings = getPublicListings().slice(0, 2);
  const posts = communityPosts.slice(0, 3);
  const stats = getListingStats();

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-[520px] overflow-x-hidden bg-[#f6f8fc] pb-44 pt-2">
        <section className="px-5">
          <div className="rounded-[1.8rem] bg-[#061b3d] p-5 text-white shadow-[0_18px_45px_rgba(6,27,61,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8fd8ff]">
                  Startup Moa
                </p>
                <h1 className="mt-3 text-[2.35rem] font-black leading-[1.02]">
                  전국 창업 정보,
                  <span className="block text-[#7fe7d4]">
                    매물부터 상담까지
                  </span>
                </h1>
                <p className="mt-4 text-sm font-bold leading-6 text-white/72">
                  실매물, AI추천, 창업 가이드와 상담 신청을 한곳에서
                  확인하세요.
                </p>
              </div>
              <Link
                href="/ai-recommend"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-white/12 text-white ring-1 ring-white/15"
                aria-label="AI 추천으로 이동"
              >
                <ArrowUpRight className="size-5" aria-hidden />
              </Link>
            </div>

            <dl className="mt-6 grid grid-cols-3 gap-2">
              {[
                ["공개매물", `${stats.total}건`],
                ["지역", `${stats.regions}곳`],
                ["상담", "신청 가능"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.05rem] bg-white/[0.08] p-3 ring-1 ring-white/10"
                >
                  <dt className="text-xs font-bold text-white/45">{label}</dt>
                  <dd className="mt-1 text-sm font-black">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-4 px-5">
          <div className="rounded-[1.35rem] bg-white p-3 shadow-sm ring-1 ring-[#dbe5f7]">
            <Link
              href="/listings"
              className="flex h-12 items-center gap-3 rounded-[1rem] bg-[#f1f5fb] px-4 text-base font-black text-neutral-500"
            >
              <span className="grid size-9 place-items-center rounded-full bg-[#0b66e4] text-white">
                <Search className="size-5" aria-hidden />
              </span>
              지역, 업종, 예산으로 창업 매물 찾기
            </Link>

            <div className="no-scrollbar -mx-3 mt-3 flex gap-2 overflow-x-auto px-3">
              {searchChips.map((chip) => (
                <Link
                  key={chip.label}
                  href={chip.href}
                  className="inline-flex h-9 shrink-0 items-center rounded-full bg-[#eef2f7] px-4 text-sm font-black text-neutral-700"
                >
                  {chip.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 px-5">
          <div className="grid grid-cols-4 gap-3">
            {shortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <span className="grid size-[4.15rem] place-items-center rounded-[1.35rem] bg-white shadow-sm ring-1 ring-[#dbe5f7]">
                    <span
                      className={`grid size-11 place-items-center rounded-[1rem] ${item.accent} text-white`}
                    >
                      <Icon className="size-6" aria-hidden />
                    </span>
                  </span>
                  <span className="text-sm font-black leading-4 text-neutral-800">
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="talk" className="mt-7 scroll-mt-28 px-5">
          <SectionTitle
            eyebrow="Live Talk"
            title="실시간 창업 질문"
            href="/community"
            linkLabel="더보기"
          />

          <div className="mt-4 grid gap-2">
            {posts.map((post) => (
              <Link
                key={post.id}
                href="/community"
                className="flex items-center gap-3 overflow-hidden rounded-[1.1rem] bg-white p-3 shadow-sm ring-1 ring-[#dbe5f7]"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-[0.95rem] bg-[#eef5ff] text-[#0b66e4]">
                  <MessageCircle className="size-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1 overflow-hidden">
                  <span className="text-xs font-black text-[#0b66e4]">
                    {post.board}
                  </span>
                  <span className="mt-0.5 block max-w-full truncate text-base font-black text-neutral-950">
                    {post.title}
                  </span>
                </span>
                <span className="shrink-0 rounded-full bg-[#f1f5fb] px-2.5 py-1 text-xs font-black text-neutral-500">
                  답변 {post.replies}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="menu" className="mt-7 scroll-mt-28 px-5">
          <SectionTitle
            eyebrow="Platform"
            title="창업 메뉴"
            href="/sectors"
            linkLabel="전체"
          />

          <div className="mt-4 grid grid-cols-2 gap-3">
            {platformTopics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.title}
                  href={topic.href}
                  className="rounded-[1.35rem] bg-white p-4 shadow-sm ring-1 ring-[#dbe5f7]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-black text-[#0b66e4]">
                      {topic.label}
                    </span>
                    <span className="grid size-9 place-items-center rounded-[0.9rem] bg-[#eef5ff] text-[#0b66e4]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-black text-neutral-950">
                    {topic.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>

        <section id="guide" className="mt-7 scroll-mt-28 px-5">
          <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-[#dbe5f7]">
            <div className="flex items-center gap-2">
              <BookOpenText className="size-5 text-[#0b66e4]" aria-hidden />
              <h2 className="text-xl font-black text-neutral-950">
                창업 가이드
              </h2>
            </div>
            <div className="mt-3 grid gap-2">
              {guideCards.map((guide, index) => (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className="flex h-14 items-center gap-3 rounded-[1rem] bg-[#f6f8fb] px-3"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-[0.75rem] bg-white text-sm font-black text-[#0b66e4] ring-1 ring-[#dbe5f7]">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm font-black text-neutral-950">
                    {guide.title}
                  </span>
                  <span className="text-xs font-bold text-neutral-400">
                    {guide.meta}
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-neutral-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-7 px-5">
          <div className="rounded-[1.5rem] bg-[#eaf5ff] p-5 shadow-sm ring-1 ring-[#cfe3ff]">
            <div className="flex items-center gap-2">
              <MessageCircle className="size-5 text-[#0b66e4]" aria-hidden />
              <h2 className="text-xl font-black text-neutral-950">
                내 조건 남기기
              </h2>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                href="/community"
                className="inline-flex h-12 items-center justify-center rounded-[1rem] bg-[#0b66e4] text-sm font-black text-white"
              >
                질문하기
              </Link>
              <Link
                href="/consult?type=condition_request"
                className="inline-flex h-12 items-center justify-center rounded-[1rem] bg-white text-sm font-black text-[#0b66e4] shadow-sm"
              >
                상담 남기기
              </Link>
            </div>
          </div>
        </section>

        <section id="listings" className="mt-7 scroll-mt-28 px-5">
          <SectionTitle
            eyebrow="Verified"
            title="실매물"
            href="/listings"
            linkLabel="보기"
          />

          <div className="no-scrollbar -mx-5 mt-4 flex gap-3 overflow-x-auto px-5">
            {listings.map((listing) => (
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="w-52 shrink-0 overflow-hidden rounded-[1.25rem] bg-white shadow-sm ring-1 ring-[#dbe5f7]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <Image
                    src={listing.imageUrl}
                    alt={`${listing.regionLabel} ${listing.category} 매장`}
                    fill
                    sizes="208px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-black text-neutral-800">
                    <Heart className="size-3.5" aria-hidden />
                    검증
                  </div>
                  <span className="absolute bottom-3 left-3 rounded-full bg-[#0b66e4] px-3 py-1.5 text-xs font-black text-white">
                    {listing.regionLabel}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="line-clamp-1 text-lg font-black text-neutral-950">
                    {listing.category} 양도양수
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm font-bold text-neutral-500">
                    예상 수익 {listing.estimatedProfitRange}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function SectionTitle({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex items-end justify-between gap-3">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0b66e4]">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-2xl font-black text-neutral-950">{title}</h2>
      </div>
      <Link
        href={href}
        className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#0b66e4] shadow-sm ring-1 ring-[#dbe5f7]"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
