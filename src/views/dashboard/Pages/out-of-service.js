/* eslint-disable */
import {
  CTable,
  CCol,
  CForm,
  CBadge,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { TablePagination } from '@mui/material'

const Service = (props) => {
  const { VehicleData } = props

  const filterResult = VehicleData.filter((item) => item.status === 'Out of service')

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [vehiclesPerPage, setVehiclesPerPage] = useState(15)
  const indexOfLastVehicle = currentPage * vehiclesPerPage
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage
  const currentOutofService = filterResult.slice(indexOfFirstVehicle, indexOfLastVehicle)

  const handlePageChange = (event, page) => {
    setCurrentPage(page + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setVehiclesPerPage(parseInt(event.target.value, 15))
    setCurrentPage(1) // Reset to the first page when changing the number of drivers per page
  }

  return (
    <div className="div_userDetails">
      <CCol
        xs="auto"
        className="w-100"
        style={{
          display: 'flex',
         
          alignItems: 'center',
          marginTop: '40px',
          marginBottom: '20px',
        }}
      >
        <CTableDataCell className="badgecontent ps-3">
          <CBadge className="badge_styles_circle">
            <div className="redradius"></div>
          </CBadge>
        </CTableDataCell>
        <h1 className="hh ms-2" style={{ margin: '0' }}>
          Out of Service
        </h1>
      </CCol>
      <CForm className=" row g-3 w-100"></CForm>

      <div className="user_middle_function"></div>
      <div className="allUserTable" style={{ overflowX: 'auto' }}>
      { currentOutofService.length > 0 ? <>
      <CTable className="alldriverTable" style={{ tableLayout: 'fixed' }}>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell
                    className="tablecell user_tableHead ps-4"
                
                  >
                    License No
                  </CTableHeaderCell>
                  <CTableHeaderCell className="user_tableHead " style={{ width: 100 }}>
                    Year
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead">Make</CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead">Fuel Type</CTableHeaderCell>
                 
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 125 }}>
                  Colour
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 150 }}>
                  MOT Expiry Date
                  </CTableHeaderCell>
                  <CTableHeaderCell className="user_tableHead ps-2" style={{ width: 130 }}>
                    Vehicle Type
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell className="tablecell user_tableHead">Group</CTableHeaderCell> */}
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 160 }}>
                  Wheel Plan
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 170 }}>
                    Vehicle Drive Type
                  </CTableHeaderCell> */}

                  <CTableHeaderCell className="tablecell user_tableHead">
                  Co2 Emissions
                </CTableHeaderCell>

                  <CTableHeaderCell className="tablecell user_tableHead">
                  Engine Capacity
                </CTableHeaderCell>

                  <CTableHeaderCell className="tablecell user_tableHead">
                    Tax Due Date
                  </CTableHeaderCell>

               
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width:135 }}>Tax Status</CTableHeaderCell>
                 <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 170 }}>
                  	MOT Status
                </CTableHeaderCell>
                <CTableHeaderCell className="tablecell user_tableHead">
                  Last V5C Issued
                </CTableHeaderCell>
                <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 130 }}>
                    Driver Name
                  </CTableHeaderCell>

                {/* <CTableHeaderCell className="tablecell user_tableHead">
                  Date Of Last V5C Issued
                </CTableHeaderCell> */}
       
                </CTableRow>
              </CTableHead>
              {currentOutofService.map((user) => (
                <CTableBody>
                  <CTableRow
                    style={{
                      width: '100%',
                      borderBottom: '1px solid #d8dbe0',
                      borderTop: '1px solid #d8dbe0',
                    }}
                  >
                    <CTableDataCell
                      className="tablecell ps-4"
                      style={{
                        width: '180px',
                        wordBreak: 'break-word',
                        wordWrap: 'break-word',
                      }}
                    >
                      {/* <span>
                      <img src={avatar} height={40} className="editavatar" />
                    </span> */}
                      {user.registrationNumber}
                    </CTableDataCell>
                    <CTableDataCell className="tablecell ps-2">{user.yearOfManufacture}</CTableDataCell>
                    <CTableDataCell className="tablecell">{user.make}</CTableDataCell>
                    <CTableDataCell className="tablecell">{user.fuelType}</CTableDataCell>
                    <CTableDataCell className="tablecell">{user.colour}</CTableDataCell>
                    <CTableDataCell className="tablecell">{moment(user.motExpiryDate).format('DD-MM-yyyy')}</CTableDataCell>
                    <CTableDataCell className="tablecell">{user.type}</CTableDataCell>
                  
                    <CTableDataCell className="tablecell">{user.wheelplan}</CTableDataCell>
                    <CTableDataCell className="tablecell">{user.co2Emissions}</CTableDataCell>

                    <CTableDataCell className="tablecell">{user.engineCapacity}</CTableDataCell>
                  
                  <CTableDataCell className="tablecell">{user.taxDueDate}</CTableDataCell>
                  <CTableDataCell className="tablecell">{user.taxStatus}</CTableDataCell>
                  
                  <CTableDataCell className="tablecell">{user.motStatus}</CTableDataCell>
                  <CTableDataCell className="tablecell">{moment(user.dateOfLastV5CIssued).format('DD-MM-yyyy')}</CTableDataCell>
                  
                    <CTableDataCell className="tablecell">
                      <span>
                        {/* <img src={drivermod} height={33} width={36} style={{ borderRadius:5 }} className="editavatar" /> */}
                      </span>
                      {user.operator}
                    </CTableDataCell>

                    <CTableDataCell className="tablecell vihicalemanagemntditcontent">
                      {/* <button
                        onClick={() => setVisibleUpload(!visibleUpload)}
                        className="vehicleEditBtn"
                      >
                        {' '}
                        <img src={Management} height={20} />
                      </button> */}
                      <button
                        onClick={() => {
                          editUser(user)
                        }}
                        className="vehicleEditBtn"
                      >
                        <i className="fas fa-edit" width={15}></i>
                      </button>
                      {user.status !== 'Idle' || user.operator !== 'None' ? (
                        <button
                          onClick={() => {
                            setVisibleDeleteValidation(true)
                          }}
                          className="vehicleEditBtn"
                        >
                          <i className="fa-solid fa-trash-can" width={15}></i>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            DeletePopUp(user.id)
                          }}
                          className="vehicleEditBtn"
                        >
                          <i className="fa-solid fa-trash-can" width={15}></i>
                        </button>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              ))}
            </CTable>

            </>:<>
            <CCol
        xs="auto"
        className="w-100"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '40px',
          marginBottom: '20px',
        }}
      >
       
        <h1 className="hh ms-2" style={{ margin: '0' }}>
          Currently no vehicle in Out of service
        </h1>
      </CCol>
            </>}
      </div>

      {/* Pagination */}
      {filterResult.length > 15 && (
        <div className="driverpagination">
          <TablePagination
            component="div"
            count={filterResult.length}
            page={currentPage - 1}
            onPageChange={handlePageChange}
            rowsPerPage={vehiclesPerPage}
            rowsPerPageOptions={[]}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      )}
    </div>
  )
}

export default Service
