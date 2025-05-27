'use client'

import { useState, useEffect } from 'react';
import { get5miLocationsByCoords } from '@/utils/DataServices';
import { IFeatures } from '@/utils/Interfaces';
import SearchCards from '@/components/SearchPage/SearchCards';
import NavbarComponent from "@/components/NavbarComponent";
import MapboxSPComponent from '@/components/SearchPage/MapboxSPComponent';
import { useLocationCoordinatesContext } from '@/context/UserInfoContext';

const SearchPage = () => {
  const { searchQuery } = useLocationCoordinatesContext();
  const [locations, setLocations] = useState<IFeatures[]>([]);
  const [error, setError] = useState<string | null>(null);

  const {searchCoordinates} = useLocationCoordinatesContext()


  useEffect(() => {
    const fetchLocations = async () => {
      if(searchCoordinates)
        if(searchCoordinates.latitude && searchCoordinates.longitude){
          const data = await get5miLocationsByCoords(searchCoordinates?.latitude.toString(), searchCoordinates?.longitude.toString());
          if (data) {
            setLocations(data);
          } else {
            setError('Failed to load locations');
          }
        }
    };

    fetchLocations();
  }, [searchCoordinates]);


  // const filteredLocations = locations.filter(location => 
  //   searchQuery ? location.properties.courtName.toLowerCase().includes(searchQuery.toLowerCase()) : true
  // );

  return (
    <div className="max-h-screen bg-gray-900 text-white">
      <NavbarComponent/>
      
      <div className="grid grid-cols-12 h-[calc(100dvh-86.33333px)] w-full">

        <div className="col-span-12 md:col-span-6 lg:col-span-5 bg-gray-800 border border-gray-700 overflow-hidden">
          <div className="max-h-full w-full flex items-center justify-center text-gray-400">
              <MapboxSPComponent />
          </div>
        </div>


        <div className="col-span-12 md:col-span-6 lg:col-span-7 overflow-y-auto flex flex-col">
          <div className="p-4 bg-gray-800 border-b border-gray-700">
            <h2 className="text-xl font-bold text-[#E1FF00]">
              Courts nearby {searchQuery || "Your Location"}
            </h2>
          </div>

          {error ? (
            <div className="text-red-500 text-center py-10">{error}</div>
          ) : locations.length === 0 ? (
            <div className="text-[#E1FF00] text-center py-10">No courts found matching your search.</div>
          ) : (
            <div className="p-4 flex-grow">
              <SearchCards locations={locations} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
