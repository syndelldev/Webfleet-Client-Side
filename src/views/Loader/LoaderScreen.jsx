/* eslint-disable */
import React from 'react'
import logoimages from '../../assets/images/avatars/logo1.ico'

const LoaderScreen = () => {
  return (
    <div className="loader-container">
    <div className="spinner"> </div>
    <img src={logoimages} style={{ width: 35, height: 35 }} />
  </div>
  )
}

export default LoaderScreen
