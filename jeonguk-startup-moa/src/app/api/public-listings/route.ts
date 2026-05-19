import { getPublicListings, type ListingFilters, type ListingSort } from "@/lib/public-listings";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters: ListingFilters = {
    query: searchParams.get("query") ?? undefined,
    sido: searchParams.get("sido") ?? undefined,
    sigungu: searchParams.get("sigungu") ?? undefined,
    category: searchParams.get("category") ?? undefined,
    brandGroup: searchParams.get("brandGroup") ?? undefined,
    monthlySalesRange: searchParams.get("monthlySalesRange") ?? undefined,
    premiumRange: searchParams.get("premiumRange") ?? undefined,
    estimatedProfitRange: searchParams.get("estimatedProfitRange") ?? undefined,
    sort: (searchParams.get("sort") as ListingSort | null) ?? "recommended",
  };

  return Response.json({ data: getPublicListings(filters) });
}
