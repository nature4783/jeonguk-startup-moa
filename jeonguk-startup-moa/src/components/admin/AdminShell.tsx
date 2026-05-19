import Link from "next/link";
import { Database, Eye, LockKeyhole, WandSparkles } from "lucide-react";

const adminNav = [
  { href: "/admin/raw-listings", label: "원본 매물", icon: Database },
  { href: "/admin/transform", label: "정제 변환", icon: WandSparkles },
  { href: "/admin/listings", label: "공개 관리", icon: Eye },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-md border border-stone-200 bg-neutral-950 p-4 text-white shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <LockKeyhole className="size-5 text-amber-300" aria-hidden />
          <h1 className="text-lg font-black">관리자</h1>
        </div>
        <nav className="grid gap-2">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-stone-200 hover:bg-white hover:text-neutral-950"
              >
                <Icon className="size-4" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 rounded-md bg-white/10 p-3 text-xs leading-5 text-stone-200">
          raw 데이터와 service role key는 서버 경계 안에서만 사용합니다.
        </div>
      </aside>
      <section>{children}</section>
    </main>
  );
}
