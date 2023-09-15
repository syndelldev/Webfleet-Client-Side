/* eslint-disable */
import React from 'react'
import WidgetMenuDriver from '../../widgets/Driver/WidgetMenuDriver'

const Dashboard = (props) => {
    const { mainUserName,VehicleData} = props

  return (
    <div className='dashboardDiv' >
      <WidgetMenuDriver mainUserName={mainUserName} VehicleData={VehicleData} />
    </div>
    )
}

export default Dashboard
