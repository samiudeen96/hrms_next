// import { NextRequest, NextResponse } from "next/server";
// import { verifyAccessToken } from "@/lib/jwt";

// interface ProtectedRoute {
//   path: RegExp; // use regex for better matching
//   roles: string[];
// }

// const protectedRoutes: ProtectedRoute[] = [
//   { path: /^\/dashboard(\/.*)?$/, roles: ["EMPLOYEE", "ADMIN", "HR"] },
//   { path: /^\/admin(\/.*)?$/, roles: ["ADMIN"] },
//   { path: /^\/hr(\/.*)?$/, roles: ["HR"] },
// ];

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // 1. Find matching protected route
//   const route = protectedRoutes.find((r) => r.path.test(pathname));
//   if (!route) return NextResponse.next();

//   // 2. Get access token from cookie
//   const accessToken = req.cookies.get("access_token")?.value;
//   if (!accessToken) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   } 

//   // 3. Verify access token
//   let payload: any;
//   try {
//     payload = verifyAccessToken(accessToken);
//   } catch {
//     // If expired → frontend will refresh, but middleware can't → redirect
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   // 4. Role-based access
//   if (!route.roles.includes(payload.role)) {
//     return NextResponse.redirect(new URL("/unauthorized", req.url));
//   }

//   return NextResponse.next();
// }
