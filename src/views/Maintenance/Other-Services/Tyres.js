/* eslint-disable */
import React, { useEffect, useState } from 'react'
import logoimages from '../../../assets/images/avatars/logo1.ico'
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { UserDetails } from '../../api/api'
// import Conformpopup from './Conformpopus.js'
import moment from 'moment'
import { CForm, CCol, CFormInput, CFormSelect, CFormCheck, CButton } from '@coreui/react'



function Tyres(props) {
  const [loading, setLoading] = useState(false)
  const [userNameprofile, setuserNameProfile] = useState();
  const [validated, setValidated] = useState(false)
  const [apiData, setApiData] = useState([])
  const [user, setuser] = useState()
  const [fullNamedevaide, setFullNamedevaide] = useState()
  const [pushdata, setPushData] = useState()
  const [idfatch, setIdfatch] = useState([])
  const [conformPopup, setConformpopup] = useState(false)
  const [userSingleData, setuserSingleData] = useState([])
  //const [isOpen, setIsOpen] = useState(true)
  let height = document.documentElement.scrollHeight;




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

  const LoadUserName = async () => {
    const userName = localStorage.getItem('userId');

    setuserNameProfile(userName)
  }


  useEffect(() => {
    getDrivers()
    LoadUserName()

    // getProfileDAta()
  }, [])

  const editUser = () => {
    // setuserSingleData(ID)
   
    setConformpopup(true)
  }

  const getBoolianVar = (boolian) => {
    setConformpopup(boolian)
  }
  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
 
  }

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
 
    const Vehiclesupdate = await UserDetails()
    setApiData(Vehiclesupdate.data)
    setIdfatch(Vehiclesupdate.data)
 

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

          {apiData.map((user) => {
            if (user.user_email == userNameprofile)

              return (
                <><div className='sildermaincontent'>
                  <MDBAccordion initialActive={1} className='slider1box '>
                    <span className='acodiyanfont'>1</span>

                    <MDBAccordionItem className="acodiyan-silde" style={{ background: 'transparent' }}
                      collapseId={1}
                      headerTitle='Which vehicle needs tyres?'
                    >

                      <span class="loader-line"></span>
                      <div className='profilerow' style={{ background: 'transparent' }}>
                        <div className='dotpoint'></div>
                        <div className='profilecollaman' style={{ width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', paddingBottom: 10 }}>Search for registration.</div>
                        {/* <div className='profilecollaman'>TYREOO</div> */}
                      </div>
                      <div className='profilerow' style={{ background: 'transparent' }}>
                        <div className='dotpoint'></div>

                        <div className='profilecollaman' style={{ width: '100%' }}>
                          <CCol xs="auto"  className='colslider' style={{ padding: '0px 3px' }}>
                            <i className="fa fa-search driverSerachIcon" aria-hidden="true"></i>
                            <CFormInput className='User_serch' type="text" placeholder="Search " /* value={FilterValues} */ /* onChange={handleFilter} */ />
                          </CCol>
                        </div>
                        {/* <div className='profilecollaman'>TYREOO</div> */}
                      </div>


                    </MDBAccordionItem>
                  </MDBAccordion>

                  <MDBAccordion initialActive={2}>

                    <span className='acodiyanfont'>2</span>
                    <MDBAccordionItem collapseId={2} style={{ background: 'transparent' }} className='acodiyan-silde' headerTitle='Choose your tyres'>
                      {/* <div className='profilerow'>
                        <div className='profilecollaman'>Phone Preference</div>
                        <div className='profilecollaman'>{user.phone_Preference}</div>

                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Email Preference</div>
                        <div className='profilecollaman'>{user.email_Preference}</div>
                      </div> */}
                    </MDBAccordionItem>
                  </MDBAccordion>
                  <MDBAccordion initialActive={3}>
                    <span className='acodiyanfont'>3</span>
                    <MDBAccordionItem collapseId={3} style={{ background: 'transparent' }} className='acodiyan-silde' onClick={threespen} headerTitle='Request an appointment'>
                      {/* <div className='profilerow'>
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

                      </div> */}
                    </MDBAccordionItem>
                  </MDBAccordion>
                </div>
                </>
              )
          })}

          {conformPopup && <Conformpopup data={fatchdata} height={height} onClick={getBoolianVar} />}
        </div>
      )}
    </div>
  );
}

export default Tyres;