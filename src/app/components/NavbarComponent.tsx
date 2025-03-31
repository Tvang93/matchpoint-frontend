'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'

const NavbarComponent = () => {
  const {push} = useRouter();

  const handleSignIn = () => {
    push('/SignIn')
  }
  
  return (
    <div className="w-full bg-[#1F1F1F] p-4 flex justify-between items-center">

      <Link href="/">
        <div className="flex items-center cursor-pointer">
 
        </div>
      </Link>
      

      <div className="flex-grow max-w-[1198px] mx-4">
        <input
          type="text"
          placeholder="Search Location"
          className="w-full px-4 py-2 rounded-full text-slate-700 bg-white"
        />
      </div>
      
  
    
        <button className="border border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#1e2c49] transition duration-300" onClick={handleSignIn}>
          Sign In
        </button>



        {/* Temporary Buttons */}

        <Link href="/Profile">
         <button className="border border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#1e2c49] transition duration-300">
          profile
        </button>
        </Link>
       
  
    </div>
  )
}

export default NavbarComponent