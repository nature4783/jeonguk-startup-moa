import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { FilterBar } from "@/components/listings/FilterBar";
import { ListingCard } from "@/components/listings/ListingCard";
import {
  getPublicListings,
  type ListingFilters,
  type ListingSort,
} from "@/lib/public-listings";

type SearchParams = Record<string, string | string[] | undefined>;

export const metadata: Metadata = {
  title: "실매물창 | 창업 양도양수 매물",
  description:
    "지역, 업종, 월매출, 권리금, 예상 수익 조건으로 전국 창업 양도양수 실매물을 비교하고 상담을 신청하세요.",
  alternates: {
    canonical: "/listings",
  },
};

function valueOf(searchParams: SearchParams, key: string) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const filters: ListingFilters = {
    query: valueOf(params, "query"),
    sido: valueOf(params, "sido"),
    sigungu: valueOf(params, "sigungu"),
    category: valueOf(params, "category"),
    brandGroup: valueOf(params, "brandGroup"),
    monthlySalesRange: valueOf(params, "monthlySalesRange"),
    premiumRange: valueOf(params, "premiumRange"),
    estimatedProfitRange: valueOf(params, "estimatedProfitRange"),
    sort: (valueOf(params, "sort") as ListingSort | undefined) ?? "recommended",
  };
  const listings = getPublicListings(filters);

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-[520px] bg-[#f3f6fb] px-4 pb-28 pt-5 lg:max-w-7xl lg:px-6">
        <section className="mb-5 overflow-hidden rounded-[1.5rem] bg-[#071d49] p-5 text-white shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#9ed7ff]">
            Verified Listings
          </p>
          <div className="mt-2 flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black">창업 양도양수 실매물</h1>
              <p className="mt-2 text-sm font-bold leading-6 text-white/70">
                고객에게 공개 가능한 정보만 정제한 실매물입니다. 상세주소와
                연락처는 상담 단계에서만 안전하게 안내합니다.
              </p>
            </div>
            <div className="grid size-16 shrink-0 place-items-center rounded-[1.1rem] bg-white text-center text-lg font-black text-[#0647c7]">
              {listings.length}건
            </div>
          </div>

          <dl className="mt-5 grid grid-cols-3 gap-2">
            <div className="rounded-[1rem] bg-white/10 p-3 ring-1 ring-white/10">
              <dt className="text-xs font-bold text-white/55">공개 기준</dt>
              <dd className="mt-1 text-sm font-black">시·구 단위</dd>
            </div>
            <div className="rounded-[1rem] bg-white/10 p-3 ring-1 ring-white/10">
              <dt className="text-xs font-bold text-white/55">금액 표기</dt>
              <dd className="mt-1 text-sm font-black">범위형</dd>
            </div>
            <div className="rounded-[1rem] bg-white/10 p-3 ring-1 ring-white/10">
              <dt className="text-xs font-bold text-white/55">민감정보</dt>
              <dd className="mt-1 text-sm font-black">비공개</dd>
            </div>
          </dl>
        </section>

        <FilterBar current={filters} />

        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black text-[#0647c7]">공개 매물 리스트</p>
            <p className="mt-1 text-xs font-bold text-neutral-500">
              검증 포인트와 예상 수익 범위를 함께 확인하세요.
            </p>
          </div>
          <Link
            href="/compare"
            className="shrink-0 rounded-full bg-white px-3 py-2 text-sm font-black text-neutral-900 shadow-sm ring-1 ring-[#dbe5f7]"
          >
            비교하기
          </Link>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {listings.length === 0 ? (
          <div className="mt-6 rounded-[1.25rem] bg-white p-8 text-center shadow-sm ring-1 ring-[#dbe5f7]">
            <p className="text-lg font-black text-neutral-950">
              조건에 맞는 매물이 없습니다.
            </p>
            <Link
              href="/consult?type=condition_request"
              className="mt-4 inline-flex h-11 items-center rounded-[0.9rem] bg-[#0647c7] px-5 text-sm font-black text-white"
            >
              희망 조건 남기기
            </Link>
          </div>
        ) : null}
      </main>
    </>
  );
}
