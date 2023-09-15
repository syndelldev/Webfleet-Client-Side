/* eslint-disable */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem } from '@coreui/react'
import Dashboard from './assets/images/nevlogo/Vector.svg'
import VehicleManagement from './assets/images/nevlogo/Group 10029.svg'
import SupportHelp from './assets/images/nevlogo/Group 10039.svg'
import Trip from './assets/images/tripicon.svg'
import Billing from './assets/images/notification.png'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard-driver',
    icon: <img src={Dashboard} height={15} style={{ width: 45 }} />,
  },   
  {
    component: CNavItem,
    name: 'Trip History',
    to: '/trip-history',
    icon: <img src={Trip} height={15} style={{ width: 45 }} />,
  },
  {
    component: CNavItem,
    name: 'Assigned Vehicle',
    to: '/assigned-vehicle',
    icon: <img src={VehicleManagement} height={15} style={{ width: 45 }} />,
  },
 
  // {
  //   component: CNavGroup,
  //   name: 'Vehicle Management',
  //   to: '/base',
  //   icon: <img src={VehicleManagement} height={15} style={{ width: 45 }} />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Vehicle List',
  //       to: '/vehicle-management',
  //       icon: <img src={driverlist} height={11} style={{ marginRight: 5 }} />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Vehicle Assignment',
  //       to: '/vehicle-management/vehicle-assignment',
  //       icon: <img src={nevimages} height={15} style={{ marginRight: 5 }} />,
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Vehicle Tracking',
  //       to: '/vehicle',
  //       icon: <img src={vihicaltraking} height={15} style={{ marginRight: 5 }} />,
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Driver Management',
  //   to: '/forms',
  //   icon: <img src={Management} height={20} style={{ width: 45 }} />,
  //   items: [
  //     {
  //       id:10,
  //       class:'activebar',
  //       // style:{background:'#000',borderRadius:"50px 0px 0px 50px",marginRight:0,paddingleft:44,marginLeft:49},
  //       component: CNavItem,
  //       name: 'Driver List',
  //       to: '/driver-management/driver-list',
  //       icon: <img src={driverlist} height={11} style={{ marginRight: 5 }} />,
  //     },
  //   ],
  // },

  // {
  //   component: CNavItem,
  //   name: 'Maintenance',
  //   to: '/widgets',
  //   icon: <img src={Maintenance} height={15} style={{ width: 45 }} />,
  // },

  {
    component: CNavItem,
    name: 'Support/Help',
    to: '/support',
    icon: <img src={SupportHelp} height={15} style={{ width: 45 }} />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Reports',
  //   to: '/reports',
  //   icon: <img src={ResellerModule} height={15} style={{ width: 45 }} />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Alerts/Notification',
  //   badge: {
  //     text: '10+',
  //     color: 'danger',
  //   },  
  //   to: '/notification',
  //   icon: <img src={Billing} height={15} style={{ width: 45, padding: '0px 12px', height:20 }} />,
  // },
  // {
  //   component: CNavItem,
  //   name: 'Logout',
  //   to: '/',
  //   icon: <img src={logout} height={15} style={{ width: 45 }}  />,
  // },
]

export default _nav
