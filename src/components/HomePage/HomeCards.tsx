import { Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { ICourtCard } from '@/utils/Interfaces'
import { getAllLocations } from '@/utils/DataServices'
import Link from 'next/link'


const HomeCards = () => {
    const [locations, setLocations] = useState<ICourtCard[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const data = await getAllLocations();
                console.log(data)
                if (data) {
                    setLocations(data);
                } else {
                    setError("Failed to load locations");
                }
            } catch (err) {
                setError("An error occurred while fetching locations");
                console.error(err);

        };
    }
        
        fetchLocations();
    }, []);
    
    
    if (error) {
        return <div className="text-red-500 text-center py-10">{error}</div>;
    }
    
    if (locations.length === 0) {
        return <div className="text-[#E1FF00] text-center py-10">No locations found. Be the first to add one!</div>;
    }


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[100px] mt-[50px]'>
    {locations.map((location) => (
        <Card key={location.id} className='max-w-sm flex justify-center'>
            <div>
                <h1 className='text-2xl font-bold'>{location.courtName}</h1>
                <div>
                    <span className="text-sm">Court Rating: {location.courtRating}/5</span>
                    <span className="text-sm ml-4">Safety Rating: {location.safetyRating}/5</span>
                </div>
                <h2 className="mt-2">Conditions:</h2>
                <ul className="list-disc list-inside">
                    {location.courtCondition?.map((condition) => (
                        <li key={condition.id}>{condition.condition}</li>
                    ))}
                </ul>
                <div className="flex flex-col gap-2 mt-4">
                    <button 
                        onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lon}`, '_blank')}
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
