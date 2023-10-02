import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { CustomUser } from "./app/api/auth/[...nextauth]/opation";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //If /login or /admin/login let user access those routes
  if (pathname == "/login" || pathname == "/admin/login") {
    return NextResponse.next();
  }

  //Get Token
  const token = await getToken({ req: request });

  //Protected Routes for User
  const userProtectedRoutes = ["/"];

  //Protected Routes for Admin
  const adminProtectedRoutes = ["/admin/dashboard"];

  // If token is null and user is trying to access protected routes, redirect to login page
  if (
    token == null &&
    (userProtectedRoutes.includes(pathname) ||
      adminProtectedRoutes.includes(pathname))
  ) {
    return NextResponse.redirect(
      new URL(
        "/login?=error= Please login first to access this route",
        request.url
      )
    );
  }
  // Get user from token
  const user: CustomUser | null = token?.user as CustomUser;

  // If user trying to access admin protected routes and user is not admin redirect to login page
  if (adminProtectedRoutes.includes(pathname) && user.role == "User") {
    return NextResponse.redirect(
      new URL(
        "/admin/login?error= Please Login First to access this route",
        request.url
      )
    );
  }

  // If Admin trying to access user protected routes and user is not admin redirect to login page
  if (userProtectedRoutes.includes(pathname) && user.role == "Admin") {
    return NextResponse.redirect(
      new URL(
        "/login?error= Please Login First to access this route",
        request.url
      )
    );
  }
}
