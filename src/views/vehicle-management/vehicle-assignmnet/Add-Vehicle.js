/* eslint-disable */
import { CForm, CCol, CFormInput, CFormSelect, CFormLabel } from '@coreui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addVehicle } from '../../api/VehicleApi'
import logoimages from '../../../assets/images/avatars/logo1.ico'
import React from 'react'
import { DriverAssignment } from '../../api/VehicleApi'
import Select from 'react-select'
import { DvlaRegisterNumber, CheckDeviceIdent } from '../../api/VehicleApi'
import LoaderScreen from 'src/views/Loader/LoaderScreen'

const defaultvalue = {
  type: '',
  operator: 'None',
  status: 'Idle',
}

const vehiclemanagement = (props) => {
  //require variable
  const { DriverData } = props
  const navigate = useNavigate()
  const [user, setuser] = useState(defaultvalue)
  const [loading, setLoading] = useState(false)
  const [DataLoading, setDataLoading] = useState(false)
  const [UniqeValue, setUniqeValue] = useState(false)
  const [NotFoundValue, setNotFoundValue] = useState(false)
  const [IdleDriverName, setIdleDriverName] = useState([])
  const [DvlaApiDiv, setDvlaApiDiv] = useState(true)
  const [registerNumber, setregisterNumber] = useState('')
  const [dvlaApiData, setdvlaApiData] = useState([])
  const [selectedVehicleType, setSelectedVehicleType] = useState('')
  const [filteredIdleDriverNames, setFilteredIdleDriverNames] = useState([])
  const [ DupDeviceText, setDupDeviceText ] = useState('')

  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  const onValueChangeDvla = (e) => {
    setregisterNumber(e.target.value)
  }

  const DvlaApiCall = async () => {
    const result = await DvlaRegisterNumber(registerNumber).then((res) => {
      if (res?.status === 200) {
        setdvlaApiData(res.data)
        setDvlaApiDiv(false)
        setDataLoading(false)
      } else if (res?.status === 203) {
        setUniqeValue(true)
        setDataLoading(false)
      } else if (res?.status === 400) {
        setNotFoundValue(true)
        setDataLoading(false)
      } else {
        setNotFoundValue(true)
        setDataLoading(false)
      }
    })
  }

  const handleSubmitDvla = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      event.preventDefault()
      setDataLoading(true)

      DvlaApiCall()
    }
  }

  const handleVehicleTypeChange = (e) => {
    const selectedType = e.target.value
    setSelectedVehicleType(selectedType)
    const driversForType = IdleDriverName.filter((driver) =>
      driver.assigned_vehicle_name.includes(selectedType),
    )
    setFilteredIdleDriverNames(driversForType)

    // Clear the selected operator when vehicle type changes
    setuser({ ...user, operator: 'None' })
  }

  useEffect(() => {
    LoadDriverIdleList()
  }, [])

  const AddTheVehicle = async() => {
    let assignmentData = {
      vehicle_number: dvlaApiData.registrationNumber,
      driver_name: user.operator,
    }

    if (user.operator !== 'None' || user.operator !== '') {
      const res = await DriverAssignment(assignmentData)
    }

    const combinedArray = {
      ...dvlaApiData,
      ...user,
    }

    const result = await addVehicle(combinedArray).then((res) => {
      if (res.status === 200) {
        setDataLoading(false)

        navigate('/vehicle-management/vehicle-assignment')
        window.location.reload()
      } else if (res.status === 400) {
        // setUniqeValue(true)
      } else {
      }
    })
  }

  const VehicleAddFunction = async () => {
    console.log(user.device_ident,"idend")
    if(user.device_ident){
        const result = await CheckDeviceIdent(user.device_ident)
        .then((res)=>{
          if(res.status === 200){
            AddTheVehicle()
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
      AddTheVehicle()
    }
  }

  //validation handle
  const [validated, setValidated] = useState(false)

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      setValidated(true)
    } else {
      event.preventDefault()
      setDataLoading(true)

      VehicleAddFunction()
    }
  }

  console.log(dvlaApiData.length, 'dvlaApiData.length')

  // search function----------------------------------------------------------

  const LoadDriverIdleList = () => {
    const idleDriverFilter = DriverData.filter(
      (item) => item.assigned_vehicle_number === 'None' && item.status === 'Active',
    )
    setIdleDriverName(idleDriverFilter)
  }

  const [focus, setFocus] = useState(false)
  const handleFocus = (e) => {
    setFocus(true)
  }

  const Closeevent = () => {
    navigate('/vehicle-management/vehicle-assignment')
  }

  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  return (
    <div className="adduserdiv">
      {DataLoading === true && <LoaderScreen />}
      {loading ? (
        <div className="loader-container">
          <div className="spinner"> </div>
          <img src={logoimages} style={{ width: 60, height: 60 }} />
        </div>
      ) : (
        <div className="add_vehicle_main_sidebar">
      <div className={DvlaApiDiv === true ? "add_vehicle_main_container" : "add_vehicle_data_main_container"}>

           
          <div className='Edit_driver_pop_header' onClick={Closeevent}>
                <i class="fas fa-arrow-left back_arraw_edit_icon"></i>
                <span className='edit_header_text'>Add Vehicle</span>
              </div>
           

            {DvlaApiDiv === false ? (
              <div className="vehicleDivinput">
                <CForm
                  className="row gy-3 gx-5  needs-validation"
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
                      defaultValue={dvlaApiData.registrationNumber}
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
                      label="MOT Status"
                      aria-describedby="validationCustom05Feedback"
                      defaultValue={dvlaApiData.motStatus}
                      focus={focus.toString()}
                      onBlur={handleFocus}
                      feedbackInvalid="Please provide a valid year"
                      id="validationCustom03"
                      required
                      disabled
                      style={{ marginBottom: '9px' }}
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
                      defaultValue={dvlaApiData.make}
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
                    <CFormInput
                      className="input_fie"
                      type="text"
                      label="Year Of Manufacture"
                      name="model"
                      defaultValue={dvlaApiData.yearOfManufacture}
                      aria-describedby="validationCustom05Feedback"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      // defaultValue={user.model}
                      focus={focus.toString()}
                      onBlur={handleFocus}
                      pattern="^[A-Z a-z 0-9]{3,20}"
                      maxLength={20}
                      feedbackInvalid="Please provide a valid Model Name."
                      id="validationCustom03"
                      required
                      disabled
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      className="input_fie"
                      type="text"
                      label="MOT Expiry Date"
                      name="vin"
                      aria-describedby="validationCustom05Feedback"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      defaultValue={dvlaApiData.motExpiryDate}
                      focus={focus.toString()}
                      onBlur={handleFocus}
                      pattern="^[A-HJ-NPR-Z0-9]{17}$"
                      maxLength={17}
                      feedbackInvalid="Please provide a valid Vehicle Identification Number"
                      id="validationCustom03"
                      disabled
                      required
                      style={{ marginBottom: '9px' }}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      className="input_fie"
                      type="text"
                      label="Engine Capacity"
                      name="vehicle_mot_expiry_date"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      defaultValue={dvlaApiData.engineCapacity}
                      disabled
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      // defaultValue={allData.status}
                      required
                    ></CFormInput>
                  </CCol>

                  <CCol md={6}>
                    <CFormInput
                      className="input_fie"
                      type="text"
                      label="Fuel Type"
                      name="vehicle_fuel_type"
                      aria-describedby="inputGroupPrependFeedback"
                      pattern="^[A-Za-z0-9]{3,40}"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      defaultValue={dvlaApiData.fuelType}
                      disabled
                      id="validationCustomUsername"
                      feedbackInvalid="Please select a valid option"
                      required
                      style={{ marginBottom: '10px' }}
                    ></CFormInput>
                  </CCol>

                  <CCol md={6}>
                    <CFormInput
                      className="input_fie"
                      type="text"
                      label="Date Of Last V5C Issued"
                      name="vehicle_drive_type"
                      //  pattern="^[A-Za-z0-9]{3,40}"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      defaultValue={dvlaApiData.dateOfLastV5CIssued}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      disabled
                      required
                      feedbackInvalid="Please select a valid option"
                      style={{ marginBottom: '10px' }}
                    ></CFormInput>
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      className="input_fie"
                      type="text"
                      label="Co2 Emissions"
                      name="vehicle_drive_type"
                      //  pattern="^[A-Za-z0-9]{3,40}"
                      onChange={(e) => {
                        onValueChange(e)
                      }}
                      defaultValue={dvlaApiData.co2Emissions}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      disabled
                      required
                      feedbackInvalid="Please select a valid option"
                      style={{ marginBottom: '10px' }}
                    ></CFormInput>
                  </CCol>

                  <CCol md={6}>
                    <CFormInput
                      className="input_fie"
                      type="text"
                      label="Colour"
                      defaultValue={dvlaApiData.colour}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      disabled
                      required
                      feedbackInvalid="Please select a valid option"
                      style={{ marginBottom: '10px' }}
                    ></CFormInput>
                  </CCol>

                  <CCol md={6}>
                    <CFormInput
                      className="input_fie"
                      type="text"
                      label="Tax Status"
                      defaultValue={dvlaApiData.taxStatus}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      disabled
                      required
                      feedbackInvalid="Please select a valid option"
                      style={{ marginBottom: '10px' }}
                    ></CFormInput>
                  </CCol>

                  <CCol md={6}>
                    <CFormInput
                      className="input_fie"
                      type="text"
                      label="Type Approval"
                      defaultValue={dvlaApiData.typeApproval}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      disabled
                      required
                      feedbackInvalid="Please select a valid option"
                      style={{ marginBottom: '10px' }}
                    ></CFormInput>
                  </CCol>

                  <CCol md={6}>
                    <CFormInput
                      className="input_fie"
                      type="text"
                      label="Wheel Plan"
                      defaultValue={dvlaApiData.wheelplan}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      disabled
                      required
                      feedbackInvalid="Please select a valid option"
                      style={{ marginBottom: '10px' }}
                    ></CFormInput>
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
                      // defaultValue={dvlaApiData.wheelplan}
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

                  <CCol md={6}>
                    <CFormSelect
                      className="input_fie"
                      label="Vehicle Type"
                      name="type"
                      onChange={(e) => {
                        handleVehicleTypeChange(e)
                        onValueChange(e) // Update the form values for user.type
                      }}
                      onBlur={handleFocus}
                      focus={focus.toString()}
                      required
                      value={user.type}
                      feedbackInvalid="Please select a valid option"
                      style={{ marginBottom: '10px' }}
                    >
                      <option value="" className="d-none">
                        Select Type
                      </option>
                      <option value="Car">Car</option>
                      <option value="Truck">Truck</option>
                      <option value="Bus">Bus</option>
                    </CFormSelect>
                  </CCol>

                  <CCol md={6}>
                    <CFormLabel htmlFor="driverSelect">Driver Name</CFormLabel>
                    <Select
                      className="input_fie"
                      id="driverSelect"
                      defaultValue={{ value: 'None', label: 'None' }}
                      options={[
                        { value: 'None', label: 'None' },
                        ...filteredIdleDriverNames.map((item) => ({
                          value: item.driver_name,
                          label: item.driver_name,
                        })),
                      ]}
                      onChange={(selectedOption) => {
                        // Update the selected operator value
                        onValueChange({
                          target: { name: 'operator', value: selectedOption.value },
                        })
                      }}
                      onBlur={handleFocus}
                      value={
                        selectedVehicleType ? { value: user.operator, label: user.operator } : null
                      }
                      isDisabled={!selectedVehicleType}
                      placeholder="Select Driver..."
                      noOptionsMessage={() => 'No Drivers available'}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          borderColor:
                            validated && !user.operator ? '#FF1E1C' : provided.borderColor,
                        }),
                      }}
                    />
                  </CCol>

                  <CCol className="editBottomBtn" xs={12}>
                    <div className="vehicle-btn-add-vehicle">
                      <button className="editCloseBtn" type="cancle" onClick={Closeevent}>
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
            ) : (
              <>
                <div className="vehicleDivinput">
                  <CForm
                    className="row gy-3 gx-5  needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmitDvla}
                  >
                    <CCol md={6}>
                      <CFormInput
                        className="input_fie"
                        type="text"
                        label="Vehicle License No"
                        name="registrationNumber"
                        aria-describedby="validationCustom05Feedback"
                        onChange={(e) => {
                          onValueChangeDvla(e)
                          setUniqeValue(false)
                          setNotFoundValue(false)
                        }}
                        feedbackInvalid="Please enter a valid License No"
                        // pattern="[A-Z]{2}\d{2}\s?[A-Z]{3}"
                        placeholder="ex. AB12XYZ"
                        id="validationCustom03"
                        required
                        maxLength={7}
                      />
                      {UniqeValue === true ? (
                        <small
                          style={{
                            color: '#FF1E1C',
                          }}
                        >
                          This number is already registered
                        </small>
                      ) : (
                        <></>
                      )}
                      {NotFoundValue === true && (
                        <small
                          style={{
                            color: '#FF1E1C',
                          }}
                        >
                          Invalid vehicle license number
                        </small>
                      )}
                    </CCol>
                    <CCol className="editBottomBtn" xs={12}>
                      <div className="vehicle-btn-add-vehicle">
                        <button className="editCloseBtn" type="cancle" onClick={Closeevent}>
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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default vehiclemanagement
