import React from "react";

const ForgotPasswordComponent: React.FC<TSignInProp> = ({
  switchComponent,
}) => {
  return (
    <div className="flex flex-col items-center text-[#E1FF00] gap-9 py-12 px-28 w-full">
      <h1 className="text-3xl">Forgot Password</h1>
      <p>Please Enter in Your Email.</p>
      <input
        className="border-1 border-[#E1FF00] bg-transparent ps-2 w-full hover:cursor-pointer focus:cursor-text rounded-sm"
        id="passwordRecoveryInputField"
        type="text"
        placeholder="Email"
      />
      <button
        className="bg-[#E1FF00] text-[#243451] rounded-[20px] w-full hover:cursor-pointer"
        onClick={() => switchComponent("New Password")}
      >
        Send Email
      </button>
      <button
        className="bg-transparent border-1 border-[#E1FF00] text-[#E1FF00] rounded-[20px] w-full hover:cursor-pointer"
        onClick={() => switchComponent("Sign In")}
      >
        Back to Sign In
      </button>
    </div>
  );
};

export default ForgotPasswordComponent;
