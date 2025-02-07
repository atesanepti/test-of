"use server";
import { findUserByEmail } from "@/data/user";
import { verifySchema } from "@/schema";
import zod from "zod";
import { db } from "../../prisma";
import {
  generateEmailVerificationToken,
  verifyEmailVerificationToken,
} from "@/lib/token";
import { EMAIL_VERIFY } from "@/routes";
import { Templates } from "@/types/enum";
import { sendEmail } from "@/lib/email";

export const verifyUser = async (token: string) => {
  const { payload, isVerified, tokenExpired } =
    verifyEmailVerificationToken(token);


  if (!isVerified && !tokenExpired) return { error: "Invalid verify link" };
  else if (tokenExpired) return { error: "Verify link was Expired" };

  try {

    const user = await findUserByEmail(payload!.email);

    if(user?.verified){
      return {error : "Account is already Verified"}
    }

    await db.users.update({
      where: {
        email: payload?.email,
      },
      data: {
        verified: true,
      },
    });

    return { success: true };
  } catch {
    return { error: "Unknown Error try agin" };
  }
};

export const generateVerificationLink = async (
  data: zod.infer<typeof verifySchema>
) => {
  const { email } = data;

  const user = await findUserByEmail(email);
  if (!user)
    return {
      error: "Somting went wrong try agin",
    };

  const token = generateEmailVerificationToken(email);
  const redirect = `${process.env.NEXT_PUBLIC_APP}${EMAIL_VERIFY}?token=${token}`;
  await sendEmail(email, Templates.EMAIL_VERIFICATION, {
    name: user.fullName,
    redirectURL: redirect,
  });

  return { success: true };
};
