/* eslint-disable */
import React, { useEffect, useState } from 'react'
import logoimages from '../../assets/images/avatars/logo1.ico'
import sliderimage1 from '../../assets/images/Screenshot_387 3.svg'
import sliderimage2 from '../../assets/images/Screenshot_389 4.svg'
import sliderimage3 from '../../assets/images/Screenshot_389 5.svg'
import sliderimage4 from '../../assets/images/Screenshot_389 6.svg'
import content2imag1 from '../../assets/images/Screenshot_388 1.svg'
import content2imag2 from '../../assets/images/image 40.svg'
import content2imag3 from '../../assets/images/image 41.svg'
import content2imag4 from '../../assets/images/image 42.svg'
import content2imag5 from '../../assets/images/image 43.svg'
import content2imag6 from '../../assets/images/image 44.svg'
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { UserDetails } from '../api/api'
// import Conformpopup from './Conformpopus.js'
import moment from 'moment'
import { CForm, CCol, CFormInput, CFormSelect, CFormCheck, CButton } from '@coreui/react'



function Insurance(props) {
  const [loading, setLoading] = useState(false)
  const [userNameprofile, setuserNameProfile] = useState();
  const [validated, setValidated] = useState(false)
  const [apiData, setApiData] = useState([])
  const [user, setuser] = useState()
  const [fullNamedevaide, setFullNamedevaide] = useState()
  const [pushdata, setPushData] = useState()
  const [valuestore, setvaluestore] = useState('What would you like to learn more about today?')
  const [twovaluestore, setTwoValuestore] = useState('Which topic are you interested in?')
  const [idfatch, setIdfatch] = useState([])
  //   const [conformPopup, setConformpopup] = useState(false)
  const [userSingleData, setuserSingleData] = useState([])
  //const [isOpen, setIsOpen] = useState(true)

  let height = document.documentElement.scrollHeight;




  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === true) {
      console.log('valid true');
      setValidated(true)
      event.preventDefault()
      UpdateUser()
    }

    console.log('not valid')
    event.preventDefault()
    event.stopPropagation()
    setValidated(true)
  }

  const LoadUserName = async () => {
    const userName = localStorage.getItem('userId');
    console.log(userName, 'getting data grom local strorage');
    setuserNameProfile(userName)
  }


  useEffect(() => {
    getDrivers()
    LoadUserName()

    // getProfileDAta()
  }, [])
  function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  //   const editUser = () => {
  //     // setuserSingleData(ID)
  //     console.log('done');
  //     setConformpopup(true)
  //   }

  //   const getBoolianVar = (boolian) => {
  //     setConformpopup(boolian)
  //   }
  const onValueChange = (e) => {
    if (e.target.value) {
      setvaluestore(e.target.value)
    }
  }
  const onValueChangess = (e) => {
    if (e.target.value) {
      setTwoValuestore(e.target.value)
    }
  }

  console.log(valuestore);
  // const filtersengaleData = apiData.filter((item) => item.user_name === filtersengaleData)
  // console.log(filtersengaleData);
  // const getProfileDAta = async() => {
  //   const profileCallData = await userProfile()
  //   console.log(profileCallData);
  // }
  const fatchdata = idfatch.filter((element) => element.user_email === userNameprofile)
  // console.log(fatchdata[0].user_full_name);
  //  setFullNamedevaide(fatchdata.user_full_name)

  // console.log(fullNamedevaide);
  const threespen = () => {

  }
  const getDrivers = async () => {
    console.log('event hitted');
    const Vehiclesupdate = await UserDetails()
    setApiData(Vehiclesupdate.data)
    setIdfatch(Vehiclesupdate.data)
    console.log(Vehiclesupdate.data);
    //  console.log(Drivers[0]);

    //  console.log(Drivers.data[0],'user number')
  }
  // const faetslide = () => {
  // if (initialActive === 1){
  //    const test = collapseId={1}

  // }
  // }
  <MDBAccordionItem className='accordion-button' collapseId="newCollapseId" defaultOpened>
    {/* Accordion item content */}
  </MDBAccordionItem>

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"> </div>
          <img src={logoimages} style={{ width: 60, height: 60 }} />
        </div>
      ) : (
        <div className='supportDivprofile mantancecontent' style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
          <div className='d-flex align-items-center' style={{ height: 80, justifyContent: 'flex-end' }}>
            <button className='dutobutton' style={{ background: '#FF1E1C', border: 'none', color: '#fff' }}>New Request</button>
            <button style={{ marginLeft: 18 }} className='dutobutton'>Previous Requests</button>
            {/* <div className='profilename'>Profile</div> */}
            {/* <div className='editprofilebuttonrow'>
              <button onClick={editUser}><i className="fas fa-edit"></i>Edit profile</button>
            </div> */}

          </div>
          <><div className='sildermaincontent'>
            <MDBAccordion initialActive={1} className='slider1box '>
              <span className='acodiyanfont'>1</span>

              <MDBAccordionItem className="acodiyan-silde" style={{ background: 'transparent' }}
                collapseId={1}
                headerTitle='Please select the type of insurance you require'
              >
                {/* <div className='testcontent'>test</div> */}

                <span class="loader-line" style={{ marginTop: 26 }}></span>
                <div className='profilerow' style={{ background: 'transparent' }}>
                  <div className='dotpoint'></div>
                  <div className='profilecollaman' style={{ width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', paddingBottom: 10 }}>Make your selection.</div>
                  {/* <div className='profilecollaman'>TYREOO</div> */}
                </div>
                <div className='profilerow' style={{ background: 'transparent', }}>
                  <div className='dotpoint'></div>

                  <div className='profilecollaman d-flex' style={{ width: '100%' }}>
                    <div className='silderbox'>
                      <img src={sliderimage1} onclick={openCity}/* style={{ height:54,marginTop:3 }} */ />
                      {/* <p>Motor</p> */}
                    </div>
                    <div className='silderbox'>
                      <img src={sliderimage2} />

                    </div>
                    <div className='silderbox'>
                      <img src={sliderimage3} />

                    </div>
                    <div className='silderbox'>
                      <img src={sliderimage4} />

                    </div>
                  </div>
                  {/* <div className='profilecollaman'>TYREOO</div> */}
                </div>
                <div >
                  <span class="loader-line" style={{ marginTop: '-5px', width: 125, marginLeft: '-47px' }}></span>
                  <div className='profilerow' style={{ background: 'transparent', marginTop: 37 }}>
                    <div className='dotpoint'></div>
                    <div className='profilecollaman' style={{ width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', paddingBottom: 10 }}>Refine your selection.</div>
                    {/* <div className='profilecollaman'>TYREOO</div> */}
                  </div>
                  <div className='profilerow' style={{ background: 'transparent', marginTop: 5 }}>
                    <div className='dotpoint'></div>

                    <div className='profilecollaman d-flex' style={{ width: '100%' }}>
                      <div className='silderbox'>
                        <img src={content2imag1} /* style={{ height:54,marginTop:3 }} */ />
                        {/* <p>Motor</p> */}
                      </div>
                      <div className='silderbox'>
                        <img src={content2imag2} />

                      </div>
                      <div className='silderbox'>
                        <img src={content2imag3} />

                      </div>
                      <div className='silderbox'>
                        <img src={content2imag4} />

                      </div>
                      <div className='silderbox'>
                        <img src={content2imag5} />
                      </div>
                      <div className='silderbox'>
                        <img src={content2imag6} />
                      </div>
                    </div>

                  </div>
                  {/* <div className='profilecollaman'>TYREOO</div> */}
                </div>
                <div >
                  <span class="loader-line" style={{ marginTop: '-5px', width: 125, marginLeft: '-47px' }}></span>
                  <div className='profilerow' style={{ background: 'transparent', marginTop: 37 }}>
                    <div className='dotpoint'></div>
                    <div className='profilecollaman' style={{ width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', paddingBottom: 10 }}>When is your renewal date?</div>
                    {/* <div className='profilecollaman'>TYREOO</div> */}
                  </div>
                  <div className='profilerow' style={{ background: 'transparent', marginTop: 5 }}>
                    <div className='dotpoint'></div>

                    <div className='profilecollaman d-flex' style={{ width: '100%' }}>
                      <div className='d-flex'>
                        <form >
                          {/* <label for="birthday">Birthday:</label> */}
                          <input type="date" />
                        </form>
                          <span><button>Continue</button></span>
                      </div>

                    </div>

                  </div>
                  {/* <div className='profilecollaman'>TYREOO</div> */}
                </div>

                {/* <span class="loader-line" style="margin-top: -23px;"></span> */}


              </MDBAccordionItem>

            </MDBAccordion>

            <MDBAccordion initialActive={2}>

              <span className='acodiyanfont'>2</span>
              <MDBAccordionItem collapseId={1} style={{ background: 'transparent' }} className='acodiyan-silde' headerTitle='Confirm your details'>
                <div className='testcontent'>test</div>
                <div>
                  <span class="loader-line" style={{ marginTop: 294, width: 670, marginLeft: '-319px' }}></span>
                  <div className='profilerow' style={{ background: 'transparent', marginTop: 37 }}>
                    <div className='dotpoint'></div>
                    <div className='profilecollaman' style={{ width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', paddingBottom: 10 }}>RAC Insurance will contact you in the next 24 hours to discuss your requirements in detail. Please confirm your details.</div>
                    {/* <div className='profilecollaman'>TYREOO</div> */}
                  </div>
                  <div className='profilerow' style={{ background: 'transparent', marginTop: 30,justifyContent: 'left' }}>
                    {/* <div className='dotpoint'></div>F */}
                    <CCol md={3}>
                      <CFormInput className='input_fie' type="text" label="Contact name" name="Contact name"
                        aria-describedby="validationCustom05Feedback"
                        onChange={(e) => { onValueChange(e) }}
                        defaultValue={''}
                        focus={focus.toString()}
                        // onBlur={handleFocus}
                        // pattern="^[A-Z0-9]{3,7}"
                        // maxLength={7}
                        // feedbackInvalid="Please provide a valid zip."
                        id="validationCustom03" required />
                    </CCol>
                    <CCol md={3}>
                      <CFormInput className='input_fie' type="text" label="Contact number" name="Contact name"
                        aria-describedby="validationCustom05Feedback"
                        onChange={(e) => { onValueChange(e) }}
                        defaultValue={''}
                        focus={focus.toString()}
                        // onBlur={handleFocus}
                        // pattern="^[A-Z0-9]{3,7}"
                        // maxLength={7}
                        // feedbackInvalid="Please provide a valid zip."
                        id="validationCustom03" required />
                    </CCol>
                    <CCol md={3}>
                      <CFormInput className='input_fie' type="text" label="Contact email" name="Contact name"
                        aria-describedby="validationCustom05Feedback"
                        onChange={(e) => { onValueChange(e) }}
                        defaultValue={''}
                        focus={focus.toString()}
                        // onBlur={handleFocus}
                        // pattern="^[A-Z0-9]{3,7}"
                        // maxLength={7}
                        // feedbackInvalid="Please provide a valid zip."
                        id="validationCustom03" required />
                    </CCol>

                  </div>
                  <div className='profilerow' style={{ display: 'block',background: 'transparent' }}>
                    <div style={{ padding:'17px 0px', fontSize:15,fontWeight:600,color:'#000000' }}>
                      Address lookup
                    </div>
                    <CCol md={3}>
                      <CFormInput className='input_fie' type="text" label="Postcode" name="Contact name"
                        aria-describedby="validationCustom05Feedback"
                        onChange={(e) => { onValueChange(e) }}
                        defaultValue={''}
                        focus={focus.toString()}
                        // onBlur={handleFocus}
                        // pattern="^[A-Z0-9]{3,7}"
                        // maxLength={7}
                        // feedbackInvalid="Please provide a valid zip."
                        id="validationCustom03" required />
                    </CCol>
                    <CCol md={3}>
                      <CFormInput className='input_fie' type="text" label="Address 1" name="Contact name"
                        aria-describedby="validationCustom05Feedback"
                        onChange={(e) => { onValueChange(e) }}
                        defaultValue={''}
                        focus={focus.toString()}
                        // onBlur={handleFocus}
                        // pattern="^[A-Z0-9]{3,7}"
                        // maxLength={7}
                        // feedbackInvalid="Please provide a valid zip."
                        id="validationCustom03" required />
                    </CCol>
                    <CCol md={3}>
                      <CFormInput className='input_fie' type="text" label="Address 2" name="Contact name"
                        aria-describedby="validationCustom05Feedback"
                        onChange={(e) => { onValueChange(e) }}
                        defaultValue={''}
                        focus={focus.toString()}
                        // onBlur={handleFocus}
                        // pattern="^[A-Z0-9]{3,7}"
                        // maxLength={7}
                        // feedbackInvalid="Please provide a valid zip."
                        id="validationCustom03" required />
                    </CCol>
                    <CCol md={3}>
                      <CFormInput className='input_fie' type="text" label="Address 3" name="Contact name"
                        aria-describedby="validationCustom05Feedback"
                        onChange={(e) => { onValueChange(e) }}
                        defaultValue={''}
                        focus={focus.toString()}
                        // onBlur={handleFocus}
                        // pattern="^[A-Z0-9]{3,7}"
                        // maxLength={7}
                        // feedbackInvalid="Please provide a valid zip."
                        id="validationCustom03" required />
                    </CCol>
                    <CCol md={3}>
                      <CFormInput className='input_fie' type="text" label="City" name="Contact name"
                        aria-describedby="validationCustom05Feedback"
                        onChange={(e) => { onValueChange(e) }}
                        defaultValue={''}
                        focus={focus.toString()}
                        // onBlur={handleFocus}
                        // pattern="^[A-Z0-9]{3,7}"
                        // maxLength={7}
                        // feedbackInvalid="Please provide a valid zip."
                        id="validationCustom03" required />
                    </CCol> 
                     <CCol md={3}>
                      <CFormInput className='input_fie' type="text" label="County" name="Contact name"
                        aria-describedby="validationCustom05Feedback"
                        onChange={(e) => { onValueChange(e) }}
                        defaultValue={''}
                        focus={focus.toString()}
                        // onBlur={handleFocus}
                        // pattern="^[A-Z0-9]{3,7}"
                        // maxLength={7}
                        // feedbackInvalid="Please provide a valid zip."
                        id="validationCustom03" required />
                    </CCol>
                 
                    <div style={{ display:'flex',height:94,alignItems:'center' }}>
                    <div className='dotpoint'></div>
                    <button className='insurancesubmit'>Request my insurance quote</button>
                      
                    </div>
                  </div>


                  {/* <div className='profilecollaman'>TYREOO</div> */}
                </div>

                {/* <span class="loader-line"></span>
                      <div className='profilerow' style={{ background: 'transparent' }}>
                        <div className='dotpoint'></div>
                        <div className='profilecollaman' style={{ width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', paddingBottom: 10 }}>{twovaluestore}</div>
                        <div className='profilecollaman'>TYREOO</div>
                      </div>
                      <div className='profilerow' style={{ background: 'transparent' }}>
                        <div className='dotpoint'></div>

                        <div className='profilecollaman' style={{ width: '100%' }}>
                          <CCol md={4} className="dutyoffiled" >
                            <CFormSelect
                              className='user_input_field'
                              type="text"
                              placeholder='Please Select'
                              // label="Email Preference"
                              name="email_Preference"
                              onChange={(e) => {
                                onValueChangess(e)
                              }}
                              // onBlur={handleFocus}
                              // focus={focus.toString()}
                              // defaultValue={getdata.email_Preference}
                              required
                            > <option className='d-none'></option>
                              <option>Driving abroad</option>
                              <option>Mobile phones</option>
                              <option>Alcohol</option>
                              <option>Driver fatigue</option>
                              <option>Smoking</option>
                            </CFormSelect>
                          </CCol>  </div>
                        <div className='profilecollaman'>TYREOO</div>
                      </div> */}
              </MDBAccordionItem>
            </MDBAccordion>
            {/* <MDBAccordion initialActive={3}>
                    <span className='acodiyanfont'>3</span>
                    <MDBAccordionItem collapseId={3} style={{ background: 'transparent' }} className='acodiyan-silde' onClick={threespen} headerTitle='Download RAC Guidance and recommended readings'>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Fast Name</div>
                        <div className='profilecollaman'><span>{user.user_fast_name}</span></div>
                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Last Name</div>
                        <div className='profilecollaman'><span>{user.user_last_name}</span></div>
                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Date of birth</div>
                        <div className='profilecollaman'><span>{moment(user.user_date_of_birth).format('DD-MM-yyyy')}</span></div>
                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>National Insurance Number</div>
                        <div className='profilecollaman'>{user.user_national_insurance_number}</div>
                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Work phone</div>
                        <div className='profilecollaman'>{user.user_work_phone}</div>

                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Home phone</div>
                        <div className='profilecollaman'>{user.user_home_phone}</div>
                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Mobile phone</div>
                        <div className='profilecollaman'>{user.user_mobile_phone}</div>

                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Email address</div>
                        <div className='profilecollaman'>{user.user_email}</div>
                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Job title</div>
                        <div className='profilecollaman'>{user.user_job_title}</div>
                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Employee number</div>
                        <div className='profilecollaman'>{user.user_employee_number}</div>
                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Cost centre</div>
                        <div className='profilecollaman'>{user.user_cost_centre}</div>

                      </div>
                    </MDBAccordionItem>
                  </MDBAccordion> */}
          </div>
          </>


          {/* {conformPopup && <Conformpopup data={fatchdata} height={height} onClick={getBoolianVar} />} */}
        </div>
      )}
    </div>
  )
}

export default Insurance;