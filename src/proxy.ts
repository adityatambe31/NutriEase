
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Skip API routes.
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Apply security headers to non-API pages.
  const response = NextResponse.next();

  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');

  return response;
}

export const config = {
  matcher: [
    '/((?!api/|_next/|static/|images/|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
