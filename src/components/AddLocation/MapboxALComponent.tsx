'use client'

import { mapbox } from '@/utils/DataServices'
import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

const INITIAL_CENTER = [
  -74.0242,
  40.6941
]

interface IMapboxALProps {
    setLat: React.Dispatch<React.SetStateAction<string>>;
    setLng: React.Dispatch<React.SetStateAction<string>>;
}

const MapBoxALComponent: React.FC<IMapboxALProps> = ({setLat, setLng}) => {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null)


    useEffect(() => {
      mapboxgl.accessToken = mapbox
      if(!mapContainerRef.current) return
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [INITIAL_CENTER[0], INITIAL_CENTER[1]],
        zoom: 12
      });

      setLat(INITIAL_CENTER[1].toString())
      setLng(INITIAL_CENTER[0].toString())

      mapRef.current.on('move', () => {
        if(mapRef.current){
        // get the current center coordinates and zoom level from the map
          const mapCenter = mapRef.current.getCenter()
  
          // update state
          setLat(mapCenter.lat.toFixed(4))
          setLng(mapCenter.lng.toFixed(4))
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