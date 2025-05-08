import React from 'react';
import { ICourtCard } from '@/utils/Interfaces';


interface SearchCardsProps {
  locations: ICourtCard[];
}

const SearchCards: React.FC<SearchCardsProps> = ({ locations }) => {

  const getConditionTag = (condition: string) => {

    
    if (condition.toLowerCase().includes('good surface')) {
      return <span key={condition} className={`text-sm px-4 py-1 rounded-full mr-2 mb-2 border border-green-500 text-white`}>Good Surface</span>;
    } else if (condition.toLowerCase().includes('no cracks')) {
      return <span key={condition} className={`text-sm px-4 py-1 rounded-full mr-2 mb-2 border border-yellow-500 text-white`}>No Cracks</span>;
    } else if (condition.toLowerCase().includes('uneven surface')) {
      return <span key={condition} className={`text-sm px-4 py-1 rounded-full mr-2 mb-2 border border-yellow-500 text-white`}>Uneven Surface</span>;
    } else if (condition.toLowerCase().includes('restroom')) {
      return <span key={condition} className={`text-sm px-4 py-1 rounded-full mr-2 mb-2 border border-blue-500 text-white`}>Restroom</span>;
    } else if (condition.toLowerCase().includes('outdoor lights')) {
      return <span key={condition} className={`text-sm px-4 py-1 rounded-full mr-2 mb-2 border border-purple-500 text-white`}>Outdoor Lights</span>;
    } else if (condition.toLowerCase().includes('no outdoor lights')) {
      return <span key={condition} className={`text-sm px-4 py-1 rounded-full mr-2 mb-2 border border-red-500 text-white`}>No Outdoor Lights</span>;
    } else if (condition.toLowerCase().includes('no fountains')) {
      return <span key={condition} className={`text-sm px-4 py-1 rounded-full mr-2 mb-2 border border-red-500 text-white`}>No Fountains</span>;
    } else if (condition.toLowerCase().includes('fountains')) {
      return <span key={condition} className={`text-sm px-4 py-1 rounded-full mr-2 mb-2 border border-green-500 text-white`}>Fountains</span>;
    } else if (condition.toLowerCase().includes('no restrooms')) {
      return <span key={condition} className={`text-sm px-4 py-1 rounded-full mr-2 mb-2 border border-red-500 text-white`}>No Restrooms</span>;
    } else {
      return <span key={condition} className={`text-sm px-4 py-1 rounded-full mr-2 mb-2 border border-gray-500 text-white`}>{condition}</span>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {locations.map((location) => (
        <div key={location.id} className="bg-gray-800 border border-gray-700 overflow-hidden">
          <div className="flex">

            

            <div className="w-2/3 p-4">
              <h3 className="text-xl font-bold text-[#E1FF00] mb-1">{location.courtName}</h3>
              <p className="text-sm text-gray-300 mb-3">Surface: Hard Surface</p>
              

              <div className="flex flex-wrap mb-2">

                {location.courtCondition?.filter(item => 
                  item.condition.toLowerCase().includes('restroom') || 
                  item.condition.toLowerCase().includes('lights') || 
                  item.condition.toLowerCase().includes('fountain')
                ).map((item) => (
                  getConditionTag(item.condition)
                ))}
                
                {location.amenities?.filter(item => 
                  item.amenity.toLowerCase().includes('restroom') || 
                  item.amenity.toLowerCase().includes('lights') || 
                  item.amenity.toLowerCase().includes('fountain')
                ).map((item) => (
                  getConditionTag(item.amenity)
                ))}
              </div>
              

              <div className="flex flex-wrap mb-4">

                {location.courtCondition?.filter(item => 
                  !item.condition.toLowerCase().includes('restroom') && 
                  !item.condition.toLowerCase().includes('lights') && 
                  !item.condition.toLowerCase().includes('fountain')
                ).map((item) => (
                  getConditionTag(item.condition)
                ))}
                
                {location.amenities?.filter(item => 
                  !item.amenity.toLowerCase().includes('restroom') && 
                  !item.amenity.toLowerCase().includes('lights') && 
                  !item.amenity.toLowerCase().includes('fountain')
                ).map((item) => (
                  getConditionTag(item.amenity)
                ))}
              </div>
              

              <div className="mt-2">
                <button 
                  onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lon}`, '_blank')}
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