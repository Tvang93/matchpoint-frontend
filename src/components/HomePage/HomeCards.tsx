import { Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { IFeatures } from '@/utils/Interfaces'
import { get5miLocationsByCoords } from '@/utils/DataServices'
import Link from 'next/link'

interface Props {
    lat?: number,
    lng?: number
}



const HomeCards = (Props: Props) => {
    const {lat, lng} = Props
    const [locations, setLocations] = useState<IFeatures[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(()=>{
        console.log(locations)
    }, [locations])

    useEffect(() => {
        console.log("lat", lat)
        console.log("lng", lng)
        const fetchLocations = async () => {
            try {
                if(lat && lng){
                const data = await get5miLocationsByCoords(lat.toString(), lng.toString());
                console.log(data)
                if (data) {
                    setLocations(data);
                } else {
                    setError("Failed to load locations");
                }
            }
            } catch (err) {
                setError("An error occurred while fetching locations");
                console.error(err);

        };
    }
        
        fetchLocations();
    }, [lat, lng]);
    
    
    if (error) {
        return <div className="text-red-500 text-center py-10">{error}</div>;
    }
    
    if (locations.length === 0) {
        return <div className="text-[#E1FF00] text-center py-10">No locations found. Be the first to add one!</div>;
    }


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[100px] mt-[50px]'>
    {locations.map((location) => (
        <Card key={location.properties.id} className='max-w-sm flex justify-center'>
            <div>
                <h1 className='text-2xl font-bold'>{location.properties.courtName}</h1>
                <div>
                    <span className="text-sm">Court Rating: {location.properties.courtRating}/5</span>
                    <span className="text-sm ml-4">Safety Rating: {location.properties.safetyRating}/5</span>
                </div>
                <h2 className="mt-2">Conditions:</h2>
                <ul className="list-disc list-inside">
                    {location.properties.conditions ? location.properties.conditions.map((condition, idx) => (
                        <li key={idx}>{condition}</li>
                    )) : ""}
                </ul>
                <h2 className="mt-2">Amenities:</h2>
                <ul className="list-disc list-inside">
                    {location.properties.amenities ? location.properties.amenities.map((amenities, idx) => (
                        <li key={idx}>{amenities}</li>
                    )) : ""}
                </ul>
                <div className="flex flex-col gap-2 mt-4">
                    <button 
                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.geometry.coordinates[1]},${location.geometry.coordinates[0]}`, '_blank')}
                        className='bg-green-500 text-white py-2 rounded-2xl w-[300px] hover:bg-green-600'
                    >
                        Get Directions
                    </button>
                    <Link href={`./Court/${location.id}`}>
                        <p className='bg-blue-500 text-white py-2 rounded-2xl w-[300px] text-center hover:bg-blue-600'>
                            View Details
                        </p>
                    </Link>
                </div>
            </div>
        </Card>
    ))}
</div>

  )
}

export default HomeCards
