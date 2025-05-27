"use client";

import React, { useEffect } from "react";
import { IFeatures } from "@/utils/Interfaces";
import Link from "next/link";
import { Pagination } from "flowbite-react";
import { useState } from "react";

interface SearchCardsProps {
  locations: IFeatures[];
}

const SearchCards: React.FC<SearchCardsProps> = ({ locations }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedLocations, setSortedLocations] = useState<IFeatures[]>(locations)

  const numOfEntries = 1

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getConditionTag = (condition: string) => {
    const rng = (Date.now() - Math.random()).toString(36).substring(2);
    return (
      <div key={rng}>
        <li className="flex gap-2 bg-transparent border-1 border-[#E1FF00] text-[#E1FF00] rounded-full me-2 px-3 my-1">
          <div className="">{condition}</div>
        </li>
      </div>
    );
  };

  useEffect(()=>{
    setSortedLocations(locations.slice(currentPage*numOfEntries-numOfEntries, currentPage*numOfEntries))
  }, [currentPage])

  // const handleOnCardClick = () => {

  // }

  return (
    <div className="flex flex-col gap-6">
      {sortedLocations.map((location, idx) => (
        <div
          key={idx}
          className="bg-[#3C434E] border border-[#817C7C] overflow-hidden"
        >
          <div className="grid grid-cols-3">
            <div className="col-span-1">
              <img alt="tennis court" />
            </div>
            <div className="col-span-2 p-4">
              <h3 className="text-xl text-[#E1FF00] mb-1">
                {location.properties.courtName}
              </h3>
              <p className="text-sm text-[#E1FF00] mb-3">{`Surface: ${location.properties.surface}`}</p>

              <div className="flex flex-wrap mb-2">
                {location.properties.conditions
                  ?.filter(
                    (condition) =>
                      condition.toLowerCase().includes("crack") ||
                      condition.toLowerCase().includes("surface")
                  )
                  .map((item) => getConditionTag(item))}

                {location.properties.amenities
                  ?.filter(
                    (item) =>
                      item.toLowerCase().includes("restroom") ||
                      item.toLowerCase().includes("lights") ||
                      item.toLowerCase().includes("fountain")
                  )
                  .map((item) => getConditionTag(item))}
              </div>
              <div className="grid grid-cols-2 gap-10 items-center">
                <Link href={`./Court/${location.id}`}>
                  <p className="bg-blue-500 text-white py-2 rounded-2xl text-center hover:bg-blue-600">
                    View Details
                  </p>
                </Link>
                <div className="">
                  <button
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${location.geometry.coordinates[1]},${location.geometry.coordinates[0]}`,
                        "_blank"
                      )
                    }
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-2xl text-center w-full"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(locations.length/numOfEntries)}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default SearchCards;
