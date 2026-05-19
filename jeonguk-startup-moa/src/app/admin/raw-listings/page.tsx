import { AppHeader } from "@/components/layout/AppHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { rawListings } from "@/lib/server/raw-listings";

export default function AdminRawListingsPage() {
  return (
    <>
      <AppHeader />
      <AdminShell>
        <section className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <p className="text-sm font-black text-rose-700">ADMIN ONLY</p>
            <h1 className="mt-1 text-3xl font-black text-neutral-950">원본 매물</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-100 text-neutral-600">
                  <th className="p-3 font-black">ID</th>
                  <th className="p-3 font-black">브랜드/지점</th>
                  <th className="p-3 font-black">원본주소</th>
                  <th className="p-3 font-black">점주</th>
                  <th className="p-3 font-black">연락처</th>
                  <th className="p-3 font-black">상태</th>
                </tr>
              </thead>
              <tbody className="font-bold text-neutral-800">
                {rawListings.map((listing) => (
                  <tr key={listing.id} className="border-b border-stone-100">
                    <td className="p-3 font-black text-neutral-950">{listing.id}</td>
                    <td className="p-3">
                      {listing.rawBrandName} · {listing.rawBranchName}
                    </td>
                    <td className="p-3">{listing.rawAddress}</td>
                    <td className="p-3">{listing.ownerName}</td>
                    <td className="p-3">{listing.ownerPhone}</td>
                    <td className="p-3">
                      <span className="rounded-sm bg-amber-100 px-2 py-1 text-xs font-black text-amber-900">
                        {listing.status}
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
