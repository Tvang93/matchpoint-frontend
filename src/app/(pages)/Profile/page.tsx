import NavbarComponent from '@/components/NavbarComponent'
import ProfilePageComponent from '@/components/Profile/ProfilePageComponent'
import React from 'react'

const page = () => {
  return (
    <div className="bg-[#243451] min-h-screen">
      <NavbarComponent />
      <ProfilePageComponent />
    </div>
  )
}

export default page
