import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPageShell, PolicySection } from "@/components/legal/PolicyPageShell";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 전국창업모아",
  description: "전국창업모아 개인정보 수집, 이용, 보관, 삭제 기준",
};

export default function PrivacyPage() {
  return (
    <PolicyPageShell
      eyebrow="Privacy"
      title="개인정보처리방침"
      description="전국창업모아는 상담, 커뮤니티, 관심 매물 기능에 필요한 정보만 최소한으로 다룹니다."
    >
      <PolicySection title="0. 운영자와 문의 창구">
        <p>
          본 개인정보처리방침은 전국창업모아 앱과 웹 서비스에 적용됩니다.
          개인정보 문의, 열람, 정정, 삭제, 처리 정지 요청은{" "}
          <Link href="/support" className="text-[#0b66e4] underline">
            고객지원
          </Link>
          에서 접수할 수 있습니다.
        </p>
      </PolicySection>

      <PolicySection title="1. 수집하는 정보">
        <p>
          상담 신청 시 이름, 연락처, 희망 지역, 희망 업종, 예산 범위, 문의
          내용을 수집할 수 있습니다. 회원 기능 연결 시 이메일, 로그인 식별자,
          닉네임, 관심 매물, 비교함, 커뮤니티 게시글과 댓글 정보가 처리될 수
          있습니다.
        </p>
        <p>
          서비스 안정화와 부정 이용 방지를 위해 접속 일시, 기기 정보, 앱 이용
          기록, 오류 로그가 자동으로 생성될 수 있습니다.
        </p>
      </PolicySection>

      <PolicySection title="2. 이용 목적">
        <p>
          수집한 정보는 창업 상담 응대, 상세자료 요청 처리, 희망 조건 매칭,
          관심 매물 저장, 커뮤니티 운영, 고객지원, 서비스 보안과 품질 개선에
          사용합니다.
        </p>
      </PolicySection>

      <PolicySection title="3. 공개되지 않는 정보">
        <p>
          원본 CSV, raw_listings, 점주 연락처, 상세주소, 동 이름, 번지, 지점명,
          고객명, 내부 메모, 포스 원본, 매출표 원본은 고객 화면에 직접 공개하지
          않습니다.
        </p>
        <p>
          고객용 매물에는 시·구 단위 지역과 월매출, 권리금, 예상 순수익의
          범위형 정보만 표시합니다.
        </p>
      </PolicySection>

      <PolicySection title="4. 보관과 삭제">
        <p>
          개인정보는 이용 목적 달성 후 지체 없이 삭제합니다. 다만 관계 법령상
          보관이 필요한 정보는 해당 기간 동안 분리 보관할 수 있습니다.
        </p>
        <p>
          계정과 데이터 삭제가 필요하면{" "}
          <Link href="/account-deletion" className="text-[#0b66e4] underline">
            계정 삭제 요청
          </Link>
          에서 접수할 수 있습니다.
        </p>
      </PolicySection>

      <PolicySection title="5. 제3자 제공과 처리 위탁">
        <p>
          이용자 동의가 있거나 법령상 필요한 경우를 제외하고 개인정보를 외부에
          판매하거나 임의 제공하지 않습니다. 서비스 운영을 위해 호스팅, 데이터
          저장, 인증, 알림, 고객지원 도구를 사용할 수 있으며, 사용 업체와 보관
          위치는 개인정보처리방침 또는 별도 고지로 안내합니다.
        </p>
      </PolicySection>

      <PolicySection title="6. 안전성 확보 조치">
        <p>
          개인정보는 접근 권한을 제한하고, HTTPS 등 안전한 통신 환경에서
          처리합니다. 관리자용 raw_listings와 고객용 public_listings를 분리해
          비공개 원본 데이터가 고객 화면에 노출되지 않도록 관리합니다.
        </p>
      </PolicySection>

      <PolicySection title="7. 이용자 권리">
        <p>
          이용자는 개인정보 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다.
          요청이 접수되면 본인 확인 후 합리적인 기간 안에 처리합니다.
        </p>
      </PolicySection>

      <PolicySection title="8. 시행일">
        <p>본 방침은 2026년 5월 15일부터 적용합니다.</p>
      </PolicySection>
    </PolicyPageShell>
  );
}
