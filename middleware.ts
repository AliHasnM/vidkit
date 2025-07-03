import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware() {
    // Middleware logic can be added here if needed
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;
        // Allow access to the login and register pages without authentication
        if (pathname === "/login" || pathname === "/register") {
          return true;
        }

        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          // Allow access to the home page and video API without authentication
          return true;
        }
        // if(token) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all paths except for the following:
     * - _next/static/:path*
     * - _next/image/:path*
     * - favicon.ico (favicon file)
     * - public/:path* (public directory)
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
