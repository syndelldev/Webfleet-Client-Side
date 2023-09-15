/* eslint-disable */
import React, { Component, Suspense, useEffect,  } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import './components/main.css'
import './views/css/main.css'
import './views/css/Rohitmain.css'
import './views/css/Viranshimain.css'
import './views/css/main_laptop.css'
import './views/css/responsive/main_ipad.css'
import './views/css/responsive/main_mobile.css'
import './views/css/responsive/main_mobile_plus.css'
// import './views/css/responsive/main_mobile_mini.css'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Forgot = React.lazy(() => import('./views/pages/login/forgot'))
const Repassword = React.lazy(() => import('./views/pages/login/repassword'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const UpdatePassword = React.lazy(() => import('./views/pages/login/updatePassword'))

class App extends Component {
  render() {

    return (
      <BrowserRouter>
      <Routes>

            <Route exact path="/forgot" name="Forgot Page" element={<Forgot />} />
            <Route exact path="/update-password/" name="Update password page" element={<UpdatePassword />} />
      </Routes>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/forgot" name="Forgot Page" element={<Forgot />} />
            <Route exact path="/repassword" name="Forgot Page" element={<Repassword />} />
            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route exact path="/lol" name="Login Page" element={<DefaultLayout />} />
            {/* <Route path="/home" name="Home" element={<DefaultLayout />} /> */}
           
            {/* <Route path="/*" name="Home" element={<DefaultLayout />} /> */}
    
          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
