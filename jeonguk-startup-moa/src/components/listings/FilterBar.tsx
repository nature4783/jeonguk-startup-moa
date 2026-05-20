import Link from "next/link";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import {
  filterOptions,
  type ListingFilters,
  type ListingSort,
} from "@/lib/public-listings";

type FilterBarProps = {
  current?: ListingFilters;
};

const sortOptions: { value: ListingSort; label: string }[] = [
  { value: "recommended", label: "추천순" },
  { value: "latest", label: "최신순" },
  { value: "sales-desc", label: "월매출 높은순" },
  { value: "premium-asc", label: "권리금 낮은순" },
  { value: "profit-desc", label: "예상 수익 높은순" },
];

function SelectField({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value?: string;
  options: string[];
}) {
  return (
    <label className="space-y-1 text-xs font-black text-neutral-500">
      <span>{label}</span>
      <select
        name={name}
        defaultValue={value ?? ""}
        className="h-11 w-full rounded-md border border-stone-200 bg-white px-3 text-sm font-bold text-neutral-900 outline-none focus:border-neutral-900"
      >
        <option value="">전체</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FilterFields({ current = {} }: FilterBarProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <label className="space-y-1 text-xs font-black text-neutral-500 sm:col-span-2">
        <span>검색어</span>
        <input
          name="query"
          defaultValue={current.query ?? ""}
          placeholder="지역, 업종, 브랜드명"
          className="h-11 w-full rounded-md border border-stone-200 bg-white px-3 text-sm font-bold text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
        />
      </label>
      <SelectField
        name="sido"
        label="시도"
        value={current.sido}
        options={filterOptions.sidos}
      />
      <SelectField
        name="sigungu"
        label="시군구"
        value={current.sigungu}
        options={filterOptions.sigungus}
      />
      <SelectField
        name="category"
        label="업종"
        value={current.category}
        options={filterOptions.categories}
      />
      <SelectField
        name="brandGroup"
        label="브랜드 계열"
        value={current.brandGroup}
        options={filterOptions.brandGroups}
      />
      <SelectField
        name="monthlySalesRange"
        label="월매출"
        value={current.monthlySalesRange}
        options={filterOptions.monthlySalesRanges}
      />
      <SelectField
        name="premiumRange"
        label="권리금"
        value={current.premiumRange}
        options={filterOptions.premiumRanges}
      />
      <SelectField
        name="estimatedProfitRange"
        label="예상 수익"
        value={current.estimatedProfitRange}
        options={filterOptions.estimatedProfitRanges}
      />
      <label className="space-y-1 text-xs font-black text-neutral-500">
        <span>정렬</span>
        <select
          name="sort"
          defaultValue={current.sort ?? "recommended"}
          className="h-11 w-full rounded-md border border-stone-200 bg-white px-3 text-sm font-bold text-neutral-900 outline-none focus:border-neutral-900"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function ActiveChips({ current = {} }: FilterBarProps) {
  const chips = [
    ["지역", [current.sido, current.sigungu].filter(Boolean).join(" ")],
    ["업종", current.category],
    ["브랜드", current.brandGroup],
    ["월매출", current.monthlySalesRange],
    ["권리금", current.premiumRange],
    ["수익", current.estimatedProfitRange],
  ].filter(([, value]) => value);

  if (!chips.length) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1">
        {["지역", "업종", "월매출", "권리금", "수익"].map((label) => (
          <span
            key={label}
            className="shrink-0 rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-black text-neutral-600"
          >
            {label}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {chips.map(([label, value]) => (
        <span
          key={`${label}-${value}`}
          className="shrink-0 rounded-full bg-neutral-950 px-3 py-2 text-xs font-black text-white"
        >
          {label} {value}
        </span>
      ))}
    </div>
  );
}

export function FilterBar({ current = {} }: FilterBarProps) {
  return (
    <>
      <form
        action="/listings"
        className="rounded-md border border-stone-200 bg-white p-4 shadow-sm max-lg:hidden"
      >
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-neutral-900" aria-hidden />
          <h2 className="text-sm font-black text-neutral-950">매물 필터와 정렬</h2>
        </div>
        <FilterFields current={current} />
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="submit"
            className="h-11 rounded-md bg-neutral-950 px-5 text-sm font-black text-white hover:bg-neutral-800"
          >
            매물 보기
          </button>
          <Link
            href="/listings"
            className="inline-flex h-11 items-center rounded-md border border-stone-200 bg-white px-5 text-sm font-black text-neutral-800 hover:border-neutral-950"
          >
            초기화
          </Link>
        </div>
      </form>

      <form
        action="/listings"
        className="space-y-3 rounded-md border border-stone-200 bg-white p-3 shadow-sm lg:hidden"
      >
        <div className="grid grid-cols-4 gap-2">
          <label className="relative col-span-3 min-w-0">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
            <input
              name="query"
              defaultValue={current.query ?? ""}
              placeholder="지역, 업종, 브랜드명"
              className="h-11 w-full min-w-0 rounded-md border border-stone-200 bg-stone-50 pl-9 pr-3 text-sm font-bold text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-neutral-900"
            />
          </label>
          <button
            type="submit"
            className="h-11 rounded-md bg-neutral-950 text-sm font-black text-white"
          >
            검색
          </button>
        </div>

        <ActiveChips current={current} />

        <details className="group rounded-md border border-stone-200 bg-stone-50">
          <summary className="flex h-12 cursor-pointer list-none items-center justify-between px-3 text-sm font-black text-neutral-950">
            <span className="inline-flex items-center gap-2">
              <SlidersHorizontal className="size-4" aria-hidden />
              필터 자세히
            </span>
            <ChevronDown className="size-4 transition group-open:rotate-180" aria-hidden />
          </summary>
          <div className="border-t border-stone-200 bg-white p-3">
            <FilterFields current={current} />
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="submit"
                className="h-11 rounded-md bg-neutral-950 px-4 text-sm font-black text-white"
              >
                적용
              </button>
              <Link
                href="/listings"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-4 text-sm font-black text-neutral-800"
              >
                <X className="size-4" aria-hidden />
                초기화
              </Link>
            </div>
          </div>
        </details>
      </form>
    </>
  );
}
