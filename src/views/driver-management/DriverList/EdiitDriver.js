/* eslint-disable */
/* eslint-disable react/prop-types */
// / eslint-disable react/prop-types /
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CForm,
  CCol,
  CFormInput,
  CFormSelect,
  CFormLabel,
} from '@coreui/react'
import { driverEdit, driverEditId } from '../../api/api'
import moment from 'moment'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import './EditDriver.css'

function Conformpopup(props) {
  const product = props.data
  const id = props.data.id

  const dateformet = moment(props.data.license_expire_date).format('yyyy-MM-DD')

  const onClickclose = () => {
    props.onClick(false)
  }
  const defaultvalue = {
    licesnse_no: '',
    license_expire_date: '',
    status: '',
    phone: '',
    description: '',
    fuel_card_name: '',
  }

  const navigate = useNavigate()
  const [user, setuser] = useState(defaultvalue)
  const [validated, setValidated] = useState(false)
  const [hitSave, setHitSave] = useState(0)

  const [selectedVehicleType, setSelectedVehicleType] = useState(
    product.assigned_vehicle_name ? product.assigned_vehicle_name.split(',') : [],
  )

  const animatedComponents = makeAnimated()

  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  //validation handle
  const [focus, setFocus] = useState(false)

  const handleFocus = (e) => {
    setFocus(true)
  }
  useEffect(() => {
    loadUserData()
  }, [])
  // api handle
  const loadUserData = async () => {
    const result = await driverEdit(id)
    setuser(result.data[0])
  }

  const onClickAdd = async (event) => {
    setHitSave(1)
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      const result = await driverEditId(user).then((res) => {
        if (res.data == 'updated') {
          window.location.reload()
        }
      })
    }
  }

  const disablePastDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }


  return (
    <div className="edit_driver_main_div">
      <div className="edit_driver_main_sidebar">
        <div className="edit_driver_main_container">
         
          <div className="DriverDiv">
            
          <div className='Edit_driver_pop_header' onClick={onClickclose}>
                <i class="fas fa-arrow-left back_arraw_edit_icon"></i>
                <span className='edit_header_text'>Edit Driver</span>
              </div>
           
            <CForm
              className="row g-3 text-start formpaddaingdriveredit"
              noValidate
              validated={validated}
              onSubmit={onClickAdd}
            >
              <CCol md={6} className="userinputs-edit">
                <CFormInput
                  className="user_input_field"
                  type="text"
                  label="Name"
                  name="driver_name"
                  placeholder="Driver Name"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  onBlur={handleFocus}
                  focus={focus.toString()}
                  defaultValue={product.driver_name}
                  pattern="^[A-Za-z0-9]{3,16}"
                  maxLength={16}
                  required
                  disabled
                  feedbackInvalid="Please provide a valid Name"
                  style={{ width: '90%' }}
                />
                {/* <span className="inputErr">user name must be in 3-16 char</span> */}
              </CCol>

              <CCol md={6} className="userinputs-edit">
                <CFormInput
                  className="user_input_field"
                  type="text"
                  label="Driver’s License no."
                  name="licesnse_no"
                  placeholder="ex ex ABCDE123456FG1HI"
                  pattern="^[A-Z]{5}\d{6}[A-Z]{2}\d{1}[A-Z]{2}$"
                  //Sample ABCDE123456FG1HI

                  maxLength={16}
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  onBlur={handleFocus}
                  focus={focus.toString()}
                  defaultValue={product.licesnse_no}
                  required
                  disabled
                  feedbackInvalid="Please provide a valid Driver’s License no"
                  style={{ width: '90%' }}
                />
              </CCol>

              <CCol md={6} className="userinputs-edit">
                <CFormSelect
                  className="user_input_field"
                  type="text"
                  label="Status"
                  autoComplete="off"
                  autoFocus="off"
                  id="validationCustomUsername"
                  name="status"
                  defaultValue={product.status}
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  required
                  feedbackInvalid="Please select a valid option"
                  style={{ width: '90%' }}
                >
                  {' '}
                  <option className="d-none"></option>
                  <option>Active</option>
                  <option>In active</option>
                  {/* <option>Idle</option> */}
                </CFormSelect>
              </CCol>

              <CCol md={6} className="userinputs-edit">
                <CFormLabel htmlFor="multiSelect">Vehicle Type</CFormLabel>
                <Select
                  id="multiSelect"
                  className={`user_input_field ${!selectedVehicleType.length && hitSave != 0 ? 'errmessage' : ''
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
                  components={animatedComponents} // Optional, for animations
                  onChange={(selectedOptions) => {
                    const selectedValues = selectedOptions
                      ? selectedOptions.map((option) => option.value)
                      : []
                    setSelectedVehicleType(selectedValues)
                    onValueChange({
                      target: { name: 'assigned_vehicle_name', value: selectedValues.join(',') },
                    })
                  }}
                  feedbackInvalid="Please select a valid option"
                  style={{ marginBottom: '16px' }}
                  required
                />
                {!selectedVehicleType.length && hitSave != 0 ? (
                  <span style={{ color: '#e55353', fontSize: '.875em' }}>Please choose a option.</span>
                ) : (
                  ''
                )}
              </CCol>

              <CCol className="userinputs-edit">
                <CFormInput
                  className="user_input_field"
                  type="date"
                  label="License expiry date"
                  name="license_expire_date"
                  min={disablePastDate()} // Set the minimum date to today
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  onBlur={handleFocus}
                  focus={focus.toString()}
                  defaultValue={dateformet}
                  required
                  feedbackInvalid="Please Select License Expiry Date"
                  style={{ width: '90%' }}
                />
              </CCol>

              <CCol md={6} className="userinputs-edit">
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
                  defaultValue={product.phone}
                  pattern="^[0-9]{10}"
                  required
                  feedbackInvalid="Please provide valid Phone No"
                  style={{ width: '90%' }}
                />
              </CCol>

              <CCol md={6} className="userinputs-edit">
                <CFormInput
                  className="user_input_field"
                  type="text"
                  label="Home Address"
                  aria-describedby="validationCustom03Feedback"
                  name="description"
                  defaultValue={product.description}
                  // pattern="^[0-9]{10}"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  id="validationCustom03"
                  feedbackInvalid="Please provide valid Home Address"
                  required
                  style={{ width: '90%' }}
                />
              </CCol>

              <CCol md={6} className="userinputs-edit">
                <CFormInput
                  className="user_input_field"
                  type="text"
                  label="Fuel Card"
                  aria-describedby="validationCustom03Feedback"
                  defaultValue={product.fuel_card_name}
                  name="fuel_card_name"
                  // pattern="^[0-9]{10}"
                  // pattern="^[A-Z a-z 0-9]{2,20}"
                  maxLength={20}
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  id="validationCustom03"
                  style={{ width: '90%' }}
                />
              </CCol>

              {/* <CCol md={6} className="userinputs">
                <CFormInput
                 className='user_input_field'
                  type="text"
                  label="Group"
                  name="group"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  onBlur={handleFocus}
                  focus={focus.toString()}
                  defaultValue={product.group}
                  required
                />
              </CCol>

              {/* <CCol md={6} className="userinputs">
                <CFormInput
                 className='user_input_field'
                  type="text"
                  label="VIN"
                  id="validationCustom01"
                  name="driver_vin_no"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  onBlur={handleFocus}
                  focus={focus.toString()}
                  defaultValue={product.driver_vin_no}
                  maxLength={17}
                  pattern="^[A-Z0-9]{3,17}"
                  required
                />
              </CCol> */}

              {/* <CCol md={6} className="userinputs">
                <CFormInput
                className='user_input_field'
                  type="email"
                  label="Email"
                  name="email"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  onBlur={handleFocus}
                  focus={focus.toString()}
                  defaultValue={product.email}
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"
                  required
                />
              </CCol> */}

              {/* <CCol md={6} className="userinputs-edit">
                <label className="Descriptionlables">Description</label>
                <br />
                <textarea
                  className="descripsionfild"
                  type="text"
                  label="Description"
                  name="description"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  onBlur={handleFocus}
                  required
                />
              </CCol> */}

              {/* <CCol md={6} className="userinputs">
                <CFormInput
                 className='user_input_field'
                  type="text"
                  label="Assigned Vehicle's No"
                  aria-describedby="validationCustom03Feedback"
                  name="assigned_vehicle_number"
                  defaultValue={product.assigned_vehicle_number}
                  pattern="^[A-Z0-9]{2,6}"
                  maxLength={6}
                  onChange={(e) => {
                    onValueChange(e)
                  }}

                  id="validationCustom03" required
                />

              </CCol> */}

              {/* <CCol xs={12}>

              <input
                    type="checkbox"
                    id="checkbox"
                    name="fruit-1"
                    value="Apple"
                  />
                  <label htmlFor="checkbox"> &nbsp;Send Alerts </label>
                  
              </CCol> */}

              {/* <CCol xs={12} className="userinputlast">
                <CFormSelect
                 className='user_input_field'
                  type="text"
                  label="Route to Vehicles"
                  autoComplete="off"
                  autoFocus="off"
                  name="lease_budget_per_month"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  onBlur={handleFocus}
                  focus={focus.toString()}
                  defaultValue={product.lease_budget_per_month}
                  isMulti
                  required
                >
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

              <CCol xs={12} className="editBottomBtn">
                <div className="editBtn">
                  <button className="editCloseBtn ms-2" type="button" onClick={onClickclose}>
                    Close
                  </button>
                  <button className="AddUserBtn" type="submit">
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
export default Conformpopup
