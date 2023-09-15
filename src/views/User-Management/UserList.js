/* eslint-disable */
import {
  CTable,
  CModal,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCol,
  CForm,
  CButton,
  CFormInput,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDetails, userDelete, uploadDocs, PushNotificationUser } from '../api/api'
import Conformuplord from './Upload-Popup.js'
import Conformpopup from './Edit-User'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TablePagination } from '@mui/material'
import LoaderScreen from '../Loader/LoaderScreen'

const VehicleTracking = (props) => {
  const { mainUserName, mainRole, mainUserId } = props
  const [userDetails, setuserDetails] = useState([])
  const [userSearchBar, setUserSearchBar] = useState([])
  const [searchBar, setSearchBar] = useState(0)
  const [userSingleData, setuserSingleData] = useState([])
  const [DeleteUserName, setDeleteUserName] = useState('')
  const [userSearch, setUserSearch] = useState([])
  const [conformPopup, setConformpopup] = useState(false)
  const [role, setrole] = useState(true)
  const [loading, setLoading] = useState(false)
  const [conformuplord, setConformUplord] = useState(false)
  const [setPage] = useState(2)
  const [DeleteUserId, setDeletUser] = useState('')
  const [visible, setVisible] = useState(false)
  const [visibleUpload, setVisibleUpload] = useState(false)
  const [file, setFile] = useState(null)
  const [UserId, setUserId] = useState('')

  const [array, setArray] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const fileReader = new FileReader()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    LoadUserDetails()
    LoadUserRole()
  }, [])

  // search function--------------------------
  const [FilterValues, setFilterValues] = useState(null)

  const handleFilter = (e) => {
    if (e.target.value == '') {
      setUserSearchBar(0)
      setSearchBar(0)
      setuserDetails(userSearch)
    } else {
      setSearchBar(1)
      const filterResult = userDetails.filter(
        (item) =>
          item.user_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_rol.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_job_title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_email.toString().includes(e.target.value.toString()) ||
          item.user_mobile_phone.toString().includes(e.target.value.toString()) ||
          item.user_address.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_country.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_city.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_cost_centre.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_postcode.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.user_status.toLowerCase().includes(e.target.value.toLowerCase()),
      )

      // setuserDetails(filterResult)
      setuserDetails(filterResult)
    }
    setFilterValues(e.target.value)
  }

  //load user role details
  const LoadUserRole = async () => {
    const roleID = localStorage.getItem('role')
    setrole(roleID)
  }
  const getuplordver = (boolian) => {
    setConformUplord(boolian)
  }

  //load all user details
  const LoadUserDetails = async () => {
    const result = await UserDetails().then((res) => {
      if (res.status === 200) {
        setLoading(false)
        setuserDetails(res.data)
        setUserSearch(res.data)
      }
    })
  }

  //for popup edit window
  const getBoolianVar = (boolian) => {
    setConformpopup(boolian)
  }

  //to pass selected user id
  const editUser = async (ID, name) => {
    setuserSingleData(ID)

    setConformpopup(true)
  }

  //for delete user
  const deleteUser = async () => {
    await userDelete(DeleteUserId).then((res) => {
      if (res.data === 'deleted') {
        // DeletePushNotification()
        setVisible(!visible)

        LoadUserDetails()
      } else {
        // DeleteErrorPushNotification()
      }
    })
  }

  const DeletePushNotification = async () => {
    toast.success(`${DeleteUserName} is delete from the database`)
    const msg = `${mainUserName} deleted a ${DeleteUserName} user`
    await PushNotificationUser(msg)
  }
  const DeleteErrorPushNotification = () => {
    toast.error(`there is an error while deleting user!`)
  }

  //to navigate at add user components
  const onaddUser = async () => {
    navigate('/user-management/add-user')
  }

  //Delete Popup Window
  const DeletePopUp = (ID, name) => {
    setVisible(!visible)
    setDeletUser(ID)
    setDeleteUserName(name)
  }

  //handle img file
  const saveFile = (e) => {
    setFile(e.target.files[0])
  }

  //csv file convert
  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',')
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n')

    const array = csvRows.map((i) => {
      const values = i.split(',')
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index]
        return object
      }, {})
      return obj
    })

    setArray(array)
  }

  //conform upload img
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    if (file) {
      const formData = new FormData()
      formData.append('image', file)

      const result = await uploadDocs(formData, UserId)
      if (result.data == 'Failed') {
        notifyFailed()
      } else if (result.data == 'success') {
        setVisibleUpload(false)
        notify()
      }
    }
  }

  //for upload pop-up
  const uploadFuction = (e) => {
    setVisibleUpload(!visibleUpload)

    setUserId(e)
  }

  //for get image
  const getImage = async () => {
    const result = await getImages()
      .then((res) => res.blob())
      .then((blob) => setImageUrl(URL.createObjectURL(blob)))

  }

  //for notification
  const notify = () => toast.success('Image Uploaded Successfully')
  const notifyFailed = () => toast.error('Something went wrong')

  //Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(8)
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = userDetails.slice(indexOfFirstUser, indexOfLastUser)

  const handlePageChange = (event, page) => {
    setCurrentPage(page + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setUsersPerPage(parseInt(event.target.value, 8))
    setCurrentPage(1) // Reset to the first page when changing the number of drivers per page
  }

  return (
    <>
      {loading ? (
        <LoaderScreen />
      ) : (
        <div className="div_userDetails">
          {/* User Management Module */}
          <h1 className="hh user_managemnet_text">User Management</h1>
          <div className="user_middle_function">
            <div className="user_search">
              <CForm className=" row g-3 ps-3 w-100">
                <CCol xs="auto">
                  <CFormInput
                    className="User_serch"
                    type="text"
                    placeholder="Search "
                    value={FilterValues}
                    onChange={handleFilter}
                  />
                  <i className="fa fa-search userSerachIcon" aria-hidden="true"></i>
                </CCol>
                <CCol xs="auto">
                  {role == 'Admin' ? (
                    <>
                      <CButton
                        className="AddUserBtn_btn"
                        onClick={() => {
                          onaddUser()
                        }}
                      >
                        Add User
                      </CButton>
                      {/* <CButton
                        className="AddUserBtn_btn"
                        onClick={() => {
                          getImage()
                        }}
                      >
                        Add User
                      </CButton> */}
                    </>
                  ) : (
                    <></>
                  )}
                </CCol>
              </CForm>

              {/* <><img src={imageUrl} alt="image" />;</> */}
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
                    Name
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    className="tablecell tablecell_id user_tableHead"
                    style={{ width: 80 }}
                  >
                    Role
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: '214px' }}>
                    Email
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    className="tablecell user_tableHead user_addr"
                    style={{ width: 270 }}
                  >
                    Address
                  </CTableHeaderCell>

                  <CTableHeaderCell className="tablecell user_tableHead" style={{ width: 135 }}>
                    Mobile Number
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    className="tablecell user_tableHead user_cost"
                    style={{ width: 110 }}
                  >
                    Cost Centre
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    className="tablecell user_tableHead user_addr"
                    style={{ width: 140 }}
                  >
                    Country
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    className="tablecell user_tableHead user_addr"
                    style={{ width: 120 }}
                  >
                    City
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead user_post">
                    Postcode
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell user_tableHead user_post">
                    Status
                  </CTableHeaderCell>
                  <CTableHeaderCell className="tablecell tablecell_upload  user_tableHead"></CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              {currentUsers.map((user) => {
                return (
                  <CTableBody>
                    <CTableRow>
                      <CTableDataCell className="tablecell ps-3">
                        <span>{/* <img src={avatar} height={40} className="editavatar" /> */}</span>
                        {user.user_name}
                      </CTableDataCell>

                      <CTableDataCell className="tablecell">{user.user_rol}</CTableDataCell>
                      <CTableDataCell className="tablecell">{user.user_email}</CTableDataCell>

                      <CTableDataCell className="tablecell user_add_details">
                        {user.user_address}
                      </CTableDataCell>
                      <CTableDataCell className="tablecell">
                        {user.user_mobile_phone}
                      </CTableDataCell>
                      <CTableDataCell className="tablecell">{user.user_cost_centre}</CTableDataCell>
                      <CTableDataCell className="tablecell">{user.user_country}</CTableDataCell>
                      <CTableDataCell className="tablecell">{user.user_city}</CTableDataCell>
                      <CTableDataCell className="tablecell">{user.user_postcode}</CTableDataCell>
                      <CTableDataCell className="tablecell">{user.user_status}</CTableDataCell>
                      <CTableDataCell className="tablecell edit_delete_btn">
                        {/* <button onClick={() => uploadFuction(user.id)} className="userEditBtn">
                            {' '}
                            <img src={Management} height={20} />
                          </button> */}
                        <button
                          onClick={() => {
                            editUser(user.id)
                          }}
                          className="userEditBtn"
                        >
                          <i className="fas fa-edit" width={15}></i>
                        </button>
                        <button
                          onClick={() => {
                            DeletePopUp(user.id, user.user_name)
                          }}
                          className="userEditBtn "
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
          <>
            <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
              <CModalBody>
                <CModalTitle className="model_title text-center ps-0 ">
                  Are you sure you want to this delete?
                </CModalTitle>
              </CModalBody>
              <CModalFooter className="p-0" style={{ height: 50 }}>
                <div
                  className="popUpCancelBtn mt-0 mb-0"
                  style={{ height: 50, display: 'flex', alignItems: 'center' }}
                  onClick={() => setVisible(false)}
                >
                  Cancel
                </div>
                <div className="popUpBtn mt-0 mb-0" onClick={() => deleteUser()}>
                  Ok
                </div>
              </CModalFooter>
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

          {conformPopup && (
            <Conformpopup
              data={userSingleData}
              mainUserName={mainUserName}
              mainRole={mainRole}
              mainUserId={mainUserId}
              onClick={getBoolianVar}
            />
          )}
          {conformuplord && <Conformuplord onClick={getuplordver} />}

          <ToastContainer />
        </div>
      )}

      {/* <nav className='mt-5 mypagination'>
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" onClick={prepage}>
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            {
              number.map((no, index) => (
                <li className={`page-item ${currentpage === no ? `active` : ''}`} key={index}>
                  <a href='#' className={`page-link ${currentpage === no ? 'active-link' : ''}`} onClick={() => changeCpage(no)}>{no}</a>
                </li>
              ))
            }
          </li>
          <li className="page-item">
            <a className="page-link" href="#" onClick={nextPage}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav> */}

      {/* pagination */}
      {userDetails.length > 8 && (
        <div className="driverpagination">
          <TablePagination
            component="div"
            count={userDetails.length}
            page={currentPage - 1}
            onPageChange={handlePageChange}
            rowsPerPage={usersPerPage}
            rowsPerPageOptions={[]}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      )}
    </>
  )
}

export default VehicleTracking

{
  /* <CTableDataCell >
// {/* <span className='uploadiconUser'></span> */
}
// <button onClick={() => { editUser(user.id) }} className='uerEditBtn'>Edit</button>
// <button onClick={() => { deleteUser(user.id,user.user_name) }} className='uercloseBtn '>Delete</button>
// </CTableDataCell> */}

// /* eslint-disable */
// import { CTable, CCol, CForm, CFormLabel, CButton, CFormInput, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CHeader } from '@coreui/react';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { Await, useNavigate, useParams } from 'react-router-dom';
// import * as icon from '@coreui/icons'
// import TablePagination from '@mui/material/TablePagination'
// import { UserDetails, userDelete, userEdit } from '../api/api';
// import Conformuplord from './Conformuplord.js'
// import Conformpopup from './Conformpopus'
// import avatar from '../../assets/images/avatars/Ellipse.png'
// import CIcon from '@coreui/icons-react'
// import moment from 'moment'
// import addNotification from 'react-push-notification';
// import { Notifications } from 'react-push-notification';
// import {cilTrash,cilClipboard,cilAccountLogout,cilDescription} from '@coreui/icons'

// const url = "http://localhost:8010";

//   const LoadUserRole = async () => {
//     const roleID = localStorage.getItem('role');
//     console.log(roleID, 'getting data grom local strorage');
//     setrole(roleID)

//   }
//   const handluplord = async () => {
//     setConformUplord(true)
//   }
//   const getuplordver = (boolian) => {
//     setConformUplord(boolian)
//   }
//   // const dateformet = moment(dateofbarth).format('yyyy-MM-DD')
//   // //load all user details
//   const LoadUserDetails = async () => {
//     const result = await UserDetails()
//     setuserDetails(result.data)
//     // setDateOfBarth(result.data[0].user_date_of_birth)
//     // console.log(result.data[0].user_date_of_birth)
//   }

//   //for popup edit window
//   const getBoolianVar = (boolian) => {
//     setConformpopup(boolian)
//   }

//   //to pass selected user id
//   const editUser = async (ID) => {
//     setuserSingleData(ID)
//     setConformpopup(true)
//   }

//   //for delete user
//   const deleteUser = async (ID,UserName) => {
//     await userDelete(ID)
//       .then((res) => {
//         if (res.data === 'deleted') {
//           console.log('user deleted');
//           LoadUserDetails()
//           DeletePushNotification(UserName)
//         }
//         else {
//           console.log('something wrong');
//         }
//       })

//   }

//   const DeletePushNotification = (UserName) => {
//     console.log(UserName,"deleted")
//     addNotification({
//       title: `${UserName} User Deleted `,
//       message: 'Make sure that user is Offline',
//       native:true ,

//     })
//   }

//   const popEdit = () => {
//     setpopupEdit(true)

//   }

//   //to navigate at add user components
//   const onaddUser = () => {
//     navigate('/userAdd')
//     console.log('navigate hitted');
//   }

//   return (
//     <div className='div_userDetails'>
//       <h1 className='hh'>User Management</h1>
//       <div className='user_middle_function'>
//         <div className='user_search'>
//           <CForm className=" row g-3">

//             <CCol xs="auto">

//               <CFormInput className='User_serch' type="text" placeholder="Search " />
//               <i className="fa fa-search faiconesubmit" aria-hidden="true"></i>

//             </CCol>

//             <CCol xs="auto">
//               <CButton className="editSubmitBtn" onClick={() => { onaddUser() }}>
//                 Add User
//               </CButton>
//             </CCol>
//           </CForm>
//         </div>

//       </div >
//       <div className='allUserTable'>
//         <CTable className='alluserCtable' style={{ tableLayout: 'fixed' }}>
//           <CTableHead>
//             <CTableRow>

//               <CTableHeaderCell className='tablecell user_tableHead'>User Name</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell tablecell_id user_tableHead'>User ID</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>User Email</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Mobile Phone</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Full Name</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>N I Number</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Address</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Work Phone</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Postcode</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Cost Centre</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>City</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Country</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Job Title</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Department</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Empl Number</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Account Notes</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Driver Notes</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Company Name</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Payroll Number</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Line Manager</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Account Number</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Date Of Birth</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Home Phone</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell user_tableHead'>Password</CTableHeaderCell>
//               <CTableHeaderCell className='tablecell tablecell_upload user_tableHead'></CTableHeaderCell>
//               <CTableHeaderCell className='tablecell  user_tableHead'></CTableHeaderCell>
//             </CTableRow>
//           </CTableHead>
//           {userDetails.map((user) => (
//             <CTableBody>

//               <CTableRow>

//                 <CTableDataCell className='tablecell'><span><img src={avatar} height={40} className="editavatar" /></span>{user.user_name}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.id}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_email}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_mobile_phone}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_full_name}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_national_insurance_number}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_address}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_work_phone}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_postcode}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_cost_centre}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_city}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_country}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_job_title}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_department}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_employee_number}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_my_account_notes}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_my_driver_notes}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_company_name}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_payroll_number}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_line_manager}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_account_number}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{ moment(user.user_date_of_birth).format('DD-MM-yyyy')}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_home_phone}</CTableDataCell>
//                 <CTableDataCell className='tablecell'>{user.user_home_phone} </CTableDataCell>
//                 <CTableDataCell className='tablecell'>
//                 <CIcon
//                   icon={icon.cilCloudUpload}
//                   className="clodude"
//                   style={{ padding: 5 }}
//                   onClick={handluplord}
//                 />
//                    </CTableDataCell>

//                 {
//                   popupEdit == false ?
//                     <><CTableDataCell className='popEdit_dot' onClick={() => { popEdit(user.id,user.user_date_of_birth) }}> ...</CTableDataCell></>

//                     : popupEdit == true ?
//                       <>
//                         {
//                           role == 'admin' ?
//                             <>
//                              <CTableDataCell >
//                                 {/* <span className='uploadiconUser'></span> */}
//                                 <button onClick={() => { editUser(user.id) }} className='uerEditBtn'><CIcon icon={cilDescription} className='cilTrash_icon'/></button>
//                                 <button onClick={() => {  deleteUser(user.id,user.user_name) }} cla
//                                 ssName='uerEditBtn '><CIcon icon={cilTrash} className='cilTrash_icon'/></button>
//                               </CTableDataCell>

//                             </>
//                             : role == 'user' ?
//                               <>
//                                 <CButton className="uerEditBtn">
//                                   user
//                                 </CButton>
//                               </> :
//                               <>
//                                 <CButton className="uerEditBtn">
//                                   Not
//                                 </CButton>
//                               </>

//                         }

//                       </>
//                       :
//                       <></>
//                 }

//               </CTableRow>
//             </CTableBody>
//           ))

//           }
//         </CTable>
//       </div>
//       <div className="driverpagination">
//         <TablePagination
//           component="div"
//           count={1}
//           page={100}
//           onPageChange={''}
//           rowsPerPage={''}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </div>

//       {conformPopup && <Conformpopup data={userSingleData} onClick={getBoolianVar} />}
//       {conformuplord && <Conformuplord onClick={getuplordver} />}
//     </div>

//   )

// }

// export default VehicleTracking

// {/* <CTableDataCell >
// // {/* <span className='uploadiconUser'></span> */}
// // <button onClick={() => { editUser(user.id) }} className='uerEditBtn'>Edit</button>
// // <button onClick={() => { deleteUser(user.id,user.user_name) }} className='uercloseBtn '>Delete</button>
// // </CTableDataCell> */}
