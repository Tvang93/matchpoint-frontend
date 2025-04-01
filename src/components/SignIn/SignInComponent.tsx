import React from 'react'

type Props = {
    switchComponent: (component: 'Sign In' | 'Forgot Password' | 'Create Account' | 'Account Confirmation' | 'New Password') => void
}

const SignInComponent: React.FC<Props> = ({ switchComponent }) => {
  return (
    <div>
      <h2>SignIn</h2>
      <button onClick={() => switchComponent("Forgot Password")}>Go to Forgot Password</button>
      <button onClick={() => switchComponent("Create Account")}>Go to Create Account</button>
    </div>
  );
};

export default SignInComponent