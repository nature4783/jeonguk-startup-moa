import Link from "next/link";
import { CheckCircle2, Database, EyeOff, ShieldCheck } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { getTransformPreview } from "@/lib/server/raw-listings";

export default function AdminPage() {
  const previews = getTransformPreview();

  return (
    <>
      <AppHeader />
      <AdminShell>
        <div className="space-y-6">
          <section className="rounded-md bg-white p-6 shadow-sm">
            <p className="text-sm font-black text-amber-700">ADMIN</p>
            <h1 className="mt-1 text-3xl font-black text-neutral-950">관리자 대시보드</h1>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-md border border-stone-200 p-4">
                <Database className="size-8 rounded-md bg-stone-100 p-2" />
                <p className="mt-3 text-sm font-black text-neutral-500">raw 대기</p>
                <p className="mt-1 text-2xl font-black">{previews.length}</p>
              </div>
              <div className="rounded-md border border-stone-200 p-4">
                <ShieldCheck className="size-8 rounded-md bg-emerald-100 p-2 text-emerald-800" />
                <p className="mt-3 text-sm font-black text-neutral-500">RLS 정책</p>
                <p className="mt-1 text-2xl font-black">설계됨</p>
              </div>
              <div className="rounded-md border border-stone-200 p-4">
                <EyeOff className="size-8 rounded-md bg-rose-100 p-2 text-rose-800" />
                <p className="mt-3 text-sm font-black text-neutral-500">비공개 필드</p>
                <p className="mt-1 text-2xl font-black">10개</p>
              </div>
            </div>
          </section>

          <section className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-neutral-950">보안 경계</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {[
                "고객 화면은 public_listings DTO만 사용",
                "raw_listings 샘플과 변환 함수는 server-only",
                "관리자 라우트는 proxy에서 토큰 확인",
                "Supabase service role key는 서버 환경변수 전용",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-bold text-neutral-700">
                  <CheckCircle2 className="size-4 text-emerald-700" aria-hidden />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                href="/admin/transform"
                className="inline-flex h-11 items-center rounded-md bg-neutral-950 px-5 text-sm font-black text-white"
              >
                정제 변환 보기
              </Link>
              <Link
                href="/admin/listings"
                className="inline-flex h-11 items-center rounded-md border border-stone-200 px-5 text-sm font-black text-neutral-900"
              >
                공개 관리
              </Link>
            </div>
          </section>
        </div>
      </AdminShell>
    </>
  );
}
