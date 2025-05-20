'use client'

import { get5miLocationsByCoords, mapbox } from '@/utils/DataServices'
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl, { GeoJSONFeature } from 'mapbox-gl'
import { FeatureCollection, Feature } from 'geojson';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useLocationCoordinatesContext } from '@/context/UserInfoContext';

const geoJson: FeatureCollection = {
  type: "FeatureCollection",
  features: []
}

const INITIAL_CENTER = [
  -121.275604,
  37.961632
]

const MapboxSPComponent = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null)
    const {locationCoordinates, searchCoordinates} = useLocationCoordinatesContext();

    const [latitude, setLatitude] = useState(locationCoordinates?.latitude)
    const [longitude, setLongitude] = useState(locationCoordinates?.longitude)
    const [features, setFeatures] = useState<Feature[] | null>(null)
    const [mapboxZoom, setMapboxZoom] = useState<number>(11.5)


    const [courtLocationData, setCourtLocationData] = useState<FeatureCollection | null>(null)
    
    useEffect(()=>{
      if(searchCoordinates && searchCoordinates !== locationCoordinates){
        setLatitude(searchCoordinates.latitude);
        setLongitude(searchCoordinates.longitude)
      }
    }, [searchCoordinates])


    useEffect(() => {
      // console.log("does this work?")
      if (!mapRef.current || !courtLocationData?.features?.length) return;

      if (mapRef.current.getSource('courtLocations')) {
        mapRef.current.removeLayer('places');
        mapRef.current.removeImage('mapIcon')
        mapRef.current.removeSource('courtLocations');
        
      }
    
      if(mapRef.current)
      mapRef.current.loadImage("/assets/tennisIcon.png", (error, image)=>{
        if(error) throw error;

        if(mapRef.current && image){
        mapRef.current.addImage('mapIcon', image);

        mapRef.current.addSource('courtLocations', {
          type: 'geojson',
          data: courtLocationData,
        });
    
        mapRef.current.addLayer({
          id: 'places',
          type: 'symbol',
          source: 'courtLocations',
          layout: {
            'icon-image': 'mapIcon',
            'icon-size': 0.08,
            'icon-allow-overlap': true,
            // 'icon-offset': [0, -20]
          },
        });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });
  
        mapRef.current.on('mouseenter', 'places', (e) => {
          if(mapRef.current){
          mapRef.current.getCanvas().style.cursor = 'pointer';

          if (!e.features || e.features.length === 0) {
            console.error("No features found in event:", e);
            return;
          }
        
          const eFeature: GeoJSONFeature | null = e.features[0];
          
          if (eFeature.geometry && eFeature.geometry.type === "Point") {
          const eCoordinates = eFeature.geometry.coordinates as [number, number];
          const eDescription: string = eFeature.properties?.courtName;
  
          if(eCoordinates){
          while (Math.abs(e.lngLat.lng - eCoordinates[0]) > 180) {
            eCoordinates[0] += e.lngLat.lng > eCoordinates[0] ? 360 : -360;
          }}
  
          popup.setLngLat(eCoordinates).setHTML(`<strong>${eDescription}</strong>`).addTo(mapRef.current);
        }
      }
        });
  
        mapRef.current.on('mouseleave', 'places', () => {
          if(mapRef.current)
          mapRef.current.getCanvas().style.cursor = '';
          popup.remove();
        });

    }})

    }, [courtLocationData, features]);

    useEffect(() => {
      console.log("lat", latitude, "lng", longitude)
      mapboxgl.accessToken = mapbox
      if(!mapContainerRef.current) return
      if(latitude && longitude){
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [longitude, latitude],
        zoom: mapboxZoom
      });

      mapRef.current.on('load', async () => {
        await fetchLocationsByCoords(latitude, longitude)
      })

      }else{
        mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [INITIAL_CENTER[0], INITIAL_CENTER[1]],
        zoom: mapboxZoom
      });

      mapRef.current.on('load', async () => {
        await fetchLocationsByCoords(INITIAL_CENTER[0], INITIAL_CENTER[1])
      })
      }


    mapRef.current.on('moveend', async () => {
        if(mapRef.current){
          const mapCenter = mapRef.current.getCenter()
          const mapZoom = mapRef.current.getZoom()
          setLatitude(mapCenter.lat);
          setLongitude(mapCenter.lng)
          setMapboxZoom(mapZoom)
          await fetchLocationsByCoords(mapCenter.lat, mapCenter.lng)
        }
        
    })


      return () => {
        if(mapRef.current){
          mapRef.current.remove()
        }
      }
    }, [latitude, longitude])

    console.log("after", courtLocationData)


    // -------------------------------------------------------------- get locations from our API ------------------------------------

    useEffect(()=>{
      if(features != null){
      const newGeoJson = geoJson
      newGeoJson.features = features
      setCourtLocationData(newGeoJson)
    }
    }, [features])

    const fetchLocationsByCoords = async(lat: number, lng:number) => {
      const data = await get5miLocationsByCoords(lat.toString(), lng.toString());
      setFeatures(data)

    }


  return (
    <div className=''>
        <div id='map-container' className='relative h-400 w-400 max-h-[100%] max-w-[100%] z-0' ref={mapContainerRef}>
          <div className='absolute top-[50%] left-[50%] bg-red-600 rounded-2xl w-2 h-2 z-1' />
        </div>
    </div>
  )
}

export default MapboxSPComponent