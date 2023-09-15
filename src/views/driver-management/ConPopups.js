/* eslint-disable */
/* eslint-disable react/prop-types */
// / eslint-disable react/prop-types /
import React, { useState, useEffect } from 'react'
import { CForm, CCol, CFormInput, CButton, CFormSelect } from '@coreui/react'
import { driverEdit, driverEditId } from '../api/api'
import moment from 'moment'

function Conformpopup(props) {
  const product = props.data
  const id = props.data.id
  const dateformet = moment(props.data.license_expire_date).format('yyyy-MM-DD')

  const onClickclose = () => {

    props.onClick(false)
  }
  const defaultvalue = {
    driver_name: '',
    licesnse_no: '',
    group: '',
    license_expire_date: '',
    email: '',
    status: '',
    phone: '',
    description: '',
    assigned_vehicle_number: '',
    registered_at: '',
    user_Id: '',
    image: '',
    lease_budget_per_month: '',
    lease_budget_code: '',
    driver_vin_no: '',
    fuel_card_name: '',
  }

  const [user, setuser] = useState(defaultvalue)
  const [validated, setValidated] = useState(false)

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
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      const result = await driverEditId(user).then((res) => {
        if (res.data == 'updated') {
        }
      })
    }
  }

  return (
    // style={{ height: `${height}px` }}
    <div className="editcontent">
      <div className="drivereditboxedit">
        <div className="drivercontenor">
          <div className="Adddriverhadding">
            <button className="clossbutton" onClick={onClickclose}>
              xW
            </button>
            <span>Edit Driver</span>
          </div>
          <div className="DriverDiv">
            <CForm
              className="row g-3 text-start formpaddaingdriveredit"
              noValidate
              validated={validated}
              onSubmit={onClickAdd}
            >
              <CCol md={6} className="userinputs">
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
                />
                {/* <span className="inputErr">user name must be in 3-16 char</span> */}
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
                  defaultValue={product.status}
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
                  defaultValue={product.assigned_vehicle_name}
                  required
                >
                  <option>Car</option>
                  <option>Truck</option>
                  <option>Bus Fine</option>
                </CFormSelect>
              </CCol>
              <CCol md={6} className="userinputs">
                <CFormInput
                  className="user_input_field"
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
              <CCol md={6} className="userinputs">
                <CFormInput
                  className="user_input_field"
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
                  defaultValue={product.licesnse_no}
                  required
                />
              </CCol>
              <CCol md={6} className="userinputs">
                <CFormInput
                  className="user_input_field"
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
                  defaultValue={product.phone}
                  pattern="^[0-9]{10}"
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
                  defaultValue={product.description}
                  // pattern="^[0-9]{10}"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  id="validationCustom03"
                  required
                />
              </CCol>
              {/* <CCol md={6} className="userinputs">
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
              <CCol md={6} className="userinputs">
                <CFormInput
                  className="user_input_field"
                  type="text"
                  label="Fuel Card Name"
                  aria-describedby="validationCustom03Feedback"
                  defaultValue={product.fuel_card_name}
                  name="fuel_card_name"
                  // pattern="^[0-9]{10}"
                  pattern="^[A-Z a-z 0-9]{1,20}"
                  maxLength={20}
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  id="validationCustom03"
                  required
                />
              </CCol>
              {/* <CCol xs={12}> */}
              {/* <input
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
              <CCol xs={12} className="buttondriver">
                <CButton className="px-4 driverbuttonsform mx-3" onClick={onClickclose}>
                  Close
                </CButton>
                <CButton className="px-4 driverbuttonssave" type="submit" onClick={onClickAdd}>
                  {' '}
                  Save
                </CButton>
              </CCol>
            </CForm>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Conformpopup
