import React from 'react'


interface UsernameProps {
  username: string;
}

const UsernameComponent = ({ username }: UsernameProps) => {
  return (
    <div className="text-center mb-4">
      <h1 className="text-[#E1FF00] text-[64px]">{username}</h1>
    </div>
  )
}

export default UsernameComponent
