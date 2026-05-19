import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { roadmapQuickLinks, startupStages, todaysTasks } from "@/lib/startup-roadmap";

export default function RoadmapPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <section className="rounded-md bg-neutral-950 p-5 text-white shadow-sm sm:p-7">
          <p className="text-sm font-black text-amber-300">STARTUP ROADMAP</p>
          <h1 className="mt-2 max-w-[300px] text-3xl font-black leading-tight sm:max-w-none sm:text-5xl">
            내 창업 로드맵
          </h1>
          <p className="mt-3 max-w-[310px] text-sm leading-6 text-stone-300 sm:max-w-2xl sm:text-base">
            사업계획, 매물 탐색, 자금 계획, 상담, 오픈 준비까지 해야 할 일을
            단계별로 정리합니다.
          </p>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <div className="rounded-md border border-stone-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black text-neutral-950">오늘 할 일</h2>
              <div className="mt-4 grid gap-3">
                {todaysTasks.map((task) => (
                  <label
                    key={task}
                    className="flex items-center gap-3 rounded-md bg-stone-50 p-3 text-sm font-bold text-neutral-700"
                  >
                    <input type="checkbox" className="size-4 accent-neutral-950" />
                    {task}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {roadmapQuickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md border border-stone-200 bg-white p-4 shadow-sm hover:border-neutral-950"
                  >
                    <Icon className="size-9 rounded-md bg-stone-100 p-2 text-neutral-950" />
                    <span className="mt-3 block text-sm font-black text-neutral-950">
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {startupStages.map((stage) => (
              <article
                key={stage.id}
                className="rounded-md border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-amber-700">
                      STEP {stage.order}
                    </p>
                    <h2 className="mt-1 text-xl font-black text-neutral-950">
                      {stage.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">
                      {stage.description}
                    </p>
                  </div>
                  <span className="rounded-full bg-neutral-950 px-3 py-1 text-xs font-black text-white">
                    {stage.progress}%
                  </span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-stone-100">
                  <div
                    className="h-2 rounded-full bg-amber-400"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
                <div className="mt-4 grid gap-2">
                  {stage.tasks.map((task) => (
                    <div
                      key={task}
                      className="flex items-center gap-2 text-sm font-bold text-neutral-700"
                    >
                      <CheckCircle2 className="size-4 text-emerald-700" />
                      {task}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <Link
          href="/consultation?type=condition_request"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 text-sm font-black text-white sm:w-auto"
        >
          내 조건으로 상담 시작
          <ArrowRight className="size-4" />
        </Link>
      </main>
    </>
  );
}
