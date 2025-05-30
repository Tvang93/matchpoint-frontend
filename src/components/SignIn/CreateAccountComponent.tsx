'use client'

import { createAccount } from "@/utils/DataServices";
import { TSignInProp } from "@/utils/Interfaces";
import React, { useState } from "react";

const CreateAccountComponent = ({ switchComponent }: TSignInProp) => {


  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');

 

  //This will handle the switch between our login and our create Account Logic

    const handleSubmit = async () => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if(!emailRegex.test(email)) return alert("Invalid Email")
      if(username.trim() === "") return alert("Invalid Username")
      if(password.trim() === "") return alert("Invalid Username")

      const userData = {
        username: username, 
        password: password,
        email: email
      }
      console.log(userData)
      //Create Account logic here
      const result = await createAccount(userData);
      if(result){
        switchComponent("Account Confirmation");
      }else{
        alert("Username Already Exists");
      }
    }


  return (
    <div className="flex flex-col items-center text-[#E1FF00] gap-y-3 py-12 sm:px-28 w-full px-8">
      <h1 className="text-3xl">Free Sign Up</h1>
      <p className="text-center text-[0.85rem]">
        Please Enter Your Email, Username, and Password.
      </p>
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm mb-2"
        id="createEmailInputField"
        type="email"
        placeholder="Email Address"
        onChange={(e) => setEmail(e.target.value)}
       />
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm mb-2"
        id="createUsernameInputField"
        type="text"
        placeholder="Username"
        maxLength={16}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm mb-2"
        id="createPasswordInputField"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-[#E1FF00] text-[#243451] rounded-[20px] w-full hover:cursor-pointer mb-2 hover:bg-[rgb(225,255,0,0.8)]"
        onClick={handleSubmit}
      >
        Create Account
      </button>
      <button
        className="bg-transparent border-1 border-[#E1FF00] text-[#E1FF00] rounded-[20px] w-full hover:cursor-pointer hover:bg-[rgb(225,255,0,0.1)]"
        onClick={() => switchComponent("Sign In")}

      >
        Go Back to Sign In
      </button>
    </div>
  );
};

export default CreateAccountComponent;
