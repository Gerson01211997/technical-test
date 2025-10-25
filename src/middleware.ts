import { TOKEN_KEY } from 'app/api/login/constants';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ROUTES } from 'utils/pageRoutes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicRoutes = [ROUTES.LOGIN];
  const isPublic = publicRoutes.some(route => pathname.startsWith(route));
  const authCookie = request.cookies.get(TOKEN_KEY);
  if (!isPublic && !authCookie) {
    const loginUrl = new URL(ROUTES.LOGIN, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublic && authCookie) {

    return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|static).*)'],
};
