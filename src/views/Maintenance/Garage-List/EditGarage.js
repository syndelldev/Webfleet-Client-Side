/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { CForm, CCol, CFormInput, CFormSelect } from '@coreui/react'
import { editGarageId,  updateGarage } from '../../api/api'
import moment from 'moment'
import '../../driver-management/DriverList/EditDriver.css'

const defaultvalue = {
 garage_name: '',
 garage_type: '',
 garage_phone:'',
 garage_email: '',
 garage_address: '',
 garage_owner: '',
 garage_postcode: '', 

}

function EditeGarage(props) {
  //require variable
  const [user, setuser] = useState(defaultvalue)

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

  const handleUpdate = async () => {
    console.log(user,"user")
    const result = await updateGarage(user).then((res) => {
      if (res.data == 'updated') {


        onClickclose()
        window.location.reload()
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
      handleUpdate()
    }

    event.preventDefault()
    event.stopPropagation()
    setValidated(true)
  }

  return (
    <div >
      <div className="edit_driver_main_sidebar" >
        <div className="edit_driver_main_container ">
        <div className='Edit_driver_pop_header' onClick={onClickclose}>
                <i class="fas fa-arrow-left back_arraw_edit_icon"></i>
                <span className='edit_header_text'>Edit Garage Details</span>
              </div>
          <div className="DriverDiv">
            <CForm
              className="row g-3 text-start formpaddaingdriveredit"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
                {/* Name */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="text"
                    label="Garage Name"
                    id="validationCustom01"
                    name="garage_name"
                    placeholder="Garage Name"
                    defaultValue={user.garage_name}
                    onChange={(e) => {
                      onValueChange(e)
                    //   setUniqeValue(false)
                    }}
                    focus={focus.toString()}
                    onBlur={handleFocus}
                    pattern="^[A-Za-z0-9]{1,16}"
                    required
                    feedbackInvalid="Please enter a valid Name"
                    style={{ width: '90%' }}
                  />
                </CCol>

                {/* Vehicle Type */}
                {/* <CCol md={6} className="userinputs">
                  <CFormLabel htmlFor="multiSelect">Vehicle Type</CFormLabel>
                  <Select
                    style={{ width: '90%' }}
                    id="multiSelect" // Make sure to provide a unique ID
                    className={`user_input_field ${
                      !selectedVehicleType.length && hitSave != 0 ? 'errmessage' : ''
                    }`}
                    isMulti
                    options={[
                      { label: 'Car', value: 'Car' },
                      { label: 'Truck', value: 'Truck' },
                      { label: 'Bus', value: 'Bus' },
                    ]}
                    value={selectedVehicleType.map((item) => ({
                      label: item,
                      value: item,
                    }))}
                    onChange={(selectedOptions) => {
                      const selectedValues = selectedOptions
                        ? selectedOptions.map((option) => option.value)
                        : []
                      setSelectedVehicleType(selectedValues)
                    }}
                    required
                    feedbackInvalid="Please select a valid option"
                  />
                  {!selectedVehicleType.length && hitSave != 0 ? (
                    <span style={{ color: '#e55353', fontSize: '.875em' }}>
                      Please choose a option.
                    </span>
                  ) : (
                    ''
                  )}
                </CCol> */}

                {/* Phone No */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="tel"
                    label="Phone No"
                    aria-describedby="validationCustom03Feedback"
                    maxLength={10}
                    name="garage_phone"
                    pattern="^[0-9]{10}"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    defaultValue={user.garage_phone}
                    focus={focus.toString()}
                    onBlur={handleFocus}
                    id="validationCustom03"
                    required
                    feedbackInvalid="Please provide valid phone no"
                    style={{ width: '90%' }}
                  />
                </CCol>

                {/* Email */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="email"
                    label="Email"
                    name="garage_email"
                    id="validationCustomUsername"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    defaultValue={user.garage_email}
                    focus={focus.toString()}
                    onBlur={handleFocus}
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"
                    feedbackInvalid="Please Enter Valid Email Address"
                    // placeholder="Name@surname.com"
                    required
                    style={{ width: '90%' }}
                  />
                </CCol>

                

                {/* Home Address */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="text"
                    label="Garage Address"
                    aria-describedby="validationCustom03Feedback"
                    name="garage_address"
                    // pattern="^[0-9]{10}"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    defaultValue={user.garage_address}
                    focus={focus.toString()}
                    onBlur={handleFocus}
                    id="validationCustom03"
                    required
                    feedbackInvalid="Please provide valid home address"
                    style={{ width: '90%' }}
                  />
                </CCol>

                {/* garage owner name */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="text"
                    label="Garage Owner Name"
                    aria-describedby="validationCustom03Feedback"
                    name="garage_owner"
                    // pattern="^[0-9]{10}"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    defaultValue={user.garage_owner}
                    focus={focus.toString()}
                    onBlur={handleFocus}
                    id="validationCustom03"
                    required
                    feedbackInvalid="Please provide valid home address"
                    style={{ width: '90%' }}
                  />
                </CCol>

                {/* postcode */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="text"
                    label="Garage postcode"
                    aria-describedby="validationCustom03Feedback"
                    name="garage_postcode"
                    // pattern="^[0-9]{10}"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    defaultValue={user.garage_postcode}
                    focus={focus.toString()}
                    onBlur={handleFocus}
                    id="validationCustom03"
                    required
                    feedbackInvalid="Please provide valid home address"
                    style={{ width: '90%' }}
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
export default EditeGarage
