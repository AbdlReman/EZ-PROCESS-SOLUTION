import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe base config (no DB-backed provider here) so it can be shared
 * with middleware, which runs on the Edge runtime and can't load
 * bcryptjs/mongodb. The Credentials provider is added on top of this
 * in lib/auth.ts, which only runs in Node (Server Actions, Route Handlers).
 */
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role?: "user" | "admin" }).role ?? "user";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },
  providers: [],
};
