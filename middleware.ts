// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/auth';

// Define public routes
const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];

const COMPANY_ROUTES = [
  '/home',
  '/about',
  '/users',
  '/files',
  '/subscptionDashboard',
  '/cancel',
  '/payment-success',
  '/subscriptions',
  '/subscriptions-cancel',
  '/success',
];
const USER_ROUTES = ['/dashboard/home'];

export async function middleware(request: NextRequest) {
  const session = await getSession(request);

  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    if (session) {
      if (session.role === 'company') {
        return NextResponse.redirect(new URL('/home', request.url));
      } else if (session.role === 'user') {
        return NextResponse.redirect(new URL('/dashboard/home', request.url));
      }
    }
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (session.role === 'company') {
    if (COMPANY_ROUTES.some((route) => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (session.role === 'user') {
    if (USER_ROUTES.some((route) => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/dashboard/home', request.url));
  }

  return NextResponse.redirect(new URL('/sign-in', request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
