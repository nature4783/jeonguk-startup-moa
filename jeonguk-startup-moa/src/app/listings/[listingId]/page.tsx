import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, LockKeyhole, MapPin } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { ListingActions } from "@/components/listings/ListingActions";
import { getPublicListingById, getPublicListings } from "@/lib/public-listings";

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = await params;
  const listing = getPublicListingById(listingId);

  if (!listing) {
    notFound();
  }

  const related = getPublicListings({ category: listing.category })
    .filter((item) => item.id !== listing.id)
    .slice(0, 3);

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <Link
          href="/listings"
          className="mb-4 inline-flex items-center gap-2 text-sm font-black text-neutral-700 hover:text-neutral-950"
        >
          <ArrowLeft className="size-4" aria-hidden />
          리스트
        </Link>

        <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm">
            <div className="relative aspect-[16/10] bg-stone-200">
              <Image
                src={listing.imageUrl}
                alt={`${listing.category} 매장 이미지`}
                fill
                priority
                sizes="(min-width: 1024px) 65vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6 p-5 sm:p-6">
              <div>
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-sm bg-neutral-950 px-2 py-1 text-xs font-black text-white">
                    {listing.publicCode}
                  </span>
                  <span className="rounded-sm bg-amber-100 px-2 py-1 text-xs font-black text-amber-900">
                    {listing.category}
                  </span>
                  <span className="rounded-sm bg-emerald-100 px-2 py-1 text-xs font-black text-emerald-900">
                    {listing.brandGroup}
                  </span>
                </div>
                <h1 className="text-3xl font-black text-neutral-950 sm:text-4xl">
                  {listing.title}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-sm font-bold text-neutral-600">
                  <MapPin className="size-4" aria-hidden />
                  {listing.regionLabel}
                </p>
              </div>

              <p className="text-base leading-7 text-neutral-700">{listing.summary}</p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["월매출", listing.monthlySalesRange],
                  ["권리금", listing.premiumRange],
                  ["예상 순수익", listing.estimatedProfitRange],
                  ["임대료", listing.rentRange],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md bg-stone-100 p-4">
                    <p className="text-xs font-black text-neutral-500">{label}</p>
                    <p className="mt-2 text-lg font-black text-neutral-950">{value}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["면적", listing.sizeRange],
                  ["층수", listing.floorType],
                  ["운영기간", listing.operationPeriodRange],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-stone-200 p-4">
                    <p className="text-xs font-black text-neutral-500">{label}</p>
                    <p className="mt-2 font-black text-neutral-950">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-neutral-950">요청</h2>
              <div className="mt-4">
                <ListingActions listingId={listing.id} />
              </div>
            </div>

            <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <LockKeyhole className="size-10 rounded-md bg-neutral-950 p-2 text-white" />
                <div>
                  <h2 className="font-black text-neutral-950">비공개 항목</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    동 이름, 상세주소, 지점명, 연락처, 고객명, 내부 메모,
                    포스 원본, 매출표 원본은 공개 데이터에 포함하지 않습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="font-black text-neutral-950">추천 대상</h2>
              <div className="mt-3 grid gap-2">
                {listing.recommendedFor.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm font-bold text-neutral-700">
                    <CheckCircle2 className="size-4 text-emerald-700" aria-hidden />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {related.length ? (
          <section className="mt-8">
            <h2 className="mb-4 text-2xl font-black text-neutral-950">같은 업종</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/listings/${item.id}`}
                  className="rounded-md border border-stone-200 bg-white p-4 font-black text-neutral-950 shadow-sm hover:border-neutral-950"
                >
                  {item.title}
                  <p className="mt-2 text-sm font-bold text-neutral-500">
                    {item.monthlySalesRange} · {item.premiumRange}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
