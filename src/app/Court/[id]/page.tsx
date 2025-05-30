"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavbarComponent from '@/components/NavbarComponent';
import { IFeatures } from '@/utils/Interfaces';
import { useParams } from 'next/navigation';
import CommentsSection from '@/components/CourtPage/CommentSectionComponent';
import { loggedInData } from "@/utils/DataServices"; 
import MapboxCPComponent from '@/components/CourtPage/MapBoxCPComponent';
import OverallRatingsComponent from '@/components/CourtPage/OverallRatingComponent';
import UserRatingComponent from '@/components/CourtPage/UserRatingComponent';



const CourtPage = () => {

  const params = useParams();
  const id  = params?.id;  
  const [locationData, setLocationData] = useState<IFeatures | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);


  const url = "https://matchpointbackend-c4btg3ekhea4gqcz.westus-01.azurewebsites.net/";


 const fetchLocationData = async () => {
    if (!id) return;

    try {
      const res = await fetch(`${url}Location/GetLocationInfoById/${id}`);
      
      if (!res.ok) {
        const errorData = await res.json();
        setError(errorData.message || "Failed to load location data");
        return;
      }
      
      const data = await res.json();
      console.log(data);
      setLocationData(data);    
    } catch (error) {
      setError("Failed to load location data");
      console.error("Error fetching location data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchLocationData();

      const user = loggedInData();
      const sessionToken = sessionStorage.getItem("Token");
      if (user?.id && sessionToken) {
        setUserId(user.id);
        setToken(sessionToken);
      }
    };

    fetchData();
  }, [id]);

  const handleRatingUpdate = () => {
    fetchLocationData();
  };

  const handleGetDirections = () => {
    if (locationData) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${locationData.geometry.coordinates[1]},${locationData.geometry.coordinates[0]}`);
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
              src={locationData.properties.images ? locationData.properties.images[0] : ""}
              alt={locationData.properties.courtName || "Location Name"}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
            <div className="flex items-center">
              <h1 className="text-4xl font-bold">{locationData.properties.courtName}</h1>
            </div>
            <p className="text-lg">Surface: {locationData.properties.surface}</p>
          </div>
        </div>



        <div className="flex flex-col md:flex-row w-full">

          <div className="w-full md:w-1/2 p-6">

            <div className="w-full h-64 bg-gray-700 mb-6 relative flex items-center justify-center">
             { locationData != null &&
              <MapboxCPComponent
                locationId={locationData.id}
                lng={locationData.geometry.coordinates[0]}
                lat={locationData.geometry.coordinates[1]}
              />
              } 
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
                {locationData.properties.conditions?.map((condition, idx) => ( 
                  <span  
                    key={idx}  
                    className="px-4 py-2 rounded-full border border-[#E1FF00] bg-[#3C434E]" 
                  > 
                    {condition}
                  </span>
                ))}
              </div>
            </div>


            <div>
              <h2 className="text-xl font-bold text-[#E1FF00] mb-3">Amenities :</h2>
              <div className="flex gap-3 flex-wrap">
                {locationData.properties.amenities?.map((amenity, idx) => (
                  <span 
                    key={idx} 
                    className="px-4 py-2 rounded-full border border-[#E1FF00] bg-[#3C434E]"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>


          <div className="w-full md:w-1/2 p-6 bg-blue-100/10">

            <OverallRatingsComponent
              currentCourtRating={locationData.properties.averageCourtRating || 0}
              currentSafetyRating={locationData.properties.averageSafetyRating || 0}
            />

            <UserRatingComponent
              courtId={locationData.id}
              userId={userId}
              token={token}
              onRatingUpdate={handleRatingUpdate}
            />

            {/* <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-300 mb-2">AI Summary:</h2>
              <div className="bg-white p-4 rounded-md text-gray-800">
                <p>
                  AI Summary Here
                </p>
              </div>
            </div> */}


            <div>
              {/* <h2 className="text-lg font-semibold text-gray-300 mb-2">Comments:</h2> */}
                <CommentsSection
                  courtId={locationData.id}
                  userId={userId}
                  token={token}
                   />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourtPage
