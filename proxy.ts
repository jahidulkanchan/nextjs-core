import { NextResponse, NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  // console.log(request);
  const user = false;
  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/products/add",
};
