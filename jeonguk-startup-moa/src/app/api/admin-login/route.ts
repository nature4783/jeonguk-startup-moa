import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = String(formData.get("token") ?? "");
  const configuredToken = process.env.ADMIN_ACCESS_TOKEN;

  if (!configuredToken || token !== configuredToken) {
    return NextResponse.json({ error: "Invalid admin token." }, { status: 401 });
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
