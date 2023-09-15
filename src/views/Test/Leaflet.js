/* eslint-disable */
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import axios from 'axios'

const Map = () => {
  const [position, setPosition] = useState([51.505, -0.09]);

  function ChangePositionOnClick() {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
    return null;
  }


  const change = () => {
    setPosition([23.0368, 72.5613]);
  };

  return (
    <div>
      <h1>Location Map</h1>
      <MapContainer key={position.join('_')} center={position} zoom={13} style={{ height: '500px', width: '500px' }}>
        <ChangePositionOnClick /> {/* Render the custom event handler */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
      </MapContainer>

      <button onClick={change}>Change</button>
    </div>
  );
};

export default Map;
