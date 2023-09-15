/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { CForm, CCol, CFormInput, CFormSelect } from '@coreui/react'
import { editmaintennaceVehicle, maintennaceUpdateId } from '../../api/api'
import moment from 'moment'
import '../../driver-management/DriverList/EditDriver.css'

const defaultvalue = {
  registrationNumber: '',
  Model: '',
  postcode: '',
  service_type: '',
  workshop_name: '',
  maintance_date: '',
  time: '',
  cost:''
}

function ConPopups(props) {
  //require variable
  const [user, setuser] = useState(defaultvalue)
  const [dateformet, setDateFormet] = useState()
  const today = new Date().toISOString().split('T')[0]
  const datee = moment(props.data.maintance_date).format('yyyy-MM-DD')


  const onClickclose = () => {
    props.onClick(false)
    // window.location.reload()
  }

  useEffect(() => {
    setuser(props.data)
  
  }, [])
  const [focus, setFocus] = useState(false)
  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  const handleFocus = (e) => {
    setFocus(true)
  }

 

  const VehicleUser = async () => {
    console.log(user,"user")
    const result = await editmaintennaceVehicle(user).then((res) => {
      if (res.data == 'updated') {


        onClickclose()
        window.location.reload()
        // props.onClick(false)
      }
    })
  }



  //validation handle
  const [validated, setValidated] = useState(false)
  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === true) {
      event.preventDefault()
      setValidated(true)
      VehicleUser()
    }

    event.preventDefault()
    event.stopPropagation()
    setValidated(true)
  }

  return (
    <div>
      <div className="edit_driver_main_sidebar">
        <div className="edit_driver_main_container ">
        <div className='Edit_driver_pop_header' onClick={onClickclose}>
                <i class="fas fa-arrow-left back_arraw_edit_icon"></i>
                <span className='edit_header_text'>Edit Maintenance Details</span>
              </div>
        
          <div className="DriverDiv">
            <CForm
              className="row g-3 text-start formpaddaingdriveredit"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              {/* Registration No */}
              <CCol md={6} className="userinputs">
                <CFormInput
                  className="user_input_field"
                  type="text"
                  label="Registration No"
                  name="registrationNumber"
                  aria-describedby="validationCustom05Feedback"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  defaultValue={user.registrationNumber}
                  focus={focus.toString()}
                  onBlur={handleFocus}
                  pattern="^[A-Z0-9]{3,7}"
                  maxLength={7}
                  // feedbackInvalid="Please provide a valid zip."
                  id="validationCustom03"
                  required
                  disabled
                />
              </CCol>
              {/* Edit Model */}
              <CCol md={6} className="userinputs">
                <CFormInput
                  className="user_input_field"
                  type="text"
                  label="make"
                  name="model"
                  aria-describedby="validationCustom05Feedback"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  defaultValue={user.make}
                  focus={focus.toString()}
                  onBlur={handleFocus}
                  // feedbackInvalid="Please provide a valid zip."
                  id="validationCustom03"
                  required
                  disabled
                />
              </CCol>
              {/* Edit  Postcode */}
              <CCol md={6} className="userinputs">
                <CFormInput
                  className="user_input_field"
                  label="Postcode"
                  type="tel"
                  name="postcode"
                  aria-describedby="inputGroupPrependFeedback"
                  // pattern="[A-Z0-9]{6}"
                  pattern="^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\d[A-Za-z]{2}$"
                  maxLength={8}
                  defaultValue={user.postcode}
                  id="validationCustomUsername"
                  required
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  disabled
                />
              </CCol>
              {/* Edit service-type */}
              <CCol md={6} className="userinputs">
                <CFormSelect
                  className="user_input_field"
                  type="text"
                  label="Service Type"
                  name="service_type"
                  //  pattern="^[A-Za-z0-9]{3,40}"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  defaultValue={user.service_type}
                  onBlur={handleFocus}
                  focus={focus.toString()}
                  required
                >
                  <option selected={user.service_type === 'MOT TEST' ? 'selected' : ''}>
                    MOT TEST
                  </option>
                  <option selected={user.service_type === 'FULL SERVICE' ? 'selected' : ''}>
                    FULL SERVICE
                  </option>
                  <option selected={user.service_type === 'INTERIM SERVICE' ? 'selected' : ''}>
                    INTERIM SERVICE
                  </option>
                  <option selected={user.service_type === 'OIL CHANGE' ? 'selected' : ''}>
                    OIL CHANGE
                  </option>
                  <option selected={user.service_type === 'NOT SURE YET' ? 'selected' : ''}>
                    NOT SURE YET
                  </option>
                </CFormSelect>
              </CCol>
              {/* Edit date */}
              <CCol md={6} className="userinputs">
                <CFormInput
                  className="user_input_field"
                  type="date"
                  label="Vehicle Service Date"
                  name="maintance_date"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  min={today}
                  onBlur={handleFocus}
                  focus={focus.toString()}
                  defaultValue={datee}
                />
              </CCol>
              {/* Edit Time */}
              <CCol md={6} className="userinputs">
                <CFormSelect
                  className="user_input_field"
                  type="text"
                  label="Service Time"
                  name="time"
                  //  pattern="^[A-Za-z0-9]{3,40}"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  defaultValue={user.time}
                  onBlur={handleFocus}
                  focus={focus.toString()}
                  required
                >
                  <option selected={user.time === '8:00 AM' ? 'selected' : ''}>8:00 AM</option>
                  <option selected={user.time === '10:00 AM' ? 'selected' : ''}>10:00 AM</option>
                  <option selected={user.time === '12:00 AM' ? 'selected' : ''}>12:00 AM</option>
                </CFormSelect>
              </CCol>
              {/* Edit Store Name  */}
              <CCol md={6} className="userinputs">
                <CFormInput
                  className="user_input_field"
                  type="text"
                  label="Work Shop Name"
                  name="work_shop_name"
                  aria-describedby="validationCustom05Feedback"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  defaultValue={user.workshop_name}
                  focus={focus.toString()}
                  onBlur={handleFocus}
                  disabled
                  // feedbackInvalid="Please provide a valid zip."
                  id="validationCustom03"
                />
              </CCol>
              {/* Edit Cost  */}
              <CCol md={6} className="userinputs">
                <CFormInput
                  className="user_input_field"
                  type="text"
                  label="Cost"
                  name="cost"
                  aria-describedby="validationCustom05Feedback"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  defaultValue={user.cost}
                  focus={focus.toString()}
                  pattern="^[0-9]{2,10}"
                  maxLength={8}
                  onBlur={handleFocus}
                  // feedbackInvalid="Please provide a valid zip."
                  id="validationCustom03"
                />
              </CCol>

              <CCol className="editBottomBtn" xs={12}>
                <div className="vehicle-btn-01 editMaintenance-btn">
                  <button className="editCloseBtn" type="cancle" onClick={onClickclose}>
                    {' '}
                    Close
                  </button>
                  <button className="AddUserBtn" type="submit">
                    {' '}
                    Save
                  </button>
                </div>
              </CCol>
            </CForm>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ConPopups
