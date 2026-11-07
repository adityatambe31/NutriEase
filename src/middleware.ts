import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip middleware for all API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Continue with security headers for non-API routes
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');

  return response;
}

export const config = {
  // Apply middleware only to non-API routes
  matcher: [
    '/((?!api/|_next/|static/|images/|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
