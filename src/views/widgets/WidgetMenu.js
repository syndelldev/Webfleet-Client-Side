/* eslint-disable */
import {
    CTableRow,
    CCard,
    CTableDataCell,
    CTableBody,
    CCardBody,
    CTable,
    CBadge,
    CCardText,
    CCardTitle
} from '@coreui/react'
import { useNavigate } from 'react-router-dom';
import { driverDetails, UserDetails } from '../api/api.js'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { element } from 'prop-types';

const WidgetMenu = (props) => {
    const { VehicleData, DriverData } = props
    const navigate = useNavigate()
    const [driverCounts, setDriverCounts] = useState([])
    const [Ideldriver, setIdeldriver] = useState([])

    
  
    // const vehicalemencount = drivres.filter((item) => item.status === 'idle')
   
  
    var today = new Date;
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay();
    first = first - 30
    var firstdayOb = new Date(curr.setDate(first));
    var firstday = firstdayOb.toUTCString();

    var firstdayTemp = firstdayOb;

    const driverdata = () =>{
        navigate('/driver-management/driver-list')
    } 
    const idledriverdata = () =>{
        navigate('/idle-driver')
    }

    var lastday = new Date(firstdayTemp.setDate(firstdayTemp.getDate() + 6)).toUTCString();
 
    var vehicleActive = VehicleData.filter((element) => element.status === 'In-Transit')
    var vehicleMaintenance = VehicleData.filter((element) => element.status === 'In Maintenance')
    var vehicleIdle = VehicleData.filter((element) => element.status === 'Idle' && element.operator === 'None')
    var vehicleOutOfService = VehicleData.filter((element) => element.status === 'Out of service')
    var vehicalemencount = VehicleData.filter((element) => element.status === 'In Maintenance')
    var idledrivers = DriverData.filter((element) => element.status === 'Active' && element.assigned_vehicle_number === 'None')
    var allDriver = DriverData.filter((element) => element.role_id === 0 )
    // var updatenewuser =  userCount.filter((element) => 'today'<= (moment(element.registered_at).format('yyyy-MM-DD')) <= 'lastday')

    // console.log(updatenewuser);

    const ActiveWindow = () => {
        navigate('/active')
    
    }
    const SupportRequests = () => {
        navigate('/support')
       
    }
    const VehicleList = () => {
        navigate('/total-vehicle')
    }
    const Transit = () => {
        navigate('/vehicle-management/vehicle-tracking')
        
    }
    
    const InactiveWindow = () => {
        navigate('/Inactive')

    }

    const InshopWindow = () => {
        navigate('/idle-vehicle')
     
    }

    const ServiceWindow = () => {
        navigate('/out-of-service')
      
    }
    const Maintenance = () => {
        navigate('/in-maintenance')
      
    }
    const DriverWindow = () => {
        navigate('/driver-management/driver-list')
    }


    return (
        <div className='dashboard_header'>
            <div className='dashboardCardOne ' style={{display:'grid',alignItems:'center'  }}>
                <div className='menuOne_widget'>
                    <CCard className='menu_card'  onClick={VehicleList}>
                        <CCardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='box_points'>
                                <div className='boxpoints'>{VehicleData.length}</div>
                                <div className='box-title'>Total Vehicles</div>
                            </div>
                           
                        </CCardBody>
                    </CCard>
                    {/* <CCard className='menu_card' onClick={Transit}>
                        <CCardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='box_points' >
                                <div className='boxpoints'>{vehicleActive.length}</div>
                                <div className='box-title'>Vehicles in Transit</div>
                            </div>
                        </CCardBody>
                    </CCard> */}
                    <CCard className='menu_card' onClick={InshopWindow}>
                        <CCardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='box_points' >
                            <div className='boxpoints'>{vehicleIdle.length}</div>
                                <div className='box-title'>Idle Vehicles</div>
                             
                            </div>
                            {/* <CCardText className='textMenu'>
                    <span className='boxpoints2'>53</span>  <br/>
                    Total Drivers 
                    </CCardText> */}
                        </CCardBody>
                    </CCard>
                    <CCard className='menu_card'  onClick={Maintenance}>
                        <CCardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='box_points'>
                                <div className='boxpoints'>{vehicleMaintenance.length}</div>
                                <div className='box-title'>In Maintenance</div>
                            </div>
                           
                        </CCardBody>
                    </CCard>
                  

                </div>
                <div className='menuOne_widget'>
                    <CCard className='menu_card' onClick={DriverWindow}>
                        <CCardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='box_points' >
                            <div className='boxpoints'>{allDriver.length}</div>
                                <div className='box-title'>Total Drivers</div>
                               
                            </div>
                           
                        </CCardBody>
                    </CCard>
                    <CCard className='menu_card' onClick={idledriverdata}> 
                        <CCardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='box_points' >
                                <div className='boxpoints'>{idledrivers.length}</div>
                                <div className='box-title'>Unassigned Drivers</div>
                            </div>
                            {/* <CCardText className='textMenu'>
                    <span className='boxpoints2'>53</span>  <br/>
                    Total Drivers 
                    </CCardText> */}
                        </CCardBody>
                    </CCard>
                    <CCard className='menu_card' onClick={ServiceWindow}>
                        <CCardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className='box_points' >
                                <div className='boxpoints'>{vehicleOutOfService.length}</div>
                                <div className='box-title'>Out Of Service</div>
                            </div>                           
                        </CCardBody>
                    </CCard>
                  

                </div>
                

            </div>
           
                

            
            {/* <div className='dashboardCardTwo'>
                
                <CCard className='cardOne_widget' >
                    <CCardTitle className="vehicle_style">Vehicle Status</CCardTitle>

                    <CCardBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CTable>
                            <CTableBody>
                                <CTableRow className="table_add" onClick={ActiveWindow}>
                                    <CTableDataCell className='boxcontenttext'>Active</CTableDataCell>
                                    <CTableDataCell className='dasesidecontent'><CBadge className='fontstylefast'>{vehicleActive.length}</CBadge></CTableDataCell>
                                </CTableRow>
                               
                                <CTableRow className="table_add" onClick={InshopWindow}>
                                    <CTableDataCell className='boxcontenttext'>Idle</CTableDataCell>
                                    <CTableDataCell className='dasesidecontent'><CBadge className='fontstyletext2'>{vehicleinActiveshop.length}</CBadge></CTableDataCell>
                                </CTableRow>
                                <CTableRow className="table_add" onClick={ServiceWindow}>
                                    <CTableDataCell className='boxcontenttext'>Out of Service</CTableDataCell>
                                    <CTableDataCell className='dasesidecontent'><CBadge className='fontstyletext3'>{OutofServicestatush.length}</CBadge></CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard> 

            </div> */}
        </div>
    )
}

export default WidgetMenu