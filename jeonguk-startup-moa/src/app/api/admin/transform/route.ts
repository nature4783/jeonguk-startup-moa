import { getTransformPreview } from "@/lib/server/raw-listings";

export async function GET() {
  return Response.json({ data: getTransformPreview() });
}

export async function POST() {
  return Response.json({
    data: getTransformPreview().map((item) => item.publicListing),
    publishDefault: false,
  });
}
