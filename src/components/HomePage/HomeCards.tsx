import { Card } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IFeatures } from "@/utils/Interfaces";
import { get5miLocationsByCoords } from "@/utils/DataServices";
import Link from "next/link";
import Image from "next/image";

interface Props {
  lat?: number;
  lng?: number;
}

const HomeCards = (Props: Props) => {
  const { lat, lng } = Props;
  const [locations, setLocations] = useState<IFeatures[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log(locations);
  }, [locations]);

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

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  if (locations.length === 0) {
    return (
      <div className="text-[#E1FF00] text-center py-10">
        No locations found. Be the first to add one!
      </div>
    );
  }

  return (
    <div>
      <div className="mt-10">
        {locations.map((location) => (
          <div
            key={location.properties.id}
            className="max-w-sm flex justify-center bg-[#3C434E] rounded-2xl shadow-[-8px_8px_10px_0px_rgba(155,155,155,0.3)]"
          >
            <div>
              {location.properties.images && (
                <div className="rounded-t-2xl">
                  <img
                    src={location.properties.images[0]}
                    alt="court photo"
                    className="rounded-t-2xl"
                  />
                  {/* <Image src={location.properties.images[0]} alt="court photo" width={1920} height={1080} className='w-150 h-85' priority /> */}
                </div>
              )}
              <div className="px-5 py-2">
                <h1 className="text-2xl text-[#E1FF00] font-bold">
                  {location.properties.courtName}
                </h1>
                <div>
                  <span className="text-[#E1FF00]">{`Surface: ${location.properties.surface}`}</span>
                </div>
                <div className="flex flex-col gap-2 mt-4 items-center">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${location.geometry.coordinates[1]},${location.geometry.coordinates[0]}`,
                        "_blank"
                      )
                    }
                    className="bg-green-500 text-white py-2 rounded-2xl w-[300px] hover:bg-green-600 cursor-pointer"
                  >
                    Get Directions
                  </button>
                  <Link href={`./Court/${location.id}`}>
                    <p className="bg-blue-500 text-white py-2 rounded-2xl w-[300px] text-center hover:bg-blue-600">
                      View Details
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCards;
