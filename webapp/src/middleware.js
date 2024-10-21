import { NextResponse } from 'next/server';

export { auth } from './auth';

export default function middleware(request) {
  const { cookies, nextUrl } = request;
  const { origin, pathname } = nextUrl;

  if (!cookies.get('authjs.session-token')) {
    const redirectUrl = new URL('/unauthorised', request.nextUrl.origin);
    redirectUrl.searchParams.append('callbackUrl', `${origin}${pathname}`);

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico|signin|unauthorised).*)']
};
