import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";

type PolicyPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

const policyLinks = [
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관" },
  { href: "/account-deletion", label: "계정 삭제" },
  { href: "/support", label: "고객지원" },
];

export function PolicyPageShell({
  eyebrow,
  title,
  description,
  children,
}: PolicyPageShellProps) {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-[720px] bg-[#f6f8fc] px-5 pb-44 pt-4">
        <section className="rounded-[1.6rem] bg-[#061b3d] p-5 text-white shadow-[0_18px_45px_rgba(6,27,61,0.18)]">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8fd8ff]">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight">{title}</h1>
          <p className="mt-3 text-sm font-bold leading-6 text-white/70">
            {description}
          </p>
        </section>

        <nav
          aria-label="정책 바로가기"
          className="no-scrollbar -mx-5 mt-4 flex gap-2 overflow-x-auto px-5"
        >
          {policyLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex h-10 shrink-0 items-center rounded-full bg-white px-4 text-sm font-black text-neutral-800 shadow-sm ring-1 ring-[#dbe5f7] hover:text-[#0b66e4]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <section className="mt-4 rounded-[1.35rem] bg-white p-5 shadow-sm ring-1 ring-[#dbe5f7]">
          {children}
        </section>

        <Link
          href="/my"
          className="mt-4 inline-flex h-11 items-center gap-1 rounded-full bg-white px-4 text-sm font-black text-[#0b66e4] shadow-sm ring-1 ring-[#dbe5f7]"
        >
          마이페이지로 돌아가기
          <ChevronRight className="size-4" aria-hidden />
        </Link>
      </main>
    </>
  );
}

export function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#edf1f7] py-5 first:pt-0 last:border-b-0 last:pb-0">
      <h2 className="text-lg font-black text-neutral-950">{title}</h2>
      <div className="mt-3 space-y-3 text-sm font-bold leading-6 text-neutral-600">
        {children}
      </div>
    </section>
  );
}
