/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CForm, CCol, CFormInput, CFormSelect, CButton } from '@coreui/react'
import { driverEdit, driverEditId, userEditId } from '../api/api'
import moment from 'moment'
import addNotification from 'react-push-notification'
import './PopUp.css'

const defaultvalue = {
  user_name: '',
  user_email: '',
  user_mobile_phone: '',
  user_address: '',
  user_date_of_birth: '',
  // assigned_vehicle_number: '',
  // license_no: '',
  // license_expire_date: '', 
  // fuel_card_name: '',
  // assigned_vehicle_name: '',

}

function Conformpopup(props) {
  let height = props.height
  const [user, setuser] = useState(defaultvalue)

  const navigate = useNavigate()
  const getdata = props.data[0]
  
  // console.log("all data for profile update",getdata);
  const id = props.data[0].id
  const product = props.data
  // console.log("id for profile update", id);

  const dateformet = moment(getdata.user_date_of_birth).format('DD-MM-yyyy')
  console.log("user dob", dateformet);

  const onClickclose = () => {
    props.onClick(false)
    // window.location.reload ()
  }
  useEffect(()=>{
    setuser(props.data[0])
  },[])



  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  //validation handle
  const [focus, setFocus] = useState(false)

  const handleFocus = (e) => {
    setFocus(true)
  }

  const UpdateUser = async () => {
    const result = await userEditId(user).then((res) => {
      if (res.data == 'updated') {
        onClickclose()
        window.location.reload()

      }
    })
  }

  // const onClickAdd = async (event) => {
  //   const form = event.currentTarget
  //   if (form.checkValidity() === false) {
  //     setValidated(true)
  //     event.preventDefault()
  //     UpdateUser()
  //   } else {
  //     event.preventDefault()
  //   event.stopPropagation()
  //   setValidated(true)
  //   }

  // }
  //  api handle
  useEffect(() => {
   // loadUserData()
  }, [])
  const loadUserData = async () => {
    const result = await driverEdit(id)

    setuser(result.data[0])

    //setDateFormet(result.data[0].user_date_of_birth)
  }


  const UpdateNotification = () => {
    addNotification({
      title: `User Details Updated `,
      message: 'User Details changed without any Error',
      native: true,
      theme: 'light',
      closeButton: 'X',
      backgroundTop: 'green',
      backgroundBottom: 'yellowgreen',
    })
  }

  //validation handle
  const [validated, setValidated] = useState(false)

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

  return (
    <div className="model_div" >
      <div className="model_cont">
        <div className='edit_profile_div'>
          <div
            className="editAdddriverhadding"
            style={{ display: 'grid', alignItems: 'center', height: 50, paddingBottom: 0 }}
          >
            {/* <button className="editclossbutton" onClick={onClickclose}>
              +
            </button> */}
            <span className="editheadingspan">Edit Profile Data</span>
          </div>
          <div className="profile_edit_inputs">
            {getdata.role_id === 1 ? (
              <>
                <CForm
                  className="row g-3 text-start profile_edit_input_padding"
                  style={{ paddingLeft: '4%', marginTop: '15px'}}
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  {/* <CCol md={12} className="userinputs text-center">
                  Profile Picture
              </CCol> */}
                  <CCol md={6} className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="text"
                      label="Name"
                      name="user_fast_name"
                      placeholder="Name"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      defaultValue={getdata.user_name}
                      pattern="^[A-Za-z0-9]{3,16}"
                      maxLength={16}
                      feedbackInvalid="Please provide a valid Name"
                      disabled
                    />
                  </CCol>

                  <CCol md={6} className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="email"
                      label="Email address"
                      name="email"
                      placeholder="Email address"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      defaultValue={getdata.user_email}
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"
                      feedbackInvalid="Please provide a valid E-mail"
                      disabled
                    />
                  </CCol>

                   {/* <CCol className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="date"
                      label="Date of Birth"
                      name="user_date_of_birth"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      defaultValue={dateformet}
                      required
                    />
                  </CCol> */}

                  <CCol md={6} className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="tel"
                      label="Phone"
                      name="user_mobile_phone"
                      maxLength={10}
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      defaultValue={getdata.user_mobile_phone}
                      pattern="^[0-9]{10}"
                      feedbackInvalid="Please provide a valid Phone"
                      required
                    />
                  </CCol>
                  <CCol md={6} className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="text"
                      label="Home Address"
                      aria-describedby="validationCustom03Feedback"
                      name="user_address"
                      defaultValue={getdata.user_address}
                      // pattern="^[0-9]{10}"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      id="validationCustom03"
                      feedbackInvalid="Please provide a valid Home Address"
                      required
                    />
                  </CCol>

                  <CCol xs={12} className="profile_edit_bottom_btn">
                    <CButton className="px-4 driverbuttonsform mx-3" onClick={onClickclose}>
                      Close
                    </CButton>
                    <CButton className="px-4 driverbuttonssave" type="submit" >
                      {' '}
                      Save
                    </CButton>
                  </CCol>
                </CForm>
              </>
            ) : (
              <>
                <CForm
                  className="row g-3 text-start pt-5"
                  style={{ margin: 0 }}
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  {/* <CCol md={12} className="userinputs text-center">
                  Profile Picture
              </CCol> */}
                  <CCol md={6} className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="text"
                      label="Name"
                      name="user_fast_name"
                      placeholder="Name"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      defaultValue={getdata.driver_name}
                      pattern="^[A-Za-z0-9]{3,16}"
                      maxLength={16}
                      disabled
                    />
                  </CCol>

                  <CCol md={6} className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="email"
                      label="Email address"
                      name="email"
                      placeholder="Email address"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      defaultValue={getdata.email}
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"
                      disabled
                    />
                  </CCol>

                  <CCol md={6} className="userinputs">
                    <CFormSelect
                      className="user_input_field"
                      type="text"
                      label="Status"
                      autoComplete="off"
                      autoFocus="off"
                      id="validationCustomUsername"
                      name="status"
                      defaultValue={getdata.status}
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      required
                    >
                      {' '}
                      <option className="d-none"></option>
                      <option>Active</option>
                      <option>In active</option>

                    </CFormSelect>
                  </CCol>

                  <CCol md={6} className="userinputs">
                    <CFormSelect
                      className="user_input_field"
                      type="text"
                      label="Vehicle Type"
                      name="assigned_vehicle_name"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      defaultValue={getdata.assigned_vehicle_name}
                      required
                    >
                      <option>Car</option>
                      <option>Truck</option>
                      <option>Bus</option>
                    </CFormSelect>
                  </CCol>

                  <CCol md={6} className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="text"
                      label="Driver’s License no."
                      name="licesnse_no"
                      placeholder="ex 208xxxxxxxxx11"
                      maxLength={16}
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      defaultValue={getdata.licesnse_no}
                      required
                    />
                  </CCol>

                  <CCol className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="date"
                      label="License expiry date"
                      name="license_expire_date"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      defaultValue={dateformet}
                      required
                    />
                  </CCol>

                  <CCol md={6} className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="tel"
                      label="Phone"
                      name="phone"
                      maxLength={10}
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      defaultValue={getdata.phone}
                      pattern="^[0-9]{10}"
                      feedbackInvalid="Please provide a valid Phone"
                      required
                    />
                  </CCol>
                  <CCol md={6} className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="text"
                      label="Home Address"
                      aria-describedby="validationCustom03Feedback"
                      name="description"
                      defaultValue={getdata.description}
                      // pattern="^[0-9]{10}"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      id="validationCustom03"
                      required
                    />
                  </CCol>

                  <CCol md={6} className="userinputs">
                    <CFormInput
                      className="user_input_field"
                      type="text"
                      label="Fuel Card Name"
                      aria-describedby="validationCustom03Feedback"
                      defaultValue={getdata.fuel_card_name}
                      name="fuel_card_name"
                      // pattern="^[0-9]{10}"
                      pattern="^[A-Z a-z 0-9]{2,20}"
                      maxLength={20}
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      id="validationCustom03"
                    />
                  </CCol>

                  <CCol xs={12} className="profile_edit_bottom_btn">
                    <CButton className="px-4 driverbuttonsform mx-3" onClick={onClickclose}>
                      Close
                    </CButton>
                    <CButton className="px-4 driverbuttonssave" type="submit" >
                      {' '}
                      Save
                    </CButton>
                  </CCol>
                </CForm>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Conformpopup