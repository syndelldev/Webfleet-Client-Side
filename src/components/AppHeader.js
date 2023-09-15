/* eslint-disable */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { CForm, CFormInput } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'
import { Input } from '@material-ui/core'
import notification from '../assets/images/notification.png'
import { set } from 'src/store/SidebarSlice'

const AppHeader = (props) => {
  const dispatch = useDispatch()
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)
  const navigate = useNavigate()

  const alartclick = () => {
    navigate('/Aleart')
  }
  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          // onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          onClick={()=>dispatch(set({ sidebarShow: !sidebarShow }))}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/"></CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CForm className="mainsearchtophadder">
              {/* <CFormInput
                className="searchBarHeader"
                type="text"
                placeholder="Ask Me Anything"
                style={{
                  // backgroundColor: 'green',
                }}
              /> */}
              {/* <i className="fa fa-search" style={{ marginLeft: -27 }} aria-hidden="true"></i> */}
            </CForm>
            {/* <input type="text" placeholder="Search.."></input> */}
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            {/* <CNavLink  onClick={alartclick} style={{ cursor:'pointer' }}>
            <img className='nav_logo' src={notification} alt="notification logo" />
            </CNavLink> */}
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
