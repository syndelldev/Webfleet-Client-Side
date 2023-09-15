/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  const [NotificationCount, setNotificationCount] = useState()
  const [role, setRole] = useState('')

  useEffect(() => {
    const roleID = localStorage.getItem('role')
    setRole(roleID)
  }, [])

  const handleChildPropsNotification = (e) => {
    setNotificationCount(e)
  }

  return (
    <div>
      { role !== null ? <>
        <AppSidebar NotificationCount={NotificationCount} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />

        <div className="body flex-grow-1 px-3">
          <AppContent onChildPropsNotification={handleChildPropsNotification} />
        </div>
        <AppFooter />
      </div>
      </>:
      <>
      not login
      </>}
    </div>
  )
}

export default DefaultLayout
