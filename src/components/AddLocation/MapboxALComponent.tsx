'use client'

import { mapbox } from '@/utils/DataServices'
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

const INITIAL_CENTER = [
  -74.0242,
  40.6941
]

interface IMapboxALProps {
    setLat: React.Dispatch<React.SetStateAction<number>>;
    setLng: React.Dispatch<React.SetStateAction<number>>;
}

const MapBoxALComponent: React.FC<IMapboxALProps> = ({setLat, setLng}) => {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null)


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
          setLat(Number(mapCenter.lat.toFixed(4)))
          setLng(Number(mapCenter.lng.toFixed(4)))
      }})

      return () => {
        if(mapRef.current){
          mapRef.current.remove()
        }
      }
    }, [])

  return (
    <div>
        <div id='map-container' className='relative h-100 w-100' ref={mapContainerRef}>
          <div className='absolute top-[180px] left-[180px]'>
            <img className='h-10 w-10' src="/assets/tennisIcon.png" alt="" />
          </div>
        </div>
    </div>
  )
}

export default MapBoxALComponent