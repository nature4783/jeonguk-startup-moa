import type { Metadata } from "next";
import Link from "next/link";
import { PolicyPageShell, PolicySection } from "@/components/legal/PolicyPageShell";

export const metadata: Metadata = {
  title: "계정 및 데이터 삭제 요청 | 전국창업모아",
  description: "전국창업모아 계정 삭제와 개인정보 삭제 요청",
};

type SearchParams = Record<string, string | string[] | undefined>;

function valueOf(searchParams: SearchParams, key: string) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function AccountDeletionPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const submitted = valueOf(params, "submitted") === "1";

  return (
    <PolicyPageShell
      eyebrow="Data Deletion"
      title="계정 및 데이터 삭제 요청"
      description="Google Play 제출을 대비해 앱 안에서 계정과 개인정보 삭제 요청 흐름을 제공합니다."
    >
      <PolicySection title="삭제 요청 전 확인">
        <p>
          계정 삭제를 요청하면 회원 식별 정보, 관심 매물, 비교함, 커뮤니티
          작성 정보, 상담 신청 정보의 삭제 또는 비식별 처리를 검토합니다.
          법령상 보관이 필요한 기록은 별도 보관 후 기간 만료 시 삭제합니다.
        </p>
      </PolicySection>

      {submitted ? (
        <div className="mt-5 rounded-[1rem] bg-[#eefdf7] p-4 text-sm font-black leading-6 text-[#00866d]">
          삭제 요청이 접수되었습니다. 본인 확인 후 처리 상태를 안내드릴게요.
        </div>
      ) : null}

      <form
        action="/api/consultations"
        method="post"
        className="mt-5 grid gap-4 rounded-[1.1rem] bg-[#f6f8fc] p-4 ring-1 ring-[#dbe5f7]"
      >
        <input type="hidden" name="requestType" value="account_deletion" />
        <input type="hidden" name="redirectTo" value="/account-deletion?submitted=1" />
        <label className="space-y-1 text-xs font-black text-neutral-500">
          <span>이름 또는 닉네임</span>
          <input
            name="name"
            required
            className="h-11 w-full rounded-[0.8rem] border border-[#dbe5f7] bg-white px-3 text-sm font-bold text-neutral-900 outline-none focus:border-[#0b66e4]"
          />
        </label>
        <label className="space-y-1 text-xs font-black text-neutral-500">
          <span>연락 가능한 이메일 또는 휴대폰 번호</span>
          <input
            name="phone"
            required
            className="h-11 w-full rounded-[0.8rem] border border-[#dbe5f7] bg-white px-3 text-sm font-bold text-neutral-900 outline-none focus:border-[#0b66e4]"
          />
        </label>
        <label className="space-y-1 text-xs font-black text-neutral-500">
          <span>요청 내용</span>
          <textarea
            name="message"
            rows={5}
            defaultValue="계정 및 개인정보 삭제를 요청합니다."
            className="w-full rounded-[0.8rem] border border-[#dbe5f7] bg-white px-3 py-3 text-sm font-bold text-neutral-900 outline-none focus:border-[#0b66e4]"
          />
        </label>
        <label className="flex items-start gap-2 rounded-[0.9rem] bg-white p-3 text-xs font-bold leading-5 text-neutral-600 ring-1 ring-[#dbe5f7]">
          <input type="checkbox" required className="mt-1 size-4 accent-[#0b66e4]" />
          <span>
            본인 확인 후 삭제가 진행되며, 법령상 보관이 필요한 정보는 분리
            보관될 수 있음을 확인했습니다.
          </span>
        </label>
        <button
          type="submit"
          className="h-12 rounded-[1rem] bg-[#0b66e4] px-5 text-sm font-black text-white"
        >
          삭제 요청 접수
        </button>
      </form>

      <PolicySection title="관련 정책">
        <p>
          자세한 개인정보 처리 기준은{" "}
          <Link href="/privacy" className="text-[#0b66e4] underline">
            개인정보처리방침
          </Link>
          에서 확인할 수 있습니다.
        </p>
      </PolicySection>
    </PolicyPageShell>
  );
}
