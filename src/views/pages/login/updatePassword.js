/* eslint-disable */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { forgotPassword, authUser } from 'src/views/api/api'
import { useEffect } from 'react'
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
import { cilLockLocked } from '@coreui/icons'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const defaultvalue = {
  user_password: '',
}

const updatePassword = () => {
  //require variable
  const Navigate = useNavigate()
  const [user, setuser] = useState(defaultvalue)
  const [notUser, setnotUser] = useState(false)
  const [password, setPassword] = useState('')
  const [ConfirmPass, setConfirmPass] = useState('')
  const [showPassword, setshowPassword] = useState(false)
  const [isMatchPassword, setMatchPassword] = useState(false)
  const [isrepasswordlength, setrepasswordlength] = useState(false)
  const [isConValidPassword, setConValidPassword] = useState(false)
  const [isspecarector, setspecarector] = useState(false)
  const [isValidPassword, setisValidPassword] = useState(false)
  const [islength, setLength] = useState(false)
  const [reShowPassword, setReshowPassword] = useState(false)
  const [Invalid, setInvalid] = useState(false)
  const queryParameters = new URLSearchParams(window.location.search)

  const emailID = queryParameters.get("id")

  const SecurityToken = queryParameters.get("token")
  const JWT_secret = "8f9c54d9601dcf25bf0e021115e1fea278"
  const uniToken = `${JWT_secret}${emailID}`


  const getPassword = (e) => {
    setPassword(e.target.value);
    setuser({ ...user, [e.target.name]: e.target.value, 'email': emailID })
  };

  const getConfirmPassword = (e) => {
    setConfirmPass(e.target.value)
  }


  const handleShowPassword = () => {
    setshowPassword((current) => !current)
  }
  const rehandleShowPassword = () => {
    setReshowPassword((current) => !current)
  }



  //for validations and handle api
  const [validated, setValidated] = useState(false)
  const handleSubmit = async (event) => {
    const form = event.currentTarget

    if (form.checkValidity() === true) {
      setValidated(true)
      event.preventDefault()

    }

    event.preventDefault()
    event.stopPropagation()
    setValidated(true)
  }



  //function to check whether the user is authentic or not API call
  const credData = {
    token: SecurityToken,
    unitok: uniToken

  }
  const checkUser = async () => {


    await authUser(credData).then((res) => {
      if (!(res.status === 200)) {

        Navigate('/')
        //show error here that user is not authentic
      } else {

      }
    })
  }

  useEffect(() => {
    checkParams();
  }, [])

  //API call
  const changePassword = async () => {
    await forgotPassword(user).then((res) => {
      if (!(res.status === 400)) {
        //show success meassage here

        Navigate('/')
      } else {
        //show error

      }
    })
  }

  const checkParams = () => {
    //this is jwt varify token do not remove

    if (!emailID) {
      Navigate('/')
    } else {
      checkUser();
    }
  }

  // var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  const resetPassword = async () => {
    if (password.trim().length === 0) {
      setisValidPassword(true)
      setConValidPassword(true)

    } else {
      setisValidPassword(false)
      if (ConfirmPass.trim().length === 0) {
        setConValidPassword(true)
      } else {
        setConValidPassword(false)

        if (password.trim().length < 8) {
          setLength(true)
        } else {
          setLength(false)
          if (!(/[!@#\$%\^\&*]/.test(password))) {
            setspecarector(true)
          } else {
            setspecarector(false)
            if (!(password === ConfirmPass)) {

              setMatchPassword(true)
            } else {
              setMatchPassword(false)

              //this is api call function
              changePassword();
            }
          }
        }
      }
    }
  }

  return (
    <div className="bg-light loginpage_div min-vh-100 d-flex flex-row align-items-center ">
      <CContainer className="">
        <CRow className="justify-content-center">
          <CCol className="login_sidepage" md={8}>
            <CCardGroup style={{ height: '450px' }}>
              <CCard className="p-4 login_card ">
                <CCardBody style={{ display: 'grid', alignItems: 'center' }}>
                  <CForm
                    className="login_text row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"

                    onSubmit={handleSubmit}
                  >
                    <h1 style={{ marginBottom: 0, fontSize: '1.8rem' }}>Create New Password</h1>
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

                      {/* <CInputGroupText className='Login_Input_Email'>
                        <CIcon icon={cilUser} />
                      </CInputGroupText> */}
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
                        className="TextInput"
                        type={showPassword == true ? 'text' : 'password'}
                        //  feedbackInvalid=" one uppercase letter and one number"
                        // id="validationCustom05"
                        // aria-describedby="validationCustom05Feedback"
                        placeholder="New Password"
                        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}"
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{0,20}"
                        autoComplete="current-password"
                        name="user_password"
                        onChange={getPassword}
                        // onChange={(e) => {
                        //   onValueChange(e)
                        // }}
                        required
                      />
                    </CInputGroup>
                    {isValidPassword && (
                      <small
                        style={{
                          textAlign: "left",
                          marginTop: 5,
                          color: "red",
                          display: "grid",
                        }}
                      >
                        Please Enter PassWord.
                      </small>
                    )}

                    {islength && (
                      <small
                        style={{
                          textAlign: "left",
                          marginTop: 5,
                          color: "red",
                          display: "grid",
                        }}

                      >
                        Please Enter min 8 corrector.
                      </small>
                    )}

                    {isspecarector && (
                      <small
                        style={{
                          textAlign: "left",
                          marginTop: 5,
                          color: "red",
                          display: "grid",
                        }}

                      >
                        Please Enter one uppercase and one spacial creator.
                      </small>
                    )}

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
                          rehandleShowPassword()
                        }}
                        className={
                          reShowPassword == true ? 'fa fa-eye-slash login_eye' : 'fa fa-eye login_eye'
                        }
                        aria-hidden="true"
                      ></i>

                      <CFormInput
                        style={{ backgroundColor: '#e8f0fe' }}
                        className="TextInput"
                        type={reShowPassword == true ? 'text' : 'password'}
                        //  feedbackInvalid=" contain at least one uppercase letter and one number"
                        // id="validationCustom05"
                        // aria-describedby="validationCustom05Feedback"
                        placeholder="Re Password"
                        onChange={getConfirmPassword}
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
                        autoComplete="current-password"
                        required
                      />
                    </CInputGroup>
                    {isConValidPassword && (
                      <small
                        style={{
                          textAlign: "left",
                          marginTop: 5,
                          color: "red",
                          display: "grid",
                        }}
                      >
                        Please Enter Re-PassWord.
                      </small>
                    )}
                    {isMatchPassword && (
                      <small
                        style={{
                          textAlign: "left",
                          marginTop: 5,
                          color: "red",
                          display: "grid",
                        }}
                      >
                        Password and Re-Password Not Match
                      </small>
                    )}

                    {isrepasswordlength && (
                      <small
                        style={{
                          textAlign: "left",
                          marginTop: 5,
                          color: "red",
                          display: "grid",
                        }}

                      >
                        Please Enter min 8 corrector.
                      </small>
                    )}

                    <CRow className='forgetros'>

                    </CRow>
                    <CRow>
                      <CCol xs={6} style={{ width: '70%' }}>
                        <CButton color="primary" type="submit" className="login_btn update_pass_btn" onClick={resetPassword}>
                          Update Password
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/* <CButton color="link" className="px-0 login_link">
                          Forgot password?
                        </CButton> */}
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
    </div>
  )
}

export default updatePassword
