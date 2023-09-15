/* eslint-disable */
import {
  CTable,
  CCol,
  CForm,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import { TablePagination } from '@mui/material'
import { TripHistoryByName } from '../../api/VehicleApi'
import Moment from 'react-moment'
import logoimages from '../../../assets/images/avatars/logo1.ico'
// import { styled } from 'styled-components'

const DriverTripHistory = (props) => {
  const { DriverData } = props
  const [tripData, setTripData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDriver, setSelectedDriver] = useState('')

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [vehiclesPerPage, setVehiclesPerPage] = useState(8)
  const indexOfLastVehicle = currentPage * vehiclesPerPage
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage
  const currentAllTripHistory = tripData.slice(indexOfFirstVehicle, indexOfLastVehicle)

  const handlePageChange = (event, page) => {
    setCurrentPage(page + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setVehiclesPerPage(parseInt(event.target.value, 8))
    setCurrentPage(1) // Reset to the first page when changing the number of drivers per page
  }

  useEffect(() => {
    if (selectedDriver === '') {
      setLoading(false)
      setTripData([])
    }
  }, [selectedDriver])

  const handleTypeChange = async (e) => {
    setLoading(true)
    const selectedDriverName = e.target.value
  
    setSelectedDriver(selectedDriverName)
    const result = await TripHistoryByName(selectedDriverName).then((res) => {
      if (res?.status === 200) {
        setLoading(false)
      
        setTripData(res.data)
      }
    })
  }

 
  return (
    <>
      <div className="div_vehicleDetails">
        <h1 className="hh_text ps-4">Driver Trip History</h1>
        <div className="w-100">
          <CForm className="vehicle_form ps-4">
            <CCol xs="auto" className="vehicle_form buttonvehiclepopup">
              <Form.Select class="form-select" value={selectedDriver} onChange={handleTypeChange}>
                <option className="driverTrip_select" value={''}>
                  Select Driver Name
                </option>
                {DriverData.map((item) => (
                  <option className="driverTrip_select" value={item.driver_name}>
                    {item.driver_name}
                  </option>
                ))}
              </Form.Select>
            </CCol>
          </CForm>
        </div>

        <div className="allvehicledataTable allUserTable">
          <CTable className="alldriverTable alluserCtable" style={{ tableLayout: 'fixed' }}>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell
                  className="tablecell user_tableHead ps-4"
                  style={{ width: '130px' }}
                >
                  Date
                </CTableHeaderCell>
                <CTableHeaderCell className="user_tableHead" style={{ width: '200px' }}>
                  Start Location
                </CTableHeaderCell>
                <CTableHeaderCell className="tablecell user_tableHead" style={{ width: '200px' }}>
                  End Location
                </CTableHeaderCell>
                <CTableHeaderCell className="tablecell user_tableHead " style={{ width: '200px' }}>
                  Vehicle Licence Number
                </CTableHeaderCell>
                <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 150 }}>
                  Make
                </CTableHeaderCell>
                <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 180 }}>
                  Modle
                </CTableHeaderCell>
                <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 180 }}>
                  VIN
                </CTableHeaderCell>
                <CTableHeaderCell className="tablecell user_tableHead ps-3" style={{ width: 150 }}>
                  Trip Status
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {loading ? (
                <LoaderScreenStyled>
                  <div className="loader-container-driver">
                    <div className="spinner-driver"> </div>
                    <img src={logoimages} style={{ width: 35, height: 35 }} />
                  </div>
                </LoaderScreenStyled>
              ) : selectedDriver === '' ? (
                <CTableRow>
                  <CTableDataCell colSpan="8" style={{ color: '#ff1e1c' }} className="text-center">
                    Please select a driver
                  </CTableDataCell>
                </CTableRow>
              ) : tripData.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan="8" style={{ color: '#ff1e1c' }} className="text-center">
                    Driver has not made any trips
                  </CTableDataCell>
                </CTableRow>
              ) : (
                <>
                  {currentAllTripHistory.map((user) => (
                    <CTableRow
                      key={user.id}
                      style={{
                        width: '100%',
                        borderBottom: '1px solid #d8dbe0',
                        borderTop: '1px solid #d8dbe0',
                      }}
                    >
                      <CTableDataCell className="tablecell  ps-4 " style={{ width: '200px' }}>
                        {/* {new Date(user.timestamp).toISOString().split('T')[0]} */}
                        <Moment format="DD/MM/YYYY">{user.timestamp}</Moment>
                      </CTableDataCell>
                      <CTableDataCell className="tablecell" style={{ width: '200px' }}>
                        {user.start_position_name}
                      </CTableDataCell>
                      <CTableDataCell className="tablecell" style={{ width: '200px' }}>
                        {user.end_position_name}
                      </CTableDataCell>
                      <CTableDataCell
                        className="tablecell ps-2"
                        style={{
                          width: '200px',
                          wordBreak: 'break-word',
                          wordWrap: 'break-word',
                        }}
                      >
                        {user.vehicle_registration_number}
                      </CTableDataCell>
                      <CTableDataCell className="tablecell">{user.make}</CTableDataCell>
                      <CTableDataCell className="tablecell">{user.model}</CTableDataCell>
                      <CTableDataCell className="tablecell">{user.vin}</CTableDataCell>
                      <CTableDataCell>
                        {user.Trip_end_status === 0 ? (
                          <CTableDataCell className="tablecell"> In Process </CTableDataCell>
                        ) : (
                          <CTableDataCell className="tablecell"> Completed </CTableDataCell>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </>
              )}
            </CTableBody>
          </CTable>
        </div>
        {/* pagination */}
        {tripData.length > 8 && (
          <div className="driverpagination">
            <TablePagination
              component="div"
              count={tripData.length}
              page={currentPage - 1}
              onPageChange={handlePageChange}
              rowsPerPage={vehiclesPerPage}
              rowsPerPageOptions={[]}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        )}
      </div>
    </>
  )
}

// const LoaderScreenStyled = styled.div`
//   .loader-container-driver {
//     width: 92%;
//     height: 50vh;
//     /* position: relative; */
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: fixed;
//     background-color: #fff !important;
//     z-index: 10 !important;
//   }
//   .spinner-driver {
//     position: absolute;
//     width: 70px;
//     height: 70px;
//     border: 8px solid;
//     border-color: #ff1e1c transparent #ff1e1c transparent;
//     border-radius: 50%;
//     animation: spin-anim 1.2s linear infinite;
//   }
// `

export default DriverTripHistory
