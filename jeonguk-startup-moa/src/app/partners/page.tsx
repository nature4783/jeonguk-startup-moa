import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { partnerCategories } from "@/lib/startup-roadmap";

export default function PartnersPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <section className="rounded-md bg-white p-5 shadow-sm sm:p-7">
          <p className="text-sm font-black text-amber-700">RECOMMENDATION</p>
          <h1 className="mt-2 max-w-[300px] text-3xl font-black leading-tight text-neutral-950 sm:max-w-none sm:text-5xl">
            창업 단계별 추천
          </h1>
          <p className="mt-3 max-w-[310px] text-sm leading-6 text-neutral-600 sm:max-w-2xl sm:text-base">
            인테리어, 물류, 자금, 마케팅처럼 창업 과정에서 필요한 업체와
            서비스를 단계별로 비교할 수 있게 구성했습니다.
          </p>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-2">
          {partnerCategories.map((category) => {
            const Icon = category.icon;
            return (
              <article
                key={category.id}
                className="rounded-md border border-stone-200 bg-white p-5 shadow-sm"
              >
                <Icon className="size-10 rounded-md bg-neutral-950 p-2 text-white" />
                <h2 className="mt-4 text-xl font-black text-neutral-950">
                  {category.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {category.description}
                </p>
                <div className="mt-4 grid gap-3">
                  {category.partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="rounded-md border border-stone-200 bg-stone-50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-black text-neutral-950">
                            {partner.name}
                          </h3>
                          <p className="mt-1 text-sm leading-5 text-neutral-600">
                            {partner.summary}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-sm bg-amber-100 px-2 py-1 text-xs font-black text-amber-900">
                          혜택
                        </span>
                      </div>
                      <p className="mt-3 text-xs font-black text-neutral-500">
                        {partner.benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </section>

        <Link
          href="/roadmap"
          className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-neutral-950 px-5 text-sm font-black text-white sm:w-auto"
        >
          내 창업 로드맵 보기
          <ArrowRight className="size-4" />
        </Link>
      </main>
    </>
  );
}
