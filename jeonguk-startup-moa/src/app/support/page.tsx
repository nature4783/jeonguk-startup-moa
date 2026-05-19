import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { PolicyPageShell, PolicySection } from "@/components/legal/PolicyPageShell";

export const metadata: Metadata = {
  title: "고객지원 | 전국창업모아",
  description: "전국창업모아 고객지원, 신고, 개인정보 문의",
};

export default function SupportPage() {
  return (
    <PolicyPageShell
      eyebrow="Support"
      title="고객지원"
      description="상담 신청, 커뮤니티 신고, 개인정보 문의를 한 곳에서 접수할 수 있게 준비했습니다."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/consultation"
          className="rounded-[1.1rem] bg-[#0b66e4] p-4 text-white shadow-sm"
        >
          <MessageCircle className="size-7" aria-hidden />
          <h2 className="mt-3 text-lg font-black">상담 문의</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-white/75">
            창업 상담, 매물 자료 요청, 희망 조건을 남길 수 있습니다.
          </p>
        </Link>

        <Link
          href="/account-deletion"
          className="rounded-[1.1rem] bg-[#eef5ff] p-4 text-[#0b66e4] shadow-sm ring-1 ring-[#dbe5f7]"
        >
          <ShieldCheck className="size-7" aria-hidden />
          <h2 className="mt-3 text-lg font-black">데이터 요청</h2>
          <p className="mt-2 text-sm font-bold leading-6 text-neutral-600">
            계정 삭제, 개인정보 열람, 정정, 삭제 요청을 접수합니다.
          </p>
        </Link>
      </div>

      <PolicySection title="문의 유형">
        <p>상담 문의, 매물 정보 문의, 커뮤니티 신고, 계정/데이터 삭제 요청</p>
      </PolicySection>

      <PolicySection title="응대 기준">
        <p>
          접수된 문의는 내용 확인 후 순차적으로 처리합니다. 개인정보 또는
          계정과 관련된 요청은 본인 확인 절차가 필요할 수 있습니다.
        </p>
      </PolicySection>

      <PolicySection title="운영 정보">
        <p>
          고객센터 이메일, 전화번호, 사업자명, 주소는 앱 공지와 스토어 등록
          정보에 동일하게 안내합니다. 개인정보 또는 계정 관련 요청은 본인 확인
          후 처리합니다.
        </p>
      </PolicySection>
    </PolicyPageShell>
  );
}
