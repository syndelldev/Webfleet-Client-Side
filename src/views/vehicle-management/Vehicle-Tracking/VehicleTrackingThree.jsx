/* eslint-disable */
import {
  CCardHeader,
  CFormInput,
  CCardBody,
  CCardText,
  CCard,
  CCardFooter,
  CFormSelect,
} from '@coreui/react'
import React, { useState, useEffect } from 'react'
import './VehicleTracking.css'
import TrackingDetailsCard from './TrackingDetailsCard'
import axios from 'axios'
import { TripHistoryDataApi } from '../../api/VehicleApi'
import vehicleInformation from '../../../assets/images/vehicle-information 1.svg'
//Map Functions
import 'leaflet/dist/leaflet.css'
// import 'leaflet/dist/leaflet.js'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import L from 'leaflet'
import pinCurrentPin from '../../../assets/images/currentlocationPin.png'
import newPin from '../../../assets/images/newLocationPin.svg'
import newCurrentPin from '../../../assets/images/carTrack.svg'
import 'leaflet-routing-machine'
import { LoadAllVehicle } from '../../api/VehicleApi'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import LoaderScreen from '../../Loader/LoaderScreen'

const VehicleTracking = (props) => {
  const { VehicleData } = props
  const [VehicleDataTest, setVehicleDataTest] = useState(VehicleData)
  const [DetailsCard, setDetailsCard] = useState(false)
  const [TeltonikaData, setTeltonikaData] = useState([])
  const [TripHistoryData, setTripHistoryData] = useState([])
  const [OneLocationMapAactive, setOneLocationMapAactive] = useState(false)
  const [Loader, setLoader] = useState(true)
  const [statusData, setStatusData] = useState([])

  //Map Functions
  const [startPoint, setStartPoint] = useState(null)
  const [ViewAllAactive, setViewAllAactive] = useState(false)
  const [endPoint, setEndPoint] = useState(null)
  const [currentLocation, serCurrentLocation] = useState([51.5072, 0.1276])
  const [ApiArray, setApiArray] = useState([])
  const [ TeltonikaApiArray, setTeltonikaApiArray ] = useState([])
  let testArray = []

  const TripHistoryDataTest = [
    {
      device_ident: 5194290,
      test: 'test',
    },
    {
      device_ident: 5194290,
      test: 'test',
    },
    {
      device_ident: 8979799,
      test: 'test',
    },
  ]

  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: newPin,
    iconUrl: icon,
    shadowUrl: iconShadow,
  })

  useEffect(() => {
    const map = L.map('map').setView(currentLocation, 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

    // Add a marker for the user's current location
    const currentLocationIcon = L.icon({
      iconUrl: pinCurrentPin,
      iconSize: [30, 30],
      iconAnchor: [10, 20], // Center the icon's anchor point on the marker's position
    })

    let currentLocationMarker = null

    function onLocationFound() {

      if (currentLocationMarker) {
        map?.removeLayer(currentLocationMarker) // Remove the existing marker if it exists
      }

      currentLocationMarker = L.marker(currentLocation, { icon: currentLocationIcon }).addTo(map)

      map.setView(currentLocation, 13) // Set the view to the current location

      currentLocationMarker.on('click', () => {
        DetailsCardHandler()
        // currentLocationMarker.openPopup(); // Open the popup when marker is clicked
      })
    }

    function onLocationFoundMulti() {
      map.setView(ApiArray[0], 13)
      ApiArray.map((coordinate) => {
        currentLocationMarker = L.marker(coordinate, { icon: currentLocationIcon }).addTo(map)
      })
    }

    function onLocationError(e) {}

    // Try to get the user's current location and display it on the map
    map.locate({ setView: true, maxZoom: 15 })
    map.on('locationfound', onLocationFound)

    map.on('locationerror', onLocationError)

    if (ViewAllAactive) {
      map.on('locationfound', onLocationFoundMulti)
    }

    // Clean up when the component unmounts
    return () => {
      map.off('locationfound',  )
      map.off('locationerror', onLocationError)
      map.remove()
    }
  }, [currentLocation, ViewAllAactive])

  

  const LoadTripHistoryData = async () => {
    const result = await TripHistoryDataApi().then((res) => {
      if (res.status === 200) {
        if (res.data.length > 0) {
          const InTransitData = res.data.filter((item) => item.Trip_end_status === 0)
          setTripHistoryData(InTransitData)
          setStatusData(InTransitData)
          setStartPoint([
            parseFloat(InTransitData[0].position_start_latitude),
            parseFloat(InTransitData[0].position_start_longitude),
          ])
          setEndPoint([
            parseFloat(InTransitData[0].position_end_latitude),
            parseFloat(InTransitData[0].position_end_longitude),
          ])
        } else {
          setOneLocationMapAactive(true)
        }
      }
    })
  }

  const LoadAllVehicleData = async () => {
    const result = await LoadAllVehicle().then((res) => {
      if (res.status === 200) {
        // const filterData = res.data.filter((item)=> item.status === 'In-Transit')
        setStatusData(res.data)
        setVehicleDataTest(res.data)
        setLoader(false)
    LoadCurrentLocation()

      }
    })
  }
  const DistanceArray = []

  async function callTeltonikaApi(device) {
    console.log("test foreach")
    try {
      const url = `https://flespi.io/gw/devices/${device.device_ident}/messages?data=%7B%7D`
      const token = 'apIg827pUkRCrTYdqlyKT0DlNz7fDxkBMRIJJFWtNDV5kI6ARu8AizKVXF1q19RD'
      const headers = {
        Authorization: `FlespiToken ${token}`,
      }
      const response = await axios.get(url, { headers }).then((response) => {
        // Access the value of position.longitude
        if (response.data.result[0]) {
          let latitude = response.data.result[0]['position.latitude']
          let longitude = response.data.result[0]['position.longitude']

          setTeltonikaApiArray((prevApiArray) => [...prevApiArray, [latitude, longitude]])

          DistanceArray.push([latitude, longitude])
        }
        else{
          setTeltonikaApiArray((prevApiArray) => [...prevApiArray, [51.1072, 0.1776]])

        }
      })

      // setViewAllAactive(true)
      console.log(TeltonikaApiArray,"TeltonikaApiArray")
    } catch (error) {}
  }


  const LoadCurrentLocation = async() => {
    statusData.forEach((device) => {
      callTeltonikaApi(device)
    })
  }

  useEffect(() => {
    // LoadTripHistoryData()
    LoadAllVehicleData()
  }, [])


  const [FilterValues, setFilterValues] = useState(null)

  const handleFilter = (e) => {
    if (e.target.value == '' || e.target.value == 'Vehicle Type') {
      setStatusData(VehicleDataTest)
    } else {
      const filterResult = VehicleDataTest.filter(
        (item) =>
          item.registrationNumber.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.operator.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.make.toLowerCase().includes(e.target.value.toLowerCase())          

      )
      setStatusData(filterResult)
    }
    setFilterValues(e.target.value)
  }

  // Dropdown

  const handleStatusChange = (e) => {
    if (e.target.value === '' || e.target.value === 'Vehicle Status') {
      const filterResult = VehicleDataTest.filter((item) =>
        item.status.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      setStatusData(filterResult)
    }
    if (e.target.value === 'In-Transit') {
      const filterResult = VehicleDataTest.filter((item) =>
      item.status.toLowerCase().includes(e.target.value.toLowerCase()),
    )
    setStatusData(filterResult)
    }
    if (e.target.value === 'Idle') {
      const filterResult = VehicleDataTest.filter((item) =>
        item.status.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      setStatusData(filterResult)
    }
    if (e.target.value === 'In Maintenance') {
      const filterResult = VehicleDataTest.filter((item) => item.status === e.target.value)
      setStatusData(filterResult)
    }
    if (e.target.value === 'Out of Service') {
      const filterResult = VehicleDataTest.filter((item) =>
        item.status.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      setStatusData(filterResult)
    }
  }

  const DetailsCardHandler = () => {
    setDetailsCard((current) => !current)
  }
  const getData = (value) => {
    setDetailsCard(value)
  }

  const GetTeltonikaDeviceData = (id) => {
    if (id) {
      const token = 'apIg827pUkRCrTYdqlyKT0DlNz7fDxkBMRIJJFWtNDV5kI6ARu8AizKVXF1q19RD'
      const deviceId = id
      const url = `https://flespi.io/gw/devices/${deviceId}/messages?data=%7B%7D`

      const headers = {
        Authorization: `FlespiToken ${token}`,
      }

      axios
        .get(url, { headers })
        .then((response) => {
          // Access the value of position.longitude
          if (response.data.result[0]) {
            setTeltonikaData(response.data.result[0])
            const latitude = response.data.result[0]['position.latitude']
            const longitude = response.data.result[0]['position.longitude']

            serCurrentLocation([latitude, longitude])
          }
        })
        .catch((error) => {})
    }
    else{
      serCurrentLocation([52.3555, 1.1743])
    }
  }

  const deviceLocationSet = (data) => {
    GetTeltonikaDeviceData(data.device_ident)
    setViewAllAactive(false)
    // if (data.position_end_longitude) {
    //   // setOneLocationMapAactive(false)
    //   GetTeltonikaDeviceData(data.device_ident)
    //   setStartPoint([data.position_start_latitude, data.position_start_longitude])
    //   setEndPoint([data.position_end_latitude, data.position_end_longitude])
    // } else if (!data.position_end_longitude) {

    //   // setOneLocationMapAactive(true)
    //   setStartPoint(null)
    //   setEndPoint(null)
    //   serCurrentLocation([51.5072, 0.1276])
    //   GetTeltonikaDeviceData(data.device_ident)
    // }
    //GetTeltonikaDeviceData(data.device_ident)
  }

  // Function to call the third-party API for a single device
  async function callThirdPartyApi(device) {
    try {
      const url = `https://flespi.io/gw/devices/${device.device_ident}/messages?data=%7B%7D`
      const token = 'apIg827pUkRCrTYdqlyKT0DlNz7fDxkBMRIJJFWtNDV5kI6ARu8AizKVXF1q19RD'
      const headers = {
        Authorization: `FlespiToken ${token}`,
      }
      const response = await axios.get(url, { headers }).then((response) => {
        // Access the value of position.longitude
        if (response.data.result[0]) {
          let latitude = response.data.result[0]['position.latitude']
          let longitude = response.data.result[0]['position.longitude']

          setApiArray((prevApiArray) => [...prevApiArray, [latitude, longitude]])

          testArray.push([latitude, longitude])
        }
      })

      setViewAllAactive(true)
    } catch (error) {}
  }

  const ViewAllFunction = async () => {
    console.log(TeltonikaApiArray,"tets array")
    TripHistoryDataTest.forEach((device) => {
      callThirdPartyApi(device)
    })
  }

  return (
    <div className="">
      {Loader === true && <LoaderScreen />}
      <div
        className="searchbar_container d-flex top-bar"
        style={{
          // marginBottom: '5px',
          position: 'fixed',
          zIndex: '999',
          background: 'white',
          width: '100%',
          paddingBottom:'10px'
        }}
      >
        <div className="serch_tracking" style={{ marginTop: '-12px' }}>
          <CFormInput
            className="searchbar_tracking"
            placeholder="Search..."
            aria-label="Username"
            onChange={handleFilter}
            aria-describedby="addon-wrapping"
          />
        </div>
        {/* <div className="dropdown_tracking">
          <div style={{ marginTop: '12px' }}>
            <CFormSelect
              onChange={handleStatusChange}
              className="drop_clicks_drop "
              style={{ marginBottom: '9px' }}
            >
              <option className="vehicle_type">In-Transit</option>
              <option className="vehicletype_option">Idle</option>
              <option className="vehicletype_option">In Maintenance</option>
              <option className="vehicletype_option"> Out of Service</option>
            </CFormSelect>
          </div>
        </div> */}
        <button
          className="view_all_btn_tracking"
          onClick={() => {
            ViewAllFunction()
          }}
        >
          View All
        </button>
      </div>

      <div className="div_tracking">
        <div className="divOne_tracking">
          {statusData.length > 0 ? (
            <div className="card_scroll">
              {statusData.map((item, index) => (

                <div className="driver-card"     
                onClick={() => {
                  deviceLocationSet(item)
                }}>
                  <div className="driver-card-titles-left">
                    <div className="drver-card-name-div">
                      <div
                        className="shipnum_tracking "
                        style={{ fontSize: '14px', marginTop: '1px' }}
                      >
                      {item.registrationNumber}
                      </div>
                    </div>
                  </div>
                  <div className="driver-card-titles">
                    <div>
                      <span className="shipnum_tracking ">{item.make}</span>
                    </div>
                  </div>
                  <div className="driver-card-titles">
                    <div>
                      <span className="ship_tracking">Driver Name</span> <br />
                      <span className="shipnum_tracking ">{item.operator}</span>
                    </div>
                    <div className="driver-contact-section">
                      <img src={vehicleInformation} alt="" width="25px" 
                        onClick={() => {
                          DetailsCardHandler()
                        }}/>
                      <i className="fa-solid fa-phone retweet_icon_tracking_svg">
                        {item.phone ? (
                          <span class="tooltiptext">{item.phone}</span>
                        ) : (
                          <span class="tooltiptext">None</span>
                        )}
                      </i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="empty_data_message">
                <p>No Vehicle Available</p>
              </div>
            </>
          )}
        </div>
        <div className="divTwo_tracking">
          <div id="map" style={{ width: '100%', height: '100%', zIndex: '99' }}></div>

          {DetailsCard === true ? (
            <TrackingDetailsCard onclick={getData} data={TeltonikaData} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default VehicleTracking


  {/* <CCard
                  textColor="black"
                  border="2px solid black"
                  className="mb-3 cardOne_tracking "
                  style={{
                    maxWidth: '18rem',
                    margin: 'auto',
                    border: `5px solid red `,
                    border: `3px solid #a8a8a8 `,
                  }}
                  key={index}
                  onClick={() => {
                    deviceLocationSet(item)
                  }}
                >
                  <CCardHeader className="header_tracking">
                    <CCardText>
                      <span className="ship_tracking">GPS Tracking</span> <br />
                      <span className="shipnum_tracking ">
                        {item.registrationNumber}
                        <span>
                          <div
                            style={{
                              width: '95px',
                              height: '47px',
                            }}
                          ></div>
                        </span>
                      </span>
                    </CCardText>
                  </CCardHeader>

                  <CCardBody className="card_tracking">
                    <CCardText style={{ marginBottom: '15px' }}>
                      <span className="reach_location_icon"></span>{' '}
                      <div>
                        {item.start_position_name ? (
                          <span className="reach_location">{item.start_position_name} </span>
                        ) : (
                          <span className="reach_location">No Data Available </span>
                        )}
                      </div>
                      <span className="line_location"></span>
                      <span className="end_location_icon">
                        <i className="fas fa-map-marker-alt font_size_location_icon" width={15}></i>
                      </span>
                      {item.end_position_name ? (
                        <span className="start_location" style={{ paddingRight: '10px' }}>
                          {item.end_position_name}
                        </span>
                      ) : (
                        <span className="start_location">No Data Available </span>
                      )}
                    </CCardText>
                  </CCardBody>

                  <CCardFooter
                    className="footer_tracking "
                    style={{ borderRadius: '8px !important' }}
                  >
                    <CCardText>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <span
                          className="retweet_icon_tracking"
                          onClick={() => {
                            DetailsCardHandler()
                          }}
                        >
                          <img src={vehicleInformation} alt="" />
                        </span>

                        <span className="call_icon_tracking">
                          <i className="fa-solid fa-phone retweet_icon_tracking_svg">
                            {item.phone ? (
                              <span class="tooltiptext">{item.phone}</span>
                            ) : (
                              <span class="tooltiptext">None</span>
                            )}
                          </i>
                        </span>
                      </div>
                      <span className="ship_tracking">Driver Name</span> <br />
                      <span className="client_tracking">{item.operator}</span> <br />
                    </CCardText>
                  </CCardFooter>
                </CCard> */
              }