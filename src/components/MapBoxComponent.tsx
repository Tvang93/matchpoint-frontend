'use client'

import { mapbox } from '@/utils/DataServices'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import mapboxgl, { LngLatBounds } from 'mapbox-gl'
import { FeatureCollection } from 'geojson';

const INITIAL_CENTER = [
  -74.0242,
  40.6941
]

// interface EarthquakeFeature {
//   id: string;
//   geometry: {
//     coordinates: [number, number];
//   };
// }

const MapBoxComponent = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null)

    const [latitude, setLatitude] = useState(INITIAL_CENTER[1])
    const [longitude, setLongitude] = useState(INITIAL_CENTER[0])
    // const [isRefreshed, setIsRefreshed] = useState<boolean>(false)


    const [earthquakeData, setEarthquakeData] = useState<FeatureCollection | null>(null)

    const getBboxAndFetch = useCallback(async () => {
        if(mapRef.current){
        const boundary = mapRef.current.getBounds()
      
        if(boundary){
        try {
            await fetchEq(boundary)
        } catch (error) {
            console.error(error)
        }
      }

    }}, [])

    const fetchEq = async(bounds: LngLatBounds) => {
      const res = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&endtime=2024-01-30&minlatitude=${bounds._sw.lat}&maxlatitude=${bounds._ne.lat}&minlongitude=${bounds._sw.lng}&maxlongitude=${bounds._ne.lng}`)
      const data = await res.json()
      setEarthquakeData(data)

    }

    useEffect(() => {
      if (!mapRef.current || !earthquakeData) return;

      if (mapRef.current.getSource('earthquakes')) {
        mapRef.current.removeLayer('earthquake-layer');
        mapRef.current.removeSource('earthquakes');
      }
    
      mapRef.current.addSource('earthquakes', {
        type: 'geojson',
        data: earthquakeData,
      });
    
      mapRef.current.addLayer({
        id: 'earthquake-layer',
        type: 'circle',
        source: 'earthquakes',
        paint: {
          'circle-radius': 6,
          'circle-color': '#FF5733',
        },
      });

    }, [earthquakeData]);

    useEffect(() => {
      mapboxgl.accessToken = mapbox
      if(!mapContainerRef.current) return
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [longitude, latitude],
        minZoom: 5.5,
        zoom: 5.5
      });

      
      mapRef.current.on('load', async () => {
        await getBboxAndFetch()

    })

    mapRef.current.on('moveend', async () => {
        await getBboxAndFetch()
        if(mapRef.current){
          const mapCenter = mapRef.current.getCenter()
          setLatitude(mapCenter.lat);
          setLongitude(mapCenter.lng)
        }
    })


      return () => {
        if(mapRef.current){
          mapRef.current.remove()
        }
      }
    }, [])

    console.log("after", earthquakeData)

  return (
    <div>
        <p>Testing page</p>
        <div className="sidebar">
        Longitude: {longitude.toFixed(4)} | Latitude: {latitude.toFixed(4)}
        </div>
        <div id='map-container' className='h-150 w-100' ref={mapContainerRef} />
    </div>
  )
}

export default MapBoxComponent