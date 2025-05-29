"use client";

import { getLocationInfoById, mapbox } from "@/utils/DataServices";
import React, { useRef, useEffect, useState } from "react";
import mapboxgl, { GeoJSONFeature } from "mapbox-gl";
import { FeatureCollection, Feature } from "geojson";

import "mapbox-gl/dist/mapbox-gl.css";

const geoJson: FeatureCollection = {
  type: "FeatureCollection",
  features: [],
};

interface Props {
  locationId: number;
  lat: number;
  lng: number;
}

const MapboxCPComponent = (props: Props) => {
  const { locationId, lat, lng } = props;

  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [features, setFeatures] = useState<Feature[] | null>(null);
  const [courtLocationData, setCourtLocationData] =
    useState<FeatureCollection | null>(null);

  useEffect(() => {
    console.log("is this working?", courtLocationData);
    if (
      !mapRef.current ||
      mapRef.current.getSource("courtLocations") ||
      !courtLocationData
    )
      return;

    console.log("Adding source and layer", courtLocationData);

    if (mapRef.current && courtLocationData != null) {
      console.log("is this work");
      mapRef.current.loadImage("/assets/tennisIcon.png", (error, image) => {
        if (error) {
          console.error("Error loading image:", error);
          return;
        }

        if (!image) {
          console.error("Image is undefined");
          return;
        }

        if (mapRef.current && courtLocationData && image) {
          mapRef.current.addImage("mapIcon", image);

          mapRef.current.addSource("courtLocations", {
            type: "geojson",
            data: courtLocationData,
          });

          mapRef.current.addLayer({
            id: "places",
            type: "symbol",
            source: "courtLocations",
            layout: {
              "icon-image": "mapIcon",
              "icon-size": 0.12,
              "icon-allow-overlap": false,
            },
          });

          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          });

          mapRef.current.on("mouseenter", "places", (e) => {
            if (mapRef.current) {
              mapRef.current.getCanvas().style.cursor = "pointer";

              if (!e.features || e.features.length === 0) {
                console.error("No features found in event:", e);
                return;
              }

              const eFeature: GeoJSONFeature | null = e.features[0];

              if (eFeature.geometry && eFeature.geometry.type === "Point") {
                const eCoordinates = eFeature.geometry.coordinates as [
                  number,
                  number
                ];
                const eDescription: string = eFeature.properties?.courtName;

                if (eCoordinates) {
                  while (Math.abs(e.lngLat.lng - eCoordinates[0]) > 180) {
                    eCoordinates[0] +=
                      e.lngLat.lng > eCoordinates[0] ? 360 : -360;
                  }
                }

                popup
                  .setLngLat(eCoordinates)
                  .setHTML(`<strong>${eDescription}</strong>`)
                  .addTo(mapRef.current);
              }
            }
          });

          mapRef.current.on("mouseleave", "places", () => {
            if (mapRef.current) mapRef.current.getCanvas().style.cursor = "";
            popup.remove();
          });
        }
      });
    }
  }, [courtLocationData]);

  useEffect(() => {
    mapboxgl.accessToken = mapbox;
    if (!mapContainerRef.current) return;
    if (lat && lng) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: [lng, lat],
        minZoom: 12,
        zoom: 16,
      });

      mapRef.current.on("load", async () => {
        await fetchLocationsById(locationId);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [props, lat, lng]);

  // -------------------------------------------------------------- get locations from our API ------------------------------------

  useEffect(() => {
    if (features != null) {
      const newGeoJson = geoJson;
      newGeoJson.features = features;
      setCourtLocationData(newGeoJson);
    }
  }, [features]);

  const fetchLocationsById = async (id: number) => {
    const data = await getLocationInfoById(id);
    console.log(data);
    setFeatures(Array.isArray(data) ? data : [data]);
  };

  return (
    <div className="">
      <div
        id="map-container"
        className="relative h-100 w-100 max-h-[100%] max-w-[100%] z-0"
        ref={mapContainerRef}
      ></div>
    </div>
  );
};

export default MapboxCPComponent;
