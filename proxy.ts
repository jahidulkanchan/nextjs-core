import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./app/api/auth/[...nextauth]/route";

export async function proxy(request: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user || null;
  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/products/add",
};
