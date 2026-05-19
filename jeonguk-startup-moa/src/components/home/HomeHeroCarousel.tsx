"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    href: "/listings",
    eyebrow: "추천 매장",
    title: "조건에 맞는 매장을 먼저 보여드려요",
    body: "시·구 단위 공개 정보와 수익 범위로 후보를 좁힙니다.",
    image: "/brand/main-brand-banner.png",
    tone: "from-[#063cae] to-[#005eea]",
  },
  {
    href: "/consultation",
    eyebrow: "창업 상담",
    title: "상담부터 상세자료 요청까지",
    body: "주소와 민감 정보는 상담 단계에서만 안전하게 안내합니다.",
    image: "/brand/consult-banner.png",
    tone: "from-[#02327f] to-[#0647c7]",
  },
  {
    href: "/community",
    eyebrow: "창업 정보",
    title: "창업을 준비하는 커뮤니티",
    body: "가이드, 지원사업, 질문까지 같이 확인하세요.",
    image: "/brand/brand-stack.png",
    tone: "from-[#3c00a8] to-[#0a67ff]",
  },
];

const slideGap = 12;

export function HomeHeroCarousel() {
  const firstSlideRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDistance, setSlideDistance] = useState(0);

  const goToSlide = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  useEffect(() => {
    const measureSlide = () => {
      const slide = firstSlideRef.current;

      if (!slide) {
        return;
      }

      setSlideDistance(slide.offsetWidth + slideGap);
    };

    measureSlide();
    window.addEventListener("resize", measureSlide);

    return () => window.removeEventListener("resize", measureSlide);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="mt-4" data-hero-carousel>
      <div
        className="relative overflow-hidden px-5"
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) {
            return;
          }

          const touchEndX =
            event.changedTouches[0]?.clientX ?? touchStartX.current;
          const distance = touchStartX.current - touchEndX;

          if (Math.abs(distance) > 40) {
            goToSlide(activeIndex + (distance > 0 ? 1 : -1));
          }

          touchStartX.current = null;
        }}
      >
        <div
          className="flex gap-3 transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(-${activeIndex * slideDistance}px, 0, 0)`,
          }}
          data-hero-carousel-track
        >
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              ref={index === 0 ? firstSlideRef : undefined}
              className="w-full shrink-0"
              data-slide
            >
              <Link
                href={slide.href}
                className="block overflow-hidden rounded-[1.35rem] bg-white shadow-sm ring-1 ring-[#dbe5f7]"
              >
                <div
                  className={`relative aspect-[835/140] overflow-hidden bg-gradient-to-r ${slide.tone}`}
                >
                  <Image
                    src={slide.image}
                    alt=""
                    fill
                    sizes="(max-width: 520px) 100vw, 520px"
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-black text-[#0647c7]">
                      {slide.eyebrow}
                    </span>
                    <span className="text-xs font-black text-neutral-400">
                      {index + 1} / {slides.length}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-black leading-6 tracking-normal text-neutral-950">
                    {slide.title}
                  </h2>
                  <p className="mt-2 text-sm font-bold leading-5 text-neutral-500">
                    {slide.body}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goToSlide(activeIndex - 1)}
          className="absolute left-2 top-[4.25rem] grid size-9 place-items-center rounded-full bg-white/90 text-neutral-900 shadow-sm ring-1 ring-black/5 backdrop-blur"
          aria-label="이전 배너"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => goToSlide(activeIndex + 1)}
          className="absolute right-2 top-[4.25rem] grid size-9 place-items-center rounded-full bg-white/90 text-neutral-900 shadow-sm ring-1 ring-black/5 backdrop-blur"
          aria-label="다음 배너"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`${index + 1}번째 배너 보기`}
            className={`h-2 rounded-full transition-all ${
              activeIndex === index ? "w-7 bg-[#0647c7]" : "w-2 bg-[#c9d4e8]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
