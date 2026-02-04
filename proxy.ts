import { NextResponse, NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
    console.log(request)
  return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: '/about/:path*',
}