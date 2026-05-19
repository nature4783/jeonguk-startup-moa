import Link from "next/link";
import { AppHeader } from "@/components/layout/AppHeader";
import { getPublicListings } from "@/lib/public-listings";

export default function ComparePage() {
  const listings = getPublicListings().slice(0, 3);

  return (
    <>
      <AppHeader />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-5">
          <p className="text-sm font-black text-amber-700">COMPARE</p>
          <h1 className="mt-1 text-3xl font-black text-neutral-950">매물 비교함</h1>
        </div>

        <div className="overflow-x-auto rounded-md border border-stone-200 bg-white shadow-sm">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-100 text-sm text-neutral-600">
                <th className="p-4 font-black">항목</th>
                {listings.map((listing) => (
                  <th key={listing.id} className="p-4 font-black">
                    <Link href={`/listings/${listing.id}`} className="hover:underline">
                      {listing.title}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-neutral-800">
              {[
                ["지역", "regionLabel"],
                ["업종", "category"],
                ["브랜드군", "brandGroup"],
                ["월매출", "monthlySalesRange"],
                ["권리금", "premiumRange"],
                ["예상 순수익", "estimatedProfitRange"],
                ["임대료", "rentRange"],
                ["면적", "sizeRange"],
              ].map(([label, key]) => (
                <tr key={label} className="border-b border-stone-100">
                  <td className="bg-stone-50 p-4 font-black text-neutral-950">{label}</td>
                  {listings.map((listing) => (
                    <td key={listing.id} className="p-4">
                      {String(listing[key as keyof typeof listing])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/listings"
            className="inline-flex h-11 items-center rounded-md border border-stone-200 bg-white px-5 text-sm font-black text-neutral-900 hover:border-neutral-950"
          >
            매물 더 담기
          </Link>
          <Link
            href="/consultation?type=condition_request"
            className="inline-flex h-11 items-center rounded-md bg-neutral-950 px-5 text-sm font-black text-white hover:bg-neutral-800"
          >
            희망 조건 남기기
          </Link>
        </div>
      </main>
    </>
  );
}
