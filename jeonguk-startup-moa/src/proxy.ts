import { NextResponse, type NextRequest } from "next/server";

function isAdminRequest(request: NextRequest) {
  const configuredToken = process.env.ADMIN_ACCESS_TOKEN;
  const cookieToken = request.cookies.get("admin_token")?.value;
  const headerToken = request.headers.get("x-admin-token");

  if (process.env.NODE_ENV !== "production" && !configuredToken) {
    return true;
  }

  return Boolean(configuredToken && (cookieToken === configuredToken || headerToken === configuredToken));
}

export function proxy(request: NextRequest) {
  const isApi = request.nextUrl.pathname.startsWith("/api/admin");

  if (isAdminRequest(request)) {
    return NextResponse.next();
  }

  if (isApi) {
    return NextResponse.json({ error: "Admin access required." }, { status: 401 });
  }

  return NextResponse.redirect(new URL("/admin-login", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
