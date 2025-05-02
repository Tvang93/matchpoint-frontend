'use client'

import { getLocationsByCoords, mapbox } from '@/utils/DataServices'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import mapboxgl, { LngLatBounds } from 'mapbox-gl'
import { FeatureCollection } from 'geojson';

const INITIAL_CENTER = [
  124, -1.98
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
    const [activeFeature, setActiveFeature] = useState<boolean>(false)
    // const [isRefreshed, setIsRefreshed] = useState<boolean>(false)


    const [earthquakeData, setEarthquakeData] = useState<FeatureCollection | null>(null)

    const getBboxAndFetch = useCallback(async () => {
        if(mapRef.current){
        const boundary = mapRef.current.getBounds()
        console.log("boundary", boundary)
      
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

    const fetchLocationsByCoords = async() => {
      const data = await getLocationsByCoords(latitude, longitude);
      console.log(data)
    }

    useEffect(() => {
      if (!mapRef.current || !earthquakeData) return;

      if (mapRef.current.getSource('earthquakes')) {
        mapRef.current.removeLayer('earthquake-layer');
        mapRef.current.removeImage('mapIcon')
        mapRef.current.removeSource('earthquakes');
      }
    
      if(mapRef.current)
      mapRef.current.loadImage("/assets/tennisIcon.png", (error, image)=>{
        if(error) throw error;

        if(mapRef.current && image){
        mapRef.current.addImage('mapIcon', image);

        
        mapRef.current.addSource('earthquakes', {
          type: 'geojson',
          data: earthquakeData,
        });
    
        mapRef.current.addLayer({
          id: 'earthquake-layer',
          type: 'symbol',
          source: 'earthquakes',
          layout: {
            'icon-image': 'mapIcon', // reference the image
            'icon-size': 0.08,
            'icon-allow-overlap': true,
            // 'icon-offset': [0, -20]
          },
        });

        // mapRef.current.on('click', 'earthquake-layer', (e) => {
        //   const coordinates = e.features[0].geometry.coordinates.slice();
  
        //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        //     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        //   }
          
        //   if(mapRef.current)
        //   new mapboxgl.Popup()
        //     .setLngLat(coordinates)
        //     .addTo(mapRef.current);
        // });

        // const popup = new mapboxgl.Popup({
        //   closeButton: false,
        //   closeOnClick: false
        // });
  

        // mapRef.current.on('mouseenter', 'earthquake-layer', (e) => {
        //   if (!mapRef.current || !e.features?.length) return;
        
        //   mapRef.current.getCanvas().style.cursor = 'pointer';
        
        //   const coordinates = e.features[0].geometry.coordinates.slice();
        
        //   popup.setLngLat(coordinates)
        //     .setHTML(`<h1>Hello World!</h1>`)
        //     // .setMaxWidth("150px")
        //     .addTo(mapRef.current);
        // });

        // mapRef.current.on('mouseleave', 'earthquake-layer', () => {
        //   if(mapRef.current)
        //   mapRef.current.getCanvas().style.cursor = '';
        //   popup.remove();
        // });

    }})

      


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