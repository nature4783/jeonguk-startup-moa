import Link from "next/link";
import {
  FileText,
  Heart,
  LifeBuoy,
  MessageSquareText,
  Scale,
  Trash2,
  UserRound,
} from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { getPublicListings } from "@/lib/public-listings";

const myCards = [
  { title: "관심 매물", body: "저장한 매물을 한곳에서 보기", icon: Heart },
  { title: "비교함", body: "최대 3개 비교 화면", icon: Scale },
  { title: "상담 내역", body: "신청한 상담과 자료 요청 확인", icon: MessageSquareText },
];

const policyLinks = [
  { title: "개인정보처리방침", href: "/privacy", icon: FileText },
  { title: "이용약관", href: "/terms", icon: FileText },
  { title: "계정 삭제 요청", href: "/account-deletion", icon: Trash2 },
  { title: "고객지원", href: "/support", icon: LifeBuoy },
];

export default function MyPage() {
  const recent = getPublicListings().slice(0, 3);

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pb-44 pt-6 sm:px-6">
        <div className="rounded-md bg-neutral-950 p-6 text-white shadow-sm">
          <UserRound className="size-10 rounded-md bg-white p-2 text-neutral-950" />
          <h1 className="mt-4 text-3xl font-black">마이페이지</h1>
          <p className="mt-2 text-sm font-bold text-stone-300">
            관심 매물, 비교함, 상담 신청 내역
          </p>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          {myCards.map(({ title, body, icon: Icon }) => (
            <div key={title} className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
              <Icon className="size-9 rounded-md bg-stone-100 p-2 text-neutral-950" />
              <h2 className="mt-4 text-lg font-black text-neutral-950">{title}</h2>
              <p className="mt-2 text-sm font-bold text-neutral-500">{body}</p>
            </div>
          ))}
        </section>

        <section className="mt-6 rounded-md border border-stone-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black text-neutral-950">앱 정보 및 정책</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {policyLinks.map(({ title, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex h-12 items-center gap-3 rounded-md bg-stone-50 px-3 text-sm font-black text-neutral-800 hover:bg-[#eef5ff] hover:text-[#0b66e4]"
              >
                <Icon className="size-5" aria-hidden />
                {title}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-black text-neutral-950">최근 본 매물</h2>
            <Link
              href="/listings"
              className="rounded-md border border-stone-200 bg-white px-4 py-2 text-sm font-black text-neutral-900 hover:border-neutral-950"
            >
              매물 보기
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {recent.map((listing) => (
              <Link
                key={listing.id}
                href={`/listings/${listing.id}`}
                className="rounded-md border border-stone-200 bg-white p-4 shadow-sm hover:border-neutral-950"
              >
                <p className="text-xs font-black text-neutral-500">{listing.publicCode}</p>
                <h3 className="mt-2 font-black text-neutral-950">{listing.title}</h3>
                <p className="mt-2 text-sm font-bold text-neutral-600">
                  {listing.monthlySalesRange} · {listing.estimatedProfitRange}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
