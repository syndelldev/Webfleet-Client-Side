/* eslint-disable */
import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import pinCurrentPin from '../../assets/images/currentlocationPin.png'
import 'leaflet-routing-machine';
import { TripHistoryDataApi } from '../api/VehicleApi';
const LeafletMap = () => {

    const [startPoint, setStartPoint] = useState([40.7128, -74.0060]);
    const [endPoint, setEndPoint] = useState([41.8781, -87.6298]);
    
        const Changes = () => {
            setStartPoint([
                18.8808689,
                77.2006166
                    ])
                    setEndPoint([
                      23.3423856,
                      73.6050587,
                    ])
        }

        const LoadTripHistoryData = async () => {
            const result = await TripHistoryDataApi().then((res) => {
              if (res.status === 200) {
                if (res.data.length > 0) {
                  const InTransitData = res.data.filter((item) => item.Trip_end_status === 0)
                //  setTripHistoryData(InTransitData)
                  setStartPoint([
                    parseFloat(InTransitData[0].position_start_latitude),
                    parseFloat(InTransitData[0].position_start_longitude),
                  ])
                  setEndPoint([
                    parseFloat(InTransitData[0].position_end_latitude),
                    parseFloat(InTransitData[0].position_end_longitude),
                  ])
                }
              }
            })
          }
        
          useEffect(() => {
            LoadTripHistoryData()
          }, [])

  useEffect(() => {
    // Create a map centered on a specific location (e.g., New York City)
    const map = L.map('map').setView([40.7128, -74.0060], 13);

    // Add the tile layer (you can choose other tile layers if needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Add start and end markers (you can get these coordinates from the user or use a Geocoding service)
    const startMarker = L.marker(startPoint, { icon: L.icon({ iconUrl: pinCurrentPin }) }).addTo(map);
    const endMarker = L.marker(endPoint, { icon: L.icon({ iconUrl: pinCurrentPin }) }).addTo(map);

    // Create a routing control with the start and end markers
    L.Routing.control({
      waypoints: [startMarker.getLatLng(), endMarker.getLatLng()],
      routeWhileDragging: true,
    }).addTo(map);

    // Add a marker for the user's current location
    const currentLocationIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    // Function to handle successful retrieval of user's location
    function onLocationFound(e) {
      const { lat, lng } = e.latlng;
      L.marker([lat, lng], { icon: currentLocationIcon }).addTo(map);
    }

    // Function to handle errors in retrieving user's location
    function onLocationError(e) {
      console.error(e.message);
    }

    // Try to get the user's current location and display it on the map
    map.locate({ setView: true, maxZoom: 15 });
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    // Clean up when the component unmounts
    return () => {
      map.off('locationfound', onLocationFound);
      map.off('locationerror', onLocationError);
      map.remove();
    };
  }, [endPoint]);

  return <>
     <button onClick={()=>{Changes()}}>change location</button>
     <div id="map" style={{ width: '100%', height: '400px' }}></div>;
     </>
};

export default LeafletMap;

// import React, { useEffect, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
// import L from 'leaflet';
// import 'leaflet-routing-machine';

// const LeafletMap = () => {
//     const [startPoint, setStartPoint] = useState([40.7128, -74.0060]);
//     const [endPoint, setEndPoint] = useState([41.8781, -87.6298]);

//     const Changes = () => {
//         setStartPoint([
//             18.8808689,
//             77.2006166
//                 ])
//                 setEndPoint([
//                   23.3423856,
//                   73.6050587,
//                 ])
//     }
//   useEffect(() => {
//     // Create a map centered on a specific location (e.g., New York City)
//     const map = L.map('map').setView([40.7128, -74.0060], 13);

//     // Add the tile layer (you can choose other tile layers if needed)
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

//     // Add start and end markers (you can get these coordinates from the user or use a Geocoding service)
//     const startMarker = L.marker(startPoint).addTo(map);
//     const endMarker = L.marker(endPoint).addTo(map);

//     // Create a routing control with the start and end markers
//     L.Routing.control({
//       waypoints: [startMarker.getLatLng(), endMarker.getLatLng()],
//       routeWhileDragging: true,
//     }).addTo(map);

//     // Clean up when the component unmounts
//     return () => map.remove();
//   }, [endPoint]);

//   return <>
//   <button onClick={()=>{Changes()}}>change location</button>
//   <div id="map" style={{ width: '100%', height: '400px' }}></div>;
//   </>
// };

// export default LeafletMap;
