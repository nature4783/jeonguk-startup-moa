import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, LockKeyhole, MapPin } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { ListingActions } from "@/components/listings/ListingActions";
import {
  getPublicListingById,
  getPublicListings,
  type PublicListing,
} from "@/lib/public-listings";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.changupmoa.com";

function getListingUrl(listing: PublicListing) {
  return `${siteUrl}/listings/${listing.id}`;
}

function getListingSeoTitle(listing: PublicListing) {
  return `${listing.regionLabel} ${listing.category} 창업 매물 | ${listing.monthlySalesRange} 매출`;
}

function getListingSeoDescription(listing: PublicListing) {
  return `${listing.title}. ${listing.regionLabel} ${listing.category} 양도양수 매물입니다. 월매출 ${listing.monthlySalesRange}, 권리금 ${listing.premiumRange}, 예상 순수익 ${listing.estimatedProfitRange}.`;
}

function getListingJsonLd(listing: PublicListing) {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    "@id": `${getListingUrl(listing)}#offer`,
    url: getListingUrl(listing),
    name: getListingSeoTitle(listing),
    description: getListingSeoDescription(listing),
    availability: "https://schema.org/InStock",
    validFrom: listing.publishedAt,
    areaServed: {
      "@type": "AdministrativeArea",
      name: listing.regionLabel,
    },
    itemOffered: {
      "@type": "LocalBusiness",
      name: listing.title,
      image: listing.imageUrl,
      address: {
        "@type": "PostalAddress",
        addressRegion: listing.sido,
        addressLocality: listing.sigungu,
        addressCountry: "KR",
      },
      description: listing.summary,
      additionalProperty: [
        {
          "@type": "PropertyValue",
          name: "업종",
          value: listing.category,
        },
        {
          "@type": "PropertyValue",
          name: "월매출",
          value: listing.monthlySalesRange,
        },
        {
          "@type": "PropertyValue",
          name: "권리금",
          value: listing.premiumRange,
        },
        {
          "@type": "PropertyValue",
          name: "예상 순수익",
          value: listing.estimatedProfitRange,
        },
      ],
    },
    seller: {
      "@type": "Organization",
      name: "전국창업모아",
      url: siteUrl,
    },
  };
}

export function generateStaticParams() {
  return getPublicListings().map((listing) => ({
    listingId: listing.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ listingId: string }>;
}): Promise<Metadata> {
  const { listingId } = await params;
  const listing = getPublicListingById(listingId);

  if (!listing) {
    return {
      title: "매물을 찾을 수 없습니다 | 전국창업모아",
      robots: { index: false, follow: false },
    };
  }

  const title = getListingSeoTitle(listing);
  const description = getListingSeoDescription(listing);
  const url = getListingUrl(listing);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "전국창업모아",
      locale: "ko_KR",
      type: "article",
      images: [
        {
          url: listing.imageUrl,
          alt: `${listing.regionLabel} ${listing.category} 창업 매물`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [listing.imageUrl],
    },
  };
}

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getListingJsonLd(listing)),
        }}
      />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <Link
          href="/listings"
          className="mb-4 inline-flex items-center gap-2 text-sm font-black text-neutral-700 hover:text-neutral-950"
        >
          <ArrowLeft className="size-4" aria-hidden />
          실매물 목록
        </Link>

        <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="overflow-hidden rounded-md border border-stone-200 bg-white shadow-sm">
            <div className="relative aspect-[16/10] bg-stone-200">
              <Image
                src={listing.imageUrl}
                alt={`${listing.regionLabel} ${listing.category} 창업 매물 이미지`}
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

              <p className="text-base leading-7 text-neutral-700">
                {listing.summary}
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["월매출", listing.monthlySalesRange],
                  ["권리금", listing.premiumRange],
                  ["예상 순수익", listing.estimatedProfitRange],
                  ["월임대료", listing.rentRange],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md bg-stone-100 p-4">
                    <p className="text-xs font-black text-neutral-500">{label}</p>
                    <p className="mt-2 text-lg font-black text-neutral-950">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["면적", listing.sizeRange],
                  ["층수", listing.floorType],
                  ["운영기간", listing.operationPeriodRange],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-md border border-stone-200 p-4"
                  >
                    <p className="text-xs font-black text-neutral-500">{label}</p>
                    <p className="mt-2 font-black text-neutral-950">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-neutral-950">상담 신청</h2>
              <div className="mt-4">
                <ListingActions listingId={listing.id} />
              </div>
            </div>

            <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <LockKeyhole className="size-10 rounded-md bg-neutral-950 p-2 text-white" />
                <div>
                  <h2 className="font-black text-neutral-950">비공개 보호 항목</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    상호명, 상세주소, 지점명, 연락처, 고객명, 내부 메모,
                    계약 원본, 매출 원본은 공개 데이터에 포함하지 않습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="font-black text-neutral-950">추천 대상</h2>
              <div className="mt-3 grid gap-2">
                {listing.recommendedFor.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm font-bold text-neutral-700"
                  >
                    <CheckCircle2
                      className="size-4 text-emerald-700"
                      aria-hidden
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {related.length ? (
          <section className="mt-8">
            <h2 className="mb-4 text-2xl font-black text-neutral-950">
              같은 업종 매물
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/listings/${item.id}`}
                  className="rounded-md border border-stone-200 bg-white p-4 font-black text-neutral-950 shadow-sm hover:border-neutral-950"
                >
                  {item.title}
                  <p className="mt-2 text-sm font-bold text-neutral-500">
                    {item.monthlySalesRange} / {item.premiumRange}
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
