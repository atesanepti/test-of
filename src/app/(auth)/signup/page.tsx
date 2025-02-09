import Form from "@/components/auth/Form";
import Signup from "@/components/auth/Signup";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Signup | CasinoCity24",
  description:
    " Sign up now to join Bangladesh’s top online casino and betting site. Create an account to start playing, betting, and winning real money!",
};

const SignupPage = () => {
  return (
    <div className="auth-bg">
      <div className="cantainer">
        <div className="cantainer">
          <Form
            formTitle="sign-up"
            formIntro="Get access your existing account?"
            formActionText="You have no account?"
            formActionLink="Signin"
            formActionHref="/signin"
          >
            <Signup />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
