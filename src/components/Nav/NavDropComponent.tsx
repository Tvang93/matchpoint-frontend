import React from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";

interface ProfilePictureProps {
    letter: string;
    imageUrl?: string;
  }
  

const NavDropComponent = ({ letter, imageUrl }: ProfilePictureProps) => {
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
        <DropdownItem>My Profile</DropdownItem>
        <DropdownItem>Add Court</DropdownItem>
        <DropdownItem onClick={() => console.log("Signing out...")}>Sign out</DropdownItem>
      </Dropdown>
  )
}

export default NavDropComponent
