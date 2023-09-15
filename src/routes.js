/* eslint-disable */
import React from 'react'

//dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const DashboardDriver = React.lazy(() =>
  import('./views/Driver-Dashboard/Dashboard/DriverDashboard'),
)

//Driver-Dashboard
const TripHistory = React.lazy(() => import('./views/Driver-Dashboard/Trip-History/TrtipHistory'))
const AssignedVehicle = React.lazy(() =>
  import('./views/Driver-Dashboard/Vehicle-Details/AssignedVehicle'),
)

//Dashboard-Pages
const TotalVehicles = React.lazy(() => import('./views/dashboard/Pages/Total-Vehicles'))
const IdleVehicle = React.lazy(() => import('./views/dashboard/Pages/Idle-Vehicles'))
const InMaintenance = React.lazy(() => import('./views/dashboard/Pages/In-Maintenance'))
const OutOfService = React.lazy(() => import('./views/dashboard/Pages/out-of-service'))
const IdleDriverss = React.lazy(() => import('./views/dashboard/Pages/Idle-Drivers'))

//vehicle-Management
const VehicleTracking = React.lazy(() =>
  import('./views/vehicle-management/Vehicle-Tracking/VehicleTrackingThree'),
)
const AaddVehicle = React.lazy(() =>
  import('./views/vehicle-management/vehicle-assignmnet/Add-Vehicle'),
)
const vehicleassignment = React.lazy(() =>
  import('./views/vehicle-management/vehicle-assignmnet/vehicle-assignment'),
)
const vehicleFleet = React.lazy(() =>
  import('./views/vehicle-management/Vehicle-trip-request/VehicleFleet'),
)

//Driver
const DriverList = React.lazy(() => import('./views/driver-management/DriverList/driver-list'))
const DriverTripHistory = React.lazy(() =>
  import('./views/driver-management/TripHistory/DriverTripHistory'),
)
const AddDriver = React.lazy(() => import('./views/driver-management/DriverList/AddDriver'))

//user management
const usermanagement = React.lazy(() => import('./views/User-Management/Add-User'))
const UserDetails = React.lazy(() => import('./views/User-Management/UserList'))

//Maintenance
const Maintenance = React.lazy(() => import('./views/Maintenance/Maintenance-List/Maintenancelist'))
const ServicesMot = React.lazy(() => import('./views/Maintenance/Service/Services-mot'))
const Garage = React.lazy(() => import('./views/Maintenance/Garage-List/GarageList'))
const AddGarage = React.lazy(() => import('./views/Maintenance/Garage-List/AddGarage'))

//Report
const Reports = React.lazy(() => import('./views/report/ReportsTwo'))

//Support
const Support = React.lazy(() => import('./views/Support/Support'))

//Profile
const ProfileUpdate = React.lazy(() => import('./views/profile/UserProfile'))

//aleart & notification
const aleart = React.lazy(() => import('./views/Notification/Notification'))

//Other
const Services = React.lazy(() => import('./views/Maintenance/Other-Services/In-Service'))
const Disposed = React.lazy(() => import('./views/Maintenance/Other-Services/Disposed'))
const Missing = React.lazy(() => import('./views/Maintenance/Other-Services/Missing'))
const Insurance = React.lazy(() => import('./views/Other_services/Insurance'))
const DutyOfCare = React.lazy(() => import('./views/Maintenance/Other-Services/Dutyofcare'))
const Offers = React.lazy(() => import('./views/Other_services/Offers'))
const Tyres = React.lazy(() => import('./views/Maintenance/Other-Services/Tyres'))
const Rental = React.lazy(() => import('./views/Maintenance/Other-Services/Rental'))

//test
// const Test = React.lazy(() => import('./views/vehicle/VehicleTrackingTwo'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Dashboard', element: Dashboard },
  { path: '/dashboard-driver', name: 'Dashboard', element: DashboardDriver },
  { path: '/assigned-vehicle', name: 'user Details', element: AssignedVehicle },
  { path: '/trip-history', name: 'user Details', element: TripHistory },

  { path: '/total-vehicle', name: 'Widgets', element: TotalVehicles },
  { path: '/idle-vehicle', name: 'Widgets', element: IdleVehicle },
  { path: '/in-maintenance', name: 'Widgets', element: InMaintenance },
  { path: '/out-of-service', name: 'Widgets', element: OutOfService },
  { path: '/idle-driver', name: 'Select', element: IdleDriverss },

  { path: '/driver-management/driver-list', name: 'Select', element: DriverList },
  { path: '/driver-management/driver-trip-history', name: 'Select', element: DriverTripHistory },
  { path: '/driver-management/add-driver', name: 'Select', element: AddDriver },

  { path: '/vehicle-management/vehicle-tracking', name: 'Widgets', element: VehicleTracking },
  { path: '/vehicle-management/vehicle-add', name: 'vehicle Details', element: AaddVehicle },
  { path: '/vehicle-management/vehicle-fleet', name: 'user Details', element: vehicleFleet },
  {
    path: '/vehicle-management/vehicle-assignment',
    name: 'vehicle Details',
    element: vehicleassignment,
  },

  { path: '/user-management/add-user', name: 'user Details', element: usermanagement },
  { path: '/user-management', name: 'user management', element: UserDetails },

  { path: '/maintenance/maintenance-list', name: 'user Details', element: Maintenance },
  { path: '/maintenance/services-mot', name: 'Duty Of Care', element: ServicesMot },
  { path: '/maintenance/garage-list', name: 'Duty Of Care', element: Garage },
  { path: '/maintenance/add-garage', name: 'Duty Of Care', element: AddGarage },

  { path: '/notification', name: 'user Details', element: aleart },
  { path: '/reports', name: 'user Details', element: Reports },

  { path: '/support', name: 'Support', element: Support },

  { path: '/profile-update', name: 'Widgets', element: ProfileUpdate },

  { path: '/in-service', name: 'Widgets', element: Services },
  { path: '/disposed', name: 'Widgets', element: Disposed },
  { path: '/missing', name: 'Widgets', element: Missing },
  { path: '/maintenance/tyres', name: 'Duty Of Care', element: Tyres },
  { path: '/maintenance/rental', name: 'Duty Of Care', element: Rental },
  { path: '/maintenance/dutyofcare', name: 'Duty Of Care', element: DutyOfCare },
  { path: '/other-services/insurance', name: 'Insurance', element: Insurance },
  { path: '/other-services/offers', name: 'Offers', element: Offers },

  // { path: '/test', name: 'user Details', element: Test },
]

export default routes
