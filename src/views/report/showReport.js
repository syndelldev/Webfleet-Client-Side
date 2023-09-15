/* eslint-disable */
import React from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { reportData } from '../api/api'
import "react-datepicker/dist/react-datepicker.css";
import CIcon from '@coreui/icons-react'
import { CSVLink } from "react-csv";
import moment from 'moment'
import { cilX } from '@coreui/icons'

function ShowReports(props) {
  const reportsData = props.data
  const showDownload = props.showdownload

  const showError = () => {
    alert("No data found to download")
  }
  const closebutton = () => {
    props.onClick(false)
  }


  return (
    <>
      <div className='closebtn'> <CIcon className='closeicon' onClick={closebutton} icon={cilX} /> </div>
      <div className='reporrts-popup-bg'>
        <div className='reportsPopUP'>
          <div className="selecthaddingname">Report</div>
          <div className="drivertraking" style={{ margin: 'auto' }}>
            <CTable className="alldriverTable reportsTable" style={{ tableLayout: 'fixed' }}>
              <CTableHead>
                <CTableRow style={{ verticalAlign: 'middel' }}>
                  <CTableHeaderCell className="tablecell drivertablehadding ps-4" style={{ width: 120 }}>
                    VRN
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell className="drivertablehadding" style={{ width: 120 }}>
              Current Meter
            </CTableHeaderCell> */}
                  <CTableHeaderCell className="tablecell drivertablehadding ps-2" style={{ width: 120 }}>Make</CTableHeaderCell>
                  <CTableHeaderCell className="tablecell drivertablehadding ps-2" style={{ width: 200 }}>
                    Model
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell className="tablecell drivertablehadding ps-2" style={{ width: 150 }}>Current Driver</CTableHeaderCell> */}
                  <CTableHeaderCell className="tablecell drivertablehadding ps-2" style={{ width: 150 }}>Current Location</CTableHeaderCell>
                  {/* <CTableHeaderCell className="tablecell drivertablehadding ps-2" style={{ width: 150 }}>Acquisition method</CTableHeaderCell> */}
                  <CTableHeaderCell className="tablecell drivertablehadding ps-2" style={{ width: 150 }}>Date on Fleet</CTableHeaderCell>
                  {/* <CTableHeaderCell className="tablecell drivertablehadding ps-2" style={{ width: 120 }}>Has Fuel Card</CTableHeaderCell> */}

                </CTableRow>
              </CTableHead>
              {reportData.map((reports) => (
                <CTableBody>
                  <CTableRow style={{ width: '100%', borderBottom: '1px solid #d8dbe0', borderTop: '1px solid #d8dbe0' }}>
                    <CTableDataCell className="drivertablerows" style={{ paddingLeft: 21 }}>
                      <span>
                        {/* <img src={driverimages} height={27} style={{ marginRight: 10 }} /> */}
                      </span>
                      {reports.registrationNumber}
                    </CTableDataCell>
                    {/* <CTableDataCell className="drivertablerows">20.811 mi</CTableDataCell> */}
                    <CTableDataCell className="drivertablerows">
                      {reports.make}
                    </CTableDataCell>
                    <CTableDataCell className="drivertablerows">
                      {reports.model}
                    </CTableDataCell>
                    <CTableDataCell className="drivertablerows" style={{ width: 150 }}>
                      {/* <span>{moment(user.registered_at).format('DD-MM-yyyy')}</span> */}
                    </CTableDataCell>
                    <CTableDataCell className="drivertablerows" style={{ width: 150 }}>
                      <span>{moment(reports.registered_at).format('DD-MM-yyyy')}</span>
                      {/* <span>{moment(user.license_expire_date).format('DD-MM-yyyy')}</span> */}
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              ))}
            </CTable>
            {
              reportsData.length === 0 ? (showDownload && <CSVLink className="AddUserBtn_btn download-btn pop-up-download" onClick={() => {
                //show error that no data found to download
                showError();
                return false; // 👍🏻 Your click handling logic
              }} filename={"Reports"} data={reportsData}>Download Report</CSVLink>)
                :
                showDownload && <CSVLink className="AddUserBtn_btn download-btn pop-up-download" filename={"Reports"} data={reportsData}>Download Report</CSVLink>
            }

            {/* <div className="driverpagination">
        <TablePagination
          component="div"
          count={reportData.length}
          page={currentPage - 1}
          onPageChange={handlePageChange}
          rowsPerPage={reportsPerPage}
          rowsPerPageOptions={[]}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div> */}



          </div>
        </div>
      </div>

    </>
  )
}
export default ShowReports
