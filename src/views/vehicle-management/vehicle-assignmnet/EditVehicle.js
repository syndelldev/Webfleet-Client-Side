/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { CForm, CCol, CFormInput, CFormSelect, CFormLabel } from '@coreui/react'
import {
  vehicleEdit,
  vehicleEditId,
  DriverAssignment,
  DriverUnassigned,
  CheckDeviceIdent
} from '../../api/VehicleApi'
import moment from 'moment'
import Select from 'react-select'
import '../../driver-management/DriverList/EditDriver.css'

const defaultvalue = {
  id: '',
  registrationNumber: '',
  group_vehicle: '',
  vehicle_fuel_type: '',
  registered_at: '',
  vehicle_drive_type: '',
  vehicle_bore: '',
  vehicle_model_code: '',
  year: '',
  make: '',
  model: '',
  vin: '',
  status: '',
  type: '',
  current_mater: '',
  licenseplate: '',
  operator: '',
  address: '',
  date: '',
  user_id: '',
  drive_id: '',
  image: '',
  vehicle_colour: '',
  vehicle_transmission: '',
  vehicle_wheel_plan: '',
  vehicle_co2: '',
  vehicle_engine_size: '',
  vehicle_engine_number: '',
  vehicle_hpi_checked: '',
  vehicle_gross_vehicle_weight: '',
  vehicle_insurance_policy: '',
  vehicle_acquisition_type: '',
  vehicle_height: '',
  vehicle_length: '',
  vehicle_width: '',
  vehicle_mot_expiry_date: '',
  vehicle_service_due_date: '',
  vehicle_road_tax_expiry_date: '',
  vehicle_mileage: '',
  vehicle_lease_start_date: '',
  vehicle_lease_end_date: '',
  vehicle_lease_cost_per_month: '',
  vehicle_p11d_list_price: '',
  vehicle_use: '',
  vehicle_reissue: '',
  vehicle_acceleration_kph: '',
  vehicle_acceleration_mph: '',
  vehicle_aspiration: '',
  vehicle_body_code: '',
  vehicle_body_description: '',
  vehicle_country_of_origin: '',
  vehicle_cyclinder_count: '',
  vehicle_first_registered_date: '',
  vehicle_from_northern_ireland: '',
  vehicle_fuel_attribute: '',
  vehicle_fuel_code: '',
  vehicle_kerb_weight: '',
  vehicle_last_acquired_date: '',
  vehicle_last_disposed_date: '',
  vehicle_last_keeper_change_date: '',
  vehicle_make_code: '',
  vehicle_manufactured_year: '',
  vehicle_market_sector_code: '',
  vehicle_max_speed_kph: '',
  vehicle_max_speed_mph: '',
  vehicle_powe_bhp: '',
  vehicle_power_delivery: '',
  vehicle_power_kw: '',
  vehicle_power_rpm: '',
  vehicle_fuel_card: '',
  device_ident:''
}

function ConPopups(props) {
  // const user  = props.data
  //require variable
  const [user, setuser] = useState(props.data)
  const date = moment(user.vehicle_mot_expiry_date).format('yyyy-MM-DD')
  const [dateformet, setDateFormet] = useState()
  const [allData, setAllData] = useState([])
  const [selectFuel, setselectfuel] = useState()
  const [filteredIdleDriverNames, setFilteredIdleDriverNames] = useState([])
  const [AssignedDriverName, setAssignedDriverName] = useState('')
  const [ DupDeviceText, setDupDeviceText ] = useState('')

  // const id = props.data
  const IdleDriverName = props.IdleDriverName
  console.log(IdleDriverName,"idledriver")
  const deviceId = props.data.device_ident

  const onClickclose = () => {
    props.onClick(false)
    //window.location.reload()
  }

  useEffect(() => {
    loadUserData()
  }, [])
  const [focus, setFocus] = useState(false)

  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  const handleFocus = (e) => {
    setFocus(true)
  }
  //api handle
  const loadUserData = async () => {
    

    const vehicleType = user.type
    // Filter the IdleDriverName based on the vehicle type
    const filteredDrivers = IdleDriverName.filter((driver) =>
      driver.assigned_vehicle_name.includes(vehicleType),
    )

    // Set the filtered drivers in the state
    setFilteredIdleDriverNames(filteredDrivers)
  }

  const editVehicle = async() => {
     let assignmentData = {
      vehicle_number: user.registrationNumber,
      driver_name: user.operator,
    }
    if (user.operator === 'None') {
      const res = await DriverUnassigned(assignmentData)
    } else {
      const res = await DriverAssignment(assignmentData)
    }
    const result = await vehicleEditId(user).then((res) => {
      if (res.data == 'updated') {
        onClickclose()
        // sendDataToParent()
        window.location.reload()
        // props.onClick(false)
      }
    })
  }

  const VehicleUser = async () => {

    if(user.device_ident === ''){
      editVehicle()
      // console.log("hitted")
    }
    else{
      if(user.device_ident !== deviceId){
        const result = await CheckDeviceIdent(user.device_ident)
        .then((res)=>{
          if(res.status === 200){
            editVehicle()
          }
          else if(res.status === 203){
            console.log(res.data,"make")
            setDupDeviceText(`This device is already associated with ${res.data} Vehicle`)
          }
          else if(res.status === 204){
            setDupDeviceText(`No device found on your flespi account with this id`)
          }
          else{

          }
        })
      }
      else{
        editVehicle()
      }
    }

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
    <div >
      <div className="edit_driver_main_sidebar">
        <div className="edit_driver_main_container">
         
             <div className='Edit_driver_pop_header' onClick={onClickclose}>
                <i class="fas fa-arrow-left back_arraw_edit_icon"></i>
                <span className='edit_header_text'>Assign Vehicle</span>
              </div>
          <div className="vehicleDivinput">
            <CForm
              className="row gy-3 gx-5 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={6}>
                <CFormInput
                  className="input_fie"
                  type="text"
                  label="Vehicle License No"
                  name="registrationNumber"
                  aria-describedby="validationCustom05Feedback"
                  defaultValue={user.registrationNumber}
                  feedbackInvalid="Please enter a valid License No"
                  pattern="[A-Z]{2}\d{2}\s?[A-Z]{3}"
                  placeholder="ex. AB12XYZ"
                  id="validationCustom03"
                  required
                  disabled
                />
              </CCol>

              <CCol md={6}>
                <CFormInput
                  className="input_fie"
                  type="text"
                  label="Make"
                  name="make"
                  aria-describedby="validationCustom05Feedback"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  defaultValue={user.make}
                  // defaultValue={user.make}
                  focus={focus.toString()}
                  onBlur={handleFocus}
                  pattern="^[A-Z a-z 0-9]{3,20}"
                  maxLength={20}
                  feedbackInvalid="Please provide Make of the Vehicle"
                  id="validationCustom03"
                  required
                  disabled
                />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="driverSelect">Driver Name</CFormLabel>
                <Select
                  className="input_fie"
                  id="driverSelect"
                  options={
                    user.operator === 'None'
                      ? [
                          { value: 'None', label: 'None' },
                          ...filteredIdleDriverNames.map((item) => ({
                            value: item.driver_name,
                            label: item.driver_name,
                          })),
                        ]
                      : [
                          { value: 'None', label: 'None' },
                          { value: AssignedDriverName, label: AssignedDriverName },
                          ...filteredIdleDriverNames.map((item) => ({
                            value: item.driver_name,
                            label: item.driver_name,
                          })),
                        ]
                  }
                  value={{ value: user.operator, label: user.operator }}
                  onChange={(selectedOption) => {
                    onValueChange({ target: { name: 'operator', value: selectedOption.value } })
                  }}
                  onBlur={handleFocus}
                  placeholder="Search or Select Operator..."
                  noOptionsMessage={() => 'No operators available'}
                />
              </CCol>

              <CCol md={6}>
                    <CFormInput
                      className="input_fie"
                      type="tel"
                      label="Teltonika Device Id"
                      name="device_ident"
                      onChange={(e) => {
                        onValueChange(e) 
                        setDupDeviceText(null)
                      }}
                      defaultValue={user.device_ident}
                      placeholder='Add your teltonika device id (optional)'
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      // disabled
                      // required
                      feedbackInvalid="Please select a valid option"
                      style={{ marginBottom: '10px' }}
                    ></CFormInput>
                    <small   style={{
                            color: '#FF1E1C',
                          }}>{DupDeviceText}</small>
                  </CCol>

              <CCol className="editBottomBtn" xs={12}>
                <div className="vehicle-btn-add-vehicle">
                  <button className="editCloseBtn" type="cancle" onClick={onClickclose}>
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

export default ConPopups
