/* eslint-disable */
import { CForm, CCol, CFormInput } from '@coreui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../api/api'

import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoaderScreen from '../Loader/LoaderScreen'

const usermanagement = (props) => {
  const { mainUserName } = props
  const navigate = useNavigate()
  const [user, setuser] = useState({
    role_id: 'Driver',
    user_status: 'Active',
  })
  const [loading, setLoading] = useState(false)

  const onValueChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value })
  }
  const NotificationAddUser = async () => {}

  //validation handle
  const [validated, setValidated] = useState(false)

  const handleSubmit = async (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === true) {
      setLoading(true)
      setValidated(true)
      event.preventDefault()
      const result = await RegisterUser(user).then((res) => {
        if (res.data == 'registered') {
          setLoading(false)

          NotificationAddUser()
          navigate('/user-management')

          notify(user.user_name)
        } else {
          navigate('/login')
        }
      })
    }

    event.preventDefault()
    event.stopPropagation()
    setValidated(true)
  }

  const notify = () => toast('Wow so easy!')

  const onClickclose = () => {
    navigate('/user-management')
  }

  return (
    <div className="adduserdiv-usermanagment">
      {loading ? (
        <LoaderScreen />
      ) : (
        <div className="add_vehicle_main_sidebar">
          <div className="edit_driver_main_container">
          
          <div className='Edit_driver_pop_header' onClick={onClickclose}>
                <i class="fas fa-arrow-left back_arraw_edit_icon"></i>
                <span className='edit_header_text'>Add User</span>
              </div>

            <div className="userDiv">
              <CForm
                className="row g-3 needs-validation user-add-form"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <CCol md={6}>
                  <CFormInput
                    className="input_fie"
                    type="text"
                    label="Name"
                    name="user_name"
                    aria-describedby="inputGroupPrependFeedback"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    feedbackInvalid="Please provide a valid Name."
                    id="validationCustomUsername"
                    pattern="^[A-Za-z0-9]{3,16}"
                    required
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
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    feedbackInvalid="Please provide a valid E-mail."
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
                    aria-describedby="inputGroupPrependFeedback"
                    id="validationCustomUsername"
                    feedbackInvalid="Please provide a valid Address"
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
                    maxLength={13}
                    pattern="^[0-9]{10,14}"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    id="validationCustom03"
                    feedbackInvalid="Please provide a valid Mobile Number"
                    required
                  />
                </CCol>

                {/* <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="User Full Name"
                    name="user_full_name"
                    aria-describedby="inputGroupPrependFeedback"
                    pattern="^[A-Za-z -]+$"
                    // pattern="^[A-Za-z0-9]{3,30}"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    id="validationCustomUsername"
                    required
                  />
                </CCol> */}

                {/* <CCol md={6}>
                  <CFormInput
                    type="tel"
                    label="National Insurance Number"
                    name="user_national_insurance_number"
                    placeholder="National insurance"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    aria-describedby="inputGroupPrependFeedback"
                    id="validationCustomUsername"
                    required
                  />
                </CCol> */}

                {/* <CCol md={3}>
                  <CFormInput
                    type="tel"
                    label="Work Phone  "
                    name="user_work_phone"
                    aria-describedby="inputGroupPrependFeedback"
                    pattern="^[0-9]{10,14}"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    id="validationCustomUsername"
                    required
                  />
                </CCol> */}

                <CCol md={6}>
                  <CFormInput
                    className="input_fie"
                    type="text"
                    label="Cost Centre"
                    name="user_cost_centre"
                    aria-describedby="inputGroupPrependFeedback"
                    // pattern="^[a-zA-Z0-9]{6}"
                    pattern="^[A-Za-z0-9_-]{3,20}$"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    id="validationCustomUsername"
                    feedbackInvalid="Please provide a valid Cost Centre"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    className="input_fie"
                    type="tel"
                    label="Postcode"
                    name="user_postcode"
                    aria-describedby="inputGroupPrependFeedback"
                    // pattern="[A-Z0-9]{6}"
                    maxLength={6}
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    id="validationCustomUsername"
                    feedbackInvalid="Please provide a valid Postcode"
                    required
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    className="input_fie"
                    type="text"
                    label="City"
                    name="user_city"
                    aria-describedby="inputGroupPrependFeedback"
                    pattern="^[A-Za-z\s]+$"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    id="validationCustomUsername"
                    feedbackInvalid="Please provide a valid City"
                    required
                  />
                </CCol>
                {/* <CCol md={6}>
                  <CFormSelect
                    className="input_fie"
                    type="text"
                    label="Role"
                    name="role_id"
                    aria-describedby="inputGroupPrependFeedback"
                    // pattern='^[A-Za-z -]+$'
                    id="validationCustomUsername"
                    required
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                  >
                    {' '}
                    <option className="d-none"></option>
                    <option value={1}>Admin</option>
                    <option value={2}>Manager</option>
                    <option value={0}>Driver</option>
                    <option>Great Oak</option>
                  </CFormSelect>
                </CCol> */}
                <CCol md={6}>
                  <CFormInput
                    className="input_fie"
                    type="text"
                    label="Country"
                    name="user_country"
                    aria-describedby="inputGroupPrependFeedback"
                    pattern="^[a-zA-Z]{1,10}"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    id="validationCustomUsername"
                    required
                    feedbackInvalid="Please provide a valid Country"
                  />
                </CCol>
                {/* <CCol md={6}>
    <CFormInput className='input_fie' type='text' label="Country" name="user_country"
      aria-describedby="inputGroupPrependFeedback"
      pattern='^[A-Za-z -]+$'
      onChange={(e)=>{onValueChange(e)}}
      id="validationCustomUsername" required />
  </CCol> */}
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    label="Password"
                    name="user_password"
                    aria-describedby="inputGroupPrependFeedback"
                    onChange={(e) => {
                      onValueChange(e)
                    }}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    feedbackInvalid="Must be at least 8 char & contain at least one uppercase letter and one number"
                    className="user_input_password input_fie"
                    required
                  />
                </CCol>
                {/* <CCol md={4}>
    <CFormInput type="text"  label="Job Title" name="user_job_title"
      aria-describedby="inputGroupPrependFeedback"
      pattern="^[A-Za-z0-9]{3,40}"
      onChange={(e)=>{onValueChange(e)}}
      id="validationCustomUsername" required/>
  </CCol>
  <CCol md={4}>
    <CFormInput type='text' label="Department" name="user_department" 
      aria-describedby="inputGroupPrependFeedback"
      pattern="^[A-Za-z0-9]{3,40}"
      onChange={(e)=>{onValueChange(e)}}
      id="validationCustomUsername" required />
  </CCol>
  <CCol md={4}>
    <CFormInput type='number' label="Employee Number " name="user_employee_number"
     aria-describedby="inputGroupPrependFeedback"
     onChange={(e)=>{onValueChange(e)}}
     id="validationCustomUsername" 
     required />
  </CCol>

  <CCol md={6}>
    <CFormInput type='text' label="Account Notes" name="user_my_account_notes" 
       aria-describedby="inputGroupPrependFeedback"
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required />
  </CCol>
  <CCol md={6}>
    <CFormInput type='text' label="My Driver Notes" name="user_my_driver_notes" 
       aria-describedby="inputGroupPrependFeedback"
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required />
  </CCol>
  

  <CCol md={4}>
    <CFormInput type="text" label="Company Name" name="user_company_name" 
       aria-describedby="inputGroupPrependFeedback"
       pattern='^[A-Za-z -]+$'
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required/>
  </CCol>
  <CCol md={4}>
    <CFormInput type='number' label="Payroll Number " name="user_payroll_number"
       aria-describedby="inputGroupPrependFeedback"
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required />
  </CCol>
  <CCol md={4}>
    <CFormInput type='text' label="Line Manager" name="user_line_manager" 
       aria-describedby="inputGroupPrependFeedback"
       pattern='^[A-Za-z -]+$'
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required />
  </CCol>

  
  <CCol md={4}>
    <CFormInput  type='number' label="Account Number" name='user_account_number'
       aria-describedby="inputGroupPrependFeedback"
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required/>
  </CCol>
  <CCol md={4}>
    <CFormInput type='date' label="Date of Birth" name="user_date_of_birth" 
       aria-describedby="inputGroupPrependFeedback"
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required/>
  </CCol>
  <CCol md={4}>
    <CFormInput  type='tel' label="Home Phone" name='user_home_phone'
       aria-describedby="inputGroupPrependFeedback"
       pattern="^[0-9]{10,14}"
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required/>
  </CCol>

  <CCol md={6}>
    <CFormInput  type='text' label="Password" name='user_password'
       aria-describedby="inputGroupPrependFeedback"
       onChange={(e)=>{onValueChange(e)}}
       id="validationCustomUsername" required/>
  </CCol> */}

                <CCol className="user-add-btn" xs={12}>
                  <div className="user-btn">
                    <button className="editCloseBtn" type="submit" onClick={onClickclose}>
                      {' '}
                      Close
                    </button>
                    <button className="AddUserBtn" type="submit">
                      {' '}
                      Save{' '}
                    </button>
                  </div>
                </CCol>
              </CForm>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  )
}

export default usermanagement
