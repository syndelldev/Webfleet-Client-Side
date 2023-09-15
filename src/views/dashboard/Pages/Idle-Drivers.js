/* eslint-disable */
import React, { useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CBadge,
  CCol,
} from '@coreui/react'
import TablePagination from '@mui/material/TablePagination'
import moment from 'moment'

const Select = (props) => {
  const { DriverData } = props

  const Idledriver = DriverData.filter(
    (element) => element.status === 'Active' && element.assigned_vehicle_number === 'None',
  )

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [vehiclesPerPage, setVehiclesPerPage] = useState(15)
  const indexOfLastVehicle = currentPage * vehiclesPerPage
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage
  const currentIdleDriver = Idledriver.slice(indexOfFirstVehicle, indexOfLastVehicle)

  const handlePageChange = (event, page) => {
    setCurrentPage(page + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setVehiclesPerPage(parseInt(event.target.value, 15))
    setCurrentPage(1) // Reset to the first page when changing the number of drivers per page
  }

  return (
    <div>
      <>
        <div sx={{ width: '100%' }}>
          <>
            <div className="mb-4 driversidebar">
              <CCol xs="auto" className="w-100 pb-3">
                <CTableDataCell className="badgecontent ps-3">
                  <CBadge className="badge_styles">
                    <div className="orangeradius"></div>
                  </CBadge>
                </CTableDataCell>

                <h1 className="idledrivertage">Unassigned Drivers</h1>
              </CCol>
              <CForm className=" row g-3 w-100"></CForm>
            </div>
            <div className="drivertraking" style={{ margin: 'auto' }}>

            { currentIdleDriver.length > 0 ? <>
              <CTable className="alldriverTable" style={{ tableLayout: 'fixed' }}>
                <CTableHead>
                  <CTableRow style={{ verticalAlign: 'middel' }}>
                    <CTableHeaderCell
                      className="tablecell drivertablehadding ps-4"
                      style={{ width: 140 }}
                    >
                      Driver Name
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="tablecell drivertablehadding ps-2"
                      style={{ width: 100 }}
                    >
                      Status
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="tablecell drivertablehadding ps-2"
                      style={{ width: 120 }}
                    >
                      Vehicle Type
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="tablecell drivertablehadding ps-2"
                      style={{ width: 170 }}
                    >
                      License No
                    </CTableHeaderCell>

                    <CTableHeaderCell
                      className="tablecell drivertablehadding ps-2"
                      style={{ width: 170 }}
                    >
                      License Expiry Date
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="tablecell drivertablehadding ps-2"
                      style={{ width: 100 }}
                    >
                      Phone
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="tablecell drivertablehadding ps-2"
                      style={{ width: 370 }}
                    >
                      Address
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      className="tablecell drivertablehadding ps-2"
                      style={{ width: 170 }}
                    >
                      Fuel Card{' '}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="vihicalasign" style={{ width: 220 }}>
                      Vehicle's License No{' '}
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {currentIdleDriver.map((user, index) => (
                  <CTableBody key={index}>
                    <CTableRow
                      style={{
                        width: '100%',
                        borderBottom: '1px solid #d8dbe0',
                        borderTop: '1px solid #d8dbe0',
                      }}
                    >
                      <CTableDataCell className="drivertablerows" style={{ paddingLeft: 21 }}>
                        {user.driver_name}
                      </CTableDataCell>
                      <CTableDataCell className="drivertablerows">{user.status}</CTableDataCell>
                      <CTableDataCell className="drivertablerows">
                        {user.assigned_vehicle_name}
                      </CTableDataCell>
                      <CTableDataCell className="drivertablerows" style={{ width: 120 }}>
                        {user.licesnse_no}
                      </CTableDataCell>
                      <CTableDataCell className="drivertablerows" style={{ width: 120 }}>
                        <span>{moment(user.license_expire_date).format('DD-MM-yyyy')}</span>
                      </CTableDataCell>
                      <CTableDataCell className="drivertablerows" style={{ width: 120 }}>
                        {user.phone}
                      </CTableDataCell>
                      <CTableDataCell className="drivertablerows">
                        {user.description}
                      </CTableDataCell>
                      <CTableDataCell className="drivertablerows" style={{ width: 120 }}>
                        {user.fuel_card_name}
                      </CTableDataCell>
                      <CTableDataCell className="drivertablerows">
                        {user.assigned_vehicle_number}
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
          justifyContent:'center',
          alignItems: 'center',
          marginTop: '40px',
          marginBottom: '20px',
        }}
      >
       
        <h1 className="hh ms-2" style={{ margin: '0' }}>
          There are no drivers is idle
        </h1>
      </CCol>
            </>}
            </div>

            {/* Pagination */}
            {Idledriver.length > 15 && (
              <div className="driverpagination">
                <TablePagination
                  component="div"
                  count={Idledriver.length}
                  page={currentPage - 1}
                  onPageChange={handlePageChange}
                  rowsPerPage={vehiclesPerPage}
                  rowsPerPageOptions={[]}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </div>
            )}
          </>
        </div>
      </>
    </div>
  )
}

export default Select
