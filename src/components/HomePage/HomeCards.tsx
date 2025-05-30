"use client";

import React, { useEffect, useState } from "react";
import { IFeatures } from "@/utils/Interfaces";
import { get5miLocationsByCoords } from "@/utils/DataServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocationCoordinatesContext } from "@/context/UserInfoContext";

interface Props {
  lat?: number;
  lng?: number;
}

const HomeCards = (Props: Props) => {
  const { lat, lng } = Props;
  const {push} = useRouter()
  const {setSearchCoordinates} = useLocationCoordinatesContext()
  // const { locationCoordinates } = useLocationCoordinatesContext();
  const [locations, setLocations] = useState<IFeatures[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [slicedLocations, setSlicedLocations] = useState<IFeatures[]>([]);
  // const [moreThanOneLocation, setMoreThanOneLocation] =
  //   useState<boolean>(false);

  useEffect(() => {
    console.log("lat", lat);
    console.log("lng", lng);
    const fetchLocations = async () => {
      try {
        if (lat && lng) {
          const data = await get5miLocationsByCoords(
            lat.toString(),
            lng.toString()
          );
          console.log(data);
          if (data) {
            setLocations(data);
          } else {
            setError("Failed to load locations");
          }
        }
      } catch (err) {
        setError("An error occurred while fetching locations");
        console.error(err);
      }
    };

    fetchLocations();
  }, [lat, lng]);

  const euclideanDistance = (
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  useEffect(() => {
    if (locations && lat && lng) {
      const sortLocation = locations.sort(
        (a, b) =>
          euclideanDistance(
            lat as number,
            lng as number,
            a.geometry.coordinates[1],
            a.geometry.coordinates[0]
          ) -
          euclideanDistance(
            lat as number,
            lng as number,
            b.geometry.coordinates[1],
            b.geometry.coordinates[0]
          )
      );

      setSlicedLocations(sortLocation.slice(1, 5));
    }
  }, [locations]);

  // useEffect(() => {
  //   console.log(slicedLocations);
  //   if (slicedLocations.length > 0) {
  //     setMoreThanOneLocation(true);
  //   }
  // }, [slicedLocations]);

  const handleSearchNearby = () => {
    setSearchCoordinates({
      latitude: lat,
      longitude: lng
    });
    push('/Search')
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  if (locations.length === 0) {
    return (
      <div className="text-[#E1FF00] text-center py-10">
        No locations found. Sign in to be the first to add one!
      </div>
    );
  }

  return (
    <div>
      <div className="mt-10 grid grid-cols-12 gap-5 mb-20 max-w-[80dvw]">
        <div className="col-span-12 flex justify-center">
          <h1 className="text-4xl text-[#E1FF00] mb-5">Nearby Courts</h1>
        </div>
{/*--------------------- BIG CARD------------------------------ */}
        <div className="col-span-12">
          <div className="bg-[#3C434E] rounded-2xl shadow-[-8px_8px_10px_0px_rgba(155,155,155,0.3)] border-black border">
            {locations[0].properties.images && (
              <div className="rounded-t-2xl min-h-40 max-h-40 sm:max-h-120 overflow-hidden">
                <img
                  src={locations[0].properties.images[0]}
                  alt="court photo"
                  className="rounded-t-2xl w-full min-h-80 sm:min-h-0 object-cover object-[-60px_-60px] sm:object-[0_0]"
                />
              </div>
            )}
            <div className="px-5 py-2 lg:px-10">
              <h1 className="text-xl md:text-2xl text-[#E1FF00] font-bold truncate overflow-hidden whitespace-nowrap">
                {locations[0].properties.courtName}
              </h1>
              <div>
                <span className="text-[#E1FF00]">{`Surface: ${locations[0].properties.surface}`}</span>
              </div>
              <div className="flex flex-col items-center md:flex-row md:justify-center gap-2 md:gap-10 mt-4 mb-1 md:mb-2 ">
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${locations[0].geometry.coordinates[1]},${locations[0].geometry.coordinates[0]}`,
                      "_blank"
                    )
                  }
                  className="bg-green-500 text-white py-2 rounded-2xl w-50 md:w-[250px] lg:w-75 hover:bg-green-600 cursor-pointer"
                >
                  Get Directions
                </button>
                <Link href={`./Court/${locations[0].id}`}>
                  <p className="bg-blue-500 text-white py-2 rounded-2xl w-50 md:w-[250px] lg:w-75 text-center hover:bg-blue-600">
                    View Details
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
{/* ----------END OF BIG CARD --------------------------- */}
{/* ------------ SMALL CARDS ------------------------- */}
        {slicedLocations.map((location) => (
          <div
            key={location.properties.id}
            className="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center bg-[#3C434E] rounded-2xl shadow-[-8px_8px_10px_0px_rgba(155,155,155,0.3)] border-black border"
          >
            <div className="overflow-hidden">
              {location.properties.images && (
                <div className="rounded-t-2xl h-40 md:max-h-45 overflow-hidden">
                  <img
                    src={location.properties.images[0]}
                    alt="court photo"
                    className="rounded-t-2xl h-80 sm:h-80 xl:h-60 2xl:h-100 object-[-60px_-60px] object-cover"
                  />
                </div>
              )}
              <div className="px-5 py-2">
                <h1 className="text-xl text-[#E1FF00] font-bold truncate overflow-hidden whitespace-nowrap">
                  {location.properties.courtName}
                </h1>
                <div>
                  <span className="text-[#E1FF00]">{`Surface: ${location.properties.surface}`}</span>
                </div>
                <div className="flex flex-col gap-2 mt-4 mb-1 items-center">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${location.geometry.coordinates[1]},${location.geometry.coordinates[0]}`,
                        "_blank"
                      )
                    }
                    className="bg-green-500 text-white py-2 rounded-2xl w-[200px] hover:bg-green-600 cursor-pointer"
                  >
                    Get Directions
                  </button>
                  <Link href={`./Court/${location.id}`}>
                    <p className="bg-blue-500 text-white py-2 rounded-2xl w-[200px] text-center hover:bg-blue-600">
                      View Details
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
{/* ----------END OF SMALL CARDS --------------------------- */}
      <div className="col-span-12 flex justify-center mt-10">
        <p 
        className="text-xl sm:text-4xl text-[#E1FF00] underline cursor-pointer" 
        onClick={handleSearchNearby}
        >
          {"Search All Courts Nearby >"}
        </p>
      </div>
      </div>
    </div>
  );
};

export default HomeCards;
