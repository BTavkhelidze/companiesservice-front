// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';

// Define public routes
const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];

// Define private routes for companies and users
const COMPANY_ROUTES = ['/home', '/about'];
const USER_ROUTES = ['/user', '/user/profile'];

export async function middleware(request: NextRequest) {
  const session = await getSession(request);
  const { pathname } = request.nextUrl;

  // Allow access to public routes for unauthenticated users
  if (PUBLIC_ROUTES.includes(pathname)) {
    // Redirect authenticated users away from public routes
    if (session) {
      if (session.role === 'company') {
        return NextResponse.redirect(new URL('/home', request.url));
      } else if (session.role === 'user') {
        return NextResponse.redirect(new URL('/user', request.url));
      }
    }
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the sign-in page
  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Check role-based access
  if (session.role === 'company') {
    if (COMPANY_ROUTES.some((route) => pathname.startsWith(route))) {
      return NextResponse.next();
    }
    // Redirect company users to the home page if they try to access user routes
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (session.role === 'user') {
    if (USER_ROUTES.some((route) => pathname.startsWith(route))) {
      return NextResponse.next();
    }
    // Redirect regular users to the user dashboard if they try to access company routes
    return NextResponse.redirect(new URL('/user', request.url));
  }

  // Fallback: Redirect to sign-in for any other case
  return NextResponse.redirect(new URL('/sign-in', request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // Protect all routes except static files
};
