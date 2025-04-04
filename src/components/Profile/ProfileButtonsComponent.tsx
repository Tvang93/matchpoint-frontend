'use client'

import React from 'react'

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";

const ProfileButtonsComponent = () => {

  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
      <button className="bg-[#E1FF00] text-[#1e2c49] py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300 text-sm font-medium w-full max-w-xs">
        add /edit pic
      </button>
      
      <button className="bg-[#E1FF00] text-[#1e2c49] py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300 text-sm font-medium w-full max-w-xs"  onClick={() => setOpenModal(true)}>
        Change Username
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Change Username</ModalHeader>
        <ModalBody>
          <div className="space-y-6">

            <input type="text" className='bg-white rounded-2xl w-[500px] h-[40px] text-black p-2' placeholder='New username...'/>
          </div>
        </ModalBody>
        <ModalFooter>
        <Button color="red" onClick={() => setOpenModal(false)}>
            Close
          </Button>
          <Button onClick={() => setOpenModal(false)}>Change Username</Button>

        </ModalFooter>
      </Modal>
      
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
