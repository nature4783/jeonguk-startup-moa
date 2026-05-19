"use client";

import { useState } from "react";
import { FileText, Heart, MessageSquareText, Scale } from "lucide-react";

type ListingActionsProps = {
  listingId: string;
  compact?: boolean;
};

function remember(key: string, listingId: string) {
  const current = JSON.parse(localStorage.getItem(key) ?? "[]") as string[];
  const next = Array.from(new Set([...current, listingId]));
  localStorage.setItem(key, JSON.stringify(next));
}

export function ListingActions({
  listingId,
  compact = false,
}: ListingActionsProps) {
  const [message, setMessage] = useState("");

  const baseClass =
    "inline-flex h-12 items-center justify-center gap-2 rounded-[0.9rem] px-3 text-sm font-black shadow-sm transition active:scale-[0.98]";
  const secondaryClass =
    "border border-[#dbe5f7] bg-white text-neutral-950 hover:border-[#0647c7] hover:text-[#0647c7]";
  const primaryClass = "bg-[#0647c7] text-white hover:bg-[#053ca8]";

  return (
    <div className="space-y-2">
      <div className={compact ? "grid grid-cols-2 gap-2" : "flex flex-wrap gap-2"}>
        <button
          type="button"
          className={`${baseClass} ${secondaryClass}`}
          onClick={() => {
            remember("jm:favorites", listingId);
            setMessage("관심 매물에 저장했습니다.");
          }}
        >
          <Heart className="size-4" aria-hidden />
          관심 등록
        </button>
        <button
          type="button"
          className={`${baseClass} ${secondaryClass}`}
          onClick={() => {
            remember("jm:compare", listingId);
            setMessage("비교함에 담았습니다.");
          }}
        >
          <Scale className="size-4" aria-hidden />
          비교 담기
        </button>
        <a
          href={`/consultation?listingId=${listingId}&type=consultation`}
          className={`${baseClass} ${primaryClass}`}
        >
          <MessageSquareText className="size-4" aria-hidden />
          상담 신청
        </a>
        <a
          href={`/consultation?listingId=${listingId}&type=detail_request`}
          className={`${baseClass} ${secondaryClass}`}
        >
          <FileText className="size-4" aria-hidden />
          상세자료
        </a>
      </div>
      {message ? (
        <p className="text-xs font-bold text-[#067a46]" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
