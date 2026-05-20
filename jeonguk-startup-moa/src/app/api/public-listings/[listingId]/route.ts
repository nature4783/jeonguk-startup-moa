import { getPublicListingById } from "@/lib/public-listings";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ listingId: string }> },
) {
  const { listingId } = await params;
  const listing = getPublicListingById(listingId);

  if (!listing) {
    return Response.json({ error: "Listing not found." }, { status: 404 });
  }

  return Response.json(
    { data: listing },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600",
      },
    },
  );
}
