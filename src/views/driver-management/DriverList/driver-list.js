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
import Editpopup from './EdiitDriver.js'
import { driverDetails, driverEdit, driverDelete, licenseImage, UploadDriverImage } from '../../api/api.js'
import logoimages from '../../../assets/images/avatars/logo1.ico'
import moment from 'moment'
import { LoadDriverDataApi, DeleteTheLicenseImage } from '../../api/VehicleApi.js'

const Select = (props) => {
  const { DriverData } = props
  const [popupEdit, setpopupEdit] = useState(false)
  const [conformPopup, setConformpopup] = useState(false)
  const [editpopup, setEditdriver] = useState(false)
  const [deletepopup, setDeletePopup] = useState(false)
  const [conformuplord, setConformUplord] = useState(false)
  const [driver, setDriver] = useState([])
  const [driverFilter, setdriverFilter] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleUpload, setVisibleUpload] = useState(false)
  const [VisibleDeleteValidation, setVisibleDeleteValidation] = useState(false)
  const [visibleImage, setVisibleImage] = useState(false)
  const [loading, setLoading] = useState(true)
  const [driveesingledata, setDriveeSingleData] = useState()
  const [file, setFile] = useState()
  const fileReader = new FileReader()
  const [DeleteDriver, setDeleteDriver] = useState('')
  const [selectedDriverId, setSelectedDriverId] = useState('')
  const [selectedDriverName, setSlectedDriverName] = useState('')
  const [rolebaseDrivers, setRolebaseDrivers] = useState([])
  const [ImageId, setImageId] = useState('')
  const [LicenseImg, setLicenseImg] = useState([])
  const [LicenseImgId, setLicenseImgId] = useState()

  const [ TotalUploadedImage, setTotalUploadedImage ] = useState([])
  let height = document.documentElement.scrollHeight
  const navigate = useNavigate()
  // ========================================= loder screen===================================
  useEffect(() => {
    //LoadUserDetails()
    // setLoading(true)
    LoadSetDriverProps()

    LoadDriverData()
    // handleImage()
  }, [])

  // -----------------------pagination ---------------------------------------
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage)
  // }

  const [currentPage, setCurrentPage] = useState(1)
  const [driversPerPage, setDriversPerPage] = useState(8)
  const indexOfLastDriver = currentPage * driversPerPage
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage
  const currentDrivers = rolebaseDrivers.slice(indexOfFirstDriver, indexOfLastDriver)
  const currentDriversUnfiltered = rolebaseDrivers.slice(indexOfFirstDriver, indexOfLastDriver)

  const handlePageChange = (event, page) => {
    setCurrentPage(page + 1)
  }

  const handleChangeRowsPerPage = (event) => {
    setDriversPerPage(parseInt(event.target.value, 8))
    setCurrentPage(1) // Reset to the first page when changing the number of drivers per page
  }

  // -------------------------- search ----------------------------------------
  const [FilterValues, setFilterValues] = useState(null)
  const [driverSearch, setDriverSearch] = useState(0)
  const [driverSearchResult, setDriverSearchResult] = useState([])
  const handleFilter = (e) => {
    var filterResult = []
    if (e.target.value == '') {
      // setRolebaseDrivers(driver)
      setDriverSearch(0)
    } else {
      setDriverSearch(1)

      filterResult = rolebaseDrivers.filter(
        (item) =>
          item.driver_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.assigned_vehicle_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.licesnse_no.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.status.toLowerCase().substring(0, e.target.value.length) ==
            e.target.value.toLowerCase() ||
          item.license_expire_date.toString().includes(e.target.value.toString()) ||
          item.phone.toString().includes(e.target.value.toString()) ||
          item.description.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.assigned_vehicle_number.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.fuel_card_name.toLowerCase().includes(e.target.value.toLowerCase()),
      )
      // setRolebaseDrivers(filterResult)
      setDriverSearchResult(filterResult)
    }
    setFilterValues(e.target.value)
  }

  const LoadUserDetails = async () => {
    const result = await driverDetails()
    setDriver(result.data)
    setdriverFilter(result.data)
  }
  const LoadSetDriverProps = async () => {
    setDriver(DriverData)
    setdriverFilter(DriverData)
    // setLoading(false)
  }

  const handluplord = async () => {
    setConformUplord(true)
  }

  const handledit = async (userData) => {
    console.log(userData, 'single sdta')
    setDriveeSingleData(userData)
    setEditdriver(true)
  }

  // ----------------------------- popup data ----------------------------
  const getBoolianVar = (boolian) => {
    setConformpopup(boolian)

    if (conformPopup !== 0) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }
  const getuplordver = (boolian) => {
    setConformUplord(boolian)
  }

  const editdriversdata = (boolian) => {
    setEditdriver(boolian)
  }
  const deleteevent = (boolian) => {
    setDeletePopup(boolian)
  }
  const handleLogin = async () => {
    // setConformpopup(true)
    navigate('/driver-management/add-driver')
  }

  //handle image upload
  const [imgUploadErr, setImgUploadErr] = useState('')
  const [image, setImage] = useState([])
  const [imagePreview, setImagePreview] = useState('')

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files

    if (selectedFiles) {
      const newImages = Array.from(selectedFiles)
      setImage(newImages)
    } else {
      setImage([])
    }

   
  }

  
  const handleUpload = async () => {
    // handleImage()
    if (image.length === 0) {
      setImgUploadErr('Please Select an Image to Upload.')
      return
    } else if (image.length > 3) {
      setImgUploadErr('You can upload a maximum 3 images.')
      return
    } else {
      const existingLicenseImages = LicenseImg.length + image.length

      if (existingLicenseImages > 3) {
        setImgUploadErr(`You have already uploaded ${LicenseImg.length} images.`)
      } else {
        const formData = new FormData()
        for (let i = 0; i < image.length; i++) {
          formData.append('image', image[i])
        }
        formData.append('driverId', selectedDriverId)
        formData.append('driverName', selectedDriverName)
        const result = await UploadDriverImage(formData)
        .then((response) => {
          if((response.status == 200)){
          console.log('File uploaded successfully.')
          setVisibleUpload(false)
          setImage([])
          window.location.reload()
          }
          else{
          setImgUploadErr('Error uploading file. Please try again.')

          }
        })
        setImgUploadErr('')
        }
      }
    }
  

  const uploadImgId = (driverId, driverName) => {
    setVisibleUpload(!visibleUpload)
    setSelectedDriverId(driverId)
    setSlectedDriverName(driverName)
  }

  const uploadCancle = () => {
    setVisibleUpload(false)
    setImagePreview('')
    setImgUploadErr('')
    setImage([])
  }

  // display image

  const handleImage = (data,id) => {
    console.log("test")
    setLicenseImg(data.split(','))  
    setLicenseImgId(id)
    setVisibleImage(true)
  }

  // const handleImage = (img) => {
  //   console.log('imges', LicenseImg);
  //   setLicenseImg(img);
  //   setVisibleImage(true)
  // }

  //Delete license image
  const HandleDeleteImgApi = async(imageFileName) => {
    console.log(imageFileName, 'img get')
    console.log(LicenseImg,"setLicenseImg")

    //for change the array 
    const filteredArray = LicenseImg.filter(item => item !== imageFileName);

    let data = {
      NewLicenseImage : filteredArray,
      deleteImageName : imageFileName,
      driverID : LicenseImgId
    }

    const result = await DeleteTheLicenseImage(data)
    .then((res)=>{
      if(res.status === 200){
        console.log("done")
        setLicenseImg(filteredArray)
      }
      else{

      }
    })

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
  const popEdit = () => {
    setpopupEdit(true)
  }
  //delete popup window
  const deletedriver = (ID) => {
    setVisible(!visible)
    setDeleteDriver(ID)
  }
  //for popup edit window

  //to pass selected user id
  const editUser = async (ID) => {
    setuserSingleData(ID)
    setConformpopup(true)
  }

  const DeleteDriverId = async () => {
    await driverDelete(DeleteDriver).then((res) => {
      if (res.data === 'deleted') {
        setVisible(!visible)
        window.location.reload()
        LoadUserDetails()
      } else {
        setDeletePopup(true)
      }
    })
  }

  const deletecancelpopup = () => {
    setVisible(!visible)
  }

  const LoadDriverData = async () => {
    const result = await LoadDriverDataApi().then((res) => {
      if (res.status === 200) {
        setLoading(false)
        setRolebaseDrivers(res.data)
        setDriver(res.data)
      }
    })
  }

  const HandleImageDisplayClose = () => {
    setVisibleImage(false)
    LoadDriverData()
    // Window.loading.reload()
  }

  return (
    <div>
      {loading === true && (
        <div className="loader-container">
          <div className="spinner"> </div>
          <img src={logoimages} style={{ width: 35, height: 35 }} />
        </div>
      )}
      <>
        <div sx={{ width: '100%' }}>
          <>
            <div className="mb-4 driversidebar">
              {/* Driver List Module */}
              <div className="selecthaddingname">Drivers List</div>
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
                      handleLogin()
                    }}
                  >
                    Add Driver
                  </CButton>
                </CCol>
              </CForm>
            </div>
            <div className="drivertraking" style={{ margin: 'auto' }}>
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
                      style={{ width: 122 }}
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
                      style={{ width: 180 }}
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
                    <CTableHeaderCell className="vihicalasign" style={{ width: 175 }}>
                      Vehicle's License No{' '}
                    </CTableHeaderCell>
                    <CTableHeaderCell className="Actions" style={{ width: 200 }}>
                      {' '}
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {driverSearch == 0
                  ? currentDrivers.map((user, index) => {
                      if (user.role_id === 0)
                        return (
                          <CTableBody key={index}>
                            <CTableRow
                              style={{
                                width: '100%',
                                borderBottom: '1px solid #d8dbe0',
                                borderTop: '1px solid #d8dbe0',
                              }}
                            >
                              <CTableDataCell
                                className="drivertablerows"
                                style={{ paddingLeft: 21 }}
                              >
                                {user?.driver_name}
                              </CTableDataCell>
                              <CTableDataCell className="drivertablerows">
                                {user.status}
                              </CTableDataCell>
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

                                {/* <CTableDataCell>
                            <CIcon
                              icon={icon.cilCloudUpload}
                              className="clodude"
                              onClick={() => { uploadImgId(user.id) }}
                            />
                            &nbsp;&nbsp;&nbsp;
                          </CTableDataCell>
                          <CTableDataCell>
                            <CTableDataCell className='drivereditupdatebutton'>
                              <button onClick={() => { handledit(user.id) }} className='driverEditBtn'><i className="fas fa-edit" width={15}></i></button>
                              <button onClick={() => { deletedriver(user.id) }} className='driverEditBtn '><i className="fa-solid fa-trash-can" width={15}></i></button>
                            </CTableDataCell>
                          </CTableDataCell> */}
                              </CTableDataCell>
                              {/* <CTableDataCell className="drivertablerows" style={{ width: 120 }}>
                         <img src= {`data:image/jpeg;base64,${user.image}`} style={{ width: 50, height: 45 }}/>
                        </CTableDataCell> */}
                              <CTableDataCell className=" d-flex justify-content-around">
                                <button
                                  onClick={() => {
                                    uploadImgId(user.id, user.driver_name)
                                  }}
                                  className="driverEditBtn"
                                >
                                  <i className="fas fa-cloud-arrow-up" width={15}></i>
                                </button>
                                <button
                                  onClick={() => {
                                    handledit(user)
                                  }}
                                  className="driverEditBtn"
                                >
                                  <i className="fas fa-edit" width={15}></i>
                                </button>
                                {user.assigned_vehicle_number === 'None' ||
                                user.assigned_vehicle_number === '' ? (
                                  <button
                                    onClick={() => {
                                      deletedriver(user.id)
                                    }}
                                    className="driverEditBtn "
                                  >
                                    <i className="fa-solid fa-trash-can" width={15}></i>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setVisibleDeleteValidation(true)
                                    }}
                                    className="driverEditBtn"
                                  >
                                    <i className="fa-solid fa-trash-can" width={15}></i>
                                  </button>
                                )}
                                {user.license_img.length === 0 ? (
                                  <>
                                    <button
                                      className="driverEditBtn license-img-none"
                                      style={{
                                        cursor: 'not-allowed',
                                        opacity: '0.5',
                                      }}
                                    >
                                      <i className="fas fa-images" width={15}></i>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="driverEditBtn license-img-none"
                                      onClick={() => {
                                        handleImage(user.license_img,user.id)
                                      }}
                                    >
                                      <i className="fas fa-images" width={15}></i>
                                    </button>
                                  </>
                                )}
                              </CTableDataCell>
                            </CTableRow>
                          </CTableBody>
                        )
                    })
                  : driverSearchResult.map((user, index) => {
                      if (user.role_id === 0)
                        return (
                          <CTableBody key={index}>
                            <CTableRow
                              style={{
                                width: '100%',
                                borderBottom: '1px solid #d8dbe0',
                                borderTop: '1px solid #d8dbe0',
                              }}
                            >
                              <CTableDataCell
                                className="drivertablerows"
                                style={{ paddingLeft: 21 }}
                              >
                                {user?.driver_name}
                              </CTableDataCell>
                              <CTableDataCell className="drivertablerows">
                                {user.status}
                              </CTableDataCell>
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

                                {/* <CTableDataCell>
                            <CIcon
                              icon={icon.cilCloudUpload}
                              className="clodude"
                              onClick={() => { uploadImgId(user.id) }}
                            />
                            &nbsp;&nbsp;&nbsp;
                          </CTableDataCell>
                          <CTableDataCell>
                            <CTableDataCell className='drivereditupdatebutton'>
                              <button onClick={() => { handledit(user.id) }} className='driverEditBtn'><i className="fas fa-edit" width={15}></i></button>
                              <button onClick={() => { deletedriver(user.id) }} className='driverEditBtn '><i className="fa-solid fa-trash-can" width={15}></i></button>
                            </CTableDataCell>
                          </CTableDataCell> */}
                              </CTableDataCell>
                              {/* <CTableDataCell className="drivertablerows" style={{ width: 120 }}>
                         <img src= {`data:image/jpeg;base64,${user.image}`} style={{ width: 50, height: 45 }}/>
                        </CTableDataCell> */}
                              <CTableDataCell className=" d-flex justify-content-around">
                                {/* <CIcon
                            icon={icon.cilCloudUpload}
                            className="clodude"
                            onClick={() => { uploadImgId(user.id) }}
                          /> */}
                                <button
                                  onClick={() => {
                                    uploadImgId(user.id, user.driver_name)
                                  }}
                                  className="driverEditBtn"
                                >
                                  <i className="fas fa-cloud-arrow-up" width={15}></i>
                                </button>
                                <button
                                  onClick={() => {
                                    handledit(user)
                                  }}
                                  className="driverEditBtn"
                                >
                                  <i className="fas fa-edit" width={15}></i>
                                </button>
                                {user.assigned_vehicle_number === 'None' ||
                                user.assigned_vehicle_number === '' ? (
                                  <button
                                    onClick={() => {
                                      deletedriver(user.id)
                                    }}
                                    className="driverEditBtn "
                                  >
                                    <i className="fa-solid fa-trash-can" width={15}></i>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      setVisibleDeleteValidation(true)
                                    }}
                                    className="driverEditBtn"
                                  >
                                    <i className="fa-solid fa-trash-can" width={15}></i>
                                  </button>
                                )}
                                {/* <button                                  
                                  className="driverEditBtn"
                                >
                                  <i className="fas fa-images" width={15}></i>
                                </button> */}
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
                  <CModalTitle className="model_title text-center">
                    Are you want to delete this ?
                  </CModalTitle>
                </CModalBody>
                <div className="popupdeletebutton">
                  <button className="popupcancelbutton" onClick={deletecancelpopup} type="submit">
                    {' '}
                    Cancel{' '}
                  </button>
                  <button className="popupeditbutton" onClick={DeleteDriverId} type="submit">
                    {' '}
                    Ok
                  </button>
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
                  <div className="text-center ">
                    {/* {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ maxWidth: '300px', maxHeight: '300px', marginTop: '20px' }}
                      />
                    )} */}

                    {image.map((file, index) => (
                      <div key={index}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index}`}
                          style={{ maxWidth: '300px', maxHeight: '300px', marginTop: '20px' }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="file-input" style={{ marginLeft: '30%' }}>
                    <input
                      className="file-input__input"
                      type="file"
                      name="image"
                      id="file-input"
                      accept="image/*"
                      onChange={handleFileChange}
                      multiple
                      // onChange={saveFile}
                      // style={{ display: 'block', margin: '68px auto', cursor: 'pointer' }}
                    />
                    <label class="file-input__label" for="file-input">
                      <i className="fas fa-upload"></i>
                      <span>Upload Image </span>
                    </label>
                  </div>
                  {imgUploadErr && (
                    <span className='driverList_img_upload_error_span'>{imgUploadErr}</span>
                  )}
                </CModalBody>
                <CModalFooter className="p-0" style={{ height: 50 }}>
                  <div
                    className="popUpCancelBtn mt-0 mb-0"
                    // style={{ height: 50, display: 'flex', alignItems: 'center' }}
                    onClick={uploadCancle}
                  >
                    Cancel
                  </div>
                  <div
                    className="popUpBtn mt-0 mb-0 m-0"
                    // onClick={uploadFile}
                    onClick={handleUpload}
                  >
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
                    className="model_title text-center "
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ color: 'red', display: 'block', fontSize: '24px' }}>Note</span>A
                    driver is already assigned to the vehicle. Please unassign the driver first.{' '}
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
            <>
              <CModal
                alignment="center"
                visible={visibleImage}
                onClose={() => setVisibleImage(false)}
                className="license-img"
              >
                <CModalBody className="license-img">
                  <CModalTitle
                    className="model_title text-center "
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <h3 style={{ color: 'red', display: 'block', fontSize: '24px' }}>
                      Driver's License
                    </h3>

                    <div className="license-img-div ">
                      {LicenseImg.map((imageUrl, index) => (
                        <div className="license-img">
                          <i
                            className="fas fa-times"
                            style={{
                              position: 'absolute',
                              right: '15%',
                              color: '#FF1E1C',
                              cursor: 'pointer',
                            }}
                            onClick={
                              // handleDeleteImg(imageUrl)
                              () => {
                                HandleDeleteImgApi(imageUrl)
                              }
                            }
                          ></i>
                          <img
                            key={index}
                            src={`http://13.43.59.115:8010/licenseImage/${imageUrl}`}
                            alt="License is not uploaded"
                            style={{ width: 250, height: 150, display: 'block', marginTop: 10 }}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      style={{
                        backgroundColor: '#FF1E1C',
                        color: 'white',
                        border: 'none',
                        display: 'block',
                        width: 'max-content',
                        marginTop: '20px',
                        padding: '4px 15px',
                        borderRadius: '10px',
                      }}
                      onClick={() => HandleImageDisplayClose()}
                    >
                      Okay
                    </button>
                  </CModalTitle>
                </CModalBody>
              </CModal>
            </>

            {/* pagination */}
            {rolebaseDrivers.length > 8 && (
              <div className="driverpagination">
                <TablePagination
                  component="div"
                  count={rolebaseDrivers.length}
                  page={currentPage - 1}
                  onPageChange={handlePageChange}
                  rowsPerPage={driversPerPage}
                  rowsPerPageOptions={[]}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </div>
            )}
          </>
        </div>

        {editpopup && (
          <Editpopup height={height} data={driveesingledata} onClick={editdriversdata} />
        )}
      </>
    </div>
  )
}

export default Select
