import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup | CasinoCity24",
  description:
    " Sign up now to join Bangladesh’s top online casino and betting site. Create an account to start playing, betting, and winning real money!",
};
const SignupLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default SignupLayout;
