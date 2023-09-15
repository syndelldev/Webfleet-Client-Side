/* eslint-disable */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from 'src/views/api/api'
import '../../css/main.css'
import {
  CButton,
  CCard,
  CCardBody,
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

const defaultvalue ={
  username:'',
  email:'',
  password:'',
  Repassword:'',

}

const Register = () => {
  const [user,setuser]=useState(defaultvalue);

  const onValueChange = (e) =>{
    setuser({...user,[e.target.name]:e.target.value})
  
  }
  const onClickRegister = () =>{
    console.log(user);
    if(user.password === user.Repassword){
    
       RegisterNewUser();
        
    }
    else{
    
      alert('password do not match')
    }
  }
  const RegisterNewUser = async() =>{
        await RegisterUser(user)
        .then((res)=>{
        
          if(res.data == 'registered' ){
            alert('Registered Successfully')
          }
          else{
            console.log('failed ');
          }
        })
  }

  return (


    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" name='username' onChange={(e)=>{onValueChange(e)}} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" name='email' onChange={(e)=>{onValueChange(e)}} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      name='password' onChange={(e)=>{onValueChange(e)}}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      name='Repassword' onChange={(e)=>{onValueChange(e)}}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton className='mt-3 login_btn' type='submit' onClick={()=>onClickRegister()}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
