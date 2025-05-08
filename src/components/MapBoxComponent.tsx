'use client'

import { getLocationsByCoords, mapbox } from '@/utils/DataServices'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import mapboxgl, { LngLatBounds } from 'mapbox-gl'
import { FeatureCollection, Feature, GeoJsonProperties, Geometry } from 'geojson';
import { IFeatures } from '@/utils/Interfaces';

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

const geoJson: FeatureCollection = {
  type: "FeatureCollection",
  features: []
}

const INITIAL_FEATURES: Feature<Geometry, GeoJsonProperties>[] = [{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
},
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
]

const MapBoxComponent = () => {
    const mapRef = useRef<mapboxgl.Map | null>(null)
    const mapContainerRef = useRef<HTMLDivElement | null>(null)

    const [latitude, setLatitude] = useState(INITIAL_CENTER[1])
    const [longitude, setLongitude] = useState(INITIAL_CENTER[0])
    const [activeFeature, setActiveFeature] = useState<boolean>(false)
    const [features, setFeatures] = useState<Feature[] | null>(null)


    const [courtLoactionData, setCourtLoactionData] = useState<FeatureCollection | null>(null)
    
    // -------------------------------------------------------------------- Get EQ data (example) --------------------------------------------

    // const getBboxAndFetch = useCallback(async () => {
    //     if(mapRef.current){
    //     const boundary = mapRef.current.getBounds()
    //     console.log("boundary", boundary)
      
    //     if(boundary){
    //     try {
    //         await fetchEq(boundary)
    //         // await fetchLocationsByCoords()
    //     } catch (error) {
    //         console.error(error)
    //     }
    //   }

    // }}, [])

    // const fetchEq = async(bounds: LngLatBounds) => {
    //   const res = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&endtime=2024-01-30&minlatitude=${bounds._sw.lat}&maxlatitude=${bounds._ne.lat}&minlongitude=${bounds._sw.lng}&maxlongitude=${bounds._ne.lng}`)
    //   const data = await res.json()
    //   setCourtLoactionData(data)
    // }

    //__________________________________________________________________________________________________________________________________

    useEffect(() => {
      console.log("does this work?")
      if (!mapRef.current || !courtLoactionData) return;

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

      //   console.log("Image loaded:", mapRef.current.hasImage("mapIcon"));
      //   console.log("GeoJSON structure", JSON.stringify(courtLoactionData, null, 2));
      //   if (!courtLoactionData?.features?.length) {
      //     console.error("No features found in GeoJSON data.");
      //     return;
      // }


        mapRef.current.addSource('earthquakes', {
          type: 'geojson',
          data: courtLoactionData,
        });

        // console.log("Map sources:", mapRef.current.getSource('earthquakes'));
    
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

      


    }, [courtLoactionData, features]);

    useEffect(() => {
      mapboxgl.accessToken = mapbox
      if(!mapContainerRef.current) return
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [longitude, latitude],
        minZoom: 13,
        zoom: 13
      });

      
      mapRef.current.on('load', async () => {
        // await getBboxAndFetch()
        await fetchLocationsByCoords(latitude, longitude)

    })

    mapRef.current.on('moveend', async () => {
        // await getBboxAndFetch()
        if(mapRef.current){
          const mapCenter = mapRef.current.getCenter()
          setLatitude(mapCenter.lat);
          setLongitude(mapCenter.lng)
          await fetchLocationsByCoords(mapCenter.lat, mapCenter.lng)
        }
        
    })


      return () => {
        if(mapRef.current){
          mapRef.current.remove()
        }
      }
    }, [])

    console.log("after", courtLoactionData)


    // -------------------------------------------------------------- get locations from our API ------------------------------------

    useEffect(()=>{
      if(features != null){
      const newGeoJson = geoJson
      newGeoJson.features = features
      setCourtLoactionData(newGeoJson)
    }
    }, [features])

    const fetchLocationsByCoords = async(lat: number, lng:number) => {
      const data = await getLocationsByCoords(lat.toString(), lng.toString());
      setFeatures(data)

    }



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