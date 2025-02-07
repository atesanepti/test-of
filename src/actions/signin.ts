"use server";

import { signinSchema } from "@/schema";
import { signIn } from "@/auth";
import { z } from "zod";

import { CredentialsSignin } from "next-auth";
import { findUserByEmail } from "@/data/user";
import { DEFAULT_USER_SIGNIN_REDIRECT } from "@/routes";

export const signin = async (credentials: z.infer<typeof signinSchema>) => {
  const { password, email } = credentials;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    await findUserByEmail(email);

    return { success: true, redirect: DEFAULT_USER_SIGNIN_REDIRECT };
  } catch (error) {
    const credentialsError = error as CredentialsSignin;
    console.log("signin error ", credentialsError?.cause?.err?.message);
    return { error: credentialsError?.cause?.err?.message };
  }
};
