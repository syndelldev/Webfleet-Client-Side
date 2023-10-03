/* eslint-disable */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userExist, sendMail } from 'src/views/api/api'
import '../../css/main.css'
import {
  CContainer,
  CCol,
  CModal,
  CForm,
  CRow,
  CCardGroup,
  CButton,
  CModalBody,
  CModalTitle,
  CCard,
  CFormInput,
  CCardBody,
  CInputGroup,
  CInputGroupText,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainLoaderScreen from 'src/views/Loader/MainLoaderScreen'
const defaultvalue = {
    user_email: '',
}
const forgot = () => {
  //require variable
  const Navigate = useNavigate()
  const [user, setuser] = useState(defaultvalue)
  const [notUser, setnotUser] = useState(false)
  const [VisibleValidation, setVisibleValidation] = useState(false)
  const [ Loader, setLoader ] = useState(false)
  const [ SendMailMsg, setSendMailMsg ] = useState('')

  // const [showPassword,setshowPassword]=useState(false)

  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  const sendEmail = async(e)=>{
    await sendMail(user).then((res)=>{
      setLoader(false)
      if(!(res.status === 200)){
       
        setSendMailMsg("Email has been sent to your Email id, Please check your mail box ")
        setVisibleValidation(true)

      }else{
        setSendMailMsg("There is an error while sending email, Please try again")
        setVisibleValidation(true)

      }
    })
  }

 
  //for validations and handle api
  const [validated, setValidated] = useState(false)

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === true) {
      setValidated(true)
      event.preventDefault()
      setLoader(true)

      await userExist(user).then((res) => {
       if(res.status === 203){
        sendEmail();
        // Navigate('/')
       }else{
       
        setnotUser(true)
       }
      })
      // Navigate('/repassword')
    }
    event.preventDefault()
    event.stopPropagation()
    setValidated(true)
  }

  const logoutHandle = () => {
    Navigate('/')
  }


  return (
    <div className="bg-light loginpage_div min-vh-100 d-flex flex-row align-items-center ">
      {
        Loader === true && <MainLoaderScreen/>
      }
      <CContainer className="">
        <CRow className="justify-content-center">
          <CCol className="login_sidepage" md={8}>
            <CCardGroup style={{ height: '450px' }}>              
              <CCard className="p-4 login_card ">
              <div className='forgot_back_btn' onClick={logoutHandle}>
                <i class="fas fa-arrow-left"></i>
              </div>
                <CCardBody style={{ display:'grid', alignItems:'center' }}>
                  <CForm
                    className="login_text row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <h1 style={{ marginBottom: 0, fontSize:30 }}>Forgot Password?</h1>
                    <p className="text-medium-emphasis" style={{ marginBottom: 0, marginTop: 7 }}>
                    </p>
                    <CInputGroup className="mb-4">
                      {notUser == true ? (
                        <>
                          <span className="login_span_notFound">Email not found</span>
                        </>
                      ) : (
                        <></>
                      )}

                    
                       <CInputGroupText className='Login_Input_Email'>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        className="TextInput Login_Input_Email"
                        style={{ backgroundColor: '#e8f0fe' }}
                        type="text"
                        // feedbackValid="Looks good!"
                        feedbackInvalid="Please enter valid email"
                        id="validationCustom01"
                        placeholder="Email"
                        autoComplete="email"
                        name="user_email"
                        onChange={(e) => {
                          onValueChange(e);
                          setnotUser(false)
                        }}
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"
                        required
                      />        
                    </CInputGroup>
                      <CRow className='forgetros'>
                      </CRow>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="login_btn" >
                          Send mail
                        </CButton>                        
                      </CCol>
                      <CCol xs={6} className="text-right">
                      
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white py-5  login_bg ">
                <CCardBody className="text-center ">
                  <div className="login_text">
                    <div className="logo_loginpage">
                      <span className="logo_login"></span>
                      <span className="logoName_login"></span>
                    </div>
                    <p className="login_details">
                      At tyreoo we represent ourselves as your business partner from all angles
                      whether you are a single owner driver or a fleet and leasing vehicle customer,
                      We are where you need us. We guarantee the widest brand range to make sure you
                      enjoy vehicle and your experience with us in the most convenient and cost
                      effective manner
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastContainer />

      <>
            <CModal
              alignment="center"
              visible={VisibleValidation}
              onClose={() => setVisibleValidation(false)}
            >
              <CModalBody>
                <CModalTitle
                  className="model_title text-center"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ color: 'red', display: 'block', fontSize: '24px' }}>Note</span>
                  {SendMailMsg}
                
                  <button
                    style={{
                      backgroundColor: '#FF1E1C',
                      color: 'white',
                      border: 'none',
                      display: 'block',
                      width: 'max-content',
                      marginTop: '10px',
                      padding: '4px 15px',
                      borderRadius: '10px',
                    }}
                    onClick={() => logoutHandle()}
                  >
                    Okay
                  </button>
                </CModalTitle>
              </CModalBody>
            </CModal>
          </>

    </div>
  )
}

export default forgot
