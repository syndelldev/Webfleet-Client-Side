/* eslint-disable */
import {
  CTable,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CButton,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import LoaderScreen from '../../Loader/LoaderScreen'
import { LoadTripHistoryData } from '../../api/VehicleApi'
import Moment from 'react-moment'
import './TripHistory.css'
import { TablePagination } from '@mui/material'

const TripHistory = (props) => {
  const { mainUserName } = props
  const [TripHistoryApiData, setTripHistoryApiData] = useState([])
  const [userDetails, setuserDetails] = useState([])
  const [userSearch, setUserSearch] = useState([])
  const [loading, setLoading] = useState(false)

  const LoadTripHistory = async () => {
    const result = await LoadTripHistoryData(mainUserName).then((res) => {
      if (res?.status === 200) {
        setLoading(false)
        setTripHistoryApiData(res.data)
      }
    })
  }

  useEffect(() => {
    setLoading(true)
    LoadTripHistory()
  }, [])

  // search function--------------------------
  const [FilterValues, setFilterValues] = useState(null)
  const handleFilter = (e) => {
    if (e.target.value == '') {
      setuserDetails(userSearch)
    } else {
      const filterResult = userSearch.filter(
        (item) =>
          item.user_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          // item.id.toString().includes(e.target.value.toString()) ||
          item.user_email.toString().includes(e.target.value.toString()) ||
          item.user_mobile_phone.toString().includes(e.target.value.toString()) ||
          item.user_address.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_country.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_city.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_cost_centre.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_postcode.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      setuserDetails(filterResult)
    }
    setFilterValues(e.target.value)
  }

  //Pagination 
  const [currentPage, setCurrentPage] = useState(1)
  const [vehiclesPerPage, setVehiclesPerPage] = useState(15)
  const indexOfLastVehicle = currentPage * vehiclesPerPage
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage
  const currentIdleVehicle = TripHistoryApiData.slice(indexOfFirstVehicle, indexOfLastVehicle)

  const handlePageChange = (event, page) => {
    setCurrentPage(page + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setVehiclesPerPage(parseInt(event.target.value, 15))
    setCurrentPage(1) // Reset to the first page when changing the number of drivers per page
  }

  return (
    <>
      {loading ? (
        <LoaderScreen />
      ) : (
        <div className="div_userDetails">
          <>
            <div className="Trip_menuOne_widget">
              <CCard className="trip_menu_card">
                <CCardBody>
                  <div className="box_points">
                    <div className="box-title">Total Trips</div>
                    <span className="trip_card_data">{TripHistoryApiData.length}</span>
                  </div>
                </CCardBody>
              </CCard>
              {/* <CCard className="trip_menu_card">
                <CCardBody>
                  {TripHistoryApiData.length > 0 ? (
                    <div className="box_points">
                      <div className="box-title">Assigned Vehicle</div>
                      <span className="trip_card_data">
                        {TripHistoryApiData[0].vehicle_registration_number}
                      </span>
                    </div>
                  ) : (
                    <></>
                  )}
                </CCardBody>
              </CCard> */}
            </div>
          </>
          <h1 className="hh ms-3" style={{ width: 'max-content' }}>
            My Trip History
          </h1>
          <div className="user_middle_function">
            <div className="user_search">
              <CForm className=" row g-3 ps-3 w-100">
              
              </CForm>
            </div>
          </div>
          <div className="allUserTable">
            <CTable className="alluserCtable" style={{ tableLayout: 'fixed' }}>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell
                    className="tablecell user_usernameCell user_tableHead ps-3"
                    style={{ width: 120 }}
                  >
                    Date
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    className="tablecell tablecell_id user_tableHead"
                    style={{ width: 240 }}
                  >
                    Start Location
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    className="tablecell user_tableHead user_addr"
                    style={{ width: 240 }}
                  >
                    End Location
                  </CTableHeaderCell>

                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 200 }}>
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
                  <CTableHeaderCell
                    className="tablecell user_tableHead ps-3"
                    style={{ width: 150 }}
                  >
                    Trip Status
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              {TripHistoryApiData.map((user) => (
                <CTableBody>
                  <CTableRow>
                    <CTableDataCell className="tablecell ps-3">
                      <Moment format="DD/MM/YYYY">{user.timestamp}</Moment>
                    </CTableDataCell>

                    <CTableDataCell className="tablecell">
                      {user.start_position_name}
                    </CTableDataCell>

                    <CTableDataCell className="tablecell user_add_details ps-2">
                      {user.end_position_name}
                    </CTableDataCell>
                    <CTableDataCell className="tablecell">
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
                </CTableBody>
              ))}
            </CTable>
          </div>
           {TripHistoryApiData.length > 8 && (
          <div className="driverpagination">
          <TablePagination
            component="div"
            count={TripHistoryApiData.length}
            page={currentPage - 1}
            onPageChange={handlePageChange}
            rowsPerPage={vehiclesPerPage}
            rowsPerPageOptions={[]}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
        )}

        </div>
      
       
        
      )}
    </>
  )
}

export default TripHistory
