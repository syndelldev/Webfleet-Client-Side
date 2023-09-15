/* eslint-disable */
import React, { Suspense, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { UsernameDropDownN, GetUserName, getNotification, driverDetails } from '../views/api/api'
import { VehicleDetails } from '../views/api/VehicleApi'
// routes config
import routes from '../routes'
const Reports = React.lazy(() => import('../views/Notification/Notification'))

const AppContent = (props) => {
  const [role, setRole] = useState('user')
  const [UserName, setUserName] = useState('')
  const [UserId, setUserId] = useState()
  const [VehicleData, setVehicleData] = useState([])
  const [DriverData, setDriverData ] = useState([])

  const GetUserDetails = async () => {
    const roleID = localStorage.getItem('role')
    const userEmail = localStorage.getItem('userId')

    setRole(roleID)
    const UsernameDropDown = await GetUserName(userEmail)
    .then((res)=>{
      if(res.status === 200){
        setUserName(res.data[0].driver_name)
        setUserId(res.data[0].id)
      }
    })
  
   // props.onChildPropsUserName(UserName)
  }

  const LoadVehicleData = async() => {
    const result = await VehicleDetails()
    setVehicleData(result.data)

  }

  const LoadDriverData = async() => {
    const result = await driverDetails()
    // const driverFilter = result.data.filter((item)=> item.role_id === 0)
    console.log(result.data,"result.data")
    setDriverData(result.data,"result.data")
  }

  useEffect(() => {
    GetUserDetails()
    LoadVehicleData()
    LoadDriverData()
  }, [])

  //for notifications
  const [msgList, setMagList] = useState([])
  const [NotificationNumber, setNotificationNumber] = useState([])

  const LoadNotification = async () => {
    const result = await getNotification(UserId)
    .then((res)=>{
      if(res){
      setMagList(res.data)
      }
    })
   
  }
  function test() {

  }
  test()

  useEffect(() => {
    // LoadNotification()
    const filteredAll = msgList.filter((item) => item.status === 0)
   setNotificationNumber(filteredAll.length)
    props.onChildPropsNotification(NotificationNumber)
  },[])

  return (
    <CContainer lg>
      <Suspense /* fallback={<CSpinner color="primary" />} */>
        <Routes>
          {(role === 'Driver' || role === 'Admin' || role === 'Manager') && (
            <>
              {routes.map((route, idx) => {
                return (
                  route.element && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      element={
                        <route.element
                          mainUserName={UserName}
                          mainRole={role}
                          mainUserId={UserId}
                          VehicleData={VehicleData}
                          DriverData={DriverData} 
                          onChildClickDriver={test}
                        />
                      }
                    />
                  )
                )
              })}
              <Route
                path="/reports"
                element={
                  <Reports
                    mainUserName={UserName}
                    mainRole={role}
                    mainUserId={UserId}
                    NotificationCount={NotificationNumber}
                  />
                }
              />
            </>
          )}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
