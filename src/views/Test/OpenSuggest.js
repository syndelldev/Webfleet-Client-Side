/* eslint-disable */        
import React, { useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';

const LocationSelector = () => {
  const [locationText, setLocationText] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleLocationChange = (event, { newValue }) => {
    setLocationText(newValue);
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

  const handleSuggestionsFetchRequested = ({ value }) => {
    // Send a request to the Nominatim API for autocomplete suggestions
    axios
      .get(`https://nominatim.openstreetmap.org/search?q=${value}&format=json`)
      .then((response) => {
        const data = response.data;
        const suggestions = data.map((result) => ({
          label: result.display_name,
          lat: result.lat,
          lon: result.lon,
        }));
        setSuggestions(suggestions);
      })
      .catch((error) => {
        console.error('Error occurred while accessing the Nominatim API:', error);
      });
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.label;

  const renderSuggestion = (suggestion) => <div>{suggestion.label}</div>;

  const inputProps = {
    placeholder: 'Enter a location',
    value: locationText,
    onChange: handleLocationChange,
  };

  return (
    <div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
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
