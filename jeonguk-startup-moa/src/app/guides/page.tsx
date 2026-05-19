import Link from "next/link";
import { ArrowRight, BookOpenCheck, Calculator, MapPinned } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { startupGuides } from "@/lib/community";

const tools = [
  {
    title: "창업 예산 계산",
    body: "권리금, 보증금, 인테리어, 운영자금을 한 번에 계산합니다.",
    icon: Calculator,
  },
  {
    title: "상권 체크리스트",
    body: "주거, 오피스, 배달, 유동인구를 업종별로 점검합니다.",
    icon: MapPinned,
  },
  {
    title: "계약 전 확인표",
    body: "양도양수 계약 전에 확인할 서류와 리스크를 정리합니다.",
    icon: BookOpenCheck,
  },
];

export default function GuidesPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <section className="rounded-md bg-white p-5 shadow-sm sm:p-7">
          <p className="text-sm font-black text-amber-700">STARTUP GUIDE</p>
          <h1 className="mt-2 text-3xl font-black text-neutral-950 sm:text-5xl">
            창업 가이드
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base">
            매물을 보기 전에 알아야 할 준비, 비용, 상권, 계약 기준을 한곳에
            모았습니다.
          </p>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <article
                key={tool.title}
                className="rounded-md border border-stone-200 bg-white p-5 shadow-sm"
              >
                <Icon className="size-10 rounded-md bg-neutral-950 p-2 text-white" />
                <h2 className="mt-4 text-lg font-black text-neutral-950">
                  {tool.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{tool.body}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-neutral-950">읽어볼 글</h2>
            <Link
              href="/community"
              className="inline-flex h-10 items-center gap-2 rounded-md border border-stone-200 bg-white px-4 text-sm font-black text-neutral-900"
            >
              커뮤니티 보기
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {startupGuides.map((guide) => (
              <article
                key={guide.id}
                className="rounded-md border border-stone-200 bg-white p-5 shadow-sm"
              >
                <span className="rounded-sm bg-amber-100 px-2 py-1 text-xs font-black text-amber-900">
                  {guide.category}
                </span>
                <h3 className="mt-4 text-lg font-black leading-6 text-neutral-950">
                  {guide.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {guide.summary}
                </p>
                <p className="mt-4 text-xs font-black text-neutral-400">
                  {guide.readingTime} 읽기
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
