import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";  // To check the session token

// Define protected routes
const protectedRoutes = ['/create-recipe', '/recipe-details', '/']; 

export async function middleware(req: NextRequest) {
  // Get the JWT token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If the token doesn't exist and the route is protected, redirect to login page
  if (!token && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', req.url));  // Redirect to login page
  }

  // Allow the request to continue if token is valid
  return NextResponse.next();
}

// Define the paths that should trigger the middleware
export const config = {
  matcher: ['/create-recipe', '/recipe-details', '/'],
};
