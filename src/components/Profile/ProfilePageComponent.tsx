import React from 'react'
import UsernameComponent from './UsernameComponent'
import ProfilePictureComponent from './ProfilePictureComponent'
import ProfileButtonsComponent from './ProfileButtonsComponent'

const ProfilePageComponent = () => {
  return (
    <div className="flex flex-col items-center mt-16">
    <UsernameComponent username="Tvang" />
    <ProfilePictureComponent letter="T" />
    <ProfileButtonsComponent />
  </div>
  )
}

export default ProfilePageComponent
