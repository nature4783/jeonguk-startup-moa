import type { Metadata } from "next";
import Link from "next/link";
import { Bot, Calculator, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { getPublicListings } from "@/lib/public-listings";

export const metadata: Metadata = {
  title: "AI 창업 매물 추천",
  description:
    "예산, 희망 지역, 운영 방식에 맞춰 전국창업모아의 창업 양도양수 매물을 추천받고 상담을 신청하세요.",
  alternates: {
    canonical: "/ai-recommend",
  },
};

export default function AiRecommendPage() {
  const recommended = getPublicListings().slice(0, 3);

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-44 pt-6 sm:px-6">
        <section className="grid gap-5 rounded-[1.35rem] bg-[#071d49] p-6 text-white shadow-sm md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black text-[#9ed7ff]">
              <Sparkles className="size-4" aria-hidden />
              AI RECOMMEND
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              내 조건에 맞는 창업 매물을 빠르게 추천받기
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-bold leading-6 text-white/72 sm:text-base">
              예산, 희망 지역, 업종, 운영 시간을 기준으로 먼저 검토할 매물을
              좁혀드립니다. 추천 결과는 상담 단계에서 상세 자료와 함께 확인할
              수 있습니다.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/consult?type=condition_request"
                className="inline-flex h-12 items-center rounded-md bg-white px-5 text-sm font-black text-[#071d49]"
              >
                조건 남기기
              </Link>
              <Link
                href="/listings"
                className="inline-flex h-12 items-center rounded-md bg-white/10 px-5 text-sm font-black text-white ring-1 ring-white/20"
              >
                전체 매물 보기
              </Link>
            </div>
          </div>

          <div className="rounded-[1rem] bg-white/10 p-4 ring-1 ring-white/15">
            <Bot className="size-10 rounded-md bg-white p-2 text-[#0647c7]" />
            <h2 className="mt-4 text-xl font-black">추천 기준</h2>
            <ul className="mt-3 grid gap-2 text-sm font-bold leading-6 text-white/75">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#7fe7d4]" />
                초기 예산과 권리금 범위
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#7fe7d4]" />
                희망 지역과 생활 동선
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#7fe7d4]" />
                월매출, 예상 수익, 운영 난이도
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {recommended.map((listing) => (
            <article
              key={listing.id}
              className="rounded-md border border-stone-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-black text-[#0647c7]">
                {listing.regionLabel} · {listing.category}
              </p>
              <h2 className="mt-2 text-xl font-black leading-7 text-neutral-950">
                {listing.title}
              </h2>
              <p className="mt-2 text-sm font-bold leading-6 text-neutral-600">
                {listing.summary}
              </p>
              <dl className="mt-4 grid gap-2 text-sm">
                <div className="flex items-center justify-between gap-3 rounded-md bg-[#f6f8fb] px-3 py-2">
                  <dt className="inline-flex items-center gap-2 font-black text-neutral-500">
                    <TrendingUp className="size-4" />
                    월매출
                  </dt>
                  <dd className="font-black text-neutral-950">
                    {listing.monthlySalesRange}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-md bg-[#f6f8fb] px-3 py-2">
                  <dt className="inline-flex items-center gap-2 font-black text-neutral-500">
                    <Calculator className="size-4" />
                    예상 수익
                  </dt>
                  <dd className="font-black text-neutral-950">
                    {listing.estimatedProfitRange}
                  </dd>
                </div>
              </dl>
              <Link
                href={`/listings/${listing.id}`}
                className="mt-4 inline-flex h-11 items-center rounded-md bg-neutral-950 px-4 text-sm font-black text-white"
              >
                매물 보기
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
