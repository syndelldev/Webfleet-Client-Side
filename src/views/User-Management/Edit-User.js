/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CForm, CCol, CFormInput, CFormSelect } from '@coreui/react'
import { userEdit, userEditId, PushNotificationUser } from '../api/api'
import moment from 'moment'


const defaultvalue = {
  user_name: '',
  user_email: '',
  user_mobile_phone: '',
  user_full_name: '',
  user_national_insurance_number: '',
  user_address: '',
  user_work_phone: '',
  user_postcode: '',
  user_cost_centre: '',
  user_city: '',
  user_country: '',
  user_job_title: '',
  user_department: '',
  user_employee_number: '',
  user_my_account_notes: '',
  user_my_driver_notes: '',
  user_company_name: '',
  user_payroll_number: '',
  user_line_manager: '',
  user_account_number: '',
  user_date_of_birth: '',
  user_home_phone: '',
  user_password: '',
  user_status: '',
}

function Conformpopup(props) {
  const { mainUserName } = props

  //require variable
  const [user, setuser] = useState(defaultvalue)
  const [dateformet, setDateFormet] = useState()
  const id = props.data

  const onClickclose = () => {
    props.onClick(false)
  }

  useEffect(() => {
    loadUserData()
    // onValueChange()
  }, [])

  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }

  const onValueChangeAdmin = (e) => {
    if(e.target.value == 1){
    setuser({ ...user, ['user_rol']:'Admin' })
    }
    else{
      setuser({ ...user, ['user_rol']:'User' })
      }
  }
  //api handle
  const loadUserData = async () => {
    const result = await userEdit(id)
    setuser(result.data[0])

    setDateFormet(user.user_date_of_birth)
    //setDateFormet(result.data[0].user_date_of_birth)
  }

  const UpdateUser = async () => {
    const result = await userEditId(user).then((res) => {
      if (res.data == 'updated') {
        onClickclose()
        // updateNotification()
      }
    })
  }

  const updateNotification = async () => {
    const msg = `${mainUserName} Updated user ${user.user_name} Profile`
    await PushNotificationUser(msg)
  }

  //validation handle
  const [validated, setValidated] = useState(false)
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

  return (
    <div>
      <div className="edit_driver_main_sidebar">
        <div className="edit_driver_main_container" >
        
        <div className='Edit_driver_pop_header' onClick={onClickclose}>
                <i class="fas fa-arrow-left back_arraw_edit_icon"></i>
                <span className='edit_header_text'>Edit User Details</span>
              </div>

          <div className="userDiv">
            <CForm
              className="row g-3 needs-validation text-start user-add-form"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={6}>
                <CFormInput
                  className="input_fie"
                  type="text"
                  label="User Name"
                  name="user_name"
                  aria-describedby="inputGroupPrependFeedback"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  defaultValue={user.user_name}
                  id="validationCustomUsername"
                  pattern="^[A-Za-z0-9]{3,16}"
                  required
                  feedbackInvalid="Please provide a valid User Name "
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  className="input_fie"
                  type="email"
                  label="E-mail"
                  name="user_email"
                  aria-describedby="validationCustom05Feedback"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  defaultValue={user.user_email}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  feedbackInvalid="Please provide a valid E-mail"
                  id="validationCustom03"
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  className="input_fie"
                  type="text"
                  label="Address "
                  name="user_address"
                  placeholder="123 Main street"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  pattern="^[0-9A-Za-z -]+$"
                  defaultValue={user.user_address}
                  aria-describedby="inputGroupPrependFeedback"
                  id="validationCustomUsername"
                  feedbackInvalid="Please provide a valid Address "
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  className="input_fie"
                  type="tel"
                  label="Mobile Number"
                  name="user_mobile_phone"
                  aria-describedby="validationCustom03Feedback"
                  defaultValue={user.user_mobile_phone}
                  pattern="^[0-9]{10,14}"
                  maxLength={10}
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  id="validationCustom03"
                  feedbackInvalid="Please provide a valid Mobile Number "
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormSelect
                  className="input_fie"
                  type="text"
                  label="User Role"
                  name="user.role_id"
                  aria-describedby="validationCustom03Feedback"
                  defaultValue={user.role_id === 1 ? 'Admin' : 'Driver'}
                  onChange={(e) => {
                    onValueChangeAdmin(e)
                  }}
                  id="validationCustom03"
                  required
                >
                  <option value={1} selected={user.role_id === 1}>
                    Admin
                  </option>
                  <option value={0} selected={user.role_id === 0}>
                    User
                  </option>
                  {/* <option value={2} selected={user.role_id === 2}>
                    Manager
                  </option> */}
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormSelect
                  className="input_fie"
                  type="text"
                  label="User Status"
                  name="user.user_status"
                  aria-describedby="validationCustom03Feedback"
                  defaultValue={user.user_status}
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  id="validationCustom03"
                  required
                >
                  <option value={'Active'} selected={user.user_status === 'Active'}>
                    Active
                  </option>
                  <option value={'in-active'} selected={user.user_status === 'in-active'}>
                    In-active
                  </option>
                </CFormSelect>
              </CCol>

              <CCol md={6}>
                <CFormInput
                  className="input_fie"
                  type="tel"
                  label="Postcode"
                  name="user_postcode"
                  aria-describedby="inputGroupPrependFeedback"
                  pattern="[A-Z0-9]{6}"
                  defaultValue={user.user_postcode}
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  id="validationCustomUsername"
                  required
                  feedbackInvalid="Please provide a valid Postcode "
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  className="input_fie"
                  type="text"
                  label="Cost Centre"
                  name="user_cost_centre"
                  aria-describedby="inputGroupPrependFeedback"
                  // pattern="^[a-zA-Z0-9]{6}"
                  pattern="^[A-Za-z0-9_-]{3,20}$"
                  defaultValue={user.user_cost_centre}
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                  id="validationCustomUsername"
                  feedbackInvalid="Please provide a valid Cost Centre "
                  required
                />
              </CCol>
              {/* 
  <CCol md={6}>
    <CFormInput className='input_fie' type='text' label="City" name="user_city" 
      aria-describedby="inputGroupPrependFeedback"
      defaultValue={user.user_city}
      onChange={(e)=>{onValueChange(e)}}
      id="validationCustomUsername" required />
  </CCol>
  <CCol md={6}>
    <CFormInput className='input_fie' type='text'  label="Country" name="user_country"
      aria-describedby="inputGroupPrependFeedback"
      defaultValue={user.user_country}
      onChange={(e)=>{onValueChange(e)}}
      id="validationCustomUsername" required />
  </CCol>
  <CCol md={6}>
                <CFormSelect
                className='input_fie' type='text' label="Role" name="role_id" 
                aria-describedby="inputGroupPrependFeedback"
                // pattern='^[A-Za-z -]+$'
                 defaultValue={user.role_id}
                 id="validationCustomUsername" required
                 onChange={(e) => {
                   onValueChange(e)
                  }}

                > <option className='d-none'></option>
                  <option value={1} selected={(user.role_id === 1) ? 'selected' : ''} >Admin </option>
                  <option Value={2} selected={(user.role_id === 2) ? 'selected' : ''}>Manager</option>
                  <option Value={0} selected={(user.role_id === 0) ? 'selected' : ''}>Driver</option>
           
                </CFormSelect>

              </CCol>

  {/* <CCol md={4}>
    <CFormInput type="text"  label="Job Title" name="user_job_title"
      aria-describedby="inputGroupPrependFeedback"
      defaultValue={user.user_job_title}
      onChange={(e)=>{onValueChange(e)}}
      id="validationCustomUsername" required/>
  </CCol>
  <CCol md={4}>
    <CFormInput type='text' label="Department" name="user_department" 
      aria-describedby="inputGroupPrependFeedback"
      defaultValue={user.user_department}
      onChange={(e)=>{onValueChange(e)}}
      id="validationCustomUsername" required />
  </CCol>
  <CCol md={4}>
    <CFormInput type='number' label="Employee Number " name="user_employee_number"
     aria-describedby="inputGroupPrependFeedback"
     defaultValue={user.user_employee_number}
     onChange={(e)=>{onValueChange(e)}}
     id="validationCustomUsername" 
     required />
  </CCol>

  <CCol md={6}>
    <CFormInput type='text' label="Account Notes" name="user_my_account_notes" 
       aria-describedby="inputGroupPrependFeedback"
       defaultValue={user.user_my_account_notes}
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required />
  </CCol>
  <CCol md={6}>
    <CFormInput type='text' label="My Driver Notes" name="user_my_driver_notes" 
       aria-describedby="inputGroupPrependFeedback"
       defaultValue={user.user_my_driver_notes}
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required />
  </CCol>
  

  <CCol md={4}>
    <CFormInput type="text" label="Company Name" name="user_company_name" 
       aria-describedby="inputGroupPrependFeedback"
       defaultValue={user.user_company_name}
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required/>
  </CCol>
  <CCol md={4}>
    <CFormInput type='number' label="Payroll Number " name="user_payroll_number"
       aria-describedby="inputGroupPrependFeedback"
       defaultValue={user.user_payroll_number}
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required />
  </CCol>
  <CCol md={4}>
    <CFormInput type='text' label="Line Manager" name="user_line_manager" 
       aria-describedby="inputGroupPrependFeedback"
       defaultValue={user.user_line_manager}
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required />
  </CCol>

  
  <CCol md={4}>
    <CFormInput  type='number' label="Account Number" name='user_account_number'
       aria-describedby="inputGroupPrependFeedback"
       defaultValue={user.user_account_number}
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required/>
  </CCol>
  <CCol md={4}>
    <CFormInput type='date' label="Date of Birth" name="user_date_of_birth" 
       aria-describedby="inputGroupPrependFeedback"
       defaultValue={datee}
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required/>
  </CCol>
  <CCol md={4}>
    <CFormInput  type="tel" label="Home Phone" name='user_home_phone'
       aria-describedby="inputGroupPrependFeedback"
       defaultValue={user.user_home_phone}
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required/>
  </CCol>

  <CCol md={6}>
    <CFormInput  type='text' label="Password" name='user_password'
       aria-describedby="inputGroupPrependFeedback"
       defaultValue={user.user_password}
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required/>
  </CCol> */}

              <CCol className="editBottomBtn" xs={12}>
                <div className=" user-edit-btn">
                  <button className="editCloseBtn ms-2" type="submit" onClick={onClickclose}>
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
        </div>
      </div>
    </div>
  )
}
export default Conformpopup
