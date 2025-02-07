import Form from "@/components/auth/Form";
import Signin from "@/components/auth/Signin";
import React from "react";

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
