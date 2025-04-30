import { useEffect, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";

interface Feature {
  geometry: {
    coordinates: [number, number]; // Ensure it's a tuple with [longitude, latitude]
  };
}

interface MarkerProps {
  map: Map | null; // Type from mapbox-gl
  feature: Feature; // Custom type for GeoJSON-like feature
}

const Marker: React.FC<MarkerProps> = ({ map, feature }) => {
  const { geometry } = feature;

  const markerRef = useRef<mapboxgl.Marker | null>(null); // Typed ref for Marker

  useEffect(() => {
    // Initialize the marker and add it to the map
    if(map != null)
    markerRef.current = new mapboxgl.Marker()
      .setLngLat([geometry.coordinates[0], geometry.coordinates[1]])
      .addTo(map);
      

    // Cleanup function to remove marker on unmount
    return () => {
      if (markerRef.current) {
        markerRef.current.remove();
      }
    };
  }, [map, geometry.coordinates]); // Dependency array ensures the effect runs correctly

  return null; // Marker component is invisible
};

export default Marker;
