'use client'

import { useState, useEffect } from 'react';
import { getAllLocations } from '@/utils/DataServices';
import { ICourtCard } from '@/utils/Interfaces';
import SearchCards from '@/components/SearchPage/SearchCards';
import NavbarComponent from "@/components/NavbarComponent";

const SearchPage = () => {
  const [searchQuery] = useState<string>('');
  const [locations, setLocations] = useState<ICourtCard[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchLocations = async () => {

        const data = await getAllLocations();
        if (data) {
          setLocations(data);
        } else {
          setError('Failed to load locations');
        }

    };

    fetchLocations();
  }, []);


  const filteredLocations = locations.filter(location => 
    searchQuery ? location.courtName.toLowerCase().includes(searchQuery.toLowerCase()) : true
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavbarComponent/>
      
      <div className="flex h-[calc(100vh-80px)] w-full">

        <div className="w-1/2 bg-gray-800 border border-gray-700 overflow-hidden">
          <div className="h-full w-full flex items-center justify-center text-gray-400">

            <div className="text-center">
              <p className="text-xl">Map Placeholder</p>
            </div>
          </div>
        </div>


        <div className="w-1/2 overflow-y-auto">
          <div className="p-4 bg-gray-800 border-b border-gray-700">
            <h2 className="text-xl font-bold text-[#E1FF00]">
              Courts nearby {searchQuery || "Stockton, CA"}
            </h2>
          </div>

          {error ? (
            <div className="text-red-500 text-center py-10">{error}</div>
          ) : filteredLocations.length === 0 ? (
            <div className="text-[#E1FF00] text-center py-10">No courts found matching your search.</div>
          ) : (
            <div className="p-4">
              <SearchCards locations={filteredLocations} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
