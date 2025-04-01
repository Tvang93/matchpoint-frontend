import React from "react";

const CreateAccountComponent: React.FC<TSignInProp> = ({ switchComponent }) => {
  return (
    <div className="flex flex-col items-center text-[#E1FF00] gap-4 py-12 px-28 w-full">
      <h1 className="text-3xl">Free Sign Up</h1>
      <p className="text-center">
        Please Enter Your Email, Username, and Password.
      </p>
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm mb-2"
        id="createEmailInputField"
        type="text"
        placeholder="Email Address"
      />
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm mb-2"
        id="createUsernameInputField"
        type="text"
        placeholder="Username"
      />
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm mb-2"
        id="createPasswordInputField"
        type="text"
        placeholder="Password"
      />
      <button
        className="bg-[#E1FF00] text-[#243451] rounded-[20px] w-full hover:cursor-pointer mb-2"
        onClick={() => switchComponent("Account Confirmation")}
      >
        Create Account
      </button>
      <button
        className="bg-transparent border-1 border-[#E1FF00] text-[#E1FF00] rounded-[20px] w-full hover:cursor-pointer"
        onClick={() => switchComponent("Sign In")}
      >
        Go Back to Sign In
      </button>
    </div>
  );
};

export default CreateAccountComponent;
