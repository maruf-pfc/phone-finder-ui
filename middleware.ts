import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const user = request.cookies.get("user")
  const path = request.nextUrl.pathname

  if (path.startsWith("/api/admin") && (!user || JSON.parse(user).role !== "admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/:path*",
}

