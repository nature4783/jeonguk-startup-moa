import { NextResponse } from "next/server";

export async function GET() {
  return Response.json({ data: [] });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const body = contentType.includes("application/json")
    ? await request.json().catch(() => ({}))
    : Object.fromEntries((await request.formData()).entries());

  const redirectTo =
    typeof body.redirectTo === "string" && body.redirectTo.startsWith("/")
      ? body.redirectTo
      : undefined;

  if (!isJson && redirectTo) {
    return NextResponse.redirect(new URL(redirectTo, request.url), {
      status: 303,
    });
  }

  return Response.json({
    data: {
      ...body,
      status: "new",
      createdAt: new Date().toISOString(),
    },
  });
}
