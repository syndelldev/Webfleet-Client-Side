/* eslint-disable */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { useEffect, useState } from 'react'
import { CNavGroup, CNavItem } from '@coreui/react'
import nevimages from './assets/images/VehicleAssignment.svg'
import vihicaltraking from './assets/images/13-order tracking.svg'
import vehicleList from './assets/images/VehicleList.svg'
import driverlist from './assets/images/driverlist.png'
import Dashboard from './assets/images/nevlogo/Vector.svg'
import Management from './assets/images/DriverManagement.svg'
import UserManagement from './assets/images/nevlogo/Group (1).svg'
import VehicleManagement from './assets/images/nevlogo/Group 10029.svg'
import Maintenance from './assets/images/nevlogo/Group 10034.svg'
import SupportHelp from './assets/images/nevlogo/Group 10039.svg'
import DutyOf from './assets/images/Service 24 hour (Gear).svg'
import ServicesMot from './assets/images/Group 1000006147.svg'
import tyres from './assets/images/Group 1000006145.svg'
import rental from './assets/images/Group 1000006146.svg'
import ResellerModule from './assets/images/riport.svg'
import Billing from './assets/images/alerts.png'
import Insuranceimage from './assets/images/Group 1000006154.svg'
import Otherservices from './assets/images/Group 1000006029.svg'
import Offers from './assets/images/Group 1000006155.svg'
import logout from './assets/images/logout.svg'
import { CBadge } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard-manager',
    icon: <img src={Dashboard} height={15} style={{ width: 45 }} />,
  },
  {
    component: CNavGroup,
    name: 'Vehicle Management',
    to: '/base',
    icon: <img src={VehicleManagement} height={15} style={{ width: 45 }} />,
    items: [
      {
        component: CNavItem,
        name: 'Vehicle List',
        className:'className:"nav-link"',
        to: '/vehicle-management/vehicle-list',
        icon: <img src={driverlist} height={11} style={{ marginRight: 5 }} />,
      },
      {
        component: CNavItem,
        name: 'Vehicle Assignment',
        to: '/vehicle-management/vehicle-assignment',
        icon: <img src={nevimages} height={15} style={{ marginRight: 5 }} />,
      },
      {
        component: CNavItem,
        name: 'Vehicle Tracking',
        to: '/vehicle',
        icon: <img src={vihicaltraking} height={15} style={{ marginRight: 5 }} />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Vehicle List',
      //   to: '/vehicle-management',
      //   icon: <img src={driverlist} height={15} style={{ marginRight: 5 }} />,
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Driver Management',
    to: '/forms',
    icon: <img src={Management} height={20} style={{ width: 45 }} />,
    items: [
      {
        id:10,
        className:'activebar',
        // style:{background:'#000',borderRadius:"50px 0px 0px 50px",marginRight:0,paddingleft:44,marginLeft:49},
        component: CNavItem,
        name: 'Driver List',
        to: '/driver-management/driver-list',
        icon: <img src={driverlist} height={11} style={{ marginRight: 5 }} />,
      },
    ],
  },

  {
    component: CNavItem,
    name: 'User Management',
    to: '/user-management',
    icon: <img src={UserManagement} height={15} style={{ width: 45 }} />,
  },
  {
    component: CNavGroup,
    name: 'Maintenance',
    icon: <img src={Maintenance} height={15} style={{ width: 45 }} />,
    items: [
      {
        component: CNavItem,
        name: 'Maintenance List',
        // className:'className:"nav-link"',
        to: '/maintenance/maintenance-list',
        icon: <img src={driverlist} height={11} style={{ marginRight: 5 }} />,
      },
      {
        component: CNavItem,
        name: 'Duty Of Care',
        // className:'className:"nav-link"',
        to: '/maintenance/dutyofcare',
        icon: <img src={DutyOf} height={15} style={{ marginRight: 5 }} />,
      },
      {
        component: CNavItem,
        name: 'Services/MOT',
        to: '/maintenance/services-mot',
        icon: <img src={ServicesMot} height={15} style={{ marginRight: 5 }} />,
      },
      {
        component: CNavItem,
        name: 'Tyres',
        to: '/maintenance/tyres',
        icon: <img src={tyres} height={15} style={{ marginRight: 5 }} />,
      },  
      {
        component: CNavItem,
        name: 'Rental',
        to: '/maintenance/rental',
        icon: <img src={rental} height={15} style={{ marginRight: 5 }} />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Vehicle List',
      //   to: '/vehicle-management',
      //   icon: <img src={driverlist} height={15} style={{ marginRight: 5 }} />,
      // },
    ],
  },

  {
    component: CNavItem,
    name: 'Support/Help',
    to: '/support',
    icon: <img src={SupportHelp} height={15} style={{ width: 45 }} />,
  },
  {
    component: CNavItem,
    name: 'Reports',
    to: '/reports',
    icon: <img src={ResellerModule} height={15} style={{ width: 45 }} />,
  },
  {
    component: CNavItem,
    name: 'Alerts/Notification',
    to: '/alerts',
    badge: {
      text: '10+',
      color: 'danger',
    },
    icon: <img src={Billing} height={15} style={{ width: 45, padding: '0px 12px', height:20 }} />,
  },
  {
    component: CNavGroup,
    name: 'Other services',
    icon: <img src={Otherservices} height={15} style={{ width: 45 }} />,
    items: [
      {
        component: CNavItem,
        name: 'Insurance',
        // className:'className:"nav-link"',
        to: '/other-services/insurance',
        icon: <img src={Insuranceimage} height={11} style={{ marginRight: 5 }} />,
      },
      {
        component: CNavItem,
        name: 'Offers',
        // className:'className:"nav-link"',
        to: '/other-services/offers',
        icon: <img src={Offers} height={15} style={{ marginRight: 5 }} />,
      },
    
      // {
      //   component: CNavItem,
      //   name: 'Vehicle List',
      //   to: '/vehicle-management',
      //   icon: <img src={driverlist} height={15} style={{ marginRight: 5 }} />,
      // },
    ],
  },
  // {
  //   component: CNavItem,
  //   name: 'Logout',
  //   to: '/',
  //   icon: <img src={logout} height={15} style={{ width: 45 }}  />,
  // },
]

export default _nav
