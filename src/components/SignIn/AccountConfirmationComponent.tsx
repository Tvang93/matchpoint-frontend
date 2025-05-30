'use client'

import { TSignInProp } from "@/utils/Interfaces";
import React from "react";

const AccountConfirmationComponent: React.FC<TSignInProp> = ({
  switchComponent,
}) => {
  return (
    <div className="flex flex-col items-center text-[#E1FF00] gap-y-9 py-12 sm:px-28 w-full px-8
">
      <h1 className="text-3xl">Free Sign Up</h1>
      <p>Account Created!</p>
      <button
        className="bg-transparent border-1 border-[#E1FF00] text-[#E1FF00] rounded-[20px] w-full hover:cursor-pointer hover:bg-[rgb(225,255,0,0.1)]"
        onClick={() => switchComponent("Sign In")}
      >
        Back to Sign In
      </button>
    </div>
  );
};

export default AccountConfirmationComponent;
