/* eslint-disable */

import React, { Component, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Forgot = React.lazy(() => import('./views/pages/login/forgot'))
const Repassword = React.lazy(() => import('./views/pages/login/updatePassword'))

function AppOne() {
  const [role, setrole] = useState('user')

  const GetUserDetails = async () => {
    const roleID = localStorage.getItem('role')
    setrole(roleID)
  }

  useEffect(() => {
    GetUserDetails()
  },[])

  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route exact path="/forgot" name="Forgot Page" element={<Forgot />} />
          <Route exact path="/resetpassword" name="Forgot Page" element={<Repassword />} />
          <Route exact path="/" name="Login Page" element={<Login />} />
          {role === 'Driver' || role === 'Admin' || role === 'Manager' ? (
            <>
              <Route path="/*" name="Home" element={<DefaultLayout />} />
            </>
          ) : (
            <>
              <Route exact path="/*" name="Login Page" element={<Login />} />
            </>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default AppOne
