import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <section className="flex items-center justify-center mt-10 w-full h-auto overflow-y-hidden">
      <SignIn />
    </section>
  );
};

export default SignInPage;
