/* eslint-disable */
import React, { useState } from 'react';
import axios from 'axios';

const LocationSelector = () => {
  const [locationText, setLocationText] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLocationChange = (event) => {
    setLocationText(event.target.value);
  };

  const handleLocationSelect = () => {
    // Send a request to the Nominatim API
    axios
      .get(`https://nominatim.openstreetmap.org/search?q=${locationText}&format=json`)
      .then((response) => {
        const data = response.data;
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setLatitude(lat);
          setLongitude(lon);
        } else {
          console.error('No results found for the specified location.');
        }
      })
      .catch((error) => {
        console.error('Error occurred while accessing the Nominatim API:', error);
      });
  };

  return (
    <div>
      <input type="text" value={locationText} onChange={handleLocationChange} />
      <button onClick={handleLocationSelect}>Select Location</button>
      {latitude && longitude && (
        <p>
          Selected Location: {locationText} <br />
          Latitude: {latitude} <br />
          Longitude: {longitude}
        </p>
      )}
    </div>
  );
};

export default LocationSelector;
