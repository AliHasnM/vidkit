import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // Public pages
        if (pathname === "/login" || pathname === "/register") {
          return true;
        }

        // ✅ Fix: Allow "/api/video" instead of wrong "/api/videos"
        if (pathname === "/" || pathname.startsWith("/api/video")) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
