/* eslint-disable */
import React from 'react'
import WidgetMenu from '../widgets/WidgetMenu'

const Dashboard = (props) => {
  const { VehicleData, DriverData } = props

  return (
    <div className='dashboardDiv'>
      <WidgetMenu VehicleData={VehicleData} DriverData={DriverData}/>
      {/* <WidgetDropdownChart VehicleData={VehicleData}/> */}
      {/* <WidgetBottom VehicleData={VehicleData}/> */}
    </div>
    )
}

export default Dashboard
