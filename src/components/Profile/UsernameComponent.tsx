'use client'

import { useLoggedUsernameContext } from '@/context/UserInfoContext'
import React from 'react'




const UsernameComponent = () => {
  const {loggedUsername} = useLoggedUsernameContext();
  return (
    <div className="text-center mb-4">
      <h1 className="text-[#E1FF00] text-[64px]">{loggedUsername}</h1>
    </div>
  )
}

export default UsernameComponent
