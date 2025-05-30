"use client";

import React, { useEffect } from "react";
import { IFeatures } from "@/utils/Interfaces";
import Link from "next/link";
import { Pagination, createTheme, ThemeProvider } from "flowbite-react";
import { useState } from "react";
import { useLocationCoordinatesContext } from "@/context/UserInfoContext";


// ------------ Pagination Theme/CSS ------------
const customTheme = createTheme({
  pagination: {
    base: "",
    layout: {
      table: {
        base: "text-sm text-gray-200",
        span: "font-semibold text-[#E1FF00]",
      },
    },
    pages: {
      base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
      showIcon: "inline-flex",
      previous: {
        base: "ml-0 rounded-l-lg border border-gray-300 bg-[#3C434E] px-3 py-2 leading-tight text-[#E1FF00] enabled:hover:bg-gray-100 enabled:hover:text-gray-700 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      next: {
        base: "rounded-r-lg border border-gray-300 bg-[#3C434E] px-3 py-2 leading-tight text-[#E1FF00] enabled:hover:bg-gray-100 enabled:hover:text-gray-700 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        icon: "h-5 w-5",
      },
      selector: {
        base: "w-12 border border-gray-300 bg-[#3C434E] py-2 leading-tight text-[#E1FF00] enabled:hover:bg-gray-100 enabled:hover:text-gray-700 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
        active:
          "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
        disabled: "cursor-not-allowed opacity-50",
      },
    },
  },
});

interface SearchCardsProps {
  locations: IFeatures[];
}

// ------------------ SearchCards Component -------------------------

const SearchCards: React.FC<SearchCardsProps> = ({ locations }) => {
  const {searchCoordinates} = useLocationCoordinatesContext();
  const searchLatitude = searchCoordinates?.latitude;
  const searchLongitude = searchCoordinates?.longitude;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedLocations, setSortedLocations] =
    useState<IFeatures[]>(locations);

  //Set number of Entries seen per page
  const numOfEntries = 3;

  const euclideanDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getConditionTag = (condition: string) => {
    const rng = (Date.now() - Math.random()).toString(36).substring(2);
    return (
      <div key={rng}>
        <li className="flex gap-2 bg-transparent border-1 border-[#E1FF00] text-[#E1FF00] text-md rounded-full me-2 px-3 my-1">
          <div className="">{condition}</div>
        </li>
      </div>
    );
  };

  useEffect(() => {
    if(searchCoordinates){

    const sortLocation = locations.sort((a, b) =>
    euclideanDistance(searchLatitude as number, searchLongitude as number, a.geometry.coordinates[1], a.geometry.coordinates[0]) -
    euclideanDistance(searchLatitude as number, searchLongitude as number, b.geometry.coordinates[1], b.geometry.coordinates[0]))

    setSortedLocations(
      sortLocation.slice(
        currentPage * numOfEntries - numOfEntries,
        currentPage * numOfEntries
      )
    );
    }
  }, [currentPage, searchCoordinates]);


  return (
    <div className="flex flex-col gap-4 h-full">
      <div className={`flex-grow grid grid-row-3 gap-4 h-full`}>
      {sortedLocations.map((location, idx) => (
        <div
          key={idx}
          className={`bg-[#3C434E] border border-[#817C7C] overflow-hidden row-span-${idx+1} h-[23dvh]`}
        >
          <div className="grid grid-cols-12 grid-rows-2 lg:grid-rows-1 h-full">
            <div className="col-span-12 row-span-1 lg:col-span-5 xl:col-span-4 p-1 lg:h-[22.5dvh] overflow-hidden">
              <img 
              src={location.properties.images ? location.properties.images[0] : undefined} 
              alt="tennis court"
              className="object-[0_-60px] lg:h-80 object-cover"
              />
            </div>
            <div className="col-span-12 md:row-start-2 lg:row-start-auto lg:col-span-7 xl:col-span-8 p-1 sm:px-4 flex flex-col h-full w-full gap-2">
              <h3 className="text-xl text-[#E1FF00]">
                {location.properties.courtName}
              </h3>
              <p className="text-md text-[#E1FF00]">{`Surface: ${location.properties.surface}`}</p>

              <div className="hidden flex-wrap lg:flex overflow-x-hidden">
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
              <div className="flex gap-2 sm:gap-5 xl:gap-10 items-center">
                <Link href={`./Court/${location.id}`}>
                  <p className="bg-blue-500 text-white text-sm lg:text-lg py-1 px-2 rounded-lg lg:py-2 lg:rounded-2xl lg:px-4 text-center hover:bg-blue-600">
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
                    className="bg-green-600 hover:bg-green-700 text-sm text-white py-1 px-2 rounded-lg lg:text-lg lg:py-2 lg:px-4 lg:rounded-2xl text-center w-full"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* array to fill in gaps */}
        {Array.from({ length: Math.max(0, 3 - sortedLocations.length) }).map((_, i) => (
    <div key={`placeholder-${i}`} className="hidden md:block row-start-auto h-[23dvh] bg-transparent" />
  ))}
      </div>
      <div className="flex justify-center items-center">
        <ThemeProvider theme={customTheme}>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(locations.length / numOfEntries)}
            onPageChange={onPageChange}
          />
        </ThemeProvider>
      </div>
    </div>
  );
};

export default SearchCards;
