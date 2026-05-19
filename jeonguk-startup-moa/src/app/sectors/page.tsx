import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { platformSectors } from "@/lib/platform-sectors";

export default function SectorsPage() {
  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <section className="rounded-md bg-neutral-950 p-5 text-white shadow-sm sm:p-7">
          <p className="text-sm font-black text-amber-300">PLATFORM AREAS</p>
          <h1 className="mt-2 max-w-[300px] text-3xl font-black leading-tight sm:max-w-none sm:text-5xl">
            필요한 분야부터 시작하세요
          </h1>
          <p className="mt-3 max-w-[310px] text-sm leading-6 text-stone-300 sm:max-w-2xl sm:text-base">
            창업 준비, 매물·상권, 자금·지원, 업체·혜택, 커뮤니티를 분리해서
            각 단계에 맞는 정보를 볼 수 있습니다.
          </p>
        </section>

        <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {platformSectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <article
                key={sector.id}
                className="flex min-h-72 flex-col justify-between rounded-md border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className={`rounded-md p-3 ${sector.tone}`}>
                      <Icon className="size-6" aria-hidden />
                    </div>
                    <span className="text-xs font-black text-neutral-400">
                      {sector.eyebrow}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-black text-neutral-950">
                    {sector.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    {sector.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sector.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-full bg-stone-100 px-3 py-2 text-xs font-black text-neutral-700 hover:bg-neutral-950 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  href={sector.href}
                  className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-neutral-950 px-4 text-sm font-black text-white"
                >
                  분야 입장
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}
