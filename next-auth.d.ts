// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// Typescript definitions for NextAuth.js
// This file extends the default NextAuth.js types to include a custom user property.
// It should be placed in the root of your project or in a types directory.
// Make sure to include this file in your tsconfig.json under "include" or "files".
// Example tsconfig.json inclusion:
// {
//   "include": ["next-auth.d.ts"],
//   "compilerOptions": {
//     // ... other options ...
//   }
// }
