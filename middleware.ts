import { NextRequest, NextResponse } from 'next/server';
import { AUTH_ROLE_COOKIE, isValidRole, roleHome } from '@/lib/auth';

function isPublicPath(pathname: string) {
  return pathname === '/login' || pathname === '/';
}

function isAdminPath(pathname: string) {
  return pathname === '/admin' || pathname.startsWith('/admin/');
}

function isOperatorPath(pathname: string) {
  return pathname === '/operator' || pathname.startsWith('/operator/');
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const roleValue = request.cookies.get(AUTH_ROLE_COOKIE)?.value;
  const role = roleValue && isValidRole(roleValue) ? roleValue : null;

  if (!role && !isPublicPath(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (role && isPublicPath(pathname)) {
    return NextResponse.redirect(new URL(roleHome[role], request.url));
  }

  if (role === 'siswa' && (isAdminPath(pathname) || isOperatorPath(pathname))) {
    return NextResponse.redirect(new URL(roleHome.siswa, request.url));
  }

  if (role === 'operator' && isAdminPath(pathname)) {
    return NextResponse.redirect(new URL(roleHome.operator, request.url));
  }

  if (role === 'admin' && isOperatorPath(pathname)) {
    return NextResponse.redirect(new URL(roleHome.admin, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|_error|_not-found|404|500|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
