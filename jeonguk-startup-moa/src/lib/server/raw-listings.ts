import "server-only";

import type { PublicListing } from "@/lib/public-listings";

type RangeRule = {
  min: number;
  max: number;
  label: string;
  bucket: number;
};

export type RawListing = {
  id: string;
  rawBrandName: string;
  rawBranchName: string;
  rawCategory: string;
  rawAddress: string;
  rawSido: string;
  rawSigungu: string;
  rawDong: string;
  rawDetailAddress: string;
  ownerName: string;
  ownerPhone: string;
  customerName: string;
  monthlySales: number;
  premium: number;
  rent: number;
  cost: number;
  estimatedProfit: number;
  posOriginal: Record<string, unknown>;
  salesSheetOriginal: Record<string, unknown>;
  internalMemo: string;
  status: "draft" | "reviewing" | "published" | "hidden";
};

export const rawListings: RawListing[] = [
  {
    id: "raw-9001",
    rawBrandName: "메가커피",
    rawBranchName: "역삼OO점",
    rawCategory: "커피/카페",
    rawAddress: "서울 강남구 역삼동 000-00 1층",
    rawSido: "서울",
    rawSigungu: "강남구",
    rawDong: "역삼동",
    rawDetailAddress: "000-00 1층",
    ownerName: "김OO",
    ownerPhone: "010-0000-0001",
    customerName: "내부상담 A",
    monthlySales: 68000000,
    premium: 145000000,
    rent: 6500000,
    cost: 49000000,
    estimatedProfit: 9300000,
    posOriginal: { vendor: "masked-pos", rows: 128 },
    salesSheetOriginal: { file: "sales_9001.xlsx", sheets: 3 },
    internalMemo: "점주 연락은 오후만 가능. 상세주소 고객 공개 금지.",
    status: "reviewing",
  },
  {
    id: "raw-9002",
    rawBrandName: "BBQ",
    rawBranchName: "분당OO점",
    rawCategory: "치킨",
    rawAddress: "경기 성남시 분당구 정자동 000-00",
    rawSido: "경기",
    rawSigungu: "성남시",
    rawDong: "정자동",
    rawDetailAddress: "000-00",
    ownerName: "박OO",
    ownerPhone: "010-0000-0002",
    customerName: "내부상담 B",
    monthlySales: 41000000,
    premium: 85000000,
    rent: 4200000,
    cost: 30500000,
    estimatedProfit: 6400000,
    posOriginal: { vendor: "masked-pos", rows: 76 },
    salesSheetOriginal: { file: "sales_9002.xlsx", sheets: 2 },
    internalMemo: "배달앱 계정 승계 조건 확인 필요.",
    status: "reviewing",
  },
];

const MONTHLY_SALES_RULES: RangeRule[] = [
  { min: 0, max: 10000000, label: "1천만 미만", bucket: 1 },
  { min: 10000000, max: 30000000, label: "1천만~3천만", bucket: 3 },
  { min: 30000000, max: 50000000, label: "3천만~5천만", bucket: 4 },
  { min: 50000000, max: 100000000, label: "5천만~1억", bucket: 5 },
  { min: 100000000, max: Number.POSITIVE_INFINITY, label: "1억 이상", bucket: 6 },
];

const PREMIUM_RULES: RangeRule[] = [
  { min: 0, max: 30000000, label: "3천만 미만", bucket: 1 },
  { min: 30000000, max: 50000000, label: "3천만~5천만", bucket: 2 },
  { min: 50000000, max: 100000000, label: "5천만~1억", bucket: 3 },
  { min: 100000000, max: 200000000, label: "1억~2억", bucket: 4 },
  { min: 200000000, max: Number.POSITIVE_INFINITY, label: "2억 이상", bucket: 5 },
];

const PROFIT_RULES: RangeRule[] = [
  { min: 0, max: 3000000, label: "300만 미만", bucket: 1 },
  { min: 3000000, max: 5000000, label: "300만~500만", bucket: 2 },
  { min: 5000000, max: 8000000, label: "500만~800만", bucket: 3 },
  { min: 8000000, max: 12000000, label: "800만~1,200만", bucket: 4 },
  { min: 12000000, max: Number.POSITIVE_INFINITY, label: "1,200만 이상", bucket: 5 },
];

const RENT_RULES: RangeRule[] = [
  { min: 0, max: 1000000, label: "100만 미만", bucket: 1 },
  { min: 1000000, max: 2000000, label: "100만~200만", bucket: 2 },
  { min: 2000000, max: 3000000, label: "200만~300만", bucket: 3 },
  { min: 3000000, max: 5000000, label: "300만~500만", bucket: 4 },
  { min: 5000000, max: Number.POSITIVE_INFINITY, label: "500만 이상", bucket: 5 },
];

function rangeFor(value: number, rules: RangeRule[]) {
  return rules.find((rule) => value >= rule.min && value < rule.max) ?? rules[0];
}

function normalizeCategory(rawCategory: string) {
  if (rawCategory.includes("카페") || rawCategory.includes("커피")) return "카페";
  if (rawCategory.includes("치킨")) return "치킨";
  if (rawCategory.includes("편의점")) return "편의점";
  if (rawCategory.includes("무인")) return "무인점포";
  if (rawCategory.includes("뷰티")) return "뷰티";
  return rawCategory;
}

function classifyBrandGroup(rawBrandName: string) {
  const major = ["메가커피", "BBQ", "GS25", "CU", "스타벅스"];
  if (major.some((brand) => rawBrandName.includes(brand))) {
    return "대형 프랜차이즈";
  }
  if (rawBrandName.includes("무인")) return "무인/자동화 브랜드";
  return "중소형 프랜차이즈";
}

function buildSafeSummary(raw: RawListing, category: string) {
  const sales = rangeFor(raw.monthlySales, MONTHLY_SALES_RULES).label;
  return `${raw.rawSido} ${raw.rawSigungu} 상권의 ${category} 매물입니다. 월매출은 ${sales} 범위로 검수되었습니다.`;
}

export function transformRawListing(raw: RawListing): PublicListing {
  const category = normalizeCategory(raw.rawCategory);
  const monthlySales = rangeFor(raw.monthlySales, MONTHLY_SALES_RULES);
  const premium = rangeFor(raw.premium, PREMIUM_RULES);
  const profit = rangeFor(raw.estimatedProfit, PROFIT_RULES);
  const rent = rangeFor(raw.rent, RENT_RULES);

  return {
    id: `pl-${raw.id.replace("raw-", "")}`,
    rawListingId: raw.id,
    publicCode: `JM-2026-${raw.id.replace("raw-", "").padStart(4, "0")}`,
    title: `${raw.rawSido} ${raw.rawSigungu} ${category} 양도양수 매물`,
    brandGroup: classifyBrandGroup(raw.rawBrandName),
    category,
    sido: raw.rawSido,
    sigungu: raw.rawSigungu,
    regionLabel: `${raw.rawSido} ${raw.rawSigungu}`,
    monthlySalesRange: monthlySales.label,
    premiumRange: premium.label,
    estimatedProfitRange: profit.label,
    rentRange: rent.label,
    monthlySalesBucket: monthlySales.bucket,
    premiumBucket: premium.bucket,
    estimatedProfitBucket: profit.bucket,
    sizeRange: "검수 후 공개",
    floorType: "상담 시 안내",
    operationPeriodRange: "검수 후 공개",
    summary: buildSafeSummary(raw, category),
    highlights: ["정제 완료", "주소 비공개", "상담 후 상세자료"],
    recommendedFor: ["조건 비교 고객", "상담 희망 고객"],
    imageUrl:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=900&q=80",
    isPublic: false,
    publishedAt: new Date().toISOString(),
  };
}

export function getTransformPreview() {
  return rawListings.map((raw) => ({
    rawId: raw.id,
    sourceStatus: raw.status,
    removedFields: [
      "rawDong",
      "rawDetailAddress",
      "rawBranchName",
      "ownerName",
      "ownerPhone",
      "customerName",
      "internalMemo",
      "posOriginal",
      "salesSheetOriginal",
      "rawAddress",
    ],
    publicListing: transformRawListing(raw),
  }));
}
