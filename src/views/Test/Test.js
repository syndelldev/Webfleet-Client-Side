/* eslint-disable */
import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import pin from '../../assets/images/loction.svg';

function MapExample() {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState([23.0368, 72.5613]);
  const [startPoint, setStartPoint] = useState([23.0365, 72.5611]);
  const [endPoint, setEndPoint] = useState([23.0465, 72.5711]);
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    // Create the map instance
    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osmAttrib = '&copy; OpenStreetMap contributors';

    const map = L.map('map').setView([23.0465, 72.5711], 20);
    L.tileLayer(osmUrl, { attribution: osmAttrib }).addTo(map);

    // Set the map and enable location
    setMap(map);
    map.locate({ setView: true, maxZoom: 16 });

    // Add the routing control
    const routingControl = L.Routing.control({
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
      }),
      plan: L.Routing.plan([startPoint, endPoint], {
        createMarker: function (i, wp) {
          const icon = i === 0 ? createIcon(pin) : createIcon(pin, '#FF0000');
          return L.marker(wp.latLng, { icon }).bindPopup(i === 0 ? 'Start point' : 'End point');
        },
      }),
      fitSelectedRoutes: false,
    }).addTo(map);
    setRoutingControl(routingControl);

    //Add Current Location
    function onLocationFound(e) {
        const { lat, lng } = e.latlng;
        const newLocation = [23.0368, 72.5613]; // Set the desired coordinates here
        setCurrentLocation((currentLocation) => {
          currentLocation.setLatLng(newLocation);
          return currentLocation;
        });
        if (!startPoint) {
          setStartPoint(newLocation);
        }
      }
      map.on('locationfound', onLocationFound);
      

    // Add the current location marker
    const currentLocationMarker = L.marker([0, 0], {
      icon: L.icon({
        iconUrl: pin,
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    }).addTo(map);
    setCurrentLocation(currentLocationMarker);

    return () => {
      map.remove();
    };
  }, [startPoint, endPoint]);

  useEffect(() => {
    if (routingControl && startPoint && endPoint) {
      routingControl.setWaypoints([startPoint, endPoint]);
    }
  }, [startPoint, endPoint, routingControl]);

  function createIcon(url, color = '#008000') {
    return L.icon({
      iconUrl: url,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
      shadowAnchor: [12, 41],
      iconUrl: url,
      iconColor: color,
    });
  }

  return <div id="map" style={{ height: '500px' }} />;
}

export default MapExample;
