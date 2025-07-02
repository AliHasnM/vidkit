import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // Credential provider for username and password authentication
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "ali123@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(
        credentials: { email: string; password: string } | undefined
      ) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password. Please provide both.");
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({
            email: credentials.email,
          });
          if (!user) {
            throw new Error("No user found with the provided email.");
          }

          // check if the password matches
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValidPassword) {
            throw new Error("Invalid password. Please try again.");
          }

          // If everything is fine, return the user object
          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Authorization failed. Please try again later.");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // Persist the user id to the token right after signin
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user id to the session
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // Custom sign-in page
    error: "/login", // Error page
  },
  session: {
    strategy: "jwt", // Use JWT for session management
    maxAge: 30 * 24 * 60 * 60, // Session expiration time (30 days)
  },

  secret: process.env.NEXTAUTH_SECRET, // Secret for signing the JWT
};
