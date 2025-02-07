import Form from "@/components/auth/Form";
import Signin from "@/components/auth/Signin";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Signin | CasinoCity24",
  description:
    "Log in to your account to access Bangladesh’s top online casino and betting site. Play, bet, and win real money instantly!",

};

const SigninPage = () => {
  return (
    <div className="auth-bg">
      <div className="cantainer">
        <Form
          formTitle="sign-in"
          formIntro="Get access your existing account?"
          formActionText="You have no account?"
          formActionLink="Create new"
          formActionHref="/signup"
        >
          <Signin />
        </Form>
      </div>
    </div>
  );
};

export default SigninPage;
