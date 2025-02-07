import jwt, { TokenExpiredError } from "jsonwebtoken";

const JWT_EMAIL_VERIFY_SECRET = process.env.VERIFY_SECRET!;

type TokenPayload = { email: string };

export const generateEmailVerificationToken = (email: string) => {
  const payload: TokenPayload = { email };
  const token = jwt.sign(payload, JWT_EMAIL_VERIFY_SECRET, {
    expiresIn: "2m",
  });

  return token;
};

export const verifyEmailVerificationToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(
      token,
      JWT_EMAIL_VERIFY_SECRET
    ) as TokenPayload;

    if (!decodedToken) {
      throw new Error("Verify like is invalid");
    }

    return { isVerified: true, payload: { email: decodedToken.email } };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return { isVerified: false, tokenExpired: true };
    }
    return {
      isVerified: false,
    };
  }
};
