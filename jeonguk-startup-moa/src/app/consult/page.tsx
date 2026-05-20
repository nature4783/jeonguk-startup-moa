import type { Metadata } from "next";
export { default } from "../consultation/page";

export const metadata: Metadata = {
  title: "창업 상담 신청",
  description:
    "전국창업모아에서 창업 양도양수 매물 상담, 상세자료 요청, 희망 조건 등록을 신청하세요.",
  alternates: {
    canonical: "/consult",
  },
};
