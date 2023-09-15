/* eslint-disable */
import React, { useEffect, useState } from 'react'
import LoaderScreen from '../Loader/LoaderScreen'

const Support = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  return (
    <>
      {loading ? (
        <LoaderScreen />
      ) : (
        <div className="supportDiv">
          <header className="headers">Adding vehicles and drivers</header>
          <div className="support-text">How do I attach a driver to a vehicle?</div>
          <p className="support-text-01">
            When adding or amending a driver record, you will be asked to nominate a primary
            vehicle. This can be done with the "Add Vehicle" button on the right-hand side of the
            screen.
          </p>

          <div className="support-text">How do I attach a driver to a vehicle?</div>
          <p className="support-text-01">
            When adding or amending a driver record, you will be asked to nominate a primary
            vehicle. This can be done using the "Add Vehicle" button on the right-hand side of the
            screen.
          </p>
          <div className="support-text">How do I attach a driver to a vehicle?</div>
          <p className="support-text-01">
            When adding or amending a driver record, you will be asked to nominate a primary
            vehicle. This can be done using the "Add Vehicle" button on the right-hand side of the
            screen.
          </p>
          <header className="headers">Managing my system account</header>
          <div className="support-text">How do I reset my password?</div>
          <p className="support-text-01">
            From the Dashboard, you need to navigate to the My Account list view, where you will be
            able to update your login credentials. You can proceed there now.
          </p>
          <div className="support-text">How do I edit my details?</div>
          <p className="support-text-01">
            Once you're in the My Account list view, you can easily update and amend your details by
            selecting the "Update" button. You can proceed there now.
          </p>
        </div>
      )}
    </>
  )
}

export default Support

// import React, { useRef, useState, useEffect } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import iconMap from '../../assets/images/drop.png'
// import iconEndPoint from '../../assets/images/place_marker.svg'
// import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
// import "leaflet-routing-machine/dist/leaflet-routing-machine.js";

// const Map = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-0.127758);
//   const [lat, setLat] = useState(51.507351);
//   const [zoom, setZoom] = useState(9);
//   const [currentLat, setCurrentLat] = useState(23.0500);
//   const [currentLng, setCurrentLng] = useState(72.600);

//   useEffect(() => {
//     if (map.current) return; // initialize map only once

//     map.current = L.map(mapContainer.current, {
//       center: [lat, lng],
//       zoom: zoom,
//     });

//     // add tile layer for OpenStreetMap
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "&copy; OpenStreetMap contributors",
//       maxZoom: 19,
//     }).addTo(map.current);

//     // add a marker for the current location
//     const currentLocationMarker = L.marker([currentLat, currentLng], {
//       icon: L.icon({
//        iconUrl: iconEndPoint,
//         iconSize: [32, 32],
//         iconAnchor: [16, 32],
//       }),
//     }).addTo(map.current);

//     // add a route control to the map
//     L.Routing.control({
//       waypoints: [
//         L.latLng(23.0500, 72.6700),
//         L.latLng(23.0500, 72.4794),
//       ],
//       routeWhileDragging: true,
//       createMarker: function(i, waypoint, n) {
//         return null; // return null to disable the default PNG marker
//       },
//     }).addTo(map.current);

//     // update current position on marker move
//     currentLocationMarker.on("dragend", (e) => {
//       const { lat, lng } = e.target.getLatLng();
//       setCurrentLat(lat);
//       setCurrentLng(lng);
//     });

//   }, [currentLat, currentLng]);

//   return <div ref={mapContainer} style={{ height: "100vh" }} />;
// };

// export default Map;
