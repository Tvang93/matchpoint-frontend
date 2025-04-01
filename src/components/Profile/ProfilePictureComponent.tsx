import React from 'react'

interface ProfilePictureProps {
  letter: string;
  imageUrl?: string;
}

const ProfilePictureComponent = ({ letter, imageUrl }: ProfilePictureProps) => {
  return (
    <div className="mb-8">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt="Profile" 
          className="w-32 h-32 rounded-full object-cover border-4 border-white"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-red-600 flex items-center justify-center text-white text-6xl font-bold">
          {letter}
        </div>
      )}
    </div>
  )
}

export default ProfilePictureComponent
