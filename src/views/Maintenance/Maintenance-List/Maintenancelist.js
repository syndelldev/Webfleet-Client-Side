/* eslint-disable */
import {
  CTable,
  CCol,
  CModal,
  CForm,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
// import condeletepopus from '../condeletepopus.js'
import { maintenanceVehicleDelete } from '../../api/VehicleApi'
import { maintenancelist, maintennaceUpdateId, maintenanceServiceDelete } from '../../api/api'
import ConPopups from './EditMaintenanceList.js'
import moment from 'moment'
import { TablePagination } from '@mui/material'
import CIcon from '@coreui/icons-react'
import { cilDataTransferDown } from '@coreui/icons'
import Papa from 'papaparse'
import { saveAs } from 'file-saver'
import LoaderScreen from '../../Loader/LoaderScreen'

function Maintenancelist(props) {
  // const { maintenancelist } = props
  const [maintenaceData, setMaintenaceData] = useState([])
  const [filterResults, setFilterResults] = useState([])
  const [inProcess, setInProcess] = useState([])
  const [loading, setLoading] = useState(false)
  const [userSingleData, setuserSingleData] = useState([])
  const [conPopups, setConPopups] = useState(false)
  const [visibleRemove, setVisibleRemove] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [DeleteVehicleId, setDeletVehicle] = useState('')
  const [DeleteService, setDeleteService] = useState('')
  const [vehicleNo, setVehicleNo] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  let height = document.documentElement.scrollHeight

  useEffect(() => {
    setLoading(true)
    LoadMaintenacelist()
  }, [])

  useEffect(() => {
    handleFilter()
    processFilter()
  }, [maintenaceData])

  const LoadMaintenacelist = async () => {
    const result = await maintenancelist().then((res) => {
      if (res.status === 200) {
        setLoading(false)
        setMaintenaceData(res.data)

        // const dateFormate = moment(res.data[1].maintance_date).format('yyyy-MM-DD')
        // setMaintenanaceDate(dateFormate)
        const today = new Date()
        const dateFormateNow = moment(today).format('yyyy-MM-DD')
        setCurrentDate(dateFormateNow)
      }
    })
  }

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [vehiclesPerPage, setVehiclesPerPage] = useState(10)
  const indexOfLastVehicle = currentPage * vehiclesPerPage
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage
  const currentMaintenaceVehicle = maintenaceData.slice(indexOfFirstVehicle, indexOfLastVehicle)

  const handlePageChange = (event, page) => {
    setCurrentPage(page + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setVehiclesPerPage(parseInt(event.target.value, 10))
    setCurrentPage(1) // Reset to the first page when changing the number of drivers per page
  }

  const getuplordver = (boolian) => {
    setConformUplord(boolian)
  }
  //for popup edit window
  const getBoolianVar = (boolian) => {
    setConPopups(boolian)
  }

  // to pass selected user id
  // const editVehicle = async (ID) => {
  //   const result = await editmaintennaceVehicle(ID).then((res) => {

  //     setMantanaceid(res.data[0])
  //   })
  //   setConPopups(true)
  //   setuserSingleData(ID)
  // }
  const editVehicle = async (ID) => {
    setuserSingleData(ID)
      setConPopups(true)
  
  }

  // const editUser = async (ID) => {
  //   setConPopups(true)
  //   setuserSingleData(ID)
  // }

  // filtervehicle-------------------------------
  const [user, setuser] = useState()

  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  // filter data----------------------------------------------------------

  const handleFilter = () => {
    const filterResult = maintenaceData.filter((item) => item.status === 0)
    setFilterResults(filterResult)
  }

  const processFilter = () => {
    const filterResult = maintenaceData.filter((item) => item.status === 1)
    setInProcess(filterResult)
  }

  //csv file download

  const MaintenanceVehicleCSV = (jsonData) => {
    const csvData = jsonData.map((item) => {
      const status = item.status === 0 ? 'In Process' : 'Completed'
      return {
        ...item,
        status: status,
      }
    })
    const csv = Papa.unparse(csvData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    saveAs(blob, 'Maintenance_Vehicle.csv')
  }

  const vehicleFields = [
    'registrationNumber',
    'make',
    'postcode',
    'service_type',
    'workshop_name',
    'maintance_date',
    'time',
    'cost',
  ]

  const handleDownload = () => {
    MaintenanceVehicleCSV(maintenaceData, vehicleFields)
  }

  //for remove service
  const [DeletedPopUp, setDeletedPopup] = useState(false)

  const deletevehicalid = async () => {
    await maintenanceVehicleDelete(DeleteVehicleId).then((res) => {
      if (res.status === 200) {
        setVisibleRemove(!visibleRemove)

        LoadMaintenacelist()
        // handleFilter()
        // window.location.reload()
      } else {
        setDeletedPopup(true)
      }
    })
  }

  const DeletePopUp = (ID) => {
    setVisibleRemove(!visibleRemove)
    setDeletVehicle(ID)
  }

  //delete service
  const [deletedServicePopUp, setDeleteServicePopUp] = useState(false)

  const deleteserviceid = async () => {
    const data = {
      id: DeleteService,
      num: vehicleNo,
    }
    await maintenanceServiceDelete(data).then((res) => {
      if (res.data === 'deleted') {
        LoadMaintenacelist()
        setVisibleDelete(!visibleDelete)
        // window.location.reload()
      } else {
        setDeleteServicePopUp(true)
      }
    })
  }

  const DeleteServicePopUp = (ID, register_no) => {
    setVisibleDelete(!visibleDelete)
    setDeleteService(ID)
    setVehicleNo(register_no)
  }

  //to navigate at add user components
  // const onaddVehicle = () => {
  //   navigate('/vehicle-management/vehicle-add')
  // }

  // const headerKeys = Object.keys(Object.assign({}, ...array))

  return (
    <div>
      {loading ? (
        <LoaderScreen />
      ) : (
        <div className="div_userDetails">
          <CForm className=" row w-100">
            <CCol xs="auto" className="w-100" /* style={{ paddingLeft:49 }} */>
              <h1 className="hh ps-3">Maintenance</h1>
            </CCol>
            <CCol xs="auto" className="w-100 ps-2">
              <button
                className="dutobutton "
                onClick={handleDownload}
                style={{ background: '#FF1E1C', border: 'none', color: '#fff' }}
              >
                <CIcon icon={cilDataTransferDown} size="xm" style={{ marginRight: '4px' }} />
                Download Report
              </button>
            </CCol>
          </CForm>

          <div className="user_middle_function"></div>
          <div className="allUserTable" style={{ overflowX: 'auto' }}>
            <CTable className="alldriverTable" style={{ tableLayout: 'fixed' }}>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell
                    className="tablecell user_tableHead ps-3"
                    style={{ width: 165 }}
                  >
                    {' '}
                    Licence Plate No
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    className="tablecell tablecell_id user_tableHead ps-3"
                    style={{ width: 150 }}
                  >
                    Make
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 110 }}>
                    Postcode
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 160 }}>
                    Type
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 185 }}>
                    Work Shop Name
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 125 }}>
                    Date
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 125 }}>
                    Time
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 140 }}>
                    Status
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    className="tablecellvehicle user_tableHead"
                    style={{ width: 215 }}
                  >
                    Cost
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              {currentMaintenaceVehicle.map((user, index) => (
                <CTableBody key={index}>
                  <CTableRow className="vehicaletable">
                    <CTableDataCell className="tablecell ps-3">
                      {user.registrationNumber}
                    </CTableDataCell>
                    <CTableDataCell className="tablecell ps-3">{user.make}</CTableDataCell>
                    <CTableDataCell className="tablecell">{user.postcode}</CTableDataCell>
                    <CTableDataCell className="tablecell">{user.service_type} </CTableDataCell>
                    <CTableDataCell className="tablecell">{user.workshop_name} </CTableDataCell>
                    <CTableDataCell className="tablecell">
                      <span>{moment(user.maintance_date).format('DD-MM-YYYY')}</span>{' '}
                    </CTableDataCell>
                    <CTableDataCell className="tablecell">{user.time}</CTableDataCell>

                    {user.status === 0 ? (
                      <CTableDataCell className="tablecell"> In Process </CTableDataCell>
                    ) : (
                      <CTableDataCell className="tablecell"> Completed </CTableDataCell>
                    )}

                    <CTableDataCell
                      className="tablecell tablecellvehicle ps-2"
                      style={{ width: 280 }}
                    >
                      <span>
                        {/* <img src={drivermod} height={33} width={36} style={{ borderRadius:5 }} className="editavatar" /> */}
                      </span>
                      {`£`}&nbsp;{user.cost}{' '}
                    </CTableDataCell>

                    <CTableDataCell className="vihicaleditcontent">
                      {user.status === 0 ? (
                        <>
                          {moment(user.maintance_date).format('yyyy-MM-DD') > currentDate ? (
                            <button
                              onClick={() => {
                                editVehicle(user)
                              }}
                              className="vehicleEditBtn"
                            >
                              <i className="fas fa-edit" width={15}></i>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                editVehicle(user)
                              }}
                              className="vehicleEditBtn maintenance_button_unSelect"
                            >
                              <i className="fas fa-edit" width={15}></i>
                            </button>
                          )}
                          <button
                            className="vehicleEditBtn"
                            onClick={() => {
                              DeletePopUp(user.id)
                            }}
                          >
                            <i class="fas fa-check-square" width={15}></i>
                          </button>
                          <button
                            className="userEditBtn "
                            onClick={() => {
                              DeleteServicePopUp(user.id, user.registrationNumber)
                            }}
                          >
                            <i className="fa-solid fa-trash-can" width={15}></i>
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="vehicleEditBtn maintenance_button_unSelect">
                            <i className="fas fa-edit" width={15}></i>
                          </button>
                          <button className="maintenance_button_unSelect vehicleEditBtn">
                            <i class="fas fa-check-square" width={15}></i>
                          </button>
                          <button className="userEditBtn maintenance_button_unSelect">
                            <i className="fa-solid fa-trash-can" width={15}></i>
                          </button>
                        </>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              ))}
            </CTable>
          </div>
          {/* pagination */}
          {maintenaceData.length > 8 && (
            <div className="driverpagination">
              <TablePagination
                component="div"
                count={maintenaceData.length}
                page={currentPage - 1}
                onPageChange={handlePageChange}
                rowsPerPage={vehiclesPerPage}
                rowsPerPageOptions={[]}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          )}
          <>
            <CModal
              alignment="center"
              visible={visibleRemove}
              onClose={() => setVisibleRemove(false)}
            >
              <CModalBody>
                <CModalTitle className="model_title text-center ps-0">
                  Are you sure your service has been done?
                </CModalTitle>
              </CModalBody>

              <div className="popupdeletebutton">
                <div
                  className="popupcancelbutton d-flex justify-content-center align-items-center"
                  onClick={() => setVisibleRemove(false)}
                >
                  Cancel
                </div>
                <div
                  className="popupeditbutton d-flex justify-content-center align-items-center"
                  onClick={() => deletevehicalid()}
                >
                  Yes
                </div>
              </div>
            </CModal>
          </>

          <>
            <CModal
              alignment="center"
              visible={visibleDelete}
              onClose={() => setVisibleDelete(false)}
            >
              <CModalBody>
                <CModalTitle className="model_title text-center ps-0 ">
                  Are you sure you want to delete this service?
                </CModalTitle>
              </CModalBody>
              <CModalFooter className="p-0" style={{ height: 50 }}>
                <div className="popUpCancelBtn mt-0 mb-0" onClick={() => setVisibleDelete(false)}>
                  Cancel
                </div>
                <div className="popUpBtn mt-0 mb-0" onClick={() => deleteserviceid()}>
                  Yes
                </div>
              </CModalFooter>
            </CModal>
          </>

          {conPopups && (
            <ConPopups
              data={userSingleData}
              height={height}
     
              onClick={getBoolianVar}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Maintenancelist
