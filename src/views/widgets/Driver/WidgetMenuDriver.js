/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { CModal, CModalTitle, CModalBody, CModalFooter } from '@coreui/react'
// import './WidgetMenuDriver.css'
import './WidgetMenuDriver.css'
import roundDot from '../../../assets/images/roundDot.svg'
import LocationPin from '../../../assets/images/locationSvg.svg'
import { LoadTripHistoryData } from 'src/views/api/VehicleApi'
import { EndTripApi, getDriverData } from 'src/views/api/VehicleApi'
//Map Functions
import 'leaflet/dist/leaflet.css'
// import 'leaflet/dist/leaflet.js'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import L from 'leaflet'
import newPin from '../../../assets/images/newLocationPin.svg'
import newCurrentPin from '../../../assets/images/newCurrentLocaion.png'
import 'leaflet-routing-machine'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import MainLoaderScreen from 'src/views/Loader/MainLoaderScreen'


const WidgetMenu = (props) => {
  const { VehicleData, mainUserName } = props
  const [loading, setLoading] = useState(false)
  const [TripHistoryApiData, setTripHistoryApiData] = useState([])
  const [CurrentTripDiv, setCurrentTripDiv] = useState(false)
  const [driverData, setdriverData] = useState(null)
  const [visible, setVisible] = useState(false)
  //Map Function
  const [startPoint, setStartPoint] = useState(null)
  const [endPoint, setEndPoint] = useState(null)
  const [currentLocation, serCurrentLocation] = useState([51.5072, 0.1276])

  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: newPin,
    iconUrl: icon,
    shadowUrl: iconShadow,
  })

  useEffect(() => {
    // Create a map centered on a specific location (e.g., New York City)

    const map = L.map('map').setView(currentLocation, 13)

    // Add the tile layer (you can choose other tile layers if needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

    // Add start and end markers (you can get these coordinates from the user or use a Geocoding service)
    if (endPoint) {
      const startMarker = L.marker(startPoint).addTo(map)
      const endMarker = L.marker(endPoint).addTo(map)

      // Create a routing control with the start and end markers
      L.Routing.control({
        waypoints: [startMarker.getLatLng(), endMarker.getLatLng()],
        routeWhileDragging: true,
      }).addTo(map)
    }

    // Add a marker for the user's current location
    const currentLocationIcon = L.icon({
      iconUrl: newCurrentPin,
      iconSize: [20, 20],
      iconAnchor: [10, 20], // Center the icon's anchor point on the marker's position
    })
    let currentLocationMarker = null

    const currentLocationMarkerTest = L.marker([51.8072, 0.1276], {
      icon: currentLocationIcon,
    }).addTo(map)

    function onLocationFound(e) {
      const { lat, lng } = e.latlng

      if (currentLocationMarker) {
        map?.removeLayer(currentLocationMarker) // Remove the existing marker if it exists
      }

      currentLocationMarker = L.marker(currentLocation, { icon: currentLocationIcon }).addTo(map)

      map.setView(currentLocation, 13) // Set the view to the current location
    }

    const currentLocationMarkerTestTwo = L.marker([51.4072, 0.1276], {
      icon: currentLocationIcon,
    }).addTo(map)
    // Function to handle errors in retrieving user's location
    function onLocationError(e) {

    }

    // Try to get the user's current location and display it on the map
    map.locate({ setView: currentLocation, maxZoom: 15 })
    map.on('locationfound', onLocationFound)
    map.on('locationerror', onLocationError)

    // Clean up when the component unmounts
    return () => {
      map.off('locationfound', onLocationFound)
      map.off('locationerror', onLocationError)
      map.remove()
    }
  }, [endPoint, currentLocation])

  const EndTripButton = async () => {
    setLoading(true)


    const result = await EndTripApi(
      TripHistoryApiData[0].id,
      TripHistoryApiData[0].registrationNumber,
    ).then((res) => {
      if (res.status === 200) {
        setVisible(false)
        setLoading(false)
        window.location.reload()
      }
    })
  }

  const LoadDriverDetails = async () => {
    const result = await getDriverData(mainUserName).then((res) => {
      if (res.status === 200) {
        setdriverData(res.data[0])


      }
    })
  }
  useEffect(() => {

    if (mainUserName) {
      LoadDriverDetails()
    }
  }, [mainUserName])

  const LoadMyTripHistory = async () => {
    const result = await LoadTripHistoryData(mainUserName).then((res) => {
      if (res.status === 200) {
        setLoading(false)
        const CurrentTrip = res.data.filter((item) => item.Trip_end_status === 0)
        if (CurrentTrip.length > 0) {

          setTripHistoryApiData(CurrentTrip)
          setStartPoint([
            CurrentTrip[0].position_start_latitude,
            CurrentTrip[0].position_start_longitude,
          ])
          setEndPoint([CurrentTrip[0].position_end_latitude, CurrentTrip[0].position_end_longitude])
          setCurrentTripDiv(true)
        } else {
          setCurrentTripDiv(false)
        }
      }
    })
  }

  useEffect(() => {
    setLoading(true)
    LoadMyTripHistory()
  }, [])

  return (
    <div className="driver_dashboard_header_div">
      <div className="driver_dashboard_profile_div">
        {driverData ? (
          <div className="driver_dashboard_profile_card_div">
            <div className="driver_profile_card_div_data">
              <span className="driver_profile_card_img_data">
                <img
                  src={`data:image/jpeg;base64,${driverData.profileImage}`}
                  className="driver_profile_card_div_data_img"
                />
              </span>
              <div className="driver_profile_card_details_data">
                <p className="driver_profile_card_div_data_name">{driverData.driver_name}</p>
                {driverData.assigned_vehicle_number === 'None' ? (
                  <p className="driver_profile_card_div_data_vehicle">No Vehicle Assigned</p>
                ) : (
                  <p className="driver_profile_card_div_data_vehicle">
                    {driverData.assigned_vehicle_number}
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <MainLoaderScreen />
          </>
        )}

        <div className="dashboard_current_trip_details">
          <span className="dashboard_current_trip">Current Trip</span>
          {TripHistoryApiData.length > 0 ? (
            <>
              <div className="dashborad_location_box">
                <img src={roundDot} className="driver_reach_location_icon_img" />
                <span className="driver_reach_location_span">
                  {TripHistoryApiData[0].end_position_name}{' '}
                </span>

                <img src={LocationPin} className="driver_start_location_icon_img" />

                <span className="driver_start_location_span">
                  {TripHistoryApiData[0].start_position_name}
                </span>
              </div>
              <div className="dashborad_location_end_box" onClick={() => setVisible(!visible)}>
                <p className="dashborad_location_end_box_p">End Trip</p>
              </div>
            </>
          ) : (
            <>
              <div className="dashborad_location_box">
                <span className="dashborad_location_box_noTrip">No Trip Data Awailable !</span>
              </div>
              <div className="dashborad_location_end_box dashborad_location_end_box_noTrip">
                <p className="dashborad_location_end_box_p">End Trip</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="driver_dashboard_map_div">
        <div id="map" style={{ width: '100%', height: '100%', borderRadius: '15px' }} />
      </div>

      <>
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalBody>
            <CModalTitle className="model_title text-center ps-0 ">
              Are you sure you want to end this Trip?
            </CModalTitle>
          </CModalBody>
          <CModalFooter className="p-0" style={{ height: 50 }}>
            <div
              className="popUpCancelBtn mt-0 mb-0"
              style={{ height: 50, display: 'flex', alignItems: 'center' }}
              onClick={() => setVisible(false)}
            >
              Cancel
            </div>
            <div className="popUpBtn mt-0 mb-0" onClick={() => EndTripButton()}>
              Ok
            </div>
          </CModalFooter>
        </CModal>
      </>
    </div>
  )
}

export default WidgetMenu
