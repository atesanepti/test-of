import Form from "@/components/auth/Form";
import Signup from "@/components/auth/Signup";
import React from "react";

const SignupPage = () => {
  return (
    <div className="auth-bg">
      <div className="cantainer">
        <div className="cantainer">
          <Form
            formTitle="sign-in"
            formIntro="Get access your existing account?"
            formActionText="You have no account?"
            formActionLink="Create new"
            formActionHref="/signup"
          >
            <Signup />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
