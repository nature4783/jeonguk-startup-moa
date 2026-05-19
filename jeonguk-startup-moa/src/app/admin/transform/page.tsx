import { AppHeader } from "@/components/layout/AppHeader";
import { AdminShell } from "@/components/admin/AdminShell";
import { getTransformPreview } from "@/lib/server/raw-listings";

export default function AdminTransformPage() {
  const previews = getTransformPreview();

  return (
    <>
      <AppHeader />
      <AdminShell>
        <section className="space-y-4">
          <div className="rounded-md border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black text-amber-700">TRANSFORM</p>
            <h1 className="mt-1 text-3xl font-black text-neutral-950">raw → public 정제</h1>
          </div>

          {previews.map((preview) => (
            <article
              key={preview.rawId}
              className="rounded-md border border-stone-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black text-neutral-500">{preview.rawId}</p>
                  <h2 className="mt-1 text-xl font-black text-neutral-950">
                    {preview.publicListing.title}
                  </h2>
                  <p className="mt-2 text-sm font-bold text-neutral-600">
                    {preview.publicListing.regionLabel} · {preview.publicListing.monthlySalesRange} ·{" "}
                    {preview.publicListing.premiumRange}
                  </p>
                </div>
                <span className="rounded-sm bg-neutral-950 px-2 py-1 text-xs font-black text-white">
                  {preview.publicListing.isPublic ? "공개" : "비공개 대기"}
                </span>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-md bg-stone-100 p-4">
                  <h3 className="text-sm font-black text-neutral-950">공개 DTO</h3>
                  <pre className="mt-3 max-h-72 overflow-auto rounded-md bg-white p-3 text-xs leading-5 text-neutral-800">
                    {JSON.stringify(preview.publicListing, null, 2)}
                  </pre>
                </div>
                <div className="rounded-md bg-rose-50 p-4">
                  <h3 className="text-sm font-black text-rose-950">제거 필드</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {preview.removedFields.map((field) => (
                      <span
                        key={field}
                        className="rounded-sm bg-white px-2 py-1 text-xs font-black text-rose-800"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </AdminShell>
    </>
  );
}
