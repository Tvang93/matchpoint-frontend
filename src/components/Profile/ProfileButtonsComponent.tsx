'use client'

import React, { useEffect } from 'react'

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { editUsername, editPassword, loggedInData,  } from '@/utils/DataServices';
import { useLoggedUsernameContext } from '@/context/UserInfoContext';

const ProfileButtonsComponent = () => {

  const [openUsernameModal, setOpenUsernameModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');

  const {setLoggedUsername} = useLoggedUsernameContext();


  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem('Token');
      if(!token) return;

      const userData = loggedInData();
      if(userData) setUsername(userData.username);
    }
    fetchUsername();
  }, [])

  const handleUsernameChange = async () => {
    const token = localStorage.getItem('Token');
    if(!token || !username) return;

    const success = await editUsername(username, newUsername, token);
    console.log(success)

    if(!success.success){
      setMessage(success.message);
      return alert(message);
    }

    setUsername(newUsername);
    setMessage('Username Changed Successfully');
    setLoggedUsername(newUsername);
    setOpenUsernameModal(false);
    setNewUsername('');

    
  }

  const handlePasswordChange = async () => {
    if(newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    const token = localStorage.getItem('Token');

    if(!token || !username) return;

    const success = await editPassword(username, newPassword, token);

    if(!success.success) {
      setMessage(success.message);
      return alert(message);
    }
      setMessage('Password changed successfully');
      setOpenPasswordModal(false);
      setNewPassword('');
      setConfirmPassword('');


 
  }

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-xs">
      <button className="bg-[#E1FF00] text-[#1e2c49] py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300 text-sm font-medium w-full max-w-xs">
        add /edit pic
      </button>
      
      <button className="bg-[#E1FF00] text-[#1e2c49] py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300 text-sm font-medium w-full max-w-xs"  onClick={() => setOpenUsernameModal(true)}>
        Change Username
      </button>
      <Modal show={openUsernameModal} onClose={() => setOpenUsernameModal(false)}>
        <ModalHeader>Change Username</ModalHeader>
        <ModalBody>
          <div className="space-y-6">

            <input type="text" className='bg-white rounded-2xl w-[500px] h-[40px] text-black p-2' placeholder='New username...' value={newUsername} onChange={(e) => setNewUsername(e.target.value)}/>
            {/* {message && <p className='text-[20px] text-red-500 mt-2'>{message}</p>} */}
          </div>
        </ModalBody>
        <ModalFooter>
        <Button color="red" onClick={() => setOpenUsernameModal(false)}>
            Close
          </Button>
          <Button onClick={handleUsernameChange}>Change Username</Button>

        </ModalFooter>
      </Modal>
      
      <button className="bg-[#E1FF00] text-[#1e2c49] py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300 text-sm font-medium w-full max-w-xs" onClick={() => setOpenPasswordModal(true)}>
        Change Password
      </button>
      <Modal show={openPasswordModal} onClose={() => setOpenPasswordModal(false)}>
        <ModalHeader>Change Password</ModalHeader>
        <ModalBody>
          <div className="space-y-6">

            <input type="password" className='bg-white rounded-2xl w-[500px] h-[40px] text-black p-2' placeholder='New password...' value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>

            <input type="password" className="bg-white rounded-2xl w-[500px] h-[40px] text-black p-2" placeholder="Confirm new password..." value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            {/* {message && <p className='text-[20px] text-red-500 mt-2'>{message}</p>} */}
          </div>
        </ModalBody>
        <ModalFooter>
        <Button color="red" onClick={() => setOpenPasswordModal(false)}>
            Close
          </Button>
          <Button onClick={handlePasswordChange}>Change Password</Button>

        </ModalFooter>
      </Modal>
      
      <button className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition duration-300 text-sm font-medium w-full max-w-xs">
        Delete Account
      </button>
    </div>
  )
}

export default ProfileButtonsComponent
