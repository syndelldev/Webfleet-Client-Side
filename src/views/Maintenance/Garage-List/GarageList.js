/* eslint-disable */

import React, { useEffect, useState } from 'react'
import {
    CTable,
    CButton,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalBody,
    CForm,
    CFormInput,
    CModalTitle,
    CCol,
    CModalFooter,
} from '@coreui/react'
import TablePagination from '@mui/material/TablePagination'
import { useNavigate } from 'react-router-dom'
import { garageDetails } from 'src/views/api/VehicleApi'
import logoimages from '../../../assets/images/avatars/logo1.ico'
import { deleteGarage, editGarageId } from 'src/views/api/api'
import EditGarage from 'src/views/Maintenance/Garage-List/EditGarage'

const GarageList = () => {

    const [loading, setLoading] = useState(true)
    const [garageData, setGarageData] = useState([])

    const [FilterValues, setFilterValues] = useState(null)
    const [garageSearch, setGarageSearch] = useState('')
    const [garageSearchResult, setGarageSearchResult] = useState([])

    const [visibleDelete, setVisibleDelete] = useState(false)
    const [deleteGarageId, setDeleteGarageId] = useState('')
    const [editpopup, setEditPopup] = useState(false)
    const [singleData, setSingleData] = useState([])

    const [conPopups, setConPopups] = useState(false)
    let height = document.documentElement.scrollHeight







    const GetGarageDetails = async () => {
        const result = await garageDetails()
        setGarageData(result.data)
        setGarageSearch(result.data)
        setLoading(false)
    }

    useEffect(() => {
        GetGarageDetails()
    }, [])

    const navigate = useNavigate()

    //Edit Garage
    const handleEdit = async (ID) => {
      
          setEditPopup(true)
          setSingleData(ID)

      }
    
    const editGaragedata = (boolian) => {
        setEditPopup(boolian)
    }

    //delete Garage
    const handleDelete = async () => {
        await deleteGarage(deleteGarageId).then((res) => {
          if (res.data === 'deleted') {
            setVisibleDelete(!visibleDelete)
            window.location.reload()
            GetGarageDetails()
          } else {
            setDeletePopup(true)
          }
        })
      }

    const deletePopUp = (id) => {
        setVisibleDelete(!visibleDelete)
        setDeleteGarageId(id)
    }

    //  Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [garagePerPage, setGaragePerPage] = useState(8)
    const indexOfLastGarage = currentPage * garagePerPage
    const indexOfFirstGarage = indexOfLastGarage - garagePerPage
    const currentGarage = garageSearch.slice(indexOfFirstGarage, indexOfLastGarage);

    const handlePageChange = (event, page) => {
        setCurrentPage(page + 1)
    }

    const handleChangeRowsPerPage = (event) => {
        setGaragePerPage(parseInt(event.target.value, 8))
        setCurrentPage(1) // Reset to the first page when changing the number of drivers per page
    }

    // -------------------------- search ----------------------------------------

    const handleFilter = (e) => {
        if (e.target.value == '') {
            setGarageSearch(garageData)
        } else {
            const filterResult = garageData.filter(
                (item) =>
                    item.garage_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.garage_type.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.garage_phone.toString().includes(e.target.value.toString()) ||
                    item.garage_email.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.garage_address.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.garage_owner.toLowerCase().includes(e.target.value.toLowerCase()) ||
                    item.garage_postcode.toLowerCase().includes(e.target.value.toLowerCase()),
            )
            // setRolebaseDrivers(filterResult)
            setGarageSearch(filterResult)
        }
        setFilterValues(e.target.value)
    }


    const handleAddGarage = async () => {
        // setConformpopup(true)
        navigate('/maintenance/add-garage')
      }

    
    return (
        <>
            {loading ?
                <div className="loader-container">
                    <div className="spinner"> </div>
                    <img src={logoimages} style={{ width: 35, height: 35 }} />
                </div>
                :
                <div sx={{ width: '100%' }}>
                    <>
                        <div className="mb-4 driversidebar">
                            <div className="selecthaddingname">Garage List</div>
                            <CForm className="row g-3 w-100">
                                <CCol xs="auto" style={{ padding: '0px 3px' }}>
                                    <i className="fa fa-search driverSerachIcon" aria-hidden="true"></i>
                                    <CFormInput
                                        className="User_serch"
                                        type="text"
                                        placeholder="Search "
                                        value={FilterValues}
                                        onChange={handleFilter}
                                    />
                                </CCol>
                                <CCol xs="auto">
                                    <CButton
                                        className="AddUserBtn_btn"
                                        onClick={() => {
                                            handleAddGarage()
                                        }}
                                    >
                                        Add Garage
                                    </CButton>
                                </CCol>
                            </CForm>
                        </div>
                        <div className="drivertraking" style={{ margin: 'auto' }}>
                            <CTable className="alldriverTable" style={{ tableLayout: 'fixed' }}>
                                <CTableHead>
                                    <CTableRow style={{ verticalAlign: 'middel' }}>
                                        <CTableHeaderCell
                                            className="tablecell drivertablehadding ps-3"
                                            style={{ width: 132 }}
                                        >
                                            Garage Name
                                        </CTableHeaderCell>
                                        {/* <CTableHeaderCell
                                            className="tablecell drivertablehadding ps-2"
                                            style={{ width: 100 }}
                                        >
                                            Type
                                        </CTableHeaderCell> */}
                                        <CTableHeaderCell
                                            className="tablecell drivertablehadding ps-2"
                                            style={{ width: 122 }}
                                        >
                                            Phone
                                        </CTableHeaderCell>

                                        <CTableHeaderCell
                                            className="tablecell drivertablehadding ps-2"
                                            style={{ width: 155 }}
                                        >
                                            Email
                                        </CTableHeaderCell>
                                        <CTableHeaderCell
                                            className="tablecell drivertablehadding ps-2"
                                            style={{ width: 250 }}
                                        >
                                            Address
                                        </CTableHeaderCell>
                                        <CTableHeaderCell
                                            className="tablecell drivertablehadding ps-2"
                                            style={{ width: 120 }}
                                        >
                                            Owner Name
                                        </CTableHeaderCell>
                                        <CTableHeaderCell
                                            className="tablecell drivertablehadding ps-2"
                                            style={{ width: 260 }}
                                        >
                                            Postcode
                                        </CTableHeaderCell>
                                        {/* <CTableHeaderCell className="Actions" style={{ width: 170 }}>
                                            {' '}
                                        </CTableHeaderCell> */}
                                    </CTableRow>
                                </CTableHead>
                                { currentGarage.map((user, index) => {
                                        {/* if (user.role_id === 0) */ }
                                        return (
                                            <CTableBody key={index}>
                                                <CTableRow
                                                    style={{
                                                        width: '100%',
                                                        borderBottom: '1px solid #d8dbe0',
                                                        borderTop: '1px solid #d8dbe0',
                                                    }}
                                                >
                                                    <CTableDataCell className="drivertablerows ps-3">
                                                        {user.garage_name}
                                                    </CTableDataCell>
                                                    {/* <CTableDataCell className="drivertablerows">
                                                        {user.garage_type}
                                                    </CTableDataCell> */}
                                                    <CTableDataCell className="drivertablerows">
                                                        {user.garage_phone}
                                                    </CTableDataCell>
                                                    <CTableDataCell className="drivertablerows" >
                                                        {user.garage_email}
                                                    </CTableDataCell>
                                                    <CTableDataCell className="drivertablerows" >
                                                        {user.garage_address}
                                                    </CTableDataCell>
                                                    <CTableDataCell className="drivertablerows" >
                                                        {user.garage_owner}
                                                    </CTableDataCell>
                                                    <CTableDataCell className="drivertablerows">
                                                        {user.garage_postcode}
                                                    </CTableDataCell>
                                                    <CTableDataCell className="tablecell vihicalemanagemntditcontent">
                                                        <button
                                                            onClick={() => {
                                                            handleEdit(user)
                                                            }}
                                                            className="vehicleEditBtn"
                                                        >
                                                            <i className="fas fa-edit" width={15}></i>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                deletePopUp(user.id)
                                                            }}
                                                            className="vehicleEditBtn"
                                                            >
                                                            <i className="fa-solid fa-trash-can" width={15}></i>
                                                        </button>
                                                    </CTableDataCell>
                                                </CTableRow>
                                            </CTableBody>
                                        )
                                    })}
                            </CTable>
                        </div>

                        {/* pagination */}
                        {garageData.length > 8 && (
                            <div className="driverpagination">
                                <TablePagination
                                    component="div"
                                    count={garageData.length}
                                    page={currentPage - 1}
                                    onPageChange={handlePageChange}
                                    rowsPerPage={garagePerPage}
                                    rowsPerPageOptions={[]}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </div>
                        )}
                    
                    <>
                        <CModal
                        alignment="center"
                        visible={visibleDelete}
                        onClose={() => setVisibleDelete(false)}
                        >
                        <CModalBody>
                            <CModalTitle className="model_title text-center ps-0 ">
                            Are you sure you want to delete this garage?
                            </CModalTitle>
                        </CModalBody>
                        <CModalFooter className="p-0" style={{ height: 50 }}>
                            <div className="popUpCancelBtn mt-0 mb-0" onClick={() => setVisibleDelete(false)}>
                            Cancel
                            </div>
                            <div className="popUpBtn mt-0 mb-0" onClick={handleDelete}>
                            Yes
                            </div>
                        </CModalFooter>
                        </CModal>
                    </>

                    {editpopup && (
                        <EditGarage height={height} data={singleData} onClick={editGaragedata} />
                    )}
                    </>
                </div>



            }
        </>
    )
}

export default GarageList
