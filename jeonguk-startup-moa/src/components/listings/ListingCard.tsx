import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Banknote,
  Building2,
  EyeOff,
  FileCheck2,
  MapPin,
  ShieldCheck,
  Store,
  TrendingUp,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import type { PublicListing } from "@/lib/public-listings";
import { ListingActions } from "@/components/listings/ListingActions";

type ListingCardProps = {
  listing: PublicListing;
};

type Metric = {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: string;
};

function getPriority(listing: PublicListing) {
  const value =
    listing.estimatedProfitBucket * 2 +
    listing.monthlySalesBucket -
    listing.premiumBucket;

  if (value >= 8) {
    return {
      label: "우선 검토",
      body: "수익 범위와 매출 구간이 좋은 매물",
      percent: 88,
      tone: "bg-[#0647c7]",
    };
  }

  if (value >= 5) {
    return {
      label: "균형형",
      body: "비용과 수익을 함께 확인할 매물",
      percent: 68,
      tone: "bg-[#14b8a6]",
    };
  }

  return {
    label: "조건 확인",
    body: "권리금과 운영비 확인이 필요한 매물",
    percent: 48,
    tone: "bg-[#f59e0b]",
  };
}

function getPremiumLevel(listing: PublicListing) {
  if (listing.premiumBucket <= 2) return "권리금 낮음";
  if (listing.premiumBucket === 3) return "권리금 보통";
  return "권리금 높음";
}

export function ListingCard({ listing }: ListingCardProps) {
  const priority = getPriority(listing);
  const metrics: Metric[] = [
    {
      label: "월매출",
      value: listing.monthlySalesRange,
      icon: TrendingUp,
      tone: "bg-[#eef4ff] text-[#0647c7]",
    },
    {
      label: "예상 수익",
      value: listing.estimatedProfitRange,
      icon: Banknote,
      tone: "bg-[#ecfdf5] text-[#047857]",
    },
    {
      label: "권리금",
      value: listing.premiumRange,
      icon: WalletCards,
      tone: "bg-[#fff7ed] text-[#c2410c]",
    },
    {
      label: "임대료",
      value: listing.rentRange,
      icon: Building2,
      tone: "bg-[#f5f3ff] text-[#6d28d9]",
    },
  ];

  return (
    <article className="overflow-hidden rounded-[1.35rem] bg-white shadow-sm ring-1 ring-[#dbe5f7]">
      <Link href={`/listings/${listing.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
          <Image
            src={listing.imageUrl}
            alt={`${listing.regionLabel} ${listing.category} 매장 이미지`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
          <div className="absolute left-3 top-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-[#0647c7] shadow-sm">
              <BadgeCheck className="size-3.5" aria-hidden />
              검증 공개
            </span>
            <span className="rounded-full bg-black/45 px-3 py-1.5 text-xs font-black text-white backdrop-blur">
              {listing.publicCode}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-sm font-black text-white/85">
                <MapPin className="size-4" aria-hidden />
                {listing.regionLabel}
              </p>
              <h2 className="mt-1 line-clamp-1 text-2xl font-black text-white">
                {listing.category} 양도양수
              </h2>
            </div>
            <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-black text-neutral-950">
              {priority.label}
            </span>
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#eef4ff] px-3 py-1.5 text-xs font-black text-[#0647c7]">
              {listing.brandGroup}
            </span>
            <span className="rounded-full bg-[#ecfdf5] px-3 py-1.5 text-xs font-black text-[#047857]">
              {getPremiumLevel(listing)}
            </span>
            <span className="rounded-full bg-[#f4f7fb] px-3 py-1.5 text-xs font-black text-neutral-600">
              {listing.sizeRange} · {listing.floorType}
            </span>
          </div>
          <Link href={`/listings/${listing.id}`}>
            <h3 className="mt-3 text-xl font-black leading-7 text-neutral-950">
              {listing.title}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm font-bold leading-5 text-neutral-500">
            {listing.summary}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-2">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="rounded-[1rem] bg-[#f6f8fb] p-3 ring-1 ring-[#edf1f7]"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`grid size-8 place-items-center rounded-[0.75rem] ${metric.tone}`}
                  >
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <dt className="text-xs font-black text-neutral-500">
                    {metric.label}
                  </dt>
                </div>
                <dd className="mt-2 text-base font-black leading-5 text-neutral-950">
                  {metric.value}
                </dd>
              </div>
            );
          })}
        </dl>

        <div className="rounded-[1rem] bg-[#071d49] p-4 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black text-[#9ed7ff]">검토 우선도</p>
              <p className="mt-1 text-lg font-black">{priority.label}</p>
              <p className="mt-1 text-xs font-bold text-white/65">
                {priority.body}
              </p>
            </div>
            <span className="rounded-full bg-white/12 px-3 py-1.5 text-xs font-black text-white">
              공개 범위 기준
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
            <div
              className={`h-full rounded-full ${priority.tone}`}
              style={{ width: `${priority.percent}%` }}
            />
          </div>
        </div>

        <div className="grid gap-2 rounded-[1rem] bg-[#f6f8fb] p-3">
          <p className="flex items-center gap-2 text-sm font-black text-neutral-950">
            <FileCheck2 className="size-4 text-[#0647c7]" aria-hidden />
            검증 포인트
          </p>
          <div className="grid gap-2 text-xs font-bold text-neutral-600">
            <span className="flex items-center gap-2">
              <EyeOff className="size-4 text-neutral-400" aria-hidden />
              상세주소·점주 연락처는 비공개
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-neutral-400" aria-hidden />
              매출·권리금·순수익 범위 공개
            </span>
            <span className="flex items-center gap-2">
              <Store className="size-4 text-neutral-400" aria-hidden />
              상담 단계에서 상세자료 요청 가능
            </span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-black text-neutral-400">추천 대상</p>
          <div className="flex flex-wrap gap-2">
            {listing.recommendedFor.slice(0, 3).map((item) => (
              <span
                key={item}
                className="rounded-full bg-white px-3 py-1.5 text-xs font-black text-neutral-700 ring-1 ring-[#dbe5f7]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {listing.highlights.slice(0, 3).map((highlight) => (
            <span
              key={highlight}
              className="inline-flex items-center gap-1 rounded-full bg-neutral-950 px-3 py-1.5 text-xs font-bold text-white"
            >
              <WalletCards className="size-3" aria-hidden />
              {highlight}
            </span>
          ))}
        </div>

        <ListingActions listingId={listing.id} compact />
      </div>
    </article>
  );
}
