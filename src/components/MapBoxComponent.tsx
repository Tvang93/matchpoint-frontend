'use client'

import { mapbox } from '@/utils/DataServices'
import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

const MapBoxComponent = () => {
    const mapRef = useRef()
    const mapContainerRef = useRef()

    useEffect(() => {
      mapboxgl.accessToken = mapbox
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [-74.0242, 40.6941],
        zoom: 10.12
      });
  
      return () => {
        mapRef.current.remove()
      }
    }, [])

  return (
    <div>
        <p>Testing page</p>
        <div id='map-container' className='h-150 w-100' ref={mapContainerRef}></div>
    </div>
  )
}

export default MapBoxComponent