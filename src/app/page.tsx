'use client'

import HomeCards from "@/components/HomePage/HomeCards";
import NavbarComponent from "@/components/NavbarComponent";
import DynamicSearchBoxComponent from "@/components/DynamicSearchBoxComponent";
import { useLocationCoordinatesContext } from "@/context/UserInfoContext";
import { useEffect } from "react";
import { mapbox } from "@/utils/DataServices";


export default function Home() {
  // const {push} = useRouter();
  
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

  // const handleSearchEnter = (event: KeyboardEvent<HTMLInputElement>) => {
  //   if(event.key === "Enter") push(`/Search`)
  // }

  return (
    <div className="flex flex-col bg-[#243451] min-h-screen">
      <NavbarComponent />
      <div className="w-full bg-[url(/assets/mp-hero-1.jpeg)] bg-cover bg-no-repeat bg-[15%_center] sm:bg-center min-h-180 flex justify-center items-end">
        <div className="relative flex justify-center items-end bottom-40 px-4 sm:px-0">
          <div className="relative max-w-xs sm:max-w-md md:max-w-none md:w-180">
            <p className="ps-5 text-white text-shadow-lg font-bold text-xl sm:text-2xl">Search a Location to Find Courts Nearby</p>
            <DynamicSearchBoxComponent accessToken={mapbox}/>
          </div>
          {/* <input className="bg-white py-2 px-5 text-3xl border-1 rounded-4xl w-180 " 
          type="text" 
          placeholder="Search Location" 
          onKeyDown={(e)=>handleSearchEnter(e)}
          /> */}
        </div>
      </div>
      <div className="flex justify-center">
        <HomeCards lat={locationCoordinates?.latitude} lng={locationCoordinates?.longitude} />
      </div>


    </div>
  );
}
