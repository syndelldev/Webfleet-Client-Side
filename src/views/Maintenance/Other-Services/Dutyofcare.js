/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { UserDetails } from '../../api/api'
import moment from 'moment'
import { CForm, CCol, CFormInput, CFormSelect, CFormCheck, CButton } from '@coreui/react'



function Dutyofcare(props) {
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
  const [ AccordionActiveId, setAccordionActiveId ] = useState(1)
  //const [isOpen, setIsOpen] = useState(true)
  let height = document.documentElement.scrollHeight;
  let colid = 1  



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
    setConformpopup(true)
  }

  const getBoolianVar = (boolian) => {
    setConformpopup(boolian)
  }
  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  const fatchdata = idfatch.filter((element) => element.user_email === userNameprofile)

  const threespen = () => {

  }
  const getDrivers = async () => {

    const Vehiclesupdate = await UserDetails()
    setApiData(Vehiclesupdate.data)
    setIdfatch(Vehiclesupdate.data)

  }

  <MDBAccordionItem className='accordion-button' collapseId="newCollapseId" defaultOpened>

  </MDBAccordionItem>


 
  return (
    <div>
   
   
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
                       collapseId={AccordionActiveId == 1 ? 1: 2 } 
                      headerTitle='Choose an area of duty of care'
                    >

                      <span class="loader-line"></span>
                      <div className='profilerow' style={{ background: 'transparent' }}>
                        <div className='dotpoint'></div>
                        <div className='profilecollaman' style={{ width: '100%', borderBottom: '1px solid rgba(0, 0, 0, 0.15)', paddingBottom: 10 }}>Choose an area of duty of care</div>
                        {/* <div className='profilecollaman'>TYREOO</div> */}
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
                                onValueChange(e);
                                setAccordionActiveId('2')
                              }}
                              // onBlur={handleFocus}
                              // focus={focus.toString()}
                              // defaultValue={getdata.email_Preference}
                              required
                            > <option className='d-none'></option>
                              <option>Driver information</option>
                              <option>Vehicle information</option>
                              <option>Legislation</option>
                            </CFormSelect>
                          </CCol>  </div>
                        {/* <div className='profilecollaman'>TYREOO</div> */}
                      </div>


                    </MDBAccordionItem>
                  </MDBAccordion>

                  <MDBAccordion initialActive={1}>

                    <span className='acodiyanfont'>2</span>
                    <MDBAccordionItem
                      collapseId={AccordionActiveId == 2 ? 1 : 3 } 
                 
                  
                    style={{ background: 'transparent' }} className='acodiyan-silde' headerTitle='Select a duty of care topic of interest'>
                      <div className='profilerow'>
                        <div className='profilecollaman' onClick={()=>{setAccordionActiveId('3')}}>Phone Preference</div>
                        <div className='profilecollaman'>{user.phone_Preference}</div>

                      </div>
                      <div className='profilerow'>
                        <div className='profilecollaman'>Email Preference</div>
                        <div className='profilecollaman'>{user.email_Preference}</div>
                      </div>
                    </MDBAccordionItem>
                  </MDBAccordion>
                  <MDBAccordion initialActive={1}>
                    <span className='acodiyanfont'>3</span>
                    <MDBAccordionItem 
                    collapseId={AccordionActiveId == 3 ? 1 : 3 } 

                    style={{ background: 'transparent' }} className='acodiyan-silde' onClick={threespen} headerTitle='Download RAC Guidance and recommended readings'>
              

                    
                    </MDBAccordionItem>
                  </MDBAccordion>
                </div>
                </>
              )
          })}

          {conformPopup && <Conformpopup data={fatchdata} height={height} onClick={getBoolianVar} />}
        </div>

    </div>
  );
}

export default Dutyofcare;