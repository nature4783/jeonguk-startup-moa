import Link from "next/link";
import {
  Bell,
  BookOpen,
  Heart,
  House,
  Search,
  Sparkles,
  Store,
  UserRound,
} from "lucide-react";
import { CategoryDock } from "@/components/layout/CategoryDock";

const customerNav = [
  { href: "/roadmap", label: "로드맵" },
  { href: "/guides", label: "가이드" },
  { href: "/community", label: "커뮤니티" },
  { href: "/listings", label: "실매물" },
  { href: "/regions", label: "지역별" },
  { href: "/ai-recommend", label: "AI추천" },
  { href: "/consult", label: "상담" },
];

const mobileNav = [
  { href: "/", label: "홈", icon: House },
  { href: "/guides", label: "가이드", icon: BookOpen },
  { href: "/ai-recommend", label: "추천", icon: Sparkles },
  { href: "/listings", label: "매물", icon: Store },
  { href: "/my", label: "마이", icon: UserRound },
];

export function AppHeader() {
  return (
    <>
      <header className="sticky top-0 z-30 bg-[#f3f6fb]/95 backdrop-blur">
        <div className="mx-auto flex h-20 w-full max-w-[520px] items-center gap-3 px-5 lg:max-w-7xl">
          <Link href="/" className="flex min-w-0 shrink items-center gap-2.5">
            <span className="grid size-12 shrink-0 place-items-center rounded-[1rem] bg-[#0647c7] text-white shadow-sm ring-1 ring-[#0b5cff]/20">
              <span className="text-center leading-none">
                <span className="block text-[0.72rem] font-black">창업</span>
                <span className="mt-0.5 block text-[0.62rem] font-black">
                  모아
                </span>
              </span>
            </span>
            <span className="truncate text-[1.35rem] font-black tracking-normal text-[#0647c7]">
              전국창업모아
            </span>
          </Link>

          <form
            action="/listings"
            className="hidden h-10 flex-1 items-center gap-2 rounded-md border border-[#d7e6e2] bg-[#f6f8fb] px-3 shadow-sm md:flex"
          >
            <Search className="size-4 text-neutral-500" aria-hidden />
            <input
              name="query"
              placeholder="지역, 업종, 브랜드, 창업 매물 검색"
              className="h-full flex-1 bg-transparent text-sm font-bold text-neutral-900 outline-none placeholder:text-neutral-400"
            />
          </form>

          <nav className="ml-auto hidden items-center gap-1 rounded-md border border-[#d7e6e2] bg-[#f6f8fb] p-1 shadow-sm lg:flex">
            {customerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-3 py-2 text-sm font-black text-neutral-600 hover:bg-[#123f3a] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-0">
            <Link
              href="/listings"
              className="hidden size-11 place-items-center rounded-full text-neutral-900 hover:bg-white md:grid lg:hidden"
              aria-label="창업 매물 검색"
              title="창업 매물 검색"
            >
              <Search className="size-7" aria-hidden />
            </Link>
            <Link
              href="/guides"
              className="hidden size-10 place-items-center rounded-md border border-[#d7e6e2] bg-white text-[#123f3a] shadow-sm hover:text-neutral-950 md:grid lg:hidden"
              aria-label="창업 가이드"
              title="창업 가이드"
            >
              <BookOpen className="size-4" aria-hidden />
            </Link>
            <Link
              href="/my"
              className="relative grid size-11 place-items-center rounded-full text-neutral-900 hover:bg-white"
              aria-label="알림"
              title="알림"
            >
              <Bell className="size-7" aria-hidden />
              <span className="absolute right-2.5 top-2.5 size-2.5 rounded-full bg-[#ff3030]" />
            </Link>
            <Link
              href="/my"
              className="hidden size-10 place-items-center rounded-md border border-[#d7e6e2] bg-white text-[#123f3a] shadow-sm hover:text-neutral-950 md:grid"
              aria-label="관심 매물"
              title="관심 매물"
            >
              <Heart className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </header>

      <CategoryDock />

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#edf0f3] bg-white/95 px-2 pb-3 pt-2 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto grid w-full max-w-[520px] grid-cols-5 gap-1">
          {mobileNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-md text-xs font-black text-neutral-800 hover:bg-[#edf4ff] hover:text-[#0647c7]"
              >
                <Icon className="size-6" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
