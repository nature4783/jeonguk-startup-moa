import {
  BadgeCheck,
  Banknote,
  Brush,
  ClipboardCheck,
  FileText,
  Megaphone,
  SearchCheck,
  Store,
} from "lucide-react";

export type StartupStage = {
  id: string;
  order: number;
  title: string;
  description: string;
  progress: number;
  tasks: string[];
};

export type PartnerCategory = {
  id: string;
  title: string;
  description: string;
  icon: typeof Store;
  partners: {
    name: string;
    summary: string;
    benefit: string;
  }[];
};

export const startupStages: StartupStage[] = [
  {
    id: "idea",
    order: 1,
    title: "창업 방향 정리",
    description: "업종, 예산, 운영 가능 시간을 먼저 정리합니다.",
    progress: 80,
    tasks: ["희망 업종 3개 선택", "가용 예산 입력", "운영 가능 시간 확인"],
  },
  {
    id: "market",
    order: 2,
    title: "상권과 후보 매물 탐색",
    description: "지역과 업종 기준으로 검수 매물과 상권 정보를 비교합니다.",
    progress: 55,
    tasks: ["관심 지역 선택", "검수 매물 3개 비교", "상권 질문 남기기"],
  },
  {
    id: "money",
    order: 3,
    title: "자금 계획",
    description: "권리금, 보증금, 운영자금, 예상 순수익을 함께 봅니다.",
    progress: 35,
    tasks: ["초기 비용 계산", "운영자금 3개월 확보", "회수 기간 가정"],
  },
  {
    id: "contract",
    order: 4,
    title: "상담과 계약 검토",
    description: "상세자료 요청 후 비공개 정보는 상담 단계에서 확인합니다.",
    progress: 20,
    tasks: ["상담 신청", "상세자료 요청", "계약 전 체크리스트 확인"],
  },
  {
    id: "open",
    order: 5,
    title: "오픈 준비와 운영",
    description: "인테리어, 물류, 마케팅, 포스, 보험까지 순서대로 준비합니다.",
    progress: 10,
    tasks: ["필수 업체 비교", "오픈 마케팅 준비", "운영 지표 설정"],
  },
];

export const todaysTasks = [
  "희망 업종과 지역을 3개씩 저장하기",
  "관심 매물 2개 이상 비교함에 담기",
  "권리금과 운영자금을 포함한 예산 범위 적기",
  "커뮤니티에 상권 또는 업종 질문 1개 남기기",
];

export const partnerCategories: PartnerCategory[] = [
  {
    id: "interior",
    title: "인테리어/시공",
    description: "매장 규모와 업종에 맞는 시공 견적을 비교합니다.",
    icon: Brush,
    partners: [
      {
        name: "공간설계 파트너",
        summary: "소형 외식업과 카페 인테리어 견적 상담",
        benefit: "회원 견적 검토 무료",
      },
      {
        name: "매장 리뉴얼 스튜디오",
        summary: "기존 매장 인수 후 부분 리뉴얼 전문",
        benefit: "현장 체크리스트 제공",
      },
    ],
  },
  {
    id: "supplies",
    title: "물류/도매",
    description: "초기 재고, 소모품, 원부자재 구입처를 정리합니다.",
    icon: Store,
    partners: [
      {
        name: "창업 물류몰",
        summary: "카페, 분식, 치킨 업종별 초기 물품 패키지",
        benefit: "첫 구매 할인",
      },
      {
        name: "소상공인 도매클럽",
        summary: "소모품 정기 배송과 단가 비교",
        benefit: "샘플 키트 제공",
      },
    ],
  },
  {
    id: "finance",
    title: "자금/정책",
    description: "정부지원사업, 정책자금, 세무 상담을 함께 확인합니다.",
    icon: Banknote,
    partners: [
      {
        name: "정책자금 체크",
        summary: "창업 단계별 지원사업 자격 확인",
        benefit: "지원 가능성 진단",
      },
      {
        name: "초기 세무 상담",
        summary: "사업자 등록과 세금 구조 상담",
        benefit: "첫 상담 무료",
      },
    ],
  },
  {
    id: "marketing",
    title: "마케팅/오픈",
    description: "오픈 전후 홍보와 리뷰 관리 흐름을 준비합니다.",
    icon: Megaphone,
    partners: [
      {
        name: "동네 홍보 패키지",
        summary: "오픈 이벤트, 지도 등록, 리뷰 초기 세팅",
        benefit: "오픈 체크리스트 제공",
      },
      {
        name: "배달앱 운영 코치",
        summary: "배달 메뉴, 사진, 쿠폰 운영 컨설팅",
        benefit: "초기 세팅 점검",
      },
    ],
  },
];

export const roadmapQuickLinks = [
  { href: "/guides", title: "단계별 가이드", icon: ClipboardCheck },
  { href: "/listings", title: "후보 매물", icon: SearchCheck },
  { href: "/consultation", title: "상담 신청", icon: FileText },
  { href: "/partners", title: "추천 업체", icon: BadgeCheck },
];
