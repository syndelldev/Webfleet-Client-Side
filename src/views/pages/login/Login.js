/* eslint-disable */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginAuth } from 'src/views/api/api'
import '../../css/main.css'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie';
import logoimages from 'src/assets/images/avatars/logo1.ico'

const defaultvalue = {
  email: '',
  user_password: '',
}

const Login = () => {
  //require variable
  const Navigate = useNavigate()
  const [user, setuser] = useState(defaultvalue)
  const [notUser, setnotUser] = useState(false)
  const [showPassword, setshowPassword] = useState(false)
  const [Invalid, setInvalid] = useState(false)
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [loader, setLoader] = useState(false)
  const [inValidPassword, setinValidPassword] = useState("Must contain at least one uppercase, lowercase letter, one special character, and one number")
  // const [showPassword,setshowPassword]=useState(false)

  const onValueChange = (e) => {
    const PassWord = e.target.value;

    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/;
    const isValid = pattern.test(PassWord);
    if (isValid === false) {
      // setIsValidPassword(true)
    }
    else {
      setIsValidPassword(false)
    }

    setuser({ ...user, [e.target.name]: e.target.value })



  }

  const passErroMag = () => {
    const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}/;
    const isValid = pattern.test(user.user_password);
    if (isValid === false) {
      setIsValidPassword(true)
      setInvalid(false)
    }
    else {
      setIsValidPassword(false)
    }
  }

  const forgotscreen = () => {

    Navigate('/forgot')
  }

  const userProfile = user.email
  const usermail = user.user_email

  const handleShowPassword = () => {

    setshowPassword((current) => !current)
  }

  //tostify notifcation
  const notify = (e) => {
    toast(e + ' loagged in !')
  }

  //for validations and handle api
  const [validated, setValidated] = useState(false)

  const handleSubmit = async (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === true) {
      setValidated(true)
      event.preventDefault()
      setLoader(true)
      setIsValidPassword(false)
      setInvalid(false)

      await loginAuth(user).then((res) => {

        localStorage.setItem('userId', userProfile)
        setLoader(false)


        if (res.status == 205) {
          localStorage.setItem('role', 'Driver')
          Navigate('/dashboard-driver')
          const newToken = res.data;
          Cookies.set('token', newToken );
          // window.location.reload();
        }
        else if (res.status === 203) {
          localStorage.setItem('role', 'Admin')
          Navigate('/home')
          console.log(res.data,"data")
          const newToken = res.data;
          console.log(newToken,"new")
        // // Replace 'myToken' with your desired cookie name and 'yourTokenValue' with the actual token value.
        // Cookies.set('myToken',newToken , { path: 'http://localhost:3000/' }); // No expiration date
          window.location.reload();
        }
        else if (res.status == 204) {
          localStorage.setItem('role', 'Manager')
          Navigate('/dashboard-manager')
          const newToken = res.data;
          Cookies.set('token', newToken );
          window.location.reload();
        }
        else if (res.status === 210) {
          setnotUser(true)
        }
        else if (res.status == 211) {
          setInvalid(true)
          setIsValidPassword(false)
        }
        else {
          setValidated(true)
        }
      })
    }
    event.preventDefault()
    event.stopPropagation()



    setValidated(true)
  }

  return (
    <div className="bg-light loginpage_div min-vh-100 d-flex flex-row align-items-center ">
      {
        loader === true &&
        <div className="loader-container-main-screen">
          <div className="spinner"> </div>
          <img src={logoimages} style={{ width: 35, height: 35 }} />
        </div>
      }
      <CContainer className="">
        <CRow className="justify-content-center">
          <CCol className="login_sidepage" md={8}>
            <CCardGroup style={{ height: '450px' }}>
              <CCard className="p-4 login_card ">
                <CCardBody>
                  <CForm
                    className="login_text row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <h1 style={{ marginBottom: 0 }}>Login</h1>
                    <p className="text-medium-emphasis" style={{ marginBottom: 0, marginTop: 7 }}>
                      {/* Sign In to your account */}
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
                        id="validationCustom01"
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        onChange={(e) => {
                          onValueChange(e);
                          setnotUser(false)
                        }}
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      {Invalid == true ? (
                        <>
                          <span className="login_span_notFound Login_Invalid">Invalid Password</span>
                        </>
                      ) : (
                        <></>
                      )}
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <i
                        onClick={() => {
                          handleShowPassword()
                        }}
                        className={
                          showPassword == true ? 'fa fa-eye-slash login_eye' : 'fa fa-eye login_eye'
                        }
                        aria-hidden="true"
                      ></i>

                      <CFormInput
                        style={{ backgroundColor: '#e8f0fe' }}
                        className="TextInput Login_input"
                        type={showPassword == true ? 'text' : 'password'}
                        id="validationCustom05"
                        aria-describedby="validationCustom05Feedback"
                        placeholder="Password"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
                        autoComplete="current-password"
                        // feedbackInvalid={inValidPassword}
                        name="user_password"
                        onChange={(e) => {
                          onValueChange(e);
                          // setIsValidPassword(false)
                        }}
                        required
                      // invalid={invalid} // Set to true when input is invalid
                      // classNameInvalid="custom-invalid-feedback"
                      />
                    </CInputGroup>
                    {isValidPassword === true && (
                      <small className="Login_input_error">
                        {inValidPassword}
                      </small>
                    )}

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type="submit" className="login_btn" onClick={() => { passErroMag() }}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/* <CButton color="link" className="px-0 login_link">
                          Forgot password?
                        </CButton> */}
                      </CCol>
                    </CRow>
                  </CForm>
                  <CRow className='forgetros'>

                    <button className='forgottext' onClick={forgotscreen}>Forgot Password ?</button>
                  </CRow>
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
    </div>
  )
}

export default Login
