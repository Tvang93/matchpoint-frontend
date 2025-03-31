import React from 'react'

const ProfileButtonsComponent = () => {
  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
      <button className="bg-[#E1FF00] text-[#1e2c49] py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300 text-sm font-medium w-full max-w-xs">
        add /edit pic
      </button>
      
      <button className="bg-[#E1FF00] text-[#1e2c49] py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300 text-sm font-medium w-full max-w-xs">
        Change Username
      </button>
      
      <button className="bg-[#E1FF00] text-[#1e2c49] py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300 text-sm font-medium w-full max-w-xs">
        Change Password
      </button>
      
      <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition duration-300 text-sm font-medium w-full max-w-xs">
        Delete Account
      </button>
    </div>
  )
}

export default ProfileButtonsComponent
