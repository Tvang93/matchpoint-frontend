'use client'

import HomeCards from "@/components/HomePage/HomeCards";
import NavbarComponent from "@/components/NavbarComponent";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useState } from "react";


export default function Home() {
  const {push} = useRouter();
  
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>()

  useEffect(()=>{
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          setUserLocation({latitude: coords.latitude, longitude: coords.longitude})
        },
        (error) => {
          console.error("Error Getting Your Location", error)
        }
      )
    }else{
      console.error("Geolocation not supported on this browser.")
    }
  }, [])

  useEffect(()=>{
    console.log(userLocation)
  }, [userLocation])

  const handleSearchEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter") push(`/Search`)
  }

  return (
    <div className="flex flex-col bg-[#243451] min-h-screen">
      <NavbarComponent />
      <div className="w-full bg-[url(/assets/mp-hero-1.jpeg)] bg-cover bg-no-repeat bg-center min-h-180 flex justify-center items-end">
        <div className="relative flex justify-center items-end bottom-40">
          <input className="bg-white py-2 px-5 text-3xl border-1 rounded-4xl w-180 " 
          type="text" 
          placeholder="Search Location" 
          onKeyDown={(e)=>handleSearchEnter(e)}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <HomeCards lat={userLocation?.latitude} lng={userLocation?.longitude} />
      </div>


    </div>
  );
}
