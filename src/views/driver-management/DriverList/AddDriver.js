/* eslint-disable */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
// / eslint-disable react/prop-types /
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CForm, CCol, CFormInput, CFormSelect, CFormLabel } from '@coreui/react'
import { addDriver } from '../../api/api'
import Select from 'react-select'
import LoaderScreen from '../../Loader/LoaderScreen'

function Conformpopup(props) {
  const [selectedVehicleType, setSelectedVehicleType] = useState([]) // State to store selected vehicle types
  const defaultvalue = {
    driver_name: '',
    licesnse_no: '',

    license_expire_date: '',
    email: '',
    phone: '',
    status: '',
    description: '',
    assigned_vehicle_number: 'None',
    // user_Id: '',
    image: '',
    lease_budget_per_month: '',
    lease_budget_code: '',
    driver_vin_no: '',
    fuel_card_name: 'N',
  }

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [user, setuser] = useState(defaultvalue)
  const [validated, setValidated] = useState(false)
  const [UniqeValue, setUniqeValue] = useState(false)
  const [hitSave, setHitSave] = useState(0)
  const [statuserr, setStatuserr] = useState(0)

  const onValueChange = (e) => {
    const { name, value } = e.target
    if (name === 'assigned_vehicle_name') {
      // For "Vehicle Type" input
      setSelectedVehicleType(value) // Store the selected values in state
    } else {
      setuser({ ...user, [name]: value })
    }
    setUniqeValue(false) // Reset the unique value error flag
  }
  const disablePastDate = () => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()
    return yyyy + '-' + mm + '-' + dd
  }

  const DriverAddFunction = async (event) => {
    const dataToSend = {
      ...user,
      assigned_vehicle_name: selectedVehicleType, // Include the selected vehicle types in the data
    }

    const result = await addDriver(dataToSend).then((res) => {
      if (res.status === 200) {
        navigate('/driver-management/driver-list')
        window.location.reload()
      } else if (res.status === 203) {
        setUniqeValue(true)
      } else {
        // console.log('error')
      }
    })
  }

  const onClickclose = () => {
    navigate('/driver-management/driver-list')
  }

  const handleSubmit = async (event) => {
    setHitSave(1)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      event.preventDefault()
      DriverAddFunction()
    }
  }

  return (
    <div className="add_driver_main_div" >
      {loading ? (
        <LoaderScreen />
      ) : (
        <div className="add_vehicle_main_sidebar">
          <div className="edit_driver_main_container">
           
          <div className='Edit_driver_pop_header' onClick={onClickclose}>
                <i class="fas fa-arrow-left back_arraw_edit_icon"></i>
                <span className='edit_header_text'>Add Driver</span>
              </div>

            <div className="DriverDiv">
              <CForm
                className="row g-3 needs-validation text-start formpaddaingdriver"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                {/* Name */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="text"
                    label="Full Name"
                    id="validationCustom01"
                    name="driver_name"
                    placeholder="Driver Full Name"
                    onChange={(e) => {
                      onValueChange(e)
                      setUniqeValue(false)
                    }}
                    pattern="^[A-Za-z\s]{3,30}"
                    required
                    feedbackInvalid="Please provide a valid Name"
                    style={{ width: '90%' }}
                  />
                  {UniqeValue === true ? (
                    <small
                      style={{
                        color: '#FF1E1C',
                      }}
                    >
                      This username is already registered
                    </small>
                  ) : (
                    <></>
                  )}
                </CCol>

                {/* Status */}
                <CCol md={6} className="userinputs">
                  <CFormSelect
                    className={`user_input_field ${
                      statuserr == 0 && hitSave != 0 ? 'errmessage' : ''
                    }`}
                    type="text"
                    label="Status"
                    autoComplete="off"
                    autoFocus="off"
                    id="validationCustomUsername"
                    name="status"
                    onChange={(e) => {
                      onValueChange(e)
                      setStatuserr(1)
                    }}
                    required
                    feedbackInvalid="Please select a valid option"
                    style={{ marginBottom: '8px', width: '90%' }}
                  >
                    {' '}
                    <option className="d-none"></option>
                    <option>Active</option>
                    <option>In active</option>
                  </CFormSelect>
                </CCol>

                {/* Vehicle Type */}
                <CCol md={6} className="userinputs">
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
                </CCol>

                {/* Driver’ss License no. */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="text"
                    id="validationCustomUsername"
                    pattern="^[A-Z]{5}\d{6}[A-Z]{2}\d{1}[A-Z]{2}$"
                    //Sample ABCDE123456FG1HI
                    maxLength={16}
                    label="Driver’s License No."
                    name="licesnse_no"
                    placeholder="ex ABCDE123456FG1HI"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    required
                    feedbackInvalid="Please provide a valid driver’s license no"
                    style={{ width: '90%' }}
                  />
                </CCol>

                {/* License Expiry Date */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="date"
                    id="validationCustomUsername"
                    label="License Expiry Date"
                    name="license_expire_date"
                    webkitdirectory
                    min={disablePastDate()}
                    // style={{
                    //   cursor: "pointer"
                    // }}
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    required
                    feedbackInvalid="Please select license expiry date"
                    style={{ width: '90%' }}
                  />
                </CCol>

                {/* Fuel Card */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="text"
                    label="Fuel Card"
                    placeholder='Optional'
                    // aria-describedby="validationCustom03Feedback"
                    name="fuel_card_name"
                    // pattern="^[0-9]{10}"
                    // pattern="^[A-Z a-z 0-9]{1,20}"
                    maxLength={20}
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    id="validationCustom03"
                    // required
                    style={{ width: '90%' }}
                  />
                </CCol>

                {/* Email */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="email"
                    label="Email"
                    name="email"
                    id="validationCustomUsername"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    pattern="^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$"
                    feedbackInvalid="Please Enter Valid Email Address"
                    // placeholder="Name@surname.com"
                    required
                    style={{ width: '90%' }}
                  />
                </CCol>

                {/* Phone No */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="tel"
                    label="Phone No"
                    aria-describedby="validationCustom03Feedback"
                    maxLength={10}
                    name="phone"
                    pattern="^[0-9]{10}"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    id="validationCustom03"
                    required
                    feedbackInvalid="Please provide valid phone no"
                    style={{ width: '90%' }}
                  />
                </CCol>

                {/* Home Address */}
                <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="text"
                    label="Home Address"
                    aria-describedby="validationCustom03Feedback"
                    name="description"
                    // pattern="^[0-9]{10}"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    id="validationCustom03"
                    required
                    feedbackInvalid="Please provide valid home address"
                    style={{ width: '90%' }}
                  />
                </CCol>

                {/* <CCol md={6} className="userinputs">
                  <CFormSelect
                    className="user_input_field"
                    type="text"
                    label="Vehicle Type"
                    autoComplete="off"
                    autoFocus="off"
                    id="validationCustomUsername"
                    name="assigned_vehicle_name"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    required
                  >
                    {' '}
                    <option className="d-none"></option>
                    <option>Car</option>
                    <option>Truck</option>
                    <option>Bus Fine</option>
                  </CFormSelect>
                </CCol> */}

                {/* <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="text"
                    label="Group"
                    name="group"
                    id="validationCustomUsername"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    required
                  />
                </CCol> */}

                {/* <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="text"
                    label="VIN"
                    id="validationCustom01"
                    name="driver_vin_no"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    maxLength={17}
                    pattern="^[A-Z0-9]{3,17}"
                    required
                  />
                </CCol> */}

                {/* <CCol md={6} className="userinputs">
                  <label className="Descriptionlables">Description</label>
                  <br />
                  <textarea
                    className="user_input_field"
                    type="text"
                    label="Description"
                    id="validationCustomUsername"
                    name="description"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    required
                  />
                </CCol> */}

                {/* <CCol md={6} className="userinputs">
                  <CFormInput
                    className="user_input_field"
                    type="text"
                    label="Assigned Vehicle's No"
                    aria-describedby="validationCustom03Feedback"
                    name="assigned_vehicle_number"
                    // pattern="^[0-9]{10}"
                    pattern="^[A-Z0-9]{2,6}"
                    maxLength={6}
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    id="validationCustom03"
                    required
                  />
                </CCol> */}

                {/* <CCol xs={12}>
                  <input type="checkbox" id="checkbox" name="fruit-1" value="Apple" />
                  <label htmlFor="checkbox"> &nbsp;Send Alerts </label>
                </CCol> */}

                {/* <CCol xs={12} className="userinputlast">
                <CFormSelect
                 className='user_input_field'
                  type="text"
                  label="Route to Vehicles"
                  autoComplete="off"
                  autoFocus="off"
                  id="validationCustomUsername"
                  name="lease_budget_per_month"
                  onChange={(e) => {
                    onValueChange(e)
                  }}

                  required
                > <option className='d-none'></option>
                  <option>Route UK </option>
                  <option>High Street </option>
                  <option>Station Road </option>
                  <option>Main Street </option>
                  <option>Park Road </option>
                  <option>Church Road </option>
                  <option>Church Street </option>
                  <option>London Road </option>
                </CFormSelect>

              </CCol> */}

                <CCol xs={12} className="buttondriver">
                  <button className="px-4 driverbuttonsform mx-3" onClick={onClickclose}>
                    Close
                  </button>
                  <button className="px-4 driverbuttonssave" type="submit">
                    {' '}
                    Save
                  </button>
                </CCol>
              </CForm>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Conformpopup
