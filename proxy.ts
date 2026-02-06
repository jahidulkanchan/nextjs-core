import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoginPage = request.nextUrl.pathname === "/login";

  // Already login user should not access /login
  if (token && isLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Non-authenticated user should not access protected route
  if (!token && request.nextUrl.pathname.startsWith("/products/add")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/products/add"],
};
