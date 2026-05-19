import Link from "next/link";
import {
  BellRing,
  LockKeyhole,
  MessageCircle,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { CommunityCard } from "@/components/community/CommunityCard";
import { communityPosts, platformTopics } from "@/lib/community";

const boards = ["전체", "질문", "후기", "정보", "상권"];

const rooms = [
  { title: "카페 창업방", count: 38, tone: "bg-[#e8f7ff] text-[#0b66e4]" },
  { title: "권리금 고민방", count: 24, tone: "bg-[#eefdf7] text-[#00866d]" },
  { title: "상권 속닥방", count: 31, tone: "bg-[#fff7e8] text-[#b96b00]" },
];

export default function CommunityPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-[520px] overflow-x-hidden bg-[#f6f8fc] px-5 pb-44 pt-3 lg:max-w-6xl">
        <section className="rounded-[1.8rem] bg-[#061b3d] p-5 text-white shadow-[0_18px_45px_rgba(6,27,61,0.18)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8fd8ff]">
                Member Talk
              </p>
              <h1 className="mt-3 text-[2.2rem] font-black leading-[1.06]">
                가입자끼리
                <span className="block text-[#7fe7d4]">속닥속닥</span>
              </h1>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-2 text-xs font-black text-white ring-1 ring-white/15">
              <UsersRound className="size-4" aria-hidden />
              128명
            </span>
          </div>

          <div className="mt-5 grid grid-cols-[repeat(3,minmax(0,1fr))] gap-2">
            <div className="min-w-0 rounded-[1.05rem] bg-white/[0.08] p-3 ring-1 ring-white/10">
              <p className="text-xs font-bold text-white/45">방식</p>
              <p className="mt-1 truncate text-sm font-black">익명 가능</p>
            </div>
            <div className="min-w-0 rounded-[1.05rem] bg-white/[0.08] p-3 ring-1 ring-white/10">
              <p className="text-xs font-bold text-white/45">공개</p>
              <p className="mt-1 truncate text-sm font-black">회원 중심</p>
            </div>
            <div className="min-w-0 rounded-[1.05rem] bg-white/[0.08] p-3 ring-1 ring-white/10">
              <p className="text-xs font-bold text-white/45">보호</p>
              <p className="mt-1 truncate text-sm font-black">민감정보 금지</p>
            </div>
          </div>
        </section>

        <section className="mt-4 rounded-[1.45rem] bg-white p-4 shadow-sm ring-1 ring-[#dbe5f7]">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-[1rem] bg-[#eef5ff] text-[#0b66e4]">
              <PenLine className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-black text-[#0b66e4]">익명 속닥</p>
              <p className="truncate text-base font-black text-neutral-950">
                오늘 어떤 창업 고민이 있으세요?
              </p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href="/consultation?type=condition_request"
              className="inline-flex h-12 items-center justify-center rounded-[1rem] bg-[#0b66e4] text-sm font-black text-white"
            >
              글 남기기
            </Link>
            <Link
              href="/my"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[1rem] bg-[#f1f5fb] text-sm font-black text-neutral-800"
            >
              <LockKeyhole className="size-4" aria-hidden />
              회원 인증
            </Link>
          </div>
        </section>

        <section className="mt-4 rounded-[1.45rem] bg-white p-3 shadow-sm ring-1 ring-[#dbe5f7]">
          <form className="flex gap-2">
            <label className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
              <input
                placeholder="속닥방 검색"
                className="h-11 w-full rounded-[0.9rem] bg-[#f6f8fb] pl-9 pr-3 text-sm font-bold outline-none ring-1 ring-[#edf1f7] focus:ring-[#0b66e4]"
              />
            </label>
            <button
              type="button"
              className="h-11 rounded-[0.9rem] bg-neutral-950 px-4 text-sm font-black text-white"
            >
              검색
            </button>
          </form>

          <div className="no-scrollbar -mx-3 mt-3 flex gap-2 overflow-x-auto px-3">
            {boards.map((board) => (
              <button
                key={board}
                type="button"
                className={`h-9 shrink-0 rounded-full px-4 text-sm font-black ${
                  board === "전체"
                    ? "bg-[#0b66e4] text-white"
                    : "bg-[#eef2f7] text-neutral-700"
                }`}
              >
                {board}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0b66e4]">
                Rooms
              </p>
              <h2 className="mt-1 text-2xl font-black text-neutral-950">
                오늘의 속닥방
              </h2>
            </div>
            <Link
              href="/community"
              className="rounded-full bg-white px-3 py-2 text-sm font-black text-[#0b66e4] shadow-sm ring-1 ring-[#dbe5f7]"
            >
              전체
            </Link>
          </div>

          <div className="no-scrollbar -mx-5 mt-4 flex gap-3 overflow-x-auto px-5">
            {rooms.map((room) => (
              <Link
                key={room.title}
                href="/community"
                className="w-44 shrink-0 rounded-[1.35rem] bg-white p-4 shadow-sm ring-1 ring-[#dbe5f7]"
              >
                <span
                  className={`inline-flex size-10 items-center justify-center rounded-[0.95rem] ${room.tone}`}
                >
                  <MessageCircle className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3 text-lg font-black text-neutral-950">
                  {room.title}
                </h3>
                <p className="mt-1 text-sm font-bold text-neutral-400">
                  {room.count}명 속닥중
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-7 grid gap-3 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#0b66e4]">
                  Whisper Feed
                </p>
                <h2 className="mt-1 text-2xl font-black text-neutral-950">
                  방금 올라온 이야기
                </h2>
              </div>
              <span className="rounded-full bg-[#eefdf7] px-3 py-2 text-xs font-black text-[#00866d]">
                답변 빠름
              </span>
            </div>
            {communityPosts.map((post) => (
              <CommunityCard key={post.id} post={post} />
            ))}
          </div>

          <aside className="space-y-3">
            <div className="rounded-[1.35rem] bg-white p-4 shadow-sm ring-1 ring-[#dbe5f7]">
              <h2 className="flex items-center gap-2 text-lg font-black text-neutral-950">
                <Sparkles className="size-5 text-[#0b66e4]" aria-hidden />
                많이 보는 주제
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {platformTopics.map((topic) => (
                  <Link
                    key={topic}
                    href={`/community?topic=${encodeURIComponent(topic)}`}
                    className="rounded-full bg-[#f1f5fb] px-3 py-2 text-xs font-black text-neutral-700"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-[1.35rem] bg-[#061b3d] p-4 text-white shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-black">
                <ShieldCheck className="size-5 text-[#7fe7d4]" aria-hidden />
                속닥 규칙
              </h2>
              <div className="mt-3 grid gap-2 text-sm font-bold text-white/70">
                <p>상세주소와 연락처는 올리지 않기</p>
                <p>실제 경험은 익명으로 공유 가능</p>
                <p>상담 필요한 내용은 따로 요청하기</p>
              </div>
            </div>

            <div className="rounded-[1.35rem] bg-white p-4 shadow-sm ring-1 ring-[#dbe5f7]">
              <h2 className="flex items-center gap-2 text-lg font-black text-neutral-950">
                <BellRing className="size-5 text-[#ffaf21]" aria-hidden />
                오늘 알림
              </h2>
              <p className="mt-2 text-sm font-bold leading-5 text-neutral-500">
                카페 창업방에 답변 12개가 새로 올라왔어요.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
