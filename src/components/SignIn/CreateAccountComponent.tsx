import React from 'react'

type Props = {
  switchComponent: (component: 'Sign In' | 'Forgot Password' | 'Create Account' | 'Account Confirmation' | 'New Password') => void
}

const CreateAccountComponent: React.FC<Props> = ({ switchComponent }) => {
  return (
    <div>
      <h2>Create Account</h2>
      <button onClick={() => switchComponent("Sign In")}>Go to Sign In</button>
      <button onClick={() => switchComponent("Forgot Password")}>Go to Forgot Password</button>
    </div>
  );
};

export default CreateAccountComponent