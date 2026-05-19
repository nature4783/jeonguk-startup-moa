import { AppHeader } from "@/components/layout/AppHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { publicListings } from "@/lib/public-listings";

export default function AdminPublicListingsPage() {
  return (
    <>
      <AppHeader />
      <AdminShell>
        <section className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <p className="text-sm font-black text-amber-700">PUBLIC</p>
            <h1 className="mt-1 text-3xl font-black text-neutral-950">공개 매물 관리</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100 text-neutral-600">
                  <th className="p-3 font-black">공개코드</th>
                  <th className="p-3 font-black">제목</th>
                  <th className="p-3 font-black">지역</th>
                  <th className="p-3 font-black">월매출</th>
                  <th className="p-3 font-black">권리금</th>
                  <th className="p-3 font-black">상태</th>
                </tr>
              </thead>
              <tbody className="font-bold text-neutral-800">
                {publicListings.map((listing) => (
                  <tr key={listing.id} className="border-b border-stone-100">
                    <td className="p-3 font-black text-neutral-950">{listing.publicCode}</td>
                    <td className="p-3">{listing.title}</td>
                    <td className="p-3">{listing.regionLabel}</td>
                    <td className="p-3">{listing.monthlySalesRange}</td>
                    <td className="p-3">{listing.premiumRange}</td>
                    <td className="p-3">
                      <span className="rounded-sm bg-emerald-100 px-2 py-1 text-xs font-black text-emerald-900">
                        공개
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </AdminShell>
    </>
  );
}
