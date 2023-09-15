/* eslint-disable */
import {
  CTable,
  CCol,
  CModal,
  CForm,
  CButton,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CFormInput,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { vehicleDelete } from '../../api/VehicleApi'
import ConPopups from './EditVehicle.js'
import Form from 'react-bootstrap/Form'
import { TablePagination } from '@mui/material'
import LoaderScreen from '../../Loader/LoaderScreen'
import moment from 'moment'


const vehicleassignment = (props) => {
  const { VehicleData, DriverData } = props
  console.log(DriverData,"DriverData in vehicle")
  const [userDetails, setuserDetails] = useState([])
  const [userSingleData, setuserSingleData] = useState([])
  const [VisibleDeleteValidation, setVisibleDeleteValidation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [conPopups, setConPopups] = useState(false)
  const [popupEdit, setpopupEdit] = useState(false)
  const [visible, setVisible] = useState(false)
  const [DeleteUserId, setDeletUser] = useState('')
  const [visibleUpload, setVisibleUpload] = useState(false)
  const [IdleDriverName, setIdleDriverName] = useState([])
  const [ selectedType, setSelectedType ] = useState('All Vehicle')
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
  }, [])

  const LoadDriverIdleList = () => {
    const idleDriverFilter = DriverData.filter(
      (item) => item.assigned_vehicle_number === 'None' && item.status === 'Active',
    )
    console.log(idleDriverFilter,"idleDriverFilter")
    setIdleDriverName(idleDriverFilter)

  }

  useEffect(() => {
    LoadDriverIdleList()
    setuserDetails(VehicleData)
    if (VehicleData.length > 0) {
      setLoading(false)
    }
    else{
      setLoading(true)

    }
  }, [VehicleData])

  // data show on click content-------------------------------
  const allVehicledata = () => {
    setuserDetails(VehicleData)
  }
  const AssignedVehicledata = () => {

    if(selectedType === 'All Vehicle'){
      const filterResult = VehicleData.filter(
        (item) => item.operator !== '' && item.operator !== 'None' ,
      )
      setuserDetails(filterResult)
    }
    else{
    const filterResult = VehicleData.filter(
      (item) => item.operator !== '' && item.operator !== 'None' && item.type === selectedType,
    )
    setuserDetails(filterResult)
    }
  }
  const UnassignedVehicledata = () => {
    if(selectedType === 'All Vehicle'){
    const filterResult = VehicleData.filter((item) => item.operator === 'None')
    setuserDetails(filterResult)
    }
    else{
      const filterResult = VehicleData.filter((item) => item.operator === 'None' && item.type === selectedType)
      setuserDetails(filterResult)
    }
  }

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [vehiclesPerPage, setVehiclesPerPage] = useState(8)
  const indexOfLastVehicle = currentPage * vehiclesPerPage
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage
  const currentAllVehicle = userDetails.slice(indexOfFirstVehicle, indexOfLastVehicle)

  const handlePageChange = (event, page) => {
    setCurrentPage(page + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setVehiclesPerPage(parseInt(event.target.value, 8))
    setCurrentPage(1) // Reset to the first page when changing the number of drivers per page
  }

  // search function----------------------------------------------------------



  const [FilterValues, setFilterValues] = useState(null)

  const handleFilter = (e) => {
    if (
      e.target.value == '' ||
      e.target.value == 'Vehicle Type' ||
      e.target.value == 'Vehicle Group' ||
      e.target.value == 'Vehicle Status'
    ) {
      setuserDetails(VehicleData)
    } else {
      const filterResult = VehicleData.filter(
        (item) =>
          item.registrationNumber.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.yearOfManufacture.toString().includes(e.target.value.toString()) ||
          item.make.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) ||
          item.fuelType.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.colour.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.type.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.wheelplan.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.status.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.co2Emissions.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.engineCapacity.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.taxDueDate.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.operator.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.taxStatus.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.motStatus.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.dateOfLastV5CIssued.toLowerCase().includes(e.target.value.toLowerCase()) 
      )

      setuserDetails(filterResult)
    }
    setFilterValues(e.target.value)
  }

  const handleStatusChange = (e) => {
    if (e.target.value === 'Active') {
      const filterResult = VehicleData.filter((item) =>
        item.status.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      setuserDetails(filterResult)
    }
    if (e.target.value === 'Out of Service') {
      const filterResult = VehicleData.filter((item) =>
        item.status.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      setuserDetails(filterResult)
    }
    if (e.target.value === 'Idle') {
      const filterResult = VehicleData.filter((item) =>
        item.status.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      setuserDetails(filterResult)
    }
    if (e.target.value === 'In Maintenance') {
      const filterResult = VehicleData.filter((item) => item.status === e.target.value)
      setuserDetails(filterResult)
    }
  }

  const handleGroupChange = (e) => {
    if (e.target.value === 'Management') {
      const filterResult = userDetails.filter((item) =>
        item.group_vehicle.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      setuserDetails(filterResult)
    }
    if (e.target.value === 'group text') {
      const filterResult = userDetails.filter((item) =>
        item.group_vehicle.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      setuserDetails(filterResult)
    }
  }

  //filter vehicle by type
  const handleTypeChange = (e) => {
    if (e.target.value === 'All Vehicle') {
      setSelectedType('All Vehicle')
      setuserDetails(VehicleData)
    }
    if (e.target.value === 'Car') {
      setSelectedType('Car')

      const filterResult = VehicleData.filter((item) => item.type === e.target.value)
      setuserDetails(filterResult)
    }
    if (e.target.value === 'Truck') {
      setSelectedType('Truck')

      const filterResult = VehicleData.filter((item) => item.type === e.target.value)
      setuserDetails(filterResult)
    }
    if (e.target.value === 'Bus') {
      setSelectedType('Bus')

      const filterResult = VehicleData.filter((item) => item.type === e.target.value)
      setuserDetails(filterResult)
    }
  }

  const getuplordver = (boolian) => {
    setConformUplord(boolian)
  }
  //for popup edit window
  const getBoolianVar = (boolian) => {
    setConPopups(boolian)
  }

  //to pass selected user id
  const editUser = async (data) => {
    console.log(data,"data assifn")
    setuserSingleData(data)
    setConPopups(true)
  }

  //for delete user
  const deleteUser = async () => {
    await vehicleDelete(DeleteUserId).then((res) => {
      if (res.data === 'deleted') {
        setVisible(!visible)
        window.location.reload()

        // LoadUserDetails()
        // DeletePushNotification(UserName)
      } else {
      }
    })
  }

  //delete popup
  const DeletePopUp = (ID) => {
    setVisible(!visible)
    setDeletUser(ID)
  }

  //Save file
  const saveFile = (e) => {
    setFile(e.target.files[0])
  }

  const popEdit = () => {
    setpopupEdit(true)
  }

  //conform upload
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result
        csvFileToArray(text)
      }

      fileReader.readAsText(file)
    }
  }

  //to navigate at add user components
  const onaddVehicle = () => {
    navigate('/vehicle-management/vehicle-add')
  }

  return (
    <>
      {loading ? (
        <LoaderScreen />
      ) : (
        <div className="div_vehicleDetails">
          <h1 className="hh_text ps-4">Vehicle Assignment</h1>
          <div>
            <div className="user_middle_function ">
              <div className="aa_text">
                <div className="hs_text">
                  <h6 className="as_text ps-4" onClick={allVehicledata}>
                    All
                  </h6>
                  <h6 className="a_text" onClick={AssignedVehicledata}>
                    Assigned
                  </h6>
                  <h6 className="a_text " onClick={UnassignedVehicledata}>
                    Unassigned
                  </h6>
                  {/* <h className='a_text' onClick={ArchivedVehicledata}>Archived</h> */}
                </div>
              </div>
              <div className="vehicle_search ">
                <CForm className="vehicle_form row g-3 ps-4">
                  <CCol xs="auto" className="vehicle_form buttonvehiclepopup">
                    <div className="input_search">
                      <CFormInput
                        className="input-filed-02"
                        type="text"
                        placeholder="Search"
                        value={FilterValues}
                        onChange={handleFilter}
                      />
                      <i
                        className="fa fa-search assignSerachIcon"
                        style={{ marginTop: '2.5px' }}
                        aria-hidden="true"
                      ></i>
                    </div>
                    <div className="d-flex buttonrightside">
                      <Form.Select className="drop_click ms-3" onChange={handleTypeChange}>
                        <option className="vehicle_type">All Vehicle</option>
                        <option className="vehicletype_option">Car</option>
                        <option className="vehicletype_option">Truck</option>
                        <option className="vehicletype_option">Bus</option>
                        {/* <option  className="vehicletype_option" >Bus</option> */}
                      </Form.Select>
                      {/* <Form.Select className = "drop_clicks ms-3"  onChange={handleGroupChange}> 
                        <option className='vehicle_type'>Vehicle Group</option>               
                        <option className="vehicletype_option" >Management</option>
                          <option  className="vehicletype_option" >group text</option>
                          <option  className="vehicletype_option" >Bus</option>
                        </Form.Select> */}
                      {/* <Form.Select
                        className="drop_clicks_drop ms-3"
                        value={FilterValues}
                        onChange={handleStatusChange}
                      >
                        <option className="vehicle_type">Vehicle Status</option>
                        <option className="vehicletype_option">Active</option>
                        <option className="vehicletype_option">In Maintenance</option>
                        <option className="vehicletype_option"> Out of Service</option>
                        <option className="vehicletype_option"> Idle</option>
                    
                      </Form.Select> */}
                      <div className="AddvehicleButton">
                        <CButton
                          className="AddVehicleBtn ms-3"
                          onClick={() => {
                            onaddVehicle()
                          }}
                        >
                          Add Vehicle
                        </CButton>
                      </div>
                    </div>
                  </CCol>
                </CForm>
              </div>
            </div>
          </div>

          <div className="allvehicledataTable">
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
                 
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: '120px' }}>
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

               
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width:120 }}>Tax Status</CTableHeaderCell>
                 <CTableHeaderCell className="tablecell user_tableHead"  style={{ width:170 }}>
                  	MOT Status
                </CTableHeaderCell>
                <CTableHeaderCell className="tablecell user_tableHead">
                  Last V5C Issued
                </CTableHeaderCell>
                <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 250 }}>
                    Driver Name
                  </CTableHeaderCell>

                {/* <CTableHeaderCell className="tablecell user_tableHead">
                  Date Of Last V5C Issued
                </CTableHeaderCell> */}
       
                </CTableRow>
              </CTableHead>
              {currentAllVehicle.map((user) => (
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
                  
                  <CTableDataCell className="tablecell">{moment(user.taxDueDate).format('DD-MM-yyyy')}</CTableDataCell>
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
          </div>
          {/* pagination */}
          {userDetails.length > 8 && (
            <div className="driverpagination">
              <TablePagination
                component="div"
                count={userDetails.length}
                page={currentPage - 1}
                onPageChange={handlePageChange}
                rowsPerPage={vehiclesPerPage}
                rowsPerPageOptions={[]}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          )}

          <>
            <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
              <CModalBody>
                <CModalTitle className="model_title text-center">
                  Are you sure you want to this delete?
                </CModalTitle>
              </CModalBody>

              <div className="popupdeletebutton">
                <div
                  className="popupcancelbutton d-flex justify-content-center align-items-center"
                  onClick={() => setVisible(false)}
                >
                  Cancel
                </div>
                <div
                  className="popupeditbutton d-flex justify-content-center align-items-center"
                  onClick={() => deleteUser()}
                >
                  Ok
                </div>
              </div>
            </CModal>
          </>
          <>
            <CModal
              alignment="center"
              visible={visibleUpload}
              onClose={() => setVisibleUpload(false)}
            >
              <CModalBody>
                <input
                  type="file"
                  name="file"
                  accept=".csv"
                  onChange={saveFile}
                  style={{ display: 'block', margin: '68px auto', cursor: 'pointer' }}
                />
              </CModalBody>
              <CModalFooter className="p-0" style={{ height: 50 }}>
                <div
                  className="popUpCancelBtn mt-0 mb-0"
                  style={{ height: 50, display: 'flex', alignItems: 'center' }}
                  onClick={() => setVisibleUpload(false)}
                >
                  Cancel
                </div>
                <div className="popUpBtn mt-0 mb-0" onClick={handleOnSubmit}>
                  Ok
                </div>
              </CModalFooter>
            </CModal>
          </>
          <>
            <CModal
              alignment="center"
              visible={VisibleDeleteValidation}
              onClose={() => setVisibleDeleteValidation(false)}
            >
              <CModalBody>
                <CModalTitle
                  className="model_title text-center"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ color: 'red', display: 'block', fontSize: '24px' }}>Note</span>
                  The vehicle is in transit, undergoing maintenance, or assigned to a driver, please
                  remove these statuses before proceeding.
                  <button
                    style={{
                      backgroundColor: '#FF1E1C',
                      color: 'white',
                      border: 'none',
                      display: 'block',
                      width: 'max-content',
                      marginTop: '10px',
                      padding: '4px 15px',
                      borderRadius: '10px',
                    }}
                    onClick={() => setVisibleDeleteValidation(false)}
                  >
                    Okay
                  </button>
                </CModalTitle>
              </CModalBody>
            </CModal>
          </>
          {
            conPopups && userSingleData && (
              <ConPopups
                data={userSingleData}
                IdleDriverName={IdleDriverName}
                onClick={getBoolianVar}
              />
            )
          
          }
        </div>
      )}
    </>
  )
}

export default vehicleassignment
