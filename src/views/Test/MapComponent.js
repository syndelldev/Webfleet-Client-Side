/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ startLocation, endLocation }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Create a Leaflet map instance
    const map = L.map(mapRef.current).setView(startLocation, 13);

    // Add the tile layer (free map provider: OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors',
    }).addTo(map);

    // Add markers for start and end locations
    L.marker(startLocation).addTo(map);
    L.marker(endLocation).addTo(map);

    // Create a polyline for the route
    L.polyline([startLocation, endLocation]).addTo(map);

    // Cleanup function to remove the map when component unmounts
    return () => {
      map.remove();
    };
  }, [startLocation, endLocation]);

  return <div ref={mapRef} style={{ height: '400px' }} />;
};

export default MapComponent;
