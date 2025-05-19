'use client'

import { checkToken, mapbox } from '@/utils/DataServices';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import NavDropComponent from './Nav/NavDropComponent';
import { useLoggedUsernameContext } from '@/context/UserInfoContext';
import DynamicSearchBoxComponent from './DynamicSearchBoxComponent';

const NavbarComponent = () => {
  const [signedIn, setSignedIn] = useState<boolean>(false);
  const {push} = useRouter();
  const pathname = usePathname();
  const {loggedUsername} = useLoggedUsernameContext()

  const handleSignIn = () => {
    push('/SignIn')
  }

  
  useEffect(() => {
    const checkLogin = () => {
      if(!checkToken()) {
        setSignedIn(false);
      }else{
        setSignedIn(true);
      }
    };
    checkLogin();

    const handleStorageChange = () => {
      checkLogin();
    }

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    }
  }, [])
  
  // const handleSearchEnter = (event: KeyboardEvent<HTMLInputElement>) => {
  //   console.log("doing something?")
  //   if(event.key === "Enter") push(`/Search`)
  // }


  
  return (
    signedIn ? 
    <div className={`w-full p-4 flex justify-between items-center ${pathname !== "/" ? `bg-[#1F1F1F]` : `absolute z-10 bg-transparent`}`}>
      <Link href="/">
        <div className="flex items-center cursor-pointer">
          <img className='h-12.5' src="/assets/mp-icon.png" alt="matchpoint icon" />
        </div>
      </Link>
      {
        pathname !== "/" &&
        <div className="relative flex-grow max-w-[1198px]">
          <DynamicSearchBoxComponent accessToken={mapbox} />
          {/* <input
            type="text"
            placeholder="Search Location"
            className="w-full px-4 py-2 rounded-full text-slate-700 bg-white"
            onKeyDown={(e)=>handleSearchEnter(e)}
          /> */}
        </div>   
      }


        <NavDropComponent letter={loggedUsername != '' ? loggedUsername[0].toUpperCase() : ''}/>
        
    </div>
    :
    <div className={`w-full  p-4 flex justify-between items-center ${pathname !== "/" ? `bg-[#1F1F1F]` : `absolute z-10 bg-transparent`}`}>
    <Link href="/">
      <div className="flex items-center cursor-pointer">
        <img className='h-12.5' src="/assets/mp-icon.png" alt="matchpoint icon" />
      </div>
    </Link>
    {
        pathname !== "/" &&
        <div className="relative flex-grow max-w-[1198px]">
          <DynamicSearchBoxComponent accessToken={mapbox} />
          {/* <input
            type="text"
            placeholder="Search Location"
            className="w-full px-4 py-2 rounded-full text-slate-700 bg-white"
            onKeyDown={(e)=>handleSearchEnter(e)}
          /> */}
        </div>   
      } 
      <button className="border border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#1e2c49] transition duration-300" onClick={handleSignIn}>
        Sign In
      </button>
    
  </div>

  )
}



export default NavbarComponent