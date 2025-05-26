import React from "react";
import { IFeatures } from "@/utils/Interfaces";

interface SearchCardsProps {
  locations: IFeatures[];
}

const SearchCards: React.FC<SearchCardsProps> = ({ locations }) => {
  const getConditionTag = (condition: string) => {
    const rng = (Date.now() - Math.random()).toString(36).substring(2);
    return (
      <div key={rng}>
        <li className="flex gap-2 bg-[#99a7bd] border-1 border-[#E1FF00] rounded-full me-2 px-3 my-1">
          <div className="">{condition}</div>
        </li>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {locations.map((location, idx) => (
        <div
          key={idx}
          className="bg-gray-800 border border-gray-700 overflow-hidden"
        >
          <div className="flex">
            <div className="w-2/3 p-4">
              <h3 className="text-xl font-bold text-[#E1FF00] mb-1">
                {location.properties.courtName}
              </h3>
              <p className="text-sm text-gray-300 mb-3">{`Surface: ${location.properties.surface}`}</p>

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

              <div className="mt-2">
                <button
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${location.geometry.coordinates[1]},${location.geometry.coordinates[1]}`,
                      "_blank"
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-center w-full"
                >
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchCards;
