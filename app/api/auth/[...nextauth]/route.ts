import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Default export for NextAuth configuration
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
// This file handles the NextAuth.js authentication routes.
// It exports the handler for both GET and POST requests, allowing NextAuth to manage authentication flows for your application.
// The `authOptions` are imported from the `lib/auth.ts` file, which contains the configuration for NextAuth.
// This setup allows you to easily manage user authentication, including sign-in, sign-out, and
// session management, using NextAuth's built-in features.
