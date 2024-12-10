import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;

  // Define public and private routes
  const publicRoutes = ["/pages/signin", "/pages/signup", "/api/public", "/favicon.ico", "/_next", "api/auth/callback/credentials"];
  const adminRoutes = ["/dashboard/admin", "/dashboard/users", "/api/users/promote", "/api/users/demote", "/api/users/delete", "/dashboard/lessons"];
  const privateRoutes = ["/dashboard", "/profile", "/lessons", "/tutorials"];

  // Allow access to public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Redirect to sign-in page if the user is unauthenticated for private or admin routes
  if (!token) {
    const signInUrl = new URL("/pages/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname); // Redirect back after login
    return NextResponse.redirect(signInUrl);
  }

  // Handle role-based access for admin routes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url)); // Unauthorized users are redirected
    }
  }

  // Ensure authenticated users can access private routes
  if (privateRoutes.some((route) => pathname.startsWith(route))) {
    if (!token.role) {
      return NextResponse.redirect(new URL("/unauthorized", request.url)); // Missing role redirects to unauthorized
    }
  }

  // Allow all other requests
  return NextResponse.next();
}

// Match all routes except those explicitly public
export const config = {
  matcher: ["/((?!api/auth|api/public).*)"], // Protect all routes except `api/auth` used by NextAuth
};
