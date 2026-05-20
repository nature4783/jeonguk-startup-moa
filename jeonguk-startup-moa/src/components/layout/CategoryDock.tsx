"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  BriefcaseBusiness,
  MessageCircle,
  Sparkles,
  Store,
  type LucideIcon,
} from "lucide-react";

type DockItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  active: string[];
};

const dockItems: DockItem[] = [
  { href: "/community", label: "질문방", icon: MessageCircle, active: ["/community"] },
  {
    href: "/regions",
    label: "지역별",
    icon: BriefcaseBusiness,
    active: ["/regions", "/sectors", "/roadmap", "/partners"],
  },
  { href: "/guides", label: "가이드", icon: BookOpenText, active: ["/guides"] },
  { href: "/ai-recommend", label: "AI추천", icon: Sparkles, active: ["/ai-recommend"] },
  { href: "/listings", label: "실매물", icon: Store, active: ["/listings"] },
];

export function CategoryDock() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-[5.65rem] z-40 mx-auto w-full max-w-[520px] px-3 md:bottom-5"
      aria-label="주요 카테고리 바로가기"
    >
      <div className="flex gap-1 overflow-x-auto rounded-full bg-white/94 p-1.5 shadow-[0_12px_35px_rgba(15,23,42,0.18)] ring-1 ring-[#dbe5f7] backdrop-blur no-scrollbar">
        {dockItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.active.some((path) => pathname.startsWith(path));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-3 text-xs font-black transition ${
                isActive
                  ? "bg-[#0b66e4] text-white shadow-[0_8px_18px_rgba(11,102,228,0.24)]"
                  : "text-neutral-700 hover:bg-[#eef5ff] hover:text-[#0b66e4]"
              }`}
            >
              <Icon className="size-4" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
