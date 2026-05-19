import type { Metadata } from "next";
import { PolicyPageShell, PolicySection } from "@/components/legal/PolicyPageShell";

export const metadata: Metadata = {
  title: "이용약관 | 전국창업모아",
  description: "전국창업모아 이용 조건과 커뮤니티 운영 기준",
};

export default function TermsPage() {
  return (
    <PolicyPageShell
      eyebrow="Terms"
      title="이용약관"
      description="창업 정보, 커뮤니티, 검수 매물, 상담 신청 기능을 안전하게 쓰기 위한 기준입니다."
    >
      <PolicySection title="1. 서비스 성격">
        <p>
          전국창업모아는 창업 준비 정보, 커뮤니티, 프랜차이즈 양도양수 검수
          매물 탐색, 상담 신청을 제공하는 창업 플랫폼입니다. 앱에서 제공하는
          정보는 창업 판단을 돕기 위한 참고자료이며, 계약 체결 자체를 대행하지
          않습니다.
        </p>
      </PolicySection>

      <PolicySection title="2. 회원의 의무">
        <p>
          회원은 타인의 개인정보, 점주 연락처, 상세주소, 내부 자료, 허위 매물,
          비방성 게시물, 불법 광고를 게시하거나 요청해서는 안 됩니다.
        </p>
        <p>
          커뮤니티는 가입자끼리 창업 고민과 경험을 나누는 공간이므로, 민감정보
          공개나 특정 매장 식별이 가능한 내용은 제한될 수 있습니다.
        </p>
      </PolicySection>

      <PolicySection title="3. 매물 정보">
        <p>
          고객 화면의 매물 정보는 공개 가능한 범위로 정제된 public_listings를
          기준으로 표시합니다. 월매출, 권리금, 순수익은 범위형으로 제공되며,
          실제 조건은 상담과 확인 절차에서 달라질 수 있습니다.
        </p>
      </PolicySection>

      <PolicySection title="4. 상담과 상세자료 요청">
        <p>
          상담 신청, 상세자료 요청, 희망 조건 남기기는 매수·계약 버튼이 아니며
          정보 확인과 상담 연결을 위한 요청입니다. 상세주소, 점주 연락처,
          지점명 등 비공개 정보는 적절한 확인 절차 후 제한적으로 안내될 수
          있습니다.
        </p>
      </PolicySection>

      <PolicySection title="5. 게시물 관리">
        <p>
          운영자는 안전한 커뮤니티 운영을 위해 신고된 게시물, 개인정보 노출
          게시물, 허위 정보, 광고성 게시물을 숨김 또는 삭제할 수 있습니다.
        </p>
      </PolicySection>

      <PolicySection title="6. 약관 변경">
        <p>
          약관 변경 시 앱 내 공지 또는 별도 고지를 통해 안내합니다. 중요한
          변경은 적용 전 충분한 기간을 두고 알립니다.
        </p>
      </PolicySection>

      <PolicySection title="7. 시행일">
        <p>본 약관은 2026년 5월 15일부터 적용합니다.</p>
      </PolicySection>
    </PolicyPageShell>
  );
}
