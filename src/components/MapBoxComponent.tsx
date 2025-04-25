'use client'

import { mapbox } from '@/utils/DataServices'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'

const INITIAL_CENTER = [
  -74.0242,
  40.6941
]

const hospitals = {
	type: 'FeatureCollection',
	features: [
	{
		type: 'Feature',
		properties:
		{
			Name: 'VA Medical Center -- Leestown Division',
			Address: '2250 Leestown Rd'
		},
		geometry:
		{
			type: 'Point',
			coordinates: [-74.0387, 40.6941]
		}
	},
	{
		type: 'Feature',
		properties:
		{
			Name: 'VA Medical Center -- Leestown Division',
			Address: '2250 Leestown Rd'
		},
		geometry:
		{
			type: 'Point',
			coordinates: [-74.0487, 40.6941]
		}
	},
	{
		type: 'Feature',
		properties:
		{
			Name: 'VA Medical Center -- Leestown Division',
			Address: '2250 Leestown Rd'
		},
		geometry:
		{
			type: 'Point',
			coordinates: [-74.0587, 40.6941]
		}
	},
	{
		type: 'Feature',
		properties:
		{
			Name: 'VA Medical Center -- Leestown Division',
			Address: '2250 Leestown Rd'
		},
		geometry:
		{
			type: 'Point',
			coordinates: [-74.0687, 40.6941]
		}
	}]
};

const MapBoxComponent = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null)

    const [latitude, setLatitude] = useState(INITIAL_CENTER[1])
    const [longitude, setLongitude] = useState(INITIAL_CENTER[0])


    const [earthquakeData, setEarthquakeData] = useState()

    const getBboxAndFetch = useCallback(async () => {
        if(mapRef.current){
        const bounds = mapRef.current.getBounds()
      
        if(bounds){
        try {
            const data = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&endtime=2024-01-30&minlatitude=${bounds._sw.lat}&maxlatitude=${bounds._ne.lat}&minlongitude=${bounds._sw.lng}&maxlongitude=${bounds._ne.lng}`)
                .then(d => d.json())
    
            setEarthquakeData(data)
        } catch (error) {
            console.error(error)
        }
      }
    }}, [])

    useEffect(() => {
      mapboxgl.accessToken = mapbox
      if(!mapContainerRef.current) return
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [116.14815, -1.99628],
        minZoom: 5.5,
        zoom: 5.5
      });

    //   mapRef.current.on('load', () => {
    //     getBboxAndFetch()
    // })

    // mapRef.current.on('moveend', () => {
    //     getBboxAndFetch()
    // })

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

    console.log(earthquakeData)

  return (
    <div>
        <p>Testing page</p>
        <div className="sidebar">
        Longitude: {longitude.toFixed(4)} | Latitude: {latitude.toFixed(4)}
      </div>
        <div id='map-container' className='relative h-150 w-100' ref={mapContainerRef}>
        </div>
    </div>
  )
}

export default MapBoxComponent