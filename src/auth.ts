import NextAuth from "next-auth";
import NextAuthConfig from "@/auth.config";
import { findUserById } from "./data/user";

export const { signIn, signOut, auth, handlers } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token }) {
      const user = await findUserById(token.sub!);
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        const user = await findUserById(token.sub);
        if (user) {
          session.user.id = user.id;
          session.user.email = user.email;
          session.user.role = user.role;
          session.user.fullName = user.fullName;
          session.user.verified = user.verified;
          session.user.phone = user.phone;
          session.user.isBanned = user.isBanned;
        }
      }
      return session;
    },
  },
  trustHost: true,
  ...NextAuthConfig,
});
