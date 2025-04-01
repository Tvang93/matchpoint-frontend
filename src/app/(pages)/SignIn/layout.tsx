
import { SignInWrapper } from '@/context/SignInContext';
import React from 'react'

const SignInLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <SignInWrapper>
        {children}
    </SignInWrapper>
  )
}

export default SignInLayout