"use client";
import Form from "@/components/auth/Form";
import Signup from "@/components/auth/Signup";
import { useTranslation } from "@/lib/store";
import React from "react";

const SignupPage = () => {
  const lan = useTranslation((state) => state.lan);
  return (
    <div className="auth-bg">
      <div className="cantainer">
        <div className="cantainer">
          <Form
            formTitle={lan == "BN" ? "সাইন আপ" : "sign-up"}
            formIntro={
              lan == "BN"
                ? "আপনার বিদ্যমান অ্যাকাউন্টে প্রবেশ করুন?"
                : "Get access your existing account?"
            }
            formActionText={
              lan == "BN" ? "আপনার কোন অ্যাকাউন্ট নেই?" : "You have no account?"
            }
            formActionLink={lan == "BN" ? "সাইন ইন" : "Signin"}
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
