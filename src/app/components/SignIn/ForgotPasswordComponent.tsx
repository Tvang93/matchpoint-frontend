import React from 'react'

type Props = {
  switchComponent: (component: 'Sign In' | 'Forgot Password' | 'Create Account' | 'Account Confirmation' | 'New Password') => void
}

const ForgotPasswordComponent: React.FC<Props> = ({ switchComponent }) => {
  return (
    <div>
      <h2>Forgot Password</h2>
      <button onClick={() => switchComponent("Sign In")}>Go to Sign In</button>
      <button onClick={() => switchComponent("Create Account")}>Go to Create Account</button>
    </div>
  );
};

export default ForgotPasswordComponent