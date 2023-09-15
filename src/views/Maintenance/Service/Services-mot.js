/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit'
import { UserDetails, addservices } from '../../api/api'
// import Conformpopup from '../Conformpopus.js'
import moment from 'moment'
import {
  CForm,
  CCol,
  CFormInput,
  CFormSelect,
  CFormCheck,
  CButton,
  CCard,
  CCardBody,
  CRow,
  CImage,
  CCardImage,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalBody,
  CModalTitle,
  CFormLabel
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import './Services-mot.css'
import { selectClasses, useStepContext } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { DriverMaintenance, ServiceUnassignedDriverApi, findGarage } from '../../api/VehicleApi'
import LoaderScreen from '../../Loader/LoaderScreen'
import MainLoaderScreen from 'src/views/Loader/MainLoaderScreen'
import Select from 'react-select'


function Servicesmot(props) {
  const { VehicleData } = props
  const Navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [filterResults, setFilterResults] = useState([])
  const [apiData, setApiData] = useState([])
  const [user, setuser] = useState()

  const [allData, setAllData] = useState([])
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [selectedCard, setSelectedCard] = useState('')
  const [showCard, setShowCard] = useState(true)
  const [cardError, setCardError] = useState('')
  const [postcode, setPostcode] = useState('')
  const [showInput, setShowInput] = useState(true)
  const [postcodeError, setPostcodeError] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [showData, setShowData] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [AccordionActiveId, setAccordionActiveId] = useState(1)
  const [showSubmitData, setShowSubmitData] = useState(false)
  const [showInputData, setshowInputData] = useState(false)
  const [garageDetails, setGarageDetails] = useState([]);
  const [selectedGarage,setSelectedGarage] = useState(null)
  const [workShop, setWorkShop] = useState('')
  const [selectedPostcode, setSelectedPostcode] = useState('')
  const [ PostLoader, setPostLoader ] = useState(false)

  //const [isOpen, setIsOpen] = useState(true)
  let height = document.documentElement.scrollHeight

  const [allvehicleData, setAllVehicleData] = useState([])

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    setAllVehicleData(VehicleData)
    handleFilter()
  }, [VehicleData])

  const handleFilter = () => {
    const filterResult = VehicleData.filter((item) => item.status !== 'In Maintenance' )

    setFilterResults(filterResult)
    setLoading(false)
    // console.log("Filter result", filterResult);
  }

  // const handleSubmit = async (event) => {
  //   const form = event.currentTarget
  //   if (form.checkValidity() === true) {

  //     setValidated(true)
  //     event.preventDefault()
  //     UpdateUser()
  //   }

  //   event.preventDefault()
  //   event.stopPropagation()
  //   setValidated(true)
  // }

  // const LoadUserName = async () => {
  //   const userName = localStorage.getItem('userId');

  //   setuserNameProfile(userName)
  // }

  // useEffect(() => {
  //   getDrivers()
  //   LoadUserName()
  //   // addservices()

  //   // getProfileDAta()
  // }, [])

  // const editUser = () => {

  //   setConformpopup(true)
  // }

  // const getBoolianVar = (boolian) => {
  //   setConformpopup(boolian)
  // }
  // const onValueChange = (e) => {
  //   setuser({ ...user, [e.target.name]: e.target.value })

  // }

  const threespen = () => {}

  const unassignedDriverApiService = async () => {
    const result = await ServiceUnassignedDriverApi(allData.registrationNumber)
  }

  //api
  const getServices = async (data) => {
    setLoading(true)
    console.log("");
    if (allData.make && selectedCard.name && selectedTime && selectedDate && selectedGarage) {
      const ServiceData = await addservices(allData).then((res, err) => {
        if (!err) {
          setApiData(addservices.data)
          console.log('test pass',apiData)
          setVisible(!visible)
          setLoading(false)
          setSubmitError('')
        } else {
          setSubmitError('Please fill all the required fields')
          setLoading(false)
        }
      })
    } else {
      setSubmitError('Please fill all the required fields')
      setLoading(false)
    }   
  }
  const getAllData = () => {
    const data = {
      registrationNumber: allData.registrationNumber,
      make: allData.make,
      service_type: selectedCard.name,
      postcode: selectedPostcode,
      maintance_date: selectedDate,
      time: selectedTime,
      workshop_name: workShop,
    }
    setAllData(data)
    setApiData(addservices.data)
    // getServices(data)
    // console.log("all services", allData);
    // setShowSubmitData(true)
  }

  const updateAllData = (data) => {
    setAllData(data)
  }

  const updateDriver = async () => {
    let updateDriverData = {
      vehicle_number: user.registrationNumber,
      driver_name: user.operator,
    }
    if (user.operator === 'None') {
      getServices()
    } else {
      const res = await DriverMaintenance(updateDriverData)
    }
  }

  // select vehicle

  const handleSelect = (item) => {
    setSelectedVehicle(item)
    getAllData()
    setAccordionActiveId(2)

    updateAllData({
      ...allData,
      make: item.make,
      registrationNumber: item.registrationNumber,
    })
  }

  const handleDeselect = () => {
    setSelectedVehicle('')
    updateAllData({
      ...allData,
      make: '',
      registrationNumber: '',
    })
  }

  //card selecte

  const handlecardselect = (cardData) => {
    setSelectedCard(cardData)
    setShowCard(false)
    getAllData()
    setAccordionActiveId(3)

    updateAllData({
      ...allData,
      service_type: cardData.name,
    })
  }

  const handleResetCard = () => {
    setShowCard(true)
    // setAccordionActiveId(2)
    setSelectedCard('')
    setCardError('')
    updateAllData({
      ...allData,
      service_type: '',
    })
  }

  //postcode

  const handlePostcode = async () => {
    if (!postcode) {
      setPostcodeError('Please Enter postcode before continuing.')
      setGarageDetails([]);
    } else {
      setPostcodeError('')
      // setShowInput(false)
      // getAllData()
      // setAccordionActiveId(4)
      // updateAllData({
      //   ...allData,
      //   postcode: postcode,
      // })
      try {
        setPostLoader(true)
        const response = await findGarage(postcode)
        .then((res)=>{
          if(res?.status === 200){
            setGarageDetails(res.data)
        setPostLoader(false)

          }
          else{
            setPostcodeError('Garage not found on this postcode');
            setGarageDetails([]);
        setPostLoader(false)

          }
        })
     
       
      } 
      catch (error) {
        // console.error('Error fetching garage details:', error);
      
      }
    }
  }

  const handleSelectPostcode = (item) => {
    setSelectedGarage(item)
    console.log("select garage", selectedGarage);
    setSelectedPostcode(item.garage_postcode)
    setWorkShop(item.garage_name)
    getAllData()
    updateAllData({
      ...allData,
      postcode: item.garage_postcode,
      workshop_name: item.garage_name,
    })
    setShowInput(false)
    setAccordionActiveId(4)
    
  }

  const handleResetPostcode = () => {
    setErrorMessage('')
    setPostcode('')
    setSelectedGarage('')
    setGarageDetails([]);
    setShowInput(true)
    updateAllData({
      ...allData,
      postcode: '',
      workshop_name: ''
    })
  }

  //date-time
  const today = new Date().toISOString().split('T')[0]

  const handleContinue = () => {
    if (!selectedDate || !selectedTime || selectedTime === 'Choose the time') {
      setErrorMessage('Please select both before continuing.')
      return
    }
    setErrorMessage('')
    setShowData(false)
    getAllData()
    setAccordionActiveId(5)
    setShowSubmitData(true)
    updateAllData({
      ...allData,
      maintance_date: selectedDate,
      time: selectedTime,
    })
  }

  const handleEdit = () => {
    setErrorMessage('')
    setSelectedDate('')
    setSelectedTime('')
    setShowData(true)
    updateAllData({
      ...allData,
      maintance_date: '',
      time: '',
    })
  }

  const submitOK = () => {
    Navigate('/Maintenance/maintenance-list')
    setVisible(false)
    // updateDriver()
  }

  const handleVehicle = (e) => {
    const [registrationNumber, driver_name] = e.value.split('-');
    setSelectedVehicle(e.value)
    getAllData()
    setAccordionActiveId(2)

    updateAllData({
      ...allData,
      make: driver_name,
      registrationNumber: registrationNumber,
    })
    // setSelectedVehicleData(registrationNumber)
    // setSelectedDriverName(driver_name)
    console.log(registrationNumber,driver_name,"e")
  }

  ;<MDBAccordionItem className="accordion-button" collapseId="newCollapseId" defaultOpened>
    {/* Accordion item content */}
  </MDBAccordionItem>

  // const saveTheData  = () => {}
  return (
    <div style={{ marginTop: '50px' }}>
      {loading ? (
        <LoaderScreen />
      ) : (
       
        <div
          className="supportDivprofile mantancecontent"
          style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}
        >
           
         { PostLoader && <MainLoaderScreen/> }
        
          <div className="sildermaincontent">
            <MDBAccordion initialActive={1} className="slider1box ">
              <span className="acodiyanfont">1</span>

              <MDBAccordionItem
                className="acodiyan-silde"
                style={{ background: 'transparent' }}
                collapseId={AccordionActiveId == 1 ? 1 : 2}
                headerTitle="Which vehicle do you wish to repair,service or MOT?"
              >              
                {allvehicleData.length > 0 ? (
                  <>
                    {selectedVehicle ? (
                      <>
                      <div className=' service-change-div' >
                          <div className='d-flex' style={{ marginTop: '6px'}}>
                            <span>
                            {/* <CImage className='vehicle-img'  src="/img/car.svg" /> */}
                            <CImage className='vehicle-img'  src="/img/car2.png" />
                            </span>
                            <div className='d-flex' >
                              <p style={{ fontWeight: 'bold'}}>{allData.make}</p>
                              <p className='ps-2'>{allData.registrationNumber}</p>
                            </div>
                          </div>
                          <div>
                          <button
                            className=" vehicle-select-btn"                                  
                            onClick={(e)=>{handleDeselect(e.target.value)}}
                          >
                            Change
                          </button>
                          </div>
                        </div>
                      </>
                    ) : (

                      <div className='service_dropdown_vehicle_data'>
                      <CCol md={6}>
                      <CFormLabel htmlFor="driverSelect">Select vehicle for maintenance</CFormLabel>
                      <Select
                        className="input_fie service_dropdown_vehicle_data_input"
                        id="driverSelect"
                        options={[
                     
                          ...filterResults.map((item) => ({
                            value: `${item.registrationNumber} - ${item.make}`,
                            label: `${item.registrationNumber} - ${item.make}`,
                          })),
                        ]}
                      
                        onChange={handleVehicle}
                       
                     
                        placeholder="Select Driver..."
                        noOptionsMessage={() => 'No Drivers available'}
                      
                      />
                    </CCol>
                    </div>
                    )}
                  </>
                ) : (
                  <div>
                    <p>No vehicle found for maintenance</p>
                  </div>
                )}
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBAccordion
              initialActive={2}
              style={{
                pointerEvents: AccordionActiveId === 2 || allData.service_type ? 'auto' : 'none',
              }}
            >
              <span className="acodiyanfont">2</span>
              <MDBAccordionItem
                collapseId={AccordionActiveId == 2 ? 2 : 3}
                style={{ background: 'transparent' }}
                className="acodiyan-silde"
                headerTitle="What kind of servicing do you need?"
                // onToggle={() => handleAccordionToggle(2)}
              >
                {showCard && (
                  <>
                    <div className="service-heading-div">
                      <div className="service-heading">Select your servicing type(s)</div>
                    </div>
                    <div
                      className="d-flex service_card_div mt-3"
                      style={{ background: 'transparent' }}
                    >
                      <div className="d-flex service_card_div1">
                        <div className="service-card">
                          <CCard
                            className="card_main"
                            onClick={() => handlecardselect({ name: 'MOT TEST' })}
                            style={{ pointerEvents: 'auto' }}
                          >
                            <CCardBody>
                              <CImage className="service_card_img" src="/img/mot.png" style={{ height: '40px', marginTop: '4px'}} />
                              <p className="card_p" style={{ marginTop: '12px'}}>MOT TEST</p>
                            </CCardBody>
                          </CCard>
                        </div>
                        <div className="service-card">
                          <CCard
                            className="card_main"
                            onClick={() => handlecardselect({ name: 'FULL SERVICE' })}
                            style={{ pointerEvents: 'auto' }}
                          >
                            <CCardBody>
                              <CImage className="service_card_img" src="/img/repair-tools.png" style={{ height: '50px'}} />
                              <p className="card_p" style={{ marginTop: '6px'}} >FULL SERVICE</p>
                            </CCardBody>
                          </CCard>
                        </div>
                        <div className="service-card card3">
                          <CCard
                            className="card_main"
                            onClick={() => handlecardselect({ name: 'INTERIM SERVICE' })}
                            style={{ pointerEvents: 'auto' }}
                          >
                            <CCardBody>
                              <CImage className="service_card_img" src="/img/car.png" style={{ marginTop: '4px'}} />
                              <p className="card_p" style={{ marginTop: '6px'}}>INTERIM SERVICE</p>
                            </CCardBody>
                          </CCard>
                        </div>
                      </div>

                      <div className="d-flex service_card_div2">
                        <div className="service-card">
                          <CCard
                            className="card_main"
                            onClick={() => handlecardselect({ name: 'OIL CHANGE' })}
                            style={{ pointerEvents: 'auto' }}
                          >
                            <CCardBody>
                              <CImage className="service_card_img" src="/img/petrol.svg" style={{ height: '50px'}} />
                              <p className="card_p" style={{ marginTop: '6px'}}>OIL CHANGE</p>
                            </CCardBody>
                          </CCard>
                        </div>
                        <div className="service-card">
                          <CCard
                            className="card_main"
                            onClick={() => handlecardselect({ name: 'NOT SURE YET' })}
                            style={{ pointerEvents: 'auto' }}
                          >
                            <CCardBody>
                              <CImage className="service_card_img" src="/img/question-mark.svg" style={{ height: '50px'}} />
                              <p className="card_p " style={{ marginTop: '6px'}}>NOT SURE YET</p>
                            </CCardBody>
                          </CCard>
                        </div>
                      </div>
                    </div>
                    {cardError && (
                      <span style={{ color: 'red', paddingLeft: '6px' }}>{cardError}</span>
                    )}
                  </>
                )}
                {!showCard && selectedCard && (
                  <>
                    <div className="service-change-div " >
                      <div className="change-info ">
                        <p >{selectedCard.name}</p>
                      </div>
                      <div className="colslider service-cbtn">
                        <button
                          className="vehicle-select-btn"
                          
                          onClick={handleResetCard}
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </MDBAccordionItem>
            </MDBAccordion>
            <MDBAccordion
              initialActive={3}
              style={{
                pointerEvents: AccordionActiveId === 3 || selectedGarage ? 'auto' : 'none',
              }}
            >
              <span className="acodiyanfont">3</span>
              <MDBAccordionItem
                collapseId={AccordionActiveId == 3 ? 3 : 4}
                style={{ background: 'transparent' }}
                className="acodiyan-silde"
                onClick={threespen}
                headerTitle="Where would you like the work done"
                onToggle={() => handleAccordionToggle(3)}
              >
                {showInput && (
                  <>
                    <div className="service-heading-div" style={{ background: 'transparent' }}>
                      <div className="service-heading">Enter Postcode</div>
                    </div>
                    <div
                      className="service-heading postcode-div d-flex"
                      style={{ background: 'transparent', paddingTop: '10px' }}
                    >
                      <div className="colslider d-flex service-postcode">
                        <div className=''>
                          <CFormInput
                            className="service-postcode-input"
                            type="text"
                            name="user_postcode"
                            aria-describedby="inputGroupPrependFeedback"
                            // pattern="[A-Z0-9]{6}"
                            // pattern="^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\d[A-Za-z]{2}$"
                            // maxLength={8}
                            id="validationCustomUsername"
                            required
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            // onKeyPress={handleInputKeyPress}
                            // onChange={handleInputChange}
                            style={{ pointerEvents: 'auto' }}
                          />
                        </div>
                       <div className="service-date-time-btn colslider" style={{  paddingLeft: '10px' }}>
                        <button
                          className="vehicle-select-btn"
                          style={{
                            pointerEvents: 'auto',
                          }}
                          onClick={handlePostcode}
                        >
                          Find
                        </button>
                      </div>
                      </div>
                    </div>
                    {garageDetails.length > 0 && (
                      <>
                      
                      <div className="garage-details">
                        
                          {garageDetails.map((detail, index) => (
                            <>
                                <div className='garage-div'>
                                  <div className='d-flex' style={{ marginTop: '6px'}}>
                                    <span >
                                      <CImage className='garage-img'  src="/img/garage.png" />
                                    </span>
                                    <div  className='d-flex' >
                                      <p style={{ fontWeight: 'bold'}}>{detail.garage_name}</p>
                                      <p className='ps-2'>{detail.garage_address}</p>
                                      <p className='ps-2'>{detail.garage_postcode}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <button
                                     className=" vehicle-select-btn mt-3"
                                     style={{
                                      pointerEvents: 'auto',
                                    }} 
                                     onClick={() => handleSelectPostcode(detail)} 
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                            {/* <p 
                              style={{ cursor: 'pointer'}} 
                              onClick={() => handleSelectPostcode(detail)}
                            >
                              {detail.garage_name} {detail.garage_address}
                            </p> */}
                            </>
                          ))}
                       
                      </div>
                      </>
                    )}

                    {postcodeError && (
                      <span style={{ color: 'red', paddingLeft: '6px' }}>{postcodeError}</span>
                    )}
                  </>
                )}
                { selectedGarage && (
                  <div className='garage-div' style={{ marginTop: '12px'}}>
                  <div className='d-flex' style={{ marginTop: '6px'}}>
                    <span >
                      <CImage className='garage-img'  src="/img/garage.png" />
                    </span>
                    <div  className='d-flex' >
                      <p style={{ fontWeight: 'bold'}}>{selectedGarage.garage_name}</p>
                      <p className='ps-2'>{selectedGarage.garage_address}</p>
                      <p className='ps-2'>{selectedGarage.garage_postcode}</p>
                    </div>
                  </div>
                  <div>
                    <button
                     className=" vehicle-select-btn mt-3" 
                     onClick={handleResetPostcode}
                    >
                      Change
                    </button>
                  </div>
                </div>
                )}
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBAccordion
              initialActive={4}
              style={{ pointerEvents: AccordionActiveId === 4 || allData.time ? 'auto' : 'none' }}
            >
              <span className="acodiyanfont">4</span>
              <MDBAccordionItem
                collapseId={AccordionActiveId == 4 ? 4 : 5}
                style={{ background: 'transparent' }}
                className="acodiyan-silde"
                onClick={threespen}
                headerTitle="Request an appointment"
                onToggle={() => handleAccordionToggle(4)}
              >
                {showData && (
                  <>
                    <div className="service-heading-div d-flex" style={{ background: 'transparent' }}>
                      <div className="service-heading" style={{ width: '100%' }}>
                        Select your preferred service appointment date and time
                      </div>
                    </div>
                    <div className="service-heading-time" style={{ background: 'transparent' }}>
                      <div className="service-date-time  d-flex">
                        <div className="service-date">
                          <CFormInput
                            className="service-dateinput"
                            type="date"
                            min={today}
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            style={{ pointerEvents: 'auto' }}
                          />
                        </div>
                        <div className="service-time">
                          <CFormSelect
                            className="service-timeinput"
                            aria-label="Default select example"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                            style={{ pointerEvents: 'auto' }}
                          >
                            <option>Choose the time</option>
                            <option>8:00 AM</option>
                            <option>10:00 AM</option>
                            <option>12:00 PM</option>
                          </CFormSelect>
                        </div>
                      </div>

                      <div className="service-date-time-btn colslider">
                        <button
                          className="vehicle-select-btn"
                          style={{
                            width: '90px',
                            pointerEvents: 'auto',
                          }}
                          onClick={handleContinue}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                    {errorMessage && (
                      <span style={{ color: 'red', paddingLeft: '6px' }}>{errorMessage}</span>
                    )}
                  </>
                )}
                {!showData && (
                  <div
                    className="service-change-div c-date-time"
                    style={{ background: 'transparent' }}
                  >
                    <div className="change-info d-flex">
                      <div>
                        <p>Date: {selectedDate}</p>
                      </div>
                      <div style={{ paddingLeft: '10px' }}>
                        <p>Time: {selectedTime}</p>
                      </div>
                    </div>
                    <div className="colslider service-cbtn">
                      <button
                        className="vehicle-select-btn"
                        style={{ background: '#FF1E1C', border: 'none', color: '#fff' }}
                        onClick={handleEdit}
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}
              </MDBAccordionItem>
            </MDBAccordion>

            <MDBAccordion
              initialActive={5}
              style={{ pointerEvents: AccordionActiveId === 5 || allData.time ? 'auto' : 'none' }}
            >
              <span className="acodiyanfont">5</span>
              <MDBAccordionItem
                collapseId={AccordionActiveId == 5 ? 5 : 1}
                style={{ background: 'transparent' }}
                className="acodiyan-silde"
                //  onClick={handleConfirmData}
                headerTitle="Confirmation"
              >
                {showSubmitData && (
                  <>
                    <div className=" d-block">
                      <div className="service-submit-div " >
                        <div style={{fontWeight:'bold'}} className="profilecollaman mt-2">{allData.make}</div>
                        <div style={{fontWeight:'bold'}} className="profilecollaman text-end mt-3">{allData.registrationNumber}</div>
                      </div>

                      <div className=" d-flex">
                        <div className="service-submit-div ">
                          <h5 className="profilecollaman mt-2">Service</h5>
                          <p className="profilecollaman text-end mt-3">{allData.service_type}</p>
                        </div>
                      </div>

                      <div className=" d-flex">
                        <div className="service-submit-div ">
                          <h5 className="profilecollaman mt-2">Postcode</h5>
                          <p className="profilecollaman text-end mt-3">{postcode}</p>
                        </div>
                      </div>

                      <div className=" d-flex">
                        <div className="service-submit-div change-info">
                          <h5 className="profilecollaman mt-2">Date</h5>
                          <p className="profilecollaman text-end mt-3">{allData.maintance_date}</p>
                        </div>
                      </div>

                      <div className=" d-flex">
                        <div className="service-submit-div change-info">
                          <h5 className="profilecollaman mt-2">Time</h5>
                          <p className="profilecollaman text-end mt-3">{allData.time}</p>
                        </div>
                      </div>

                      <div className=" d-flex">
                        <div className="service-submit-div change-info">
                          <h5 className="profilecollaman mt-2">Work Shop</h5>
                          <p className="profilecollaman text-end mt-3">{allData.workshop_name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="colslider mt-2 service-submit-btn text-end">
                      <button
                        className="vehicle-select-btn"
                        style={{ background: '#FF1E1C', border: 'none', color: '#fff' }}
                        onClick={getServices}
                      >
                        Submit
                      </button>
                    </div>
                    {submitError && <span className="text-end submitErr-btn">{submitError}</span>}
                  </>
                )}
              </MDBAccordionItem>
            </MDBAccordion>
          </div>

          <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
            <CModalBody>
              <CModalTitle className="model_title text-center ps-0">
                  Your service appointment is booked
              </CModalTitle>
            </CModalBody>

            <div className="popupdeletebutton">
              <div
                className="popupcancelbutton d-flex justify-content-center align-items-center"
                onClick={() => setVisible(false)}
              >
                Cancel
              </div>
              <div
                className="popupeditbutton d-flex justify-content-center align-items-center"
                onClick={submitOK}
              >
                Ok
              </div>
            </div>
          </CModal>

          {/* })} */}
        </div>
      )}
    </div>
  )
}

export default Servicesmot
