import { getPublicListings } from "@/lib/public-listings";

export type SeoRegionPage = {
  slug: string;
  title: string;
  h1: string;
  description: string;
  sido?: string;
  sigungu?: string;
  category?: string;
  keywords: string[];
};

export const seoRegionPages: SeoRegionPage[] = [
  {
    slug: "seoul-cafe",
    title: "서울 카페 창업 매물",
    h1: "서울 카페 창업 매물과 양도양수 체크포인트",
    description:
      "서울 카페 창업을 준비할 때 확인할 매출 범위, 권리금, 임대료, 상권 조건과 양도양수 매물을 정리했습니다.",
    sido: "서울",
    category: "카페",
    keywords: ["서울 카페 창업", "서울 카페 양도양수", "강남구 카페 매물"],
  },
  {
    slug: "gyeonggi-chicken",
    title: "경기 치킨 창업 매물",
    h1: "경기 치킨 창업 매물과 배달 상권 체크포인트",
    description:
      "경기 지역 치킨 창업을 준비하는 예비 창업자를 위해 매출, 권리금, 배달 수요, 운영 난이도를 정리했습니다.",
    sido: "경기",
    category: "치킨",
    keywords: ["경기 치킨 창업", "성남 치킨 양도양수", "치킨 배달 매물"],
  },
  {
    slug: "busan-food",
    title: "부산 분식 창업 매물",
    h1: "부산 분식 창업 매물과 소자본 창업 체크포인트",
    description:
      "부산 분식 창업과 양도양수 매물을 검토할 때 필요한 권리금, 예상 수익, 생활 상권 조건을 정리했습니다.",
    sido: "부산",
    category: "분식",
    keywords: ["부산 분식 창업", "해운대구 분식 매물", "소자본 분식 창업"],
  },
  {
    slug: "incheon-unmanned",
    title: "인천 무인점포 창업 매물",
    h1: "인천 무인점포 창업 매물과 자동화 운영 체크포인트",
    description:
      "인천 무인점포 창업을 준비하는 분을 위해 자동화 운영, 관리 동선, 권리금과 임대료 범위를 정리했습니다.",
    sido: "인천",
    category: "무인점포",
    keywords: ["인천 무인점포 창업", "무인점포 양도양수", "부업 창업 매물"],
  },
  {
    slug: "daegu-convenience",
    title: "대구 편의점 창업 매물",
    h1: "대구 편의점 창업 매물과 생활 상권 체크포인트",
    description:
      "대구 편의점 창업을 준비할 때 확인할 월매출, 권리금, 반복 매출, 생활 상권 조건을 정리했습니다.",
    sido: "대구",
    category: "편의점",
    keywords: ["대구 편의점 창업", "수성구 편의점 매물", "편의점 양도양수"],
  },
  {
    slug: "gwangju-beauty",
    title: "광주 뷰티숍 창업 매물",
    h1: "광주 뷰티숍 창업 매물과 1인 운영 체크포인트",
    description:
      "광주 뷰티숍 창업을 준비하는 분을 위해 예약제 운영, 권리금, 예상 수익, 고정 고객 조건을 정리했습니다.",
    sido: "광주",
    category: "뷰티",
    keywords: ["광주 뷰티 창업", "북구 뷰티숍 매물", "1인 뷰티숍 창업"],
  },
];

export function getSeoRegionPage(slug: string) {
  return seoRegionPages.find((page) => page.slug === slug);
}

export function getListingsForSeoRegion(page: SeoRegionPage) {
  return getPublicListings({
    sido: page.sido,
    sigungu: page.sigungu,
    category: page.category,
  });
}
