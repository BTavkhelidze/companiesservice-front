import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const token = cookieStore.get('accessToken');
  console.log(token, 'sssssssssss');
  const url = request.nextUrl.clone();
  console.log(url, 'sssssssssss');

  if (
    url.pathname.startsWith('/questions') ||
    url.pathname.startsWith('/create-question') ||
    url.pathname.startsWith('/profile')
  ) {
    if (!token) {
      console.log('No token found, redirecting to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/questions/:path*', '/profile/:path*', '/create-question/:path*'],
};
