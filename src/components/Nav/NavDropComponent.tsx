'use client'

import React from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProfilePictureProps {
    letter: string;
    imageUrl?: string;
  }
  

const NavDropComponent = ({ letter, imageUrl }: ProfilePictureProps) => {
    
  const router = useRouter();

  const handleSignOut = () => {
    if(typeof window !== "undefined"){
      localStorage.removeItem("Token");
      window.dispatchEvent(new Event("storage"));
    }
    router.push("/")
  }

  return (
    <Dropdown inline label={
        imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Profile" 
            className="w-[50px] h-[50px] rounded-full object-cover border-4 border-white cursor-pointer"
          />
        ) : (
          <div className="w-[50px] h-[50px] rounded-full bg-red-600 flex items-center justify-center text-white text-[24px] font-bold cursor-pointer">
            {letter}
          </div>
        )
      }>
        <DropdownItem>
            <Link href='./Profile'>
            My Profile
            </Link>
            </DropdownItem>
        <DropdownItem>Add Court</DropdownItem>
        <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
      </Dropdown>
  )
}

export default NavDropComponent
