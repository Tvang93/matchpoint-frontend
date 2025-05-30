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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const {push} = useRouter();
  const pathname = usePathname();
  const {loggedUsername} = useLoggedUsernameContext()

  const handleSignIn = () => {
    push('/SignIn')
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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


  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname])
  
  const navClasses = `w-full p-4 ${pathname !== "/" ? `bg-[#1F1F1F]` : `absolute z-10 bg-transparent`}`;

  if (signedIn) {
    return (
      <>

        <div className={`${navClasses} hidden md:flex justify-between items-center z-[9999]`}>
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img className='h-12.5' src="/assets/mp-icon.png" alt="matchpoint icon" />
            </div>
          </Link>
          
          {pathname !== "/" && (
            <div className="relative flex-grow max-w-[1198px] mx-4">
              <DynamicSearchBoxComponent accessToken={mapbox} />
            </div>   
          )}

          <NavDropComponent letter={loggedUsername != '' ? loggedUsername[0].toUpperCase() : ''}/>
        </div>


        <div className={`${navClasses} md:hidden z-[9999]`}>
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img className='h-10' src="/assets/mp-icon.png" alt="matchpoint icon" />
              </div>
            </Link>
            
            <div className="flex items-center space-x-3">
              {pathname !== "/" && (
                <button 
                  onClick={toggleMobileMenu}
                  className="text-white p-2"
                  aria-label="Toggle search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
              <NavDropComponent letter={loggedUsername != '' ? loggedUsername[0].toUpperCase() : ''}/>
            </div>
          </div>


          {pathname !== "/" && isMobileMenuOpen && (
            <div className="mt-4 pb-2">
              <DynamicSearchBoxComponent accessToken={mapbox} />
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <div className={`${navClasses} hidden md:flex justify-between items-center z-10`}>
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <img className='h-12.5' src="/assets/mp-icon.png" alt="matchpoint icon" />
          </div>
        </Link>
        
        {pathname !== "/" && (
          <div className="relative flex-grow max-w-[1198px] mx-4">
            <DynamicSearchBoxComponent accessToken={mapbox} />
          </div>   
        )}
        
        <button 
          className="border border-white text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#1e2c49] transition duration-300" 
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>


      <div className={`${navClasses} md:hidden z-10`}>
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <img className='h-10' src="/assets/mp-icon.png" alt="matchpoint icon" />
            </div>
          </Link>
          
          <div className="flex items-center space-x-3">
            {pathname !== "/" && (
              <button 
                onClick={toggleMobileMenu}
                className="text-white p-2"
                aria-label="Toggle search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
            <button 
              className="border border-white text-white px-4 py-2 text-sm rounded-md hover:bg-white hover:text-[#1e2c49] transition duration-300" 
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </div>
        </div>

        {pathname !== "/" && isMobileMenuOpen && (
          <div className="mt-4 pb-2">
            <DynamicSearchBoxComponent accessToken={mapbox} />
          </div>
        )}
      </div>
    </>
  )
}

export default NavbarComponent