'use client'

import { login } from "@/utils/DataServices";
import { IToken, TSignInProp } from "@/utils/Interfaces";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignInComponent = ({ switchComponent }: TSignInProp) => {
  const { push } = useRouter();
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = async () => {
    let userData = {
      username: username, 
      password: password,
    }
    console.log(userData)
    let token: IToken = await login(userData);
    console.log(token)
    if(token != null){
      if(typeof window != null){
        localStorage.setItem("Token", token.token)
      }
      alert('Login works.')
      push('/')
    }else{
      alert("Unable to Log In. Incorrect Username or Password.")
    }
  
  }

  return (
    <div className="flex flex-col items-center text-[#E1FF00] gap-9 py-12 px-28 w-full">
      <h1 className="text-3xl">Sign In</h1>
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm"
        id="usernameInputField"
        type="text"
        placeholder="Username"
        maxLength={16}
        onChange={(e)=>setUsername(e.target.value)}
      />
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm"
        id="passwordInputField"
        type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />
      <button 
      className="bg-[#E1FF00] text-[#243451] rounded-[20px] w-full hover:cursor-pointer"
      onClick={handleSignIn}
      >
        Login
      </button>
      <p
        className="text-[#4BB4F1] hover:cursor-pointer"
        onClick={() => switchComponent("Forgot Password")}
      >
        Forgot Password?
      </p>
      <div className="flex gap-2">
        <p>Don't Have An Account?</p>
        <p
          className="text-[#4BB4F1] hover:cursor-pointer"
          onClick={() => switchComponent("Create Account")}
        >
          Sign Up Now
        </p>
      </div>
    </div>
  );
};

export default SignInComponent;
