/* eslint-disable */
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import pin from '../../assets/images/loction.svg';

const MapWithRoute = () => {
  const startCoordinates = [ 18.8808689,  77.2006166]; // Replace with your start coordinates
  const endCoordinates = [ 23.3423856,   73.6050587]; // Replace with your end coordinates

  const customMarkerIcon = L.icon({
    iconUrl: pin, // Replace with the URL to your custom marker icon
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <MapContainer
      className="tracking_map_container"
      center={startCoordinates}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Start marker */}
      <Marker position={startCoordinates} icon={customMarkerIcon} />

      {/* End marker */}
      <Marker position={endCoordinates} icon={customMarkerIcon} />

      {/* Route line */}
      <L.Routing.Control
        waypoints={[
          L.latLng(startCoordinates[0], startCoordinates[1]),
          L.latLng(endCoordinates[0], endCoordinates[1]),
        ]}
      />
    </MapContainer>
  );
};

export default MapWithRoute;
