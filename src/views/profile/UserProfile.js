/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit'
import {
  CModal,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { GetUserName, driverDetails } from '../api/api'
import { getProfilePicture, profileUpload } from '../api/api'
import Conformpopup from './ProfileEdit'
import moment from 'moment'
import axios from 'axios'
import MainLoaderScreen from '../Loader/MainLoaderScreen'

const Support = (props) => {
  const { mainUserId } = props
  const [userNameprofile, setuserNameProfile] = useState(null)
  const [validated, setValidated] = useState(false)
  const [apiData, setApiData] = useState([])
  const [user, setuser] = useState()
  const [idfatch, setIdfatch] = useState([])
  const [conformPopup, setConformpopup] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [visibleUpload, setVisibleUpload] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [loader, setLoader] = useState(true)

  //const [isOpen, setIsOpen] = useState(true)
  let height = document.documentElement.scrollHeight

  const getDrivers = async () => {
    if(userNameprofile){
    const Vehiclesupdate = await GetUserName(userNameprofile)
    .then((res)=>{
      if(res?.status === 200){
        setApiData(res.data)
        setLoader(false)
        console.log(res.data[0].user_email,"user email")

      }
    })
  }

  }
  useEffect(()=>{
    getDrivers()

  },[userNameprofile])


  useEffect(() => {
    LoadUserName()
    LoadUserProfile()
    setLoader(true)
  }, [])

  //for picture upload

  const [userId, setUserId] = useState(null)
  const [ProfilePicture, setProfilePicture] = useState()


  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === true) {
      setValidated(true)
      event.preventDefault()
      UpdateUser()
    }

    event.preventDefault()
    event.stopPropagation()
    setValidated(true)
  }

  const LoadUserName = async () => {
    const userName = localStorage.getItem('userId')

    setuserNameProfile(userName)

  }

  const LoadUserProfile = async () => {
    const pic = await getProfilePicture(userNameprofile)
    setProfilePicture(pic)

  }

  //Profile picture edit

  const [selectedImg, setSelectedImg] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [profileError, setProfileError] = useState('')

  const saveFile = (e) => {
    const file = e.target.files[0]
    setSelectedImg(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const uploadFile = async(e) => {

    if (!selectedImg) {
      setProfileError('Please select a profile picture to upload.')
      return
    }
    setProfileError('')

    const formData = new FormData();
    formData.append('image', selectedImg);
    formData.append('userId', selectedUserId);
    const result = await profileUpload(formData)
      .then((response) => {
        console.log(response.data.message)
      })
      .catch((error) => {
        console.error('Error uploading Profile image:', error)
      })
    setVisibleUpload(false)

    window.location.reload()
  }

  const uploadImgId = (userId) => {
    setVisibleUpload(!visibleUpload)
    setSelectedUserId(userId)
    console.log("profile selected id", userId);
  }

  const UploadCancle = () => {
    setVisibleUpload(false)
    setImagePreview('')
    setProfileError('')
    // setSelectedUserId('')
  }


  const handleFileUpload = () => {

    if (selectedFile) {
      axios
        .post('/api/profileUpload', { profileImage: selectedFile })
        .then((response) => {
          // Handle the response, show a success message, or perform other actions

        })
        .catch((error) => {
          // Handle errors

        })
    }
  }

  const editUser = () => {
    // setuserSingleData(ID)

    setConformpopup(true)
  }

  const getBoolianVar = (boolian) => {
    setConformpopup(boolian)
  }
  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  const threespen = () => { }

    ; <MDBAccordionItem className="accordion-button" collapseId="newCollapseId" defaultOpened>
      {/* Accordion item content */}
    </MDBAccordionItem>
  return (
    <div
      className="supportDivprofile"
      style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}
    >
      <div className="d-flex align-items-center">
       
        <div className="profilename">Profile</div>
        <div className="editprofilebuttonrow">
          <button onClick={editUser}>
            <i className="fas fa-edit"></i>
          
          </button>
        </div>
      </div>
      {loader === true ? <MainLoaderScreen />:
      <>

    
                    <MDBAccordion initialActive={1}>
                      <MDBAccordionItem
                        className="section"
                        collapseId={1}
                        headerTitle="Company Details"
                      >
                        <div className="profilerow">
                          <div className="profilecollaman profile_header">Company Name</div>
                          <div className="profilecollaman profile_body">TYREOO</div>
                        </div>
                        <div className="profilerow">
                          <div className="profilecollaman profile_header">Phone</div>
                          <div className="profilecollaman profile_body">1255623856</div>
                        </div>

                        <div className="profilerow">
                          <div className="profilecollaman profile_header">Company Registration Number</div>
                          <div className="profilecollaman profile_body">SO305443</div>
                        </div>
                        <div className="profilerow mb-2">
                          <div className="profilecollaman profile_header">Key / Billing Contact</div>

                          <div className="profilecollaman profile_body">Mr AZHAR IQBAL - SERVICE@TYREOO.COM</div>
                        </div>
                      </MDBAccordionItem>
                    </MDBAccordion>

                    <MDBAccordion initialActive={2}>
                      <MDBAccordionItem collapseId={2} headerTitle="Company Marketing Preferences">
                        <div className="profilerow">
                          <div className="profilecollaman profile_header">Phone Preference</div>
                          <div className="profilecollaman profile_body">Not set</div>
                        </div>
                        <div className="profilerow">
                          <div className="profilecollaman profile_header">Email Preference</div>
                          <div className="profilecollaman profile_body">Yes</div>
                        </div>
                      </MDBAccordionItem>
                    </MDBAccordion>
                    <MDBAccordion initialActive={3}>
                      <MDBAccordionItem
                        collapseId={3}
                        onClick={threespen}
                        headerTitle="Key Contact Details"
                      >
                        <div className="mt-2 ">
                          <div className="profile-pic-div">
                            <i
                              class="fas fa-pen"
                              onClick={() => {
                                uploadImgId(apiData[0].id)
                              }}
                            ></i>
                            <img
                              src={`data:image/jpeg;base64,${apiData[0].profilePicture}`}
                              className="profile-pic"
                            />
                          </div>
                        </div>
                        <div className="profilerow">
                          <div className="profilecollaman profile_header"> Name</div>
                          <div className="profilecollaman profile_body">
                            <span>{apiData[0].user_name}</span>
                          </div>
                        </div>
                        <div className="profilerow">
                          <div className="profilecollaman profile_header">Email Address</div>
                          <div className="profilecollaman profile_body">{apiData[0].user_email}</div>
                        </div>

                        <div className="profilerow">

                          <div className="profilecollaman profile_header">Date of Birth</div>
                          <div className="profilecollaman profile_body">
                            <span>{moment(apiData[0].user_date_of_birth).format('DD-MM-yyyy')}</span>
                            {/* 25/08/1999 */}
                          </div>
                        </div>
                        
                        <div className="profilerow">
                          <div className="profilecollaman profile_header">Phone</div>
                          <div className="profilecollaman profile_body">{apiData[0].user_mobile_phone}</div>
                        </div>
                        <div className="profilerow profile_add_div">
                          <div className="profilecollaman profile_header">Address</div>
                          <div className="profilecollaman profile_body">{apiData[0].user_address}</div>
                        </div>
                      </MDBAccordionItem>
                    </MDBAccordion>
                    </>}
              
            
            
      <CModal alignment="center" visible={visibleUpload} onClose={() => setVisibleUpload(false)}>
        <CModalBody className="text-center text-center">
          <div className="imagePreview-div">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: '300px', maxHeight: '300px', marginTop: '20px' }}
              />
            )}
          </div>
          <div class="file-input">
            <input
              type="file"
              name="file-input"
              id="file-input"
              className="file-input__input"
              accept="image/*"
              onChange={saveFile}
            />
            <label class="file-input__label" for="file-input">
              <i className="fas fa-upload"></i>
              <span>Upload Profile Pic</span>
            </label>
          </div>
          {profileError && <span style={{ color: 'red' }}>{profileError}</span>}
        </CModalBody>
        <CModalFooter className="p-0" style={{ height: 50 }}>
          <div className="popUpCancelBtn mt-0 mb-0" onClick={UploadCancle}>
            Cancel
          </div>
          <div className="popUpBtn mt-0 mb-0 m-0" onClick={uploadFile}>
            Upload
          </div>
        </CModalFooter>
      </CModal>

      {conformPopup && <Conformpopup data={apiData} height={height} onClick={getBoolianVar} />}

   
    </div>
  )
}

export default Support
