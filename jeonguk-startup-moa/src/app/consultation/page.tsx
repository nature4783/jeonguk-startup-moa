import { AppHeader } from "@/components/layout/AppHeader";
import { getPublicListingById } from "@/lib/public-listings";

type SearchParams = Record<string, string | string[] | undefined>;

function valueOf(searchParams: SearchParams, key: string) {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

export default async function ConsultationPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const listingId = valueOf(params, "listingId") ?? "";
  const requestType = valueOf(params, "type") ?? "consultation";
  const submitted = valueOf(params, "submitted") === "1";
  const listing = listingId ? getPublicListingById(listingId) : undefined;

  return (
    <>
      <AppHeader />
      <main className="mx-auto grid w-full max-w-5xl gap-6 px-4 pb-44 pt-6 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-md bg-neutral-950 p-6 text-white shadow-sm">
          <p className="text-sm font-black text-amber-300">REQUEST</p>
          <h1 className="mt-2 text-3xl font-black">상담 신청</h1>
          <div className="mt-8 space-y-4 text-sm leading-6 text-stone-300">
            <p>상담 신청, 상세자료 요청, 희망 조건 남기기를 같은 폼에서 처리합니다.</p>
            <p>상담 전에는 상세주소와 연락처를 공개하지 않는 흐름으로 설계했습니다.</p>
          </div>
          {listing ? (
            <div className="mt-8 rounded-md bg-white p-4 text-neutral-950">
              <p className="text-xs font-black text-neutral-500">선택 매물</p>
              <p className="mt-1 font-black">{listing.title}</p>
              <p className="mt-2 text-sm font-bold text-neutral-600">
                {listing.monthlySalesRange} · {listing.premiumRange}
              </p>
            </div>
          ) : null}
        </section>

        <form
          action="/api/consultations"
          method="post"
          className="rounded-md border border-stone-200 bg-white p-5 shadow-sm"
        >
          <input type="hidden" name="listingId" value={listingId} />
          <input type="hidden" name="redirectTo" value="/consultation?submitted=1" />
          <div className="grid gap-4">
            {submitted ? (
              <div className="rounded-md bg-[#eefdf7] p-4 text-sm font-black text-[#00866d]">
                상담 요청이 접수되었습니다. 확인 후 순차적으로 연락드릴게요.
              </div>
            ) : null}
            <label className="space-y-1 text-xs font-black text-neutral-500">
              <span>요청 유형</span>
              <select
                name="requestType"
                defaultValue={requestType}
                className="h-11 w-full rounded-md border border-stone-200 px-3 text-sm font-bold text-neutral-900 outline-none focus:border-neutral-950"
              >
                <option value="consultation">상담 신청</option>
                <option value="detail_request">상세자료 요청</option>
                <option value="condition_request">희망 조건 남기기</option>
              </select>
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-xs font-black text-neutral-500">
                <span>이름</span>
                <input
                  name="name"
                  required
                  className="h-11 w-full rounded-md border border-stone-200 px-3 text-sm font-bold text-neutral-900 outline-none focus:border-neutral-950"
                />
              </label>
              <label className="space-y-1 text-xs font-black text-neutral-500">
                <span>연락처</span>
                <input
                  name="phone"
                  required
                  placeholder="010-0000-0000"
                  className="h-11 w-full rounded-md border border-stone-200 px-3 text-sm font-bold text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-950"
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-xs font-black text-neutral-500">
                <span>희망 지역</span>
                <input
                  name="preferredRegion"
                  placeholder="예: 서울 강남구"
                  className="h-11 w-full rounded-md border border-stone-200 px-3 text-sm font-bold text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-950"
                />
              </label>
              <label className="space-y-1 text-xs font-black text-neutral-500">
                <span>희망 업종</span>
                <input
                  name="preferredCategory"
                  placeholder="예: 카페"
                  className="h-11 w-full rounded-md border border-stone-200 px-3 text-sm font-bold text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-950"
                />
              </label>
            </div>
            <label className="space-y-1 text-xs font-black text-neutral-500">
              <span>예산 범위</span>
              <input
                name="budgetRange"
                placeholder="예: 권리금 5천만~1억"
                className="h-11 w-full rounded-md border border-stone-200 px-3 text-sm font-bold text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-950"
              />
            </label>
            <label className="space-y-1 text-xs font-black text-neutral-500">
              <span>메모</span>
              <textarea
                name="message"
                rows={5}
                className="w-full rounded-md border border-stone-200 px-3 py-3 text-sm font-bold text-neutral-900 outline-none focus:border-neutral-950"
              />
            </label>
            <label className="flex items-start gap-2 rounded-md bg-stone-50 p-3 text-xs font-bold leading-5 text-neutral-600">
              <input
                type="checkbox"
                name="privacyAgreement"
                value="agreed"
                required
                className="mt-1 size-4 accent-[#0b66e4]"
              />
              <span>
                상담 처리를 위해 입력한 개인정보를 수집·이용하는 데 동의합니다.{" "}
                <a href="/privacy" className="text-[#0b66e4] underline">
                  개인정보처리방침
                </a>
                과{" "}
                <a href="/terms" className="text-[#0b66e4] underline">
                  이용약관
                </a>
                을 확인했습니다.
              </span>
            </label>
            <button
              type="submit"
              className="h-12 rounded-md bg-neutral-950 px-5 text-sm font-black text-white hover:bg-neutral-800"
            >
              상담 신청
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
