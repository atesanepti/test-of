"use client";
import Form from "@/components/auth/Form";
import Signin from "@/components/auth/Signin";
import { useTranslation } from "@/lib/store";
import React from "react";

const SigninPage = () => {
  const lan = useTranslation((state) => state.lan);
  return (
    <div className="auth-bg">
      <div className="cantainer">
        <Form
          formTitle={lan == "BN" ? "সাইন ইন" : "Sign in"}
          formIntro={
            lan == "BN"
              ? "আপনার বর্তমান অ্যাকাউন্টে প্রবেশ করতে চান?"
              : "Get access your existing account?"
          }
          formActionText={
            lan == "BN" ? "আপনার কোন অ্যাকাউন্ট নেই?" : "You have no account?"
          }
          formActionLink={lan == "BN" ? "নতুন তৈরি করুন" : "Create new"}
          formActionHref="/signup"
        >
          <Signin />
        </Form>
      </div>
    </div>
  );
};

export default SigninPage;
