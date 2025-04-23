'use client'

import { mapbox } from '@/utils/DataServices'
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

const INITIAL_CENTER = [
  -74.0242,
  40.6941
]

const MapBoxComponent = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null)

    const [latitude, setLatitude] = useState(INITIAL_CENTER[1])
    const [longitude, setLongitude] = useState(INITIAL_CENTER[0])


    useEffect(() => {
      mapboxgl.accessToken = mapbox
      if(!mapContainerRef.current) return
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.0242, 40.6941],
        zoom: 12
      });

      mapRef.current.on('move', () => {
        if(mapRef.current){
        // get the current center coordinates and zoom level from the map
          const mapCenter = mapRef.current.getCenter()
  
          // update state
          setLatitude(mapCenter.lat)
          setLongitude(mapCenter.lng)
      }})

      return () => {
        if(mapRef.current){
          mapRef.current.remove()
        }
      }
    }, [])

  return (
    <div>
        <p>Testing page</p>
        <div className="sidebar">
        Longitude: {longitude.toFixed(4)} | Latitude: {latitude.toFixed(4)}
      </div>
        <div id='map-container' className='relative h-150 w-100' ref={mapContainerRef}>
          <div className='absolute top-[280px] left-[180px]'>
            <img className='h-10 w-10' src="/assets/tennisIcon.png" alt="" />
          </div>
        </div>
    </div>
  )
}

export default MapBoxComponent