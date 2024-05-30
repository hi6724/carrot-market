import { NextRequest, NextResponse } from 'next/server';
import getSession from './lib/session';

interface Routes {
  [key: string]: boolean;
}

const publicUrls: Routes = {
  '/': true,
  '/login': true,
  '/sms': true,
  '/create-account': true,
  '/github/start': true,
  '/github/complete': true,
};

export async function middleware(request: NextRequest) {
  const isPublicPath = publicUrls[request.nextUrl.pathname];
  const isLoggedIn = Boolean((await getSession()).id);

  if (!isLoggedIn && !isPublicPath)
    return NextResponse.redirect(new URL('/', request.url));

  if (isLoggedIn && isPublicPath)
    return NextResponse.redirect(new URL('/product', request.url));
}
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
