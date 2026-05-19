"use client";

import { useEffect, useState } from "react";
import { BookOpenText, MessageCircle, ShieldCheck } from "lucide-react";

export function AppSplash() {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const removeDelay = prefersReducedMotion ? 450 : 1650;

    const removeTimer = window.setTimeout(() => setIsMounted(false), removeDelay);

    return () => {
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className="app-splash fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#f6f8fc] text-[#061b3d]"
      aria-hidden="true"
    >
      <div className="app-splash__panel relative w-full max-w-sm px-8">
        <div className="app-splash__mark mx-auto grid size-24 place-items-center rounded-[2rem] bg-[#0b66e4] text-white shadow-[0_22px_50px_rgba(11,102,228,0.28)]">
          <span className="text-center leading-none">
            <span className="block text-xl font-black">전국</span>
            <span className="mt-1 block text-sm font-black">창업모아</span>
          </span>
        </div>

        <div className="app-splash__copy mt-7 text-center">
          <p className="text-3xl font-black leading-tight">창업 고민을</p>
          <p className="mt-1 text-3xl font-black leading-tight text-[#0b66e4]">
            정리하는 중
          </p>
        </div>

        <div className="app-splash__brand mx-auto mt-6 h-2 max-w-[14rem] overflow-hidden rounded-full bg-[#dce7f7]">
          <div className="app-splash__progress h-full rounded-full bg-[#0b66e4]" />
        </div>

        <div className="app-splash__icons mt-7 grid grid-cols-3 gap-3">
          {[
            { label: "질문", icon: MessageCircle },
            { label: "가이드", icon: BookOpenText },
            { label: "검수", icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="grid min-h-20 place-items-center rounded-[1.2rem] bg-white text-center shadow-sm ring-1 ring-[#dbe5f7]"
              >
                <Icon className="size-6 text-[#0b66e4]" aria-hidden />
                <span className="text-xs font-black text-neutral-500">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
