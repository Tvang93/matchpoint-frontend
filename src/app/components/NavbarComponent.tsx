'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

const NavbarComponent = () => {
  const {push} = useRouter();

  const handleSignIn = () => {
    push('/SignIn')
  }
  
  return (
    <div>
      <button className="border-2" onClick={handleSignIn}>Sign In</button>
    </div>
  )
}

export default NavbarComponent