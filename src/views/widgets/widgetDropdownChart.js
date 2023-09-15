/* eslint-disable */
import React, { useEffect, useState } from 'react'
import '../css/main.css'
import { CChartLine } from '@coreui/react-chartjs'
import Form from 'react-bootstrap/Form'
import {
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCard,
  CCardTitle,
  CTableDataCell,
  CTableBody,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CTable,
  CBadge,
} from '@coreui/react'
import { Dropdown, Selection } from 'react-dropdown-now'
import { useNavigate } from 'react-router-dom'
import * as RiIcons from 'react-icons/ri'
import { LoadChartDataApi } from '../api/VehicleApi'

const WidgetDropdownChart = (props) => {
  const { VehicleData } = props
  const [valyuchange, setvalyuchange] = useState('Week')
  const [chartLabels, setChartLabels] = useState('Week')
  const [chartData, setChartData] = useState()
  const [ chartApiData, setchartApiData ] = useState([])
  const navigate = useNavigate()

  
  var vehicleActive = VehicleData.filter((element) => element.status === 'In service')
  var vehicleinActive = VehicleData.filter((element) => element.status === 'Missing')
  var vehicleinActiveshop = VehicleData.filter((element) => element.status === 'Disposed')
  var OutofServicestatush = VehicleData.filter((element) => element.status === 'Out of Service')
  const onValueChange = (e) => {
    setvalyuchange(e.target.value)
  }

  const LoadChartApiData = async() =>{
    const result = await LoadChartDataApi()
    .then((res)=>{
      if(res.status === 200){
        
        setchartApiData(res.data)
      }
    })
  }
  useEffect(()=>{ 
    LoadChartApiData()
  },[])

  useEffect(() => {
    if(chartApiData.length > 0 ){
    if (valyuchange === 'Week') {
      setChartData([chartApiData[6].active_vehicle_count, chartApiData[5].active_vehicle_count, chartApiData[4].active_vehicle_count, chartApiData[3].active_vehicle_count, chartApiData[2].active_vehicle_count, chartApiData[1].active_vehicle_count, chartApiData[0].active_vehicle_count])
      // setChartData([30, 50, 23, 52, 78, 52, 63])
      setChartLabels(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
    }
    }
    if (valyuchange === 'Year') {
      setChartData([20, 40, 50, 60, 30, 22, 52, 52, 53, 42])
      setChartLabels([
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
      ])
    }
    if (valyuchange === 'Month') {
      setChartData([30, 78, 52, 63, 52, 78, 52, 78, 63, 51, 63, 23])
      setChartLabels([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ])
    }
  }, [valyuchange])

  // January, February, March, April, May, June, July, August, September, October, November, December
  const Disposed = () => {
    navigate('/disposed')
  }
  const Missing = () => {
    navigate('/missing')
  }
  const InService = () => {
    navigate('/in-service')
  }

  const ServiceWindow = () => {
    navigate('/out-of-service')
  }

  return (
    <div className="chart_widget">
      <CCard className="cardOne_chart">
        <div className="chartrow">
          <div>
            <CCardTitle className="total_style">Total Vehicles</CCardTitle>
            {/* week <RiIcons.RiArrowDownSFill /> */}
          </div>
          <div className="graphselect">
            <div className="d-flex">
              <div className="select">
                <select
                  name="format"
                  id="format"
                  onChange={(e) => {
                    onValueChange(e)
                  }}
                >
                  {/* <option selected disabled>Choose a book format</option> */}
                  <option value="Week">Week</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="chartbackground"></div>

        <CCardBody>
          <CChartLine
            className="chart_chart"
            type="line"
            data={{
              labels: chartLabels,
              datasets: [
                {
                  backgroundColor: 'rgba(220, 220, 220, 0.2)',
                  borderColor: '#000000',
                  pointBackgroundColor: '#FF1E1C',
                  data: chartData,
                },
              ],
            }}
          />
        </CCardBody>
      </CCard>

      {/* <CCard className='cardTwo_chart'>
        <CCardTitle className="vehicle_style"> Maintenance</CCardTitle>
        <CCardBody>
          <CTable>

            <CTableBody style={{ padding: '50px 0px' }}>
              <CTableRow className="table_add" onClick={InService}>
                <CTableDataCell className='boxcontenttext'>In-Service</CTableDataCell>
                <CTableDataCell className='dasesidecontent'><CBadge className='fontstylefast'>{vehicleActive.length}</CBadge></CTableDataCell>
              </CTableRow>
              <CTableRow className="table_add" onClick={ServiceWindow}>
                <CTableDataCell className='boxcontenttext'>Out Of Service</CTableDataCell>
                <CTableDataCell className='dasesidecontent'><CBadge className='fontstyletext3'>{OutofServicestatush.length}</CBadge></CTableDataCell>
              </CTableRow>
              <CTableRow className="table_add" onClick={Disposed}>
                <CTableDataCell className='boxcontenttext'>Disposed</CTableDataCell>
                <CTableDataCell className='dasesidecontent'><CBadge className='fontstyletext2'>{vehicleinActiveshop.length}</CBadge></CTableDataCell>
              </CTableRow>
              <CTableRow className="table_add" onClick={Missing}>
                <CTableDataCell className='boxcontenttext'>Missing</CTableDataCell>
                <CTableDataCell className='dasesidecontent'><CBadge className='fontstyletext4'>{vehicleinActive.length}</CBadge></CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard> */}
    </div>
  )
}

export default WidgetDropdownChart
