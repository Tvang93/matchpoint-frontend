'use client'

import React, { useEffect } from 'react'
import UsernameComponent from './UsernameComponent'
import ProfilePictureComponent from './ProfilePictureComponent'
import ProfileButtonsComponent from './ProfileButtonsComponent'
import { loggedInData } from '@/utils/DataServices'

const ProfilePageComponent = () => {

  const loggedIn = loggedInData()
  

  return (
    <div className="flex flex-col items-center mt-16">
    <UsernameComponent username={loggedIn != undefined ? loggedIn.username : null} />
    <ProfilePictureComponent letter="T" />
    <ProfileButtonsComponent />
  </div>
  )
}

export default ProfilePageComponent
