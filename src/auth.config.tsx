import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "../prisma";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { name: "email", type: "email" },
        password: { name: "password", type: "password" },
      },

      async authorize(credentials) {
        const email: string = (credentials.email as string) || "";
        const password: string = (credentials.password as string) || "";

        if (!email || !password) {
          throw new Error("Invalid Credentials");
        }

        const account = await db.users.findUnique({
          where: {
            email: email,
          },
        });

        if (!account) {
          throw new Error("Account not found");
        }

        const passwordIsMatch = await bcrypt.compare(
          password,
          account.password
        );

        if (!passwordIsMatch) {
          throw new Error("Invalid Password");
        }
        return account;
      },
    }),
  ],
} satisfies NextAuthConfig;
