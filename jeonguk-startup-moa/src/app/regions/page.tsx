import type { Metadata } from "next";
import Link from "next/link";
import { MapPinned } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { seoRegionPages } from "@/lib/seo-regions";

export const metadata: Metadata = {
  title: "지역별 창업 매물",
  description:
    "서울, 경기, 부산, 인천, 대구, 광주 지역별 창업 매물과 업종별 양도양수 체크포인트를 확인하세요.",
  alternates: {
    canonical: "/regions",
  },
};

export default function RegionsPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-44 pt-6 sm:px-6">
        <section className="rounded-[1.25rem] bg-white p-6 shadow-sm ring-1 ring-[#dbe5f7]">
          <p className="inline-flex items-center gap-2 text-sm font-black text-[#0647c7]">
            <MapPinned className="size-4" aria-hidden />
            REGION SEO
          </p>
          <h1 className="mt-3 text-3xl font-black text-neutral-950 sm:text-5xl">
            지역별 창업 매물
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-bold leading-6 text-neutral-600">
            지역과 업종별로 창업 양도양수 매물을 나눠 확인하세요. 검색엔진과
            사용자가 원하는 세부 조건에 맞춰 정리했습니다.
          </p>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {seoRegionPages.map((page) => (
            <Link
              key={page.slug}
              href={`/regions/${page.slug}`}
              className="rounded-md border border-stone-200 bg-white p-5 shadow-sm hover:border-[#0647c7]"
            >
              <p className="text-xs font-black text-[#0647c7]">
                {page.keywords[0]}
              </p>
              <h2 className="mt-2 text-xl font-black text-neutral-950">
                {page.title}
              </h2>
              <p className="mt-2 text-sm font-bold leading-6 text-neutral-600">
                {page.description}
              </p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
