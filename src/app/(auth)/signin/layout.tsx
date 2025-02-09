import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin | CasinoCity24",
  description:
    "Log in to your account to access Bangladesh’s top online casino and betting site. Play, bet, and win real money instantly!",
};

const SigninLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default SigninLayout;
