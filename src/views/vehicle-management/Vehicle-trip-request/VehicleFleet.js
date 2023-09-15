/* eslint-disable */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './VehicleFleet.css'
import { CFormSelect } from '@coreui/react'
import { SubmitNewTripRequest } from '../../api/VehicleApi'
import MainLoaderScreen from '../../Loader/MainLoaderScreen'
import { useNavigate } from 'react-router-dom'



const VehicleFleet = (props) => {
  const { VehicleData } = props
  const navigate = useNavigate()
  const [ActiveVehicle, setActiveVehicle] = useState([])
  const [locationText, setLocationText] = useState('')
  const [VehicleDropdown, setVehicleDropdown] = useState('')
  const [startLatitude, setStartLatitude] = useState(null)
  const [startLongitude, setStartLongitude] = useState(null)
  const [endLatitude, setEndLatitude] = useState(null)
  const [endLongitude, setEndLongitude] = useState(null)
  const [StartTex, setStartTex] = useState("")
  const [endTex, setEndTex] = useState("")
  const [selectedVehicleData, setSelectedVehicleData] = useState(null)
  const [SelectedDriverName, setSelectedDriverName] = useState('')
  const [ActiveVehicleDataDiv, setActiveVehicleDataDiv] = useState(false)
  const [StartNoLocation, setStartNoLocation] = useState(false)
  const [StartLocationFound, setStartLocationFound] = useState(false)
  const [LoaderDiv, setLoaderDiv] = useState(false)
  const [EndLocationFound, setEndLocationFound] = useState(false)
  const [EndNoLocation, setEndNoLocation] = useState(false)
  useEffect(() => {
    const activeVehicle = VehicleData.filter((item) => item.status === 'Idle' && item.operator !== 'None')
    setActiveVehicle(activeVehicle)
  }, [VehicleData])
  const handleLocationChange = (event) => {
    setLocationText(event.target.value)
  }

  const handleStartLocationSelect = () => {
    setLoaderDiv(true)
    // Send a request to the Nominatim API
    axios
      .get(`https://nominatim.openstreetmap.org/search?q=${StartTex}&format=json`)
      .then((response) => {
        const data = response.data
        if (data.length > 0) {
          const { lat, lon } = data[0]
          setLoaderDiv(false)
          setStartLocationFound(true)
          setStartLatitude(lat)
          setStartLongitude(lon)

        } else {
          setStartNoLocation(true)
          setLoaderDiv(false)

        }
      })
      .catch((error) => {

      })
  }

  const handleEndLocationSelect = () => {
    setLoaderDiv(true)

    // Send a request to the Nominatim API
    axios
      .get(`https://nominatim.openstreetmap.org/search?q=${endTex}&format=json`)
      .then((response) => {
        const data = response.data
        if (data.length > 0) {
          const { lat, lon } = data[0]
          setLoaderDiv(false)
          setEndLatitude(lat)
          setEndLongitude(lon)
          setEndLocationFound(true)
        } else {
          setEndNoLocation(true)
          setLoaderDiv(false)


        }
      })
      .catch((error) => {

      })
  }

  const onValueChangeVehicleType = (e) => {

    const VehicleFilterData = ActiveVehicle.filter((item) => item.type === e)
    if (VehicleFilterData.length > 0) {
      setVehicleDropdown(VehicleFilterData)
      setActiveVehicleDataDiv(true)
    }
    else {
      setActiveVehicleDataDiv(false)
      setSelectedVehicleData(null)
    }

    setVehicleDropdown(VehicleFilterData)
  }

  const onClickVehicleSelection = (e) => {
    const [registrationNumber, driver_name] = e.split(',');
    setSelectedVehicleData(registrationNumber)
    setSelectedDriverName(driver_name)

  }

  const StartLocation = (e) => {

  }

  const SubmitApiData = async () => {
    setLoaderDiv(true)

    let data = {
      start_position_name: StartTex,
      end_position_name: endTex,
      position_start_latitude: startLatitude,
      position_start_longitude: startLongitude,
      position_end_latitude: endLatitude,
      position_end_longitude: endLongitude,
      registrationNumber: selectedVehicleData,
      operator: SelectedDriverName
    }

    const result = await SubmitNewTripRequest(data)
      .then((res) => {
        if (res.status === 200) {
          setLoaderDiv(false)
          navigate('/vehicle-management/vehicle-tracking')
        }
      })
  }


  return (
    <div className="vehicleFeet_main_div">

      {
        LoaderDiv === true &&
        <MainLoaderScreen />
      }

      <h1 className="hh vehicleFeet_main_h1">New Trip Request</h1>

      <div className="vehiclefleet_location_main_div">

        <h1 className="vehiclefleet_location_h1">Enter Destination</h1>
        <div className='d-flex location_div'>
          <div>
            {
              StartNoLocation === true &&
              <small className='vehiclefleet_noLocation_span'>No location found</small>
            }
            {
              StartLocationFound === true &&
              <small className='vehiclefleet_Location_found_span'>Location Found</small>
            }

            <input
              className="vehiclefleet_location_inputs"
              type="text"
              placeholder='Enter Start Location'
              onChange={(e) => { setStartTex(e.target.value); setStartNoLocation(false) }}

            />

            <button className="vehiclefleet_location_button" onClick={handleStartLocationSelect}>
              Start Location
            </button>
          </div>

          <div className='end_location_div'>
            <input
              className="vehiclefleet_location_inputs vehiclefleet_Vehicle_inputs_end"
              type="text"
              placeholder='Enter End Location'
              onChange={(e) => { setEndTex(e.target.value); setEndNoLocation(false) }}
            />
            {
              EndNoLocation === true &&
              <small className='end_location_small'>No location found</small>
            }
            {
              EndLocationFound === true &&
              <small className='end_location_small' style={{ color: '#92d231' }}>Location Found</small>
            }
            <button className="vehiclefleet_location_button" onClick={handleEndLocationSelect}>
              End Location
            </button>
          </div>

        </div>
      </div>

      <div className="vehiclefleet_Vehicle_div">
        <h1 className="vehiclefleet_location_h1">Select Vehicle Type</h1>
        <CFormSelect
          className="input_fie vehiclefleet_Vehicle_inputs"
          type="text"
          name="vehicleType"
          aria-describedby="validationCustom03Feedback"
          onClick={(e) => {
            onValueChangeVehicleType(e.target.value)
          }}
          id="validationCustom03"
          required
        >
          <option value={'Truck'}>Truck</option>
          <option value={'Car'}>Car</option>
          <option value={'Bus'}>Bus</option>
        </CFormSelect>
      </div>


      <div className={ActiveVehicleDataDiv === true ? "vehiclefleet_Vehicle_Available_div" : "vehiclefleet_Vehicle_Available_div_unSelected"}>
        <h1 className="vehiclefleet_location_h1">Available Vehicle</h1>
        <CFormSelect
          className={ActiveVehicleDataDiv === true ? "input_fie vehiclefleet_Vehicle_inputs" : "input_fie vehiclefleet_Vehicle_inputs_inSelected"}
          type="text"
          name="vehicleType"
          aria-describedby="validationCustom03Feedback"
          onClick={(e) => {
            onClickVehicleSelection(e.target.value)

            // onValueChange(e)
          }}
          id="validationCustom03"
          required
        >
          {ActiveVehicleDataDiv === true ?
            <>
              {
                VehicleDropdown.map((item) => (
                  <option value={`${item.registrationNumber},${item.operator}`}>{item.make}  <span>{item.registrationNumber}</span> </option>

                ))
              }
            </>
            : <>
              <option>No Vehicle Available</option>
            </>}


        </CFormSelect>
      </div>



      <div className="vehiclefleet_submit_div">
        {startLatitude && endLatitude && selectedVehicleData ? (
          <button className="vehiclefleet_submit_button" onClick={() => { SubmitApiData() }}>Submit Request</button>
        ) : (<>
          <button className="vehiclefleet_submit_button_unSelect">Submit Request</button>
        </>)}

      </div>
    </div>
  )
}

export default VehicleFleet
