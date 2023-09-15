/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

function Map({ start, end, route }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView(start, 12);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Add the start and end markers
      L.marker(start).addTo(mapRef.current);
      L.marker(end).addTo(mapRef.current);

      // Create a GeoJSON layer for the route
      const routeLayer = L.geoJSON({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route,
        },
      }).addTo(mapRef.current);

      // Fit the map to the bounds of the route layer
      mapRef.current.fitBounds(routeLayer.getBounds());
    }

    return () => {
      mapRef.current.remove();
    };
  }, [start, end, route]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
}

export default Map;
