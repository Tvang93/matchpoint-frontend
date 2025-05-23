"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavbarComponent from '@/components/NavbarComponent';
import { ICourtCard } from '@/utils/Interfaces';
import { useParams } from 'next/navigation';
import CommentsSection from '@/components/CourtPage/CommentSectionComponent';
import { loggedInData } from "@/utils/DataServices"; 



const CourtPage = () => {

  const params = useParams();
  const id  = params?.id;  
  const [locationData, setLocationData] = useState<ICourtCard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);


  const url = "https://matchpointbe-a7ahdsdjeyf4efgt.westus-01.azurewebsites.net/";


  useEffect(() => {
    if (!id) return;

    const fetchLocationData = async () => {

        const res = await fetch(`${url}Location/GetLocationInfoById/${id}`);
        
        if (!res.ok) {
          const errorData = await res.json();
          setError(errorData.message || "Failed to load location data");
          return;
        }
        
        const data = await res.json();
        console.log(data)
        setLocationData(data);    
    };

    fetchLocationData();

  const fetchData = async () => {
    const res = await fetch(`${url}Location/GetLocationInfoById/${id}`);
    if (!res.ok) {
      const errorData = await res.json();
      setError(errorData.message || "Failed to load location data");
      return;
    }
    const data = await res.json();
    setLocationData(data);

    const user = loggedInData();
    const sessionToken = sessionStorage.getItem("Token");
    if (user?.id && sessionToken) {
      setUserId(user.id);
      setToken(sessionToken);
    }
  };

  fetchData();
  }, [id]);

  const handleGetDirections = () => {
    if (locationData) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${locationData.lat},${locationData.lon}`);
    }
  };

  if (error || !locationData) {
    return (
      <div className="min-h-screen bg-[#243451]">
        <NavbarComponent />
        <div className="flex justify-center items-center h-screen">
          <p className="text-white text-xl">{error || "Location not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#243451] text-white">
      <NavbarComponent />
      <div className="relative w-full">
        <div className="relative w-full h-80">
       
          <div className="w-full h-full bg-gray-700 relative">
            <Image 
              src="/assets/mp-hero-1.jpeg"
              alt={locationData.courtName || "Location Name"}
              fill
            />
          </div>
          <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
            <div className="flex items-center">
              <h1 className="text-4xl font-bold">{locationData.courtName}</h1>
            </div>
            <p className="text-lg">Surface: Hard Surface</p>
          </div>
        </div>


        <div className="flex flex-col md:flex-row w-full">

          <div className="w-full md:w-1/2 p-6">

            <div className="w-full h-64 bg-gray-700 mb-6 relative flex items-center justify-center">
              <p>Map Goes Here :)</p>
            </div>
            
            <button 
              className="w-full py-3 mb-6 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md"
              onClick={handleGetDirections}
            >
              Get Directions
            </button>


            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#E1FF00] mb-3">Court Condition :</h2>
              <div className="flex gap-3 flex-wrap">
                {locationData.courtCondition?.map((condition) => (
                  <span 
                    key={condition.id} 
                    className="px-4 py-2 rounded-full border border-[#E1FF00] bg-[#3C434E]"
                  >
                    {condition.condition}
                  </span>
                ))}
              </div>
            </div>


            <div>
              <h2 className="text-xl font-bold text-[#E1FF00] mb-3">Amenities :</h2>
              <div className="flex gap-3 flex-wrap">
                {locationData.amenities?.map((amenity) => (
                  <span 
                    key={amenity.id} 
                    className="px-4 py-2 rounded-full border border-[#E1FF00] bg-[#3C434E]"
                  >
                    {amenity.amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-6 bg-blue-100/10">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-300 mb-2">AI Summary:</h2>
              <div className="bg-white p-4 rounded-md text-gray-800">
                <p>
                  AI Summary Here
                </p>
              </div>
            </div>


            <div>
              <h2 className="text-lg font-semibold text-gray-300 mb-2">Comments:</h2>
              {userId !== null && token !== null && (
                <CommentsSection
                  courtId={locationData.id}
                  userId={userId}
                  token={token}
                   />
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourtPage
