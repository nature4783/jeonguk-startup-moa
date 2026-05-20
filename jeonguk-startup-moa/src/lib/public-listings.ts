export type ListingSort =
  | "recommended"
  | "latest"
  | "sales-desc"
  | "premium-asc"
  | "profit-desc";

export type PublicListing = {
  id: string;
  rawListingId?: string;
  publicCode: string;
  title: string;
  brandGroup: string;
  category: string;
  sido: string;
  sigungu: string;
  regionLabel: string;
  monthlySalesRange: string;
  premiumRange: string;
  estimatedProfitRange: string;
  rentRange: string;
  monthlySalesBucket: number;
  premiumBucket: number;
  estimatedProfitBucket: number;
  sizeRange: string;
  floorType: string;
  operationPeriodRange: string;
  summary: string;
  highlights: string[];
  recommendedFor: string[];
  imageUrl: string;
  isPublic: boolean;
  publishedAt: string;
};

export type ListingFilters = {
  query?: string;
  sido?: string;
  sigungu?: string;
  category?: string;
  brandGroup?: string;
  monthlySalesRange?: string;
  premiumRange?: string;
  estimatedProfitRange?: string;
  sort?: ListingSort;
};

export const publicListings: PublicListing[] = [
  {
    id: "pl-1001",
    rawListingId: "raw-9001",
    publicCode: "JM-2026-0001",
    title: "서울 강남구 카페 양도양수 매물",
    brandGroup: "대형 프랜차이즈",
    category: "카페",
    sido: "서울",
    sigungu: "강남구",
    regionLabel: "서울 강남구",
    monthlySalesRange: "5천만~1억",
    premiumRange: "1억~2억",
    estimatedProfitRange: "800만~1,200만",
    rentRange: "500만~800만",
    monthlySalesBucket: 5,
    premiumBucket: 4,
    estimatedProfitBucket: 4,
    sizeRange: "20~30평",
    floorType: "1층",
    operationPeriodRange: "3년 이상",
    summary:
      "오피스와 주거 수요가 함께 있는 상권의 카페 매물입니다. 배달과 테이크아웃 수요를 함께 검토하기 좋습니다.",
    highlights: ["역세권 유동인구", "배달 병행", "본사 교육 가능"],
    recommendedFor: ["카페 경험자", "부부 창업", "운영 안정성 선호"],
    imageUrl:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80",
    isPublic: true,
    publishedAt: "2026-05-10T09:00:00+09:00",
  },
  {
    id: "pl-1002",
    rawListingId: "raw-9002",
    publicCode: "JM-2026-0002",
    title: "경기 성남시 치킨 양도양수 매물",
    brandGroup: "대형 프랜차이즈",
    category: "치킨",
    sido: "경기",
    sigungu: "성남시",
    regionLabel: "경기 성남시",
    monthlySalesRange: "3천만~5천만",
    premiumRange: "5천만~1억",
    estimatedProfitRange: "500만~800만",
    rentRange: "300만~500만",
    monthlySalesBucket: 4,
    premiumBucket: 3,
    estimatedProfitBucket: 3,
    sizeRange: "15~25평",
    floorType: "1층",
    operationPeriodRange: "2~3년",
    summary:
      "주거 밀집 지역에서 포장과 배달 비중이 높은 치킨 매물입니다. 야간 운영 경험이 있는 예비 창업자에게 적합합니다.",
    highlights: ["배달 수요", "대형 브랜드", "설비 양호"],
    recommendedFor: ["배달 운영 경험자", "소형 매장 선호", "월간 매출 집중"],
    imageUrl:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=80",
    isPublic: true,
    publishedAt: "2026-05-09T13:20:00+09:00",
  },
  {
    id: "pl-1003",
    rawListingId: "raw-9003",
    publicCode: "JM-2026-0003",
    title: "부산 해운대구 분식 양도양수 매물",
    brandGroup: "중소형 프랜차이즈",
    category: "분식",
    sido: "부산",
    sigungu: "해운대구",
    regionLabel: "부산 해운대구",
    monthlySalesRange: "1천만~3천만",
    premiumRange: "3천만~5천만",
    estimatedProfitRange: "300만~500만",
    rentRange: "200만~300만",
    monthlySalesBucket: 3,
    premiumBucket: 2,
    estimatedProfitBucket: 2,
    sizeRange: "10~20평",
    floorType: "1층",
    operationPeriodRange: "1~2년",
    summary:
      "관광지와 생활 상권이 만나는 구역의 분식 매물입니다. 낮은 권리금으로 시작하려는 초보 창업자에게 적합합니다.",
    highlights: ["간편식 수요", "자체 회전", "초보 교육 가능"],
    recommendedFor: ["소자본 창업", "초보 창업", "가족 운영"],
    imageUrl:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=900&q=80",
    isPublic: true,
    publishedAt: "2026-05-08T16:40:00+09:00",
  },
  {
    id: "pl-1004",
    rawListingId: "raw-9004",
    publicCode: "JM-2026-0004",
    title: "인천 연수구 무인점포 양도양수 매물",
    brandGroup: "무인·자동화 브랜드",
    category: "무인점포",
    sido: "인천",
    sigungu: "연수구",
    regionLabel: "인천 연수구",
    monthlySalesRange: "1천만~3천만",
    premiumRange: "5천만~1억",
    estimatedProfitRange: "300만~500만",
    rentRange: "100만~200만",
    monthlySalesBucket: 3,
    premiumBucket: 3,
    estimatedProfitBucket: 2,
    sizeRange: "10~15평",
    floorType: "1층",
    operationPeriodRange: "1년 미만",
    summary:
      "상주 시간이 적은 자동화 운영 중심의 무인점포 매물입니다. 부업형 창업과 운영 시간 절감을 원하는 분에게 적합합니다.",
    highlights: ["자동 결제", "상주 시간 낮음", "관리 동선 단순"],
    recommendedFor: ["부업 창업", "자동화 선호", "운영 시간 절약"],
    imageUrl:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=80",
    isPublic: true,
    publishedAt: "2026-05-07T11:10:00+09:00",
  },
  {
    id: "pl-1005",
    rawListingId: "raw-9005",
    publicCode: "JM-2026-0005",
    title: "대구 수성구 편의점 양도양수 매물",
    brandGroup: "대형 프랜차이즈",
    category: "편의점",
    sido: "대구",
    sigungu: "수성구",
    regionLabel: "대구 수성구",
    monthlySalesRange: "5천만~1억",
    premiumRange: "5천만~1억",
    estimatedProfitRange: "500만~800만",
    rentRange: "300만~500만",
    monthlySalesBucket: 5,
    premiumBucket: 3,
    estimatedProfitBucket: 3,
    sizeRange: "25~35평",
    floorType: "1층",
    operationPeriodRange: "3년 이상",
    summary:
      "주거와 학교 수요가 함께 있는 생활형 편의점 매물입니다. 안정적인 반복 매출을 선호하는 창업자에게 적합합니다.",
    highlights: ["생활 상권", "월간 매출", "재고 시스템"],
    recommendedFor: ["상주 운영", "생활형 상권 선호", "안정 매출 선호"],
    imageUrl:
      "https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?auto=format&fit=crop&w=900&q=80",
    isPublic: true,
    publishedAt: "2026-05-06T14:00:00+09:00",
  },
  {
    id: "pl-1006",
    rawListingId: "raw-9006",
    publicCode: "JM-2026-0006",
    title: "광주 북구 뷰티숍 양도양수 매물",
    brandGroup: "개인 브랜드",
    category: "뷰티",
    sido: "광주",
    sigungu: "북구",
    regionLabel: "광주 북구",
    monthlySalesRange: "1천만~3천만",
    premiumRange: "3천만 미만",
    estimatedProfitRange: "300만~500만",
    rentRange: "100만~200만",
    monthlySalesBucket: 3,
    premiumBucket: 1,
    estimatedProfitBucket: 2,
    sizeRange: "10~20평",
    floorType: "2층 이상",
    operationPeriodRange: "2~3년",
    summary:
      "예약제 비중이 높은 소형 뷰티 업종 매물입니다. 기술 기반 1인 운영과 저권리금 창업을 검토하기 좋습니다.",
    highlights: ["예약 운영", "권리금 낮음", "고정 고객"],
    recommendedFor: ["기술 창업", "1인 운영", "저권리금 선호"],
    imageUrl:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
    isPublic: true,
    publishedAt: "2026-05-05T10:30:00+09:00",
  },
];

export const filterOptions = {
  sidos: Array.from(new Set(publicListings.map((listing) => listing.sido))),
  sigungus: Array.from(new Set(publicListings.map((listing) => listing.sigungu))),
  categories: Array.from(new Set(publicListings.map((listing) => listing.category))),
  brandGroups: Array.from(new Set(publicListings.map((listing) => listing.brandGroup))),
  monthlySalesRanges: [
    "1천만 미만",
    "1천만~3천만",
    "3천만~5천만",
    "5천만~1억",
    "1억 이상",
  ],
  premiumRanges: [
    "3천만 미만",
    "3천만~5천만",
    "5천만~1억",
    "1억~2억",
    "2억 이상",
  ],
  estimatedProfitRanges: [
    "300만 미만",
    "300만~500만",
    "500만~800만",
    "800만~1,200만",
    "1,200만 이상",
  ],
};

export function getPublicListings(filters: ListingFilters = {}) {
  const query = filters.query?.trim().toLowerCase();
  const sort = filters.sort ?? "recommended";

  const filtered = publicListings.filter((listing) => {
    if (!listing.isPublic) return false;
    if (query) {
      const haystack = [
        listing.title,
        listing.regionLabel,
        listing.category,
        listing.brandGroup,
        listing.summary,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    if (filters.sido && listing.sido !== filters.sido) return false;
    if (filters.sigungu && listing.sigungu !== filters.sigungu) return false;
    if (filters.category && listing.category !== filters.category) return false;
    if (filters.brandGroup && listing.brandGroup !== filters.brandGroup) return false;
    if (
      filters.monthlySalesRange &&
      listing.monthlySalesRange !== filters.monthlySalesRange
    ) {
      return false;
    }
    if (filters.premiumRange && listing.premiumRange !== filters.premiumRange) {
      return false;
    }
    if (
      filters.estimatedProfitRange &&
      listing.estimatedProfitRange !== filters.estimatedProfitRange
    ) {
      return false;
    }
    return true;
  });

  return filtered.sort((a, b) => {
    if (sort === "latest") {
      return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
    }
    if (sort === "sales-desc") {
      return b.monthlySalesBucket - a.monthlySalesBucket;
    }
    if (sort === "premium-asc") {
      return a.premiumBucket - b.premiumBucket;
    }
    if (sort === "profit-desc") {
      return b.estimatedProfitBucket - a.estimatedProfitBucket;
    }
    return (
      b.estimatedProfitBucket * 2 -
      b.premiumBucket -
      (a.estimatedProfitBucket * 2 - a.premiumBucket)
    );
  });
}

export function getPublicListingById(listingId: string) {
  return publicListings.find(
    (listing) => listing.id === listingId && listing.isPublic,
  );
}

export function getListingStats() {
  const listings = getPublicListings();

  return {
    total: listings.length,
    regions: new Set(listings.map((listing) => listing.regionLabel)).size,
    lowPremium: listings.filter((listing) => listing.premiumBucket <= 2).length,
    highProfit: listings.filter((listing) => listing.estimatedProfitBucket >= 3)
      .length,
  };
}
