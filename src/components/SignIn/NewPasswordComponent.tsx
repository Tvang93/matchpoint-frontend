'use client'

import { ForgotPassword, loggedInData } from "@/utils/DataServices";
import { ILoginInfo, TSignInProp } from "@/utils/Interfaces";
import React, { useState } from "react";

const NewPasswordComponent: React.FC<TSignInProp> = ({ switchComponent }) => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmingPassword, setConfirmingPassword] = useState<string>('');

  const handlePasswordReset = async () => {
    if(newPassword.trim() === ""){
      alert("Password is Empty.")
    }else if(newPassword !== confirmingPassword){
      alert("Passwords do not match.")
    }else{
      const loggedIn = loggedInData();
      const user: ILoginInfo = {
        username: loggedIn.username,
        password: newPassword
      }

      const isChanged = await ForgotPassword(user)

      if(!isChanged) alert("Password Change Unsuccessful");
        
      alert("Password Successfully Changed");
        
      switchComponent("Sign In")
    }


    
  }


  return (
    <div className="flex flex-col items-center text-[#E1FF00] gap-y-9 py-12 sm:px-28 w-full px-8">
      <h1 className="text-3xl">Please Type in a New Password.</h1>
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm"
        id="newPasswordInputField"
        type="password"
        placeholder="New Password"
        onChange={(e)=>setNewPassword(e.target.value)}
      />
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm"
        id="confirmNewPasswordInputField"
        type="password"
        placeholder="Confirm New Password"
        onChange={(e)=>setConfirmingPassword(e.target.value)}
      />
      <button
        className="bg-[#E1FF00] text-[#243451] rounded-[20px] w-full hover:cursor-pointer hover:bg-[rgb(225,255,0,0.8)]"
        onClick={handlePasswordReset}
      >
        Reset Password
      </button>
    </div>
  );
};

export default NewPasswordComponent;
