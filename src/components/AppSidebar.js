/* eslint-disable */
import React, { useEffect, useState } from 'react'
import '../views/css/main.css'
import { useSelector, useDispatch } from 'react-redux'
import { LoadNotification } from '../views/api/VehicleApi'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
import { CNavGroup, CNavItem } from '@coreui/react'

import logoNegative from 'src/assets/images/logo_1.png'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'
import navigationUser from '../_navUser'
import navigationManager from '../_navManager'
import { remove} from 'src/store/NotificationSlice'
import { set } from 'src/store/SidebarSlice'


const AppSidebar = (props) => {
  // const {NotificationCount } = props
  const [ NotificationCount, setNotificationCount ] = useState(0)
  const countNotificaton = useSelector(state => state.notification) // get the notification count in redux when notification remove
  const sidebarShow = useSelector((state) => state.sidebar.sidebarShow)
  const dispatch = useDispatch()

  //for user role
  const [role, setrole] = useState('');

  const LoadNotificationCount = async() => {
    // console.log("test done")
    const result = await LoadNotification()
    .then((res)=>{
    
        setNotificationCount(res.data)
  
    })
  }

  useEffect(() => {
    LoadUserRole()
    LoadNotificationCount()
  }, [countNotificaton])  // Add countNotificaton as a dependency

  const LoadUserRole = async () => {
    const roleID = localStorage.getItem('role');
    setrole(roleID)
  }
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  // const sidebarShow = useSelector((state) => state.sidebarShow)


  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      // onVisibleChange={(visible) => {
      //   dispatch({ type: 'set', sidebarShow: visible })
      // }}
      onVisibleChange={(visible)=> dispatch(set({sidebarShow: visible}))}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <img src={logoNegative} height={30} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
         {(role === 'Admin') ?
              <>
              <AppSidebarNav items={navigation} Notification={NotificationCount} />

              </>
          :
          (role === 'Manager')?
              <>
              <AppSidebarNav items={navigationManager}  Notification={NotificationCount}/>
              </>
          :
          
             <>
             <AppSidebarNav items={navigationUser}  Notification={NotificationCount}/>
             </>
          
        }
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch(set({ sidebarShow: !unfoldable }))}
        // onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
