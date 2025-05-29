'use client'

import { mapbox } from '@/utils/DataServices'
import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import { useLocationCoordinatesContext } from '@/context/UserInfoContext'

const INITIAL_CENTER = [
  -121.275604,
  37.961632
]

interface IMapboxALProps {
    setLat: React.Dispatch<React.SetStateAction<string>>;
    setLng: React.Dispatch<React.SetStateAction<string>>;
}

const MapBoxALComponent: React.FC<IMapboxALProps> = ({setLat, setLng}) => {

    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null)

    const {locationCoordinates} = useLocationCoordinatesContext();


    useEffect(() => {
      mapboxgl.accessToken = mapbox
      if(!mapContainerRef.current) return
      if(locationCoordinates && locationCoordinates.latitude && locationCoordinates.longitude){
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [locationCoordinates.longitude, locationCoordinates.latitude],
        zoom: 16
      });

      setLat(locationCoordinates.latitude.toString())
      setLng(locationCoordinates.longitude.toString())
    }else{
            mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [INITIAL_CENTER[0], INITIAL_CENTER[1]],
        zoom: 16
      });

      setLat(INITIAL_CENTER[1].toString())
      setLng(INITIAL_CENTER[0].toString())
    }

      mapRef.current.on('moveend', () => {
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
        <div id='map-container' className='relative h-70 w-70 sm:h-100 sm:w-100 lg:h-75 lg:w-75 xl:h-100 xl:w-100 text-white rounded-2xl' ref={mapContainerRef}>
          <div className='absolute top-[78px] left-[158px] sm:top-[198px] sm:left-[198px] bg-red-600 rounded-2xl w-2 h-2 z-1' />
        </div>
    </div>
  )
}

export default MapBoxALComponent