import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
console.log(token)
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboards') || 
                           request.nextUrl.pathname.startsWith('/manage_');

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboards/:path*',
    '/manage_students/:path*',
    '/manage_teachers/:path*',
    '/manage_content/:path*',
    '/coursemgt/:path*',
    // Add all protected routes here
  ],
};
