'use client'

import React from 'react'
import UsernameComponent from './UsernameComponent'
import ProfilePictureComponent from './ProfilePictureComponent'
import ProfileButtonsComponent from './ProfileButtonsComponent'
import { useLoggedUsernameContext } from '@/context/UserInfoContext'


const ProfilePageComponent = () => {
  const {loggedUsername} = useLoggedUsernameContext()
  return (
    <div className="flex flex-col items-center mt-16">
    <UsernameComponent />
    <ProfilePictureComponent letter={loggedUsername != '' ? loggedUsername[0].toUpperCase() : ''} />
    <ProfileButtonsComponent />
  </div>
  )
}

export default ProfilePageComponent
