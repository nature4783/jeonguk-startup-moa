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
  Megaphone,
  MessageCircle,
  Search,
  ShieldCheck,
  Store,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { communityPosts } from "@/lib/community";
import { getPublicListings } from "@/lib/public-listings";

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
  { label: "속닥방", href: "/community" },
  { label: "상권", href: "/community" },
  { label: "지원사업", href: "/guides" },
  { label: "검수매물", href: "/listings" },
];

const shortcuts: Shortcut[] = [
  {
    title: "속닥방",
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
    title: "지원사업",
    href: "/guides",
    icon: Megaphone,
    accent: "bg-[#ffaf21]",
  },
  {
    title: "검수매물",
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
                  창업,
                  <span className="block text-[#7fe7d4]">
                    감으로 하지 않게
                  </span>
                </h1>
              </div>
              <Link
                href="/community"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-white/12 text-white ring-1 ring-white/15"
                aria-label="커뮤니티로 이동"
              >
                <ArrowUpRight className="size-5" aria-hidden />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {[
                ["질문", "속닥방"],
                ["정보", "가이드"],
                ["자료", "검수매물"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-[1.05rem] bg-white/[0.08] p-3 ring-1 ring-white/10"
                >
                  <p className="text-xs font-bold text-white/45">{label}</p>
                  <p className="mt-1 text-sm font-black">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-4 px-5">
          <div className="rounded-[1.35rem] bg-white p-3 shadow-sm ring-1 ring-[#dbe5f7]">
            <Link
              href="/community"
              className="flex h-12 items-center gap-3 rounded-[1rem] bg-[#f1f5fb] px-4 text-base font-black text-neutral-500"
            >
              <span className="grid size-9 place-items-center rounded-full bg-[#0b66e4] text-white">
                <Search className="size-5" aria-hidden />
              </span>
              무엇이 궁금하세요?
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
            title="실시간 창업톡"
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
                  {post.replies}
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
                속닥하기
              </Link>
              <Link
                href="/consultation?type=condition_request"
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
            title="검수 매물"
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
                    alt={`${listing.category} 매장`}
                    fill
                    sizes="208px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-black text-neutral-800">
                    <Heart className="size-3.5" aria-hidden />
                    검수
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
                    순수익 {listing.estimatedProfitRange}
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
