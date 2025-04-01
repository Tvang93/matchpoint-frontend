import { useRouter } from "next/navigation";
import React from "react";

const SignInComponent: React.FC<TSignInProp> = ({ switchComponent }) => {
  const { push } = useRouter();

  return (
    <div className="flex flex-col items-center text-[#E1FF00] gap-9 py-12 px-28 w-full">
      <h1 className="text-3xl">Sign In</h1>
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm"
        id="usernameInputField"
        type="text"
        placeholder="Username"
      />
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm"
        id="passwordInputField"
        type="text"
        placeholder="Password"
      />
      <button className="bg-[#E1FF00] text-[#243451] rounded-[20px] w-full hover:cursor-pointer">
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
