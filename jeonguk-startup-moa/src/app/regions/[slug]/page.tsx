import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPinned } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { ListingCard } from "@/components/listings/ListingCard";
import {
  getListingsForSeoRegion,
  getSeoRegionPage,
  seoRegionPages,
} from "@/lib/seo-regions";

type RegionDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return seoRegionPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: RegionDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoRegionPage(slug);

  if (!page) {
    return {
      title: "지역별 창업 매물을 찾을 수 없습니다",
    };
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: `/regions/${page.slug}`,
    },
  };
}

export default async function RegionDetailPage({ params }: RegionDetailProps) {
  const { slug } = await params;
  const page = getSeoRegionPage(slug);

  if (!page) {
    notFound();
  }

  const listings = getListingsForSeoRegion(page);

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-6xl px-4 pb-44 pt-6 sm:px-6">
        <section className="rounded-[1.25rem] bg-[#071d49] p-6 text-white shadow-sm">
          <p className="inline-flex items-center gap-2 text-sm font-black text-[#9ed7ff]">
            <MapPinned className="size-4" aria-hidden />
            {page.title}
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
            {page.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-sm font-bold leading-6 text-white/72">
            {page.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {page.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-black text-white ring-1 ring-white/15"
              >
                {keyword}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-neutral-950">
              검토 체크포인트
            </h2>
            <ul className="mt-4 grid gap-3 text-sm font-bold leading-6 text-neutral-700">
              {[
                "월매출과 예상 수익을 권리금 대비로 함께 봅니다.",
                "상세주소와 연락처는 상담 단계에서만 안전하게 확인합니다.",
                "운영 시간, 고정비, 회수 기간을 먼저 계산합니다.",
                "같은 지역이라도 업종별 상권 적합성이 다를 수 있습니다.",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-[#047857]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/consult?type=condition_request"
              className="mt-5 inline-flex h-11 items-center rounded-md bg-neutral-950 px-4 text-sm font-black text-white"
            >
              희망 조건 남기기
            </Link>
          </article>

          <article className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-black text-neutral-950">
              관련 실매물
            </h2>
            <p className="mt-2 text-sm font-bold leading-6 text-neutral-600">
              현재 공개 가능한 범위로 정리된 매물입니다.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {listings.length ? (
                listings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))
              ) : (
                <div className="rounded-md bg-[#f6f8fb] p-5 text-sm font-bold text-neutral-600">
                  지금 공개된 매물은 없습니다. 희망 조건을 남기면 맞는 매물이
                  나올 때 상담으로 안내드릴 수 있습니다.
                </div>
              )}
            </div>
          </article>
        </section>
      </main>
    </>
  );
}
