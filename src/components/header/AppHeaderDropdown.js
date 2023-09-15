/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Await, useNavigate } from 'react-router-dom'
import { GetUserName, PushNotificationUser, getProfilePicture } from '../../../src/views/api/api'
import avatar8 from './../../assets/images/avatars/Ellipse.png'

const AppHeaderDropdown = () => {
  const [apiData, setApiData] = useState()
  const [userNameprofile, setuserNameProfile] = useState(null)
  const [ProfilePicture, setProfilePicture] = useState()
  const navigate = useNavigate()
  const [userRoleProfile, setuserRoleProfile] = useState(null)

  const profilepic = () => {
    navigate('/profile-update')
  }

  const getDriversData = async () => {
    if(userNameprofile){

    const UsernameDropDown = await GetUserName(userNameprofile).then((res) => {
      if(res.status === 200){
      setApiData(res.data[0]?.user_name)
      setProfilePicture(res.data[0]?.profilePicture)
      // console.log("Profile picture", res.data[0].profileImage);
      }
    })
  }
  }

  useEffect(() => {
  
    getDriversData()
  }, [userRoleProfile])

  const LoadUserName = async () => {
    const userName = localStorage.getItem('userId')
    const userRole = localStorage.getItem('role')

    setuserRoleProfile(userRole)
    setuserNameProfile(userName)
  }

  const PushNotification = async () => {
    // if(apiData.length > 0){
    //   const msg = `${apiData} User Logged in !`
    // await PushNotificationUser(msg)
    // }
  }

  const LoadUserProfile = async () => {
    const pic = await getProfilePicture(userNameprofile)
  }

  useEffect(() => {
    //LoadUserProfile()
    // getProfileDAta()
  }, [userNameprofile])

  useEffect(() => {
    //PushNotification()
    LoadUserName()
  }, [])

  const LogOutUser = () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('role')
    window.location.href = '/'
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 d-flex" caret={false}>
        {/* <CAvatar src={`http://localhost:8010/uploads/${ProfilePicture}`} size="md" /> */}
        <CAvatar
          style={{ paddingTop: '9px' }}
          src={`data:image/jpeg;base64,${ProfilePicture}`}
          size="md"
        />
        {/* <CAvatar src={`https://webfleet-backend.sincprojects.com/uploads/${ProfilePicture}`} size="md" /> */}
        <div className="ms-3">
          <div className="nevbaruserdata">{apiData}</div>
          <div className="nevbaruserdata">{userRoleProfile}</div>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0 mt-1" placement="bottom-end">
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem> */}
        {/* <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader> */}
        <CDropdownItem onClick={profilepic} className="profilecss">
          <CIcon icon={cilUser} className="me-2 profilecss" />
          Profile
        </CDropdownItem>

        <CDropdownItem
          onClick={() => {
            LogOutUser()
          }}
          className="profilecss"
        >
          <CIcon icon={cilAccountLogout} className="me-2 profilecss" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
