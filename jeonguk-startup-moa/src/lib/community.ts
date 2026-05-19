export type CommunityPost = {
  id: string;
  board: "질문" | "후기" | "정보" | "상권";
  title: string;
  summary: string;
  author: string;
  replies: number;
  views: number;
  createdAt: string;
  tags: string[];
};

export type StartupGuide = {
  id: string;
  category: "창업준비" | "상권분석" | "자금" | "운영" | "계약";
  title: string;
  summary: string;
  readingTime: string;
};

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1001",
    board: "질문",
    title: "카페 인수할 때 매출표 말고 꼭 봐야 하는 게 뭘까요?",
    summary:
      "월매출은 괜찮아 보이는데 임대료와 인건비를 어떻게 같이 봐야 할지 고민입니다.",
    author: "예비창업자",
    replies: 12,
    views: 284,
    createdAt: "2026-05-12",
    tags: ["카페", "매출검토", "초보창업"],
  },
  {
    id: "post-1002",
    board: "후기",
    title: "치킨집 양도양수 상담받고 느낀 체크포인트",
    summary:
      "배달앱 계정, 장비 상태, 피크타임 인력 구조를 따로 확인하는 게 중요했습니다.",
    author: "첫창업준비",
    replies: 8,
    views: 197,
    createdAt: "2026-05-11",
    tags: ["치킨", "상담후기", "배달"],
  },
  {
    id: "post-1003",
    board: "정보",
    title: "권리금 낮은 매장이 항상 좋은 선택은 아닌 이유",
    summary:
      "낮은 권리금보다 회수 기간, 고정비, 상권 지속성을 같이 보는 편이 안전합니다.",
    author: "창업모아",
    replies: 5,
    views: 421,
    createdAt: "2026-05-10",
    tags: ["권리금", "리스크", "자금"],
  },
  {
    id: "post-1004",
    board: "상권",
    title: "역세권보다 주거 밀집 상권이 나은 업종도 있나요?",
    summary:
      "업종별로 점심형, 저녁형, 반복구매형 수요가 달라서 기준을 나눠보고 있습니다.",
    author: "상권궁금",
    replies: 16,
    views: 338,
    createdAt: "2026-05-09",
    tags: ["상권분석", "입지", "업종선택"],
  },
];

export const startupGuides: StartupGuide[] = [
  {
    id: "guide-1001",
    category: "창업준비",
    title: "처음 창업할 때 매물보다 먼저 정해야 할 5가지",
    summary:
      "예산, 운영 시간, 가족 참여, 회수 기간, 감당 가능한 리스크부터 정리합니다.",
    readingTime: "4분",
  },
  {
    id: "guide-1002",
    category: "상권분석",
    title: "시·구 단위 정보에서 상담 전까지 확인할 것",
    summary:
      "공개 정보로 후보를 좁히고, 상세주소는 상담 단계에서 안전하게 확인합니다.",
    readingTime: "5분",
  },
  {
    id: "guide-1003",
    category: "자금",
    title: "권리금, 보증금, 운영자금 한 번에 계산하는 법",
    summary:
      "인수 비용만 보지 말고 최소 3개월 운영자금까지 같이 잡아야 합니다.",
    readingTime: "6분",
  },
];

export const platformTopics = [
  "양도양수 매물",
  "창업 질문",
  "상담 후기",
  "상권 이야기",
  "자금 계획",
  "운영 노하우",
];
