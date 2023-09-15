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
    // Replace "YOUR_API_KEY" with your actual API key
    const apiKey = 'AIzaSyAdVl7QlYQ5DzXwgqNWjPAWJ6LOeCYCIn8 -gmap api key';

    // Send a request to the Geocoding API
    axios
      .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationText}&key=${apiKey}`)
      .then((response) => {
        const { data } = response;
        if (data.status === 'OK') {
          const result = data.results[0];
          const { lat, lng } = result.geometry.location;
          setLatitude(lat);
          setLongitude(lng);
        } else {
          console.error('Geocoding API request failed.');
        }
      })
      .catch((error) => {
        console.error('Error occurred while accessing the Geocoding API:', error);
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
