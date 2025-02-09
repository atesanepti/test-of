"use server";

import { signupSchema } from "@/schema";
import { z } from "zod";
import { db } from "@/lib/prisma";
import { findUserByEmail, findUserByRef } from "@/data/user";
import bcrypt from "bcryptjs";
import random from "randomstring";
import fetchBonusInfo from "@/data/siteSetting";
import { signIn } from "@/auth";

export const signUp = async (credentials: z.infer<typeof signupSchema>) => {
  const { email, password, phone, fullName, ref } = credentials;

  // email validation
  const user = await findUserByEmail(email);
  if (user) {
    return { error: "Email already Registered" };
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  let hasRefCreated = false;
  let my_ref = "";

  while (!hasRefCreated) {
    my_ref = random.generate(7);
    const isRefExist = await findUserByRef(my_ref);
    if (isRefExist) {
      continue;
    }
    hasRefCreated = true;
  }

  try {
    const newUser = await db.users.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        phone,
        my_ref,
        wallet: {
          create: {},
        },
        bonus: {
          create: {},
        },
      },
    });

    const refUser = await findUserByRef(ref!);

    if (refUser) {
      const siteInfo = await fetchBonusInfo();
      const refBonus = (siteInfo && siteInfo.referBonus) || 0;
      await db.bonusWallet.update({
        where: { user_id: newUser.id },
        data: { account: refBonus! },
      });

      await db.bonusWallet.update({
        where: { user_id: refUser.id },
        data: { account: refBonus },
      });
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch {
    return { error: "Somting went wrong! Try agin" };
  }
};
