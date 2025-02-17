// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { getToken } from "next-auth/jwt";  // To check the session token

// // Define protected routes
// const protectedRoutes = ['/create-recipe', '/recipe-details', '/']; 

// export async function middleware(req: NextRequest) {
//   // Get the JWT token from the request
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // If the token doesn't exist and the route is protected, redirect to login page
//   if (!token && protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
//     return NextResponse.redirect(new URL('/login', req.url));  // Redirect to login page
//   }

//   // Allow the request to continue if token is valid
//   return NextResponse.next();
// }

// // Define the paths that should trigger the middleware
// export const config = {
//   matcher: ['/create-recipe', '/recipe-details', '/'],
// };

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define routes that are restricted for `VIEWER` (only `/create-recipe` in this case)
  const restrictedRoutesForViewer = ['/create-recipe'];
  
  // If no token is found, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const userRole = token.userType;
  const currentPath = req.nextUrl.pathname;

  console.log(`User Role: ${userRole}, Path: ${currentPath}`);  // Debugging role and path

  // Check if the user is trying to access a restricted route
  if (restrictedRoutesForViewer.some(route => currentPath.startsWith(route))) {
    if (userRole === 'VIEWER') {
      console.log('Redirecting to /unauthorized (not editor)');
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}



// Define paths where middleware should run
export const config = {
  matcher: ['/create-recipe', '/recipe-details', '/'],
};
