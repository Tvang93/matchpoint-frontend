import { TSignInProp } from "@/utils/Interfaces";
import React from "react";

const NewPasswordComponent: React.FC<TSignInProp> = ({ switchComponent }) => {
  return (
    <div className="flex flex-col items-center text-[#E1FF00] gap-9 py-12 px-28 w-full">
      <h1 className="text-3xl">Please Type in a New Password.</h1>
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm"
        id="newPasswordInputField"
        type="text"
        placeholder="New Password"
      />
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm"
        id="confirmNewPasswordInputField"
        type="text"
        placeholder="Confirm New Password"
      />
      <button
        className="bg-[#E1FF00] text-[#243451] rounded-[20px] w-full hover:cursor-pointer"
        onClick={() => switchComponent("Sign In")}
      >
        Reset Password
      </button>
    </div>
  );
};

export default NewPasswordComponent;
