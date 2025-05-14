'use client'

import HomeCards from "@/components/HomePage/HomeCards";
import NavbarComponent from "@/components/NavbarComponent";
import { SearchBoxComponent } from "@/components/SearchBoxComponent";
import { useLocationCoordinatesContext } from "@/context/UserInfoContext";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useEffect, useState } from "react";


export default function Home() {
  const {push} = useRouter();
  
  const {locationCoordinates, setLocationCoordinates} = useLocationCoordinatesContext()

  useEffect(()=>{
    if("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          setLocationCoordinates({latitude: coords.latitude, longitude: coords.longitude})
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
    console.log(locationCoordinates)
  }, [locationCoordinates])

  const handleSearchEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter") push(`/Search`)
  }

  return (
    <div className="flex flex-col bg-[#243451] min-h-screen">
      <NavbarComponent />
      <div className="w-full bg-[url(/assets/mp-hero-1.jpeg)] bg-cover bg-no-repeat bg-center min-h-180 flex justify-center items-end">
        <div className="relative flex justify-center items-end bottom-40">
          {/* <SearchBoxComponent /> */}
          <input className="bg-white py-2 px-5 text-3xl border-1 rounded-4xl w-180 " 
          type="text" 
          placeholder="Search Location" 
          onKeyDown={(e)=>handleSearchEnter(e)}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <HomeCards lat={locationCoordinates?.latitude} lng={locationCoordinates?.longitude} />
      </div>


    </div>
  );
}
