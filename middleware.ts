import { NextRequest, NextResponse } from 'next/server';
import { sessionStatus } from './utils/session';

export async function middleware(request) {
  const session = await sessionStatus();
  const publicPaths = ['/home', '/contact', '/signIn', '/signUp', '/about'];
  const pathname = request.nextUrl.pathname;

  if (session === false && !publicPaths.includes(pathname)) {
    console.log('Redirecting to login page');
    const absoluteUrl = new URL('/signIn', request.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  console.log(request, 'middleware');
  console.log('No rediresct, proceeding');
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|fonts|images).*)'],
};
