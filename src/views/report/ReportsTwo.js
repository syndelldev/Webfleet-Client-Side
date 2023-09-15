/* eslint-disable */
import React, { useEffect, useState } from 'react'
import {
  CTable,
  CButton,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CCol,
  CFormSelect,
} from '@coreui/react'
import { reportData, genReports } from '../api/api'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { cilDataTransferDown } from '@coreui/icons'
import './reports.css'
import moment from 'moment'
import ShowReports from './showReport'
import { saveAs } from 'file-saver'
import Papa from 'papaparse'

const Reports = (props) => {
  const { VehicleData, DriverData } = props

  const [Visible, setVisible] = useState(false)
  const [download, Setdownload] = useState(false)
  const [datePicker, setDatepicker] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [reports, setReports] = useState([])
  const [genratedReports, setGenratedReports] = useState([])
  const [ActiveDiv, setActiveDiv] = useState('Vehicle')
  const [roleBaseDriver, setRoleBaseDriver] = useState([])
  //to load data while loading
  useEffect(() => {
    LoadreportDetails()
    handleDriver()
  }, [])


  const LoadreportDetails = async () => {

    const result = await reportData()

    setReports(result.data)

  }

  const setdate = () => {
    if (!(startDate === null) && !(endDate === null)) {

    } else {

    }
  }

  const handleDriver = () => {
    const filterResult = DriverData.filter((item) => item.role_id === 0)
    setRoleBaseDriver(filterResult)

  }
  //API call to filter data
  const filterReport = async (e) => {

    if (startDate == null || endDate == null) {



    } else {
      //API call
      const dataFilter = {
        startDate: moment(startDate).format('yyyy-MM-DD'),
        endDate: moment(endDate).format('yyyy-MM-DD'),
      }
      const result = await genReports(dataFilter)
      if (result.status === 200) {

        setGenratedReports(result.data)

      } else if (result.status === 204) {

      } else {

      }
      if (e) {
        Setdownload(true) // to show reports screen with download option
      } else {
        setVisible(true) // to show only reports screen
      }
    }
  }

  const closebutton = () => {
    setVisible(false)
    Setdownload(false)
  }
  const ActiveReportDiv = (e) => {

    if (e == 1) {
      setActiveDiv('Vehicle')
    }
    if (e == '0') {

      setActiveDiv('Driver')
    }
  }

  //for downloading jason data to csv file
  const downloadDriverCSV = (jsonData, desiredFields) => {
    // Filter the JSON data to keep only the desired fields
    const filteredData = jsonData.map((driver) =>
      desiredFields.reduce((acc, field) => {
        acc[field] = driver[field];
        return acc;
      }, {})
    );

    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'Driver_Data.csv');
  };

  const downloadVehicleCSV = (jsonData, desiredFields) => {
    // Filter the JSON data to keep only the desired fields
    const filteredData = jsonData.map((vehicle) =>
      desiredFields.reduce((acc, field) => {
        acc[field] = vehicle[field];
        return acc;
      }, {})
    );

    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'Vehicle_Data.csv');
  };

  const desiredDriverFields = [
    'driver_name',
    'assigned_vehicle_number',
    'assigned_vehicle_name',
    'licesnse_no',
    'phone',
    'fuel_card_name',
  ];

  const desiredVehicleFields = [
    'registrationNumber',
    'make',
    'operator',
    'type',
    'vehicle_fuel_card',
    'yearOfManufacture',
    'fuelType',
    'co2Emissions',
    'motExpiryDate',
    'taxStatus',
  ];

  const handleDownload = () => {
    if (ActiveDiv === 'Vehicle') {
      downloadVehicleCSV(VehicleData, desiredVehicleFields);
    }
    if (ActiveDiv === 'Driver') {
      downloadDriverCSV(roleBaseDriver, desiredDriverFields);
    }
  };


  return (
    <div>


      <>
        <div sx={{ width: '100%' }} className="reportsPage">

          <>
            <div className="mb-4 driversidebar">
              <div className="selecthaddingname">Report</div>
              {/* put condition here */}
              {/* {screen === 'test' ? ("") : screen === 'test' ? ("") : ()} */}
              { }
              <CForm className=" row g-3 w-100" style={{ paddingLeft: "10px" }}>
                <CCol xs="auto">
                  <CFormSelect aria-label="user-select" onChange={(e) => ActiveReportDiv(e.target.value)}
                    options={[
                      { label: 'Fleet Vehicles', value: '1' },
                      { label: 'Fleet Drivers', value: '0' },

                      // { label: 'Fleet Daily Spent', value: '2' },
                    ]}
                    className="reports_drop-dwown"
                  />
                </CCol>

                {/* <CCol xs="auto" className="celender-col">
              <CCol>
                <CButton className="selctDate_btn" onClick={()=> toggleDatepicker()}>
                  Choose Date
                </CButton>
              </CCol>
              {datePicker ? (
              <CCol className="datePicker-sec">
                <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date)=> setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="Start Date:"
                  onClickOutside={() => setdate()}
                  closeOnScroll={true}
                  className="datePicker"
                  />
                  <DatePicker dateFormat="dd/MM/yyyy" selected={endDate} onChange={(date)=> setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date:"
                    onClickOutside={() => setdate()}
                    closeOnScroll={true}
                    className="datePicker"
                    />
              </CCol>
              ) : (
              ''
              )}
            </CCol> */}

                <CButton className="AddUserBtn_btn " onClick={() => {
                  filterReport()
                }}
                  style={{ marginLeft: '2px' }}
                >
                  Run Report
                </CButton>


                <CButton className="Report_download_button AddUserBtn_btn" onClick={handleDownload}>
                  <CIcon icon={cilDataTransferDown} size="xm" style={{ margin: '0px 3px' }} />
                  Download Report
                </CButton>

              </CForm>
            </div>

            <div className="drivertraking" style={{ margin: 'auto' }}>
              {ActiveDiv === 'Vehicle' && (

                <>
                  <div className="allvehicledataTable">
                    <CTable className="alldriverTable" style={{ tableLayout: 'fixed' }}>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell className="tablecell user_tableHead ps-4">
                            VRN
                          </CTableHeaderCell>
                          {/* <CTableHeaderCell className="user_tableHead ps-0" style={{ width: 80 }}>
                      Year
                    </CTableHeaderCell> */}
                          <CTableHeaderCell className="tablecell user_tableHead">
                            Make
                          </CTableHeaderCell>
                          <CTableHeaderCell className="tablecell user_tableHead"  style={{ width: 100 }}>
                          Year
                          </CTableHeaderCell>
                        
                          <CTableHeaderCell className="tablecell user_tableHead">
                          Fuel Type
                          </CTableHeaderCell>


                          <CTableHeaderCell className="user_tableHead ps-2" style={{ width: 100 }}>
                            Type
                          </CTableHeaderCell>
                          <CTableHeaderCell className="user_tableHead ps-2" style={{ width: 100 }}>
                          Emissions
                          </CTableHeaderCell>
                          <CTableHeaderCell className="user_tableHead ps-2" style={{ width: 150 }}>
                          Mot Expiry Date
                          </CTableHeaderCell>
                          <CTableHeaderCell className="user_tableHead ps-2" style={{ width: 100 }}>
                          Tax Status
                          </CTableHeaderCell>     
                          {/* <CTableHeaderCell className="user_tableHead ps-2" style={{ width: 100 }}>
                          Marked For Export
                          </CTableHeaderCell> */}


                        
                          <CTableHeaderCell className="tablecell user_tableHead report_tablehead" style={{ width: 150 }}>
                            Driver Name
                          </CTableHeaderCell>
                          <CTableHeaderCell className="tablecell user_tableHead">
                            Has Fuel Card
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      {VehicleData.map((user) => (
                        <CTableBody>
                          <CTableRow style={{
                            width: '100%',
                            borderBottom: '1px solid #d8dbe0',
                            borderTop: '1px solid #d8dbe0',
                          }}>
                            <CTableDataCell className="tablecell ps-4">
                              {user.registrationNumber}
                            </CTableDataCell>

                            <CTableDataCell className="tablecell">{user.make}</CTableDataCell>
                            <CTableDataCell className="tablecell">{user.yearOfManufacture}</CTableDataCell>
                         
                            <CTableDataCell className="tablecell">{user.fuelType} </CTableDataCell>


                            <CTableDataCell className="tablecell">{user.type}</CTableDataCell>


                            <CTableDataCell className="tablecell">
                              {user.co2Emissions}
                            </CTableDataCell> <CTableDataCell className="tablecell">
                              {moment(user.motExpiryDate).format('DD-MM-yyyy')}
                            </CTableDataCell> <CTableDataCell className="tablecell">
                              {user.taxStatus}
                            </CTableDataCell> 
                            {/* <CTableDataCell className="tablecell">
                              {user.markedForExport}
                            </CTableDataCell> */}
                          
                               <CTableDataCell className="tablecell">{user.operator}</CTableDataCell>
                               <CTableDataCell className="tablecell">
                              {user.vehicle_fuel_card}
                            </CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      ))}
                    </CTable>
                  </div>
                </>
              )}
              {ActiveDiv === 'Driver' && (

                <>
                  <div className="drivertraking" style={{ margin: 'auto' }}>
                    <CTable className="alldriverTable" style={{ tableLayout: 'fixed' }}>
                      <CTableHead>
                        <CTableRow style={{ verticalAlign: 'middel' }}>
                          <CTableHeaderCell className="tablecell drivertablehadding ps-4" style={{ width: 120 }}>
                            Name
                          </CTableHeaderCell>

                          <CTableHeaderCell className="vihicalasign" style={{ width: 170 }}>
                            Assigned Vehicle's No{' '}
                          </CTableHeaderCell>
                          <CTableHeaderCell className="tablecell drivertablehadding ps-2" style={{ width: 120 }}>
                            Vehicle Type
                          </CTableHeaderCell>

                          <CTableHeaderCell className="tablecell drivertablehadding ps-2" style={{ width: 170 }}>
                            License No
                          </CTableHeaderCell>

                          <CTableHeaderCell className="tablecell drivertablehadding ps-2" style={{ width: 100 }}>
                            Phone
                          </CTableHeaderCell>

                          <CTableHeaderCell className="tablecell drivertablehadding ps-2" style={{ width: 170 }}>
                            Fuel card{' '}
                          </CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      {roleBaseDriver.map((user, index) => (
                        <CTableBody key={index}>
                          <CTableRow style={{
                            width: '100%',
                            borderBottom: '1px solid #d8dbe0',
                            borderTop: '1px solid #d8dbe0',
                          }}>
                            <CTableDataCell className="drivertablerows ps-4" >
                              {user.driver_name}
                            </CTableDataCell>

                            <CTableDataCell className="drivertablerows">
                              {user.assigned_vehicle_number}
                            </CTableDataCell>
                            <CTableDataCell className="drivertablerows">
                              {user.assigned_vehicle_name}
                            </CTableDataCell>

                            <CTableDataCell className="drivertablerows" style={{ width: 120 }}>
                              {user.licesnse_no}
                            </CTableDataCell>

                            <CTableDataCell className="drivertablerows" style={{ width: 120 }}>
                              {user.phone}
                            </CTableDataCell>

                            <CTableDataCell className="drivertablerows" style={{ width: 120 }}>
                              {user.fuel_card_name}
                            </CTableDataCell>
                          </CTableRow>
                        </CTableBody>
                      ))}
                    </CTable>
                  </div>
                </>
              )}
            </div>
          </>
          {Visible && <ShowReports data={genratedReports} onClick={closebutton} />}
          {download && (
            <ShowReports data={genratedReports} onClick={closebutton} showdownload={true} />
          )}
        </div>
      </>

    </div>
  )
}

export default Reports
