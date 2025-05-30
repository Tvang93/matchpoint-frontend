'use client'

import { getLoggedInUserDataWithEmail } from "@/utils/DataServices";
import { TSignInProp } from "@/utils/Interfaces";
import React, { useState } from "react";

const ForgotPasswordComponent: React.FC<TSignInProp> = ({
  switchComponent,
}) => {
  const [email, setEmail] = useState<string>('')

  const handleEmail = async() => {
    console.log(email)
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!emailRegex.test(email)) return alert("Invalid Email")
    const userData = await getLoggedInUserDataWithEmail(email);
    console.log(userData);
    if(userData != null){
      alert("Email Confirmed")
      switchComponent("New Password");
    }else{
      alert("Unable to Send. Email May Not Exist in Our System.")
    }
  }

  return (
    <div className="flex flex-col items-center text-[#E1FF00] gap-y-8 py-12 sm:px-28 w-full px-8">
      <h1 className="text-3xl">Forgot Password</h1>
      <p>Please Enter in Your Email.</p>
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm"
        id="passwordRecoveryInputField"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-[#E1FF00] text-[#243451] rounded-[20px] w-full hover:cursor-pointer hover:bg-[rgb(225,255,0,0.8)]"
        onClick={handleEmail}
      >
        Send Email
      </button>
      <button
        className="bg-transparent border-1 border-[#E1FF00] text-[#E1FF00] rounded-[20px] w-full hover:cursor-pointer hover:bg-[rgb(225,255,0,0.1)]"
        onClick={() => switchComponent("Sign In")}
      >
        Back to Sign In
      </button>
    </div>
  );
};

export default ForgotPasswordComponent;
