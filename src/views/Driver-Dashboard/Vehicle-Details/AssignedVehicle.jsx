/* eslint-disable */
import { CCard, CCardBody, CCardSubtitle, CCardTitle } from '@coreui/react'
import './AssignedVehicle.css'
import React, { useEffect, useState } from 'react'
import { VehicleDetailsForDriver } from '../../api/VehicleApi'
import LoaderScreen from '../../Loader/LoaderScreen'


const AssignedVehicle = (props) => {
  const [vehicleData, setVehicleData] = useState([])
  const [loading, setLoading] = useState(true)
  const { mainUserName } = props


  const LoadVehicleData = async () => {
    const result = await VehicleDetailsForDriver(mainUserName).then((res) => {
      if (res?.status === 200) {
        setLoading(false)
        setVehicleData(res.data)
      }
    })
  }

  useEffect(() => {
    setLoading(true)
    LoadVehicleData()
  }, [])

  return (
    <>
      <h1
        className="assigned_vehicle_driver_dashboard"
        style={{ marginLeft: '7%', width: 'max-content' }}
      >
        Assigned Vehicle Details
      </h1>
      {loading ? (
        <LoaderScreen />
      ) : (
        <div>
          <div className="main-div text-center">
            {vehicleData.length > 0 ? (
              <>
                <CCard className="assigned-cards">
                  <CCardBody>
                    <CCardTitle className="assigned-cards-head">vehicle License No</CCardTitle>
                    <CCardSubtitle className="assigned-cards-sub">
                      {vehicleData[0].registrationNumber}
                    </CCardSubtitle>
                  </CCardBody>
                </CCard>
                <CCard className="assigned-cards">
                  <CCardBody>
                    <CCardTitle className="assigned-cards-head">Year</CCardTitle>
                    <CCardSubtitle className="assigned-cards-sub">
                      {vehicleData[0].year}
                    </CCardSubtitle>
                  </CCardBody>
                </CCard>
                <CCard className="assigned-cards">
                  <CCardBody>
                    <CCardTitle className="assigned-cards-head">Make</CCardTitle>
                    <CCardSubtitle className="assigned-cards-sub">
                      {vehicleData[0].make}
                    </CCardSubtitle>
                  </CCardBody>
                </CCard>
                <CCard className="assigned-cards">
                  <CCardBody>
                    <CCardTitle className="assigned-cards-head">Model</CCardTitle>
                    <CCardSubtitle className="assigned-cards-sub">
                      {vehicleData[0].model}
                    </CCardSubtitle>
                  </CCardBody>
                </CCard>
                <CCard className="assigned-cards">
                  <CCardBody>
                    <CCardTitle className="assigned-cards-head">VIN</CCardTitle>
                    <CCardSubtitle className="assigned-cards-sub">
                      {vehicleData[0].vin}
                    </CCardSubtitle>
                  </CCardBody>
                </CCard>
                <CCard className="assigned-cards">
                  <CCardBody>
                    <CCardTitle className="assigned-cards-head">Vehicle Type</CCardTitle>
                    <CCardSubtitle className="assigned-cards-sub">
                      {vehicleData[0].type}
                    </CCardSubtitle>
                  </CCardBody>
                </CCard>
                <CCard className="assigned-cards">
                  <CCardBody>
                    <CCardTitle className="assigned-cards-head">Vehicle Fuel Type</CCardTitle>
                    <CCardSubtitle className="assigned-cards-sub">
                      {vehicleData[0].vehicle_fuel_type}
                    </CCardSubtitle>
                  </CCardBody>
                </CCard>
                <CCard className="assigned-cards">
                  <CCardBody>
                    <CCardTitle className="assigned-cards-head">Vehicle Drive Type</CCardTitle>
                    <CCardSubtitle className="assigned-cards-sub">
                      {vehicleData[0].vehicle_drive_type}
                    </CCardSubtitle>
                  </CCardBody>
                </CCard>
              </>
            ) : (
              <h2 className="hh">Currently vehicle not assigned</h2>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AssignedVehicle
