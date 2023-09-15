/* eslint-disable */
import { CTable, CBadge, CCol, CForm, CFormLabel, CButton, CFormInput, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CHeader } from '@coreui/react';
// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Await, useNavigate, useParams } from 'react-router-dom';

import Management from '../../../assets/images/upload.svg'


// const url = "http://localhost:8010";


const Disposed = (props) => {
  const { VehicleData } = props
  const [userDetails, setuserDetails] = useState([])
  const [userSingleData, setuserSingleData] = useState([])
  const [fileUploard, setFileUploard] = useState()
  const [searchapiData, setSearchapiData] = useState([])
  const [conPopups, setConPopups] = useState(false)
  const [Popup, setpopup] = useState(false)
  const [popupEdit, setpopupEdit] = useState(false)
  const [visible, setVisible] = useState(false)
  const [editdriver, setEditdriver] = useState(false)
  const [ DeleteUserId , setDeletUser ] = useState('')
  const [visibleUpload, setVisibleUpload] = useState(false)
  const [driveesingledata, setDriveeSingleData] = useState([])
  const [role, setrole] = useState(true)
  let height = document.documentElement.scrollHeight;
  const [array, setArray] = useState([]);
  const fileReader = new FileReader();
  const navigate = useNavigate()

  const getuplordver = (boolian) => {
    setConformUplord(boolian)
  }
  //for popup edit window
  const getBoolianVar = (boolian) => {
    setConPopups(boolian)
  }

  //to pass selected user id
  const editUser = async (ID) => {
    setConPopups(true)
    setuserSingleData(ID)
  }



  // filtervehicle-------------------------------
  const [user, setuser] = useState()

const onValueChange = (e) => {
  setuser({ ...user, [e.target.name]: e.target.value })
}


const filterResult = VehicleData.filter((item) => item.status === 'Disposed')

  //for delete user
  const deletevehicalid = async () => {
 
    await vehicleDelete(DeleteUserId)
      .then((res) => {
        if (res.data === 'deleted') {
          setVisible(!visible)
     
         LoadUserDetails()
        }
        else {
          setDeletePopup(true)
       
        }
      })

  }

//delete popup
const DeletePopUp = (ID) => {
  setVisible(!visible)
  setDeletUser(ID)
}

  //Save file
  const saveFile = (e) => {
    setFileUploard(e.target.files[0]);
  };

  const popEdit = () => {
    setpopupEdit(true)
  }

    //csv file convert
    const csvFileToArray = string => {
      const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
  
      const array = csvRows.map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object, header, index) => {
          object[header] = values[index];
          return object;
        }, {});
        return obj;
      });
  
      setArray(array);
    };
//conform upload
const handleOnSubmit = (e) => {
  e.preventDefault();

  if (fileUploard) {
    fileReader.onload = function (event) {
      const text = event.target.result;
      csvFileToArray(text);
    };

    fileReader.readAsText(fileUploard);
  }
};

  //to navigate at add user components
  const onaddVehicle = () => {
    navigate('/vehicle-management/vehicle-add')
 
  }

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div className='div_userDetails'>
        <CForm className=" row g-3 w-100">


<CCol xs="auto" className='w-100'>
<CTableDataCell className='badgecontent ps-5'><CBadge className='badge_styles'><div className='orangeradius'></div></CBadge></CTableDataCell>
      {/* <h1 className='hh ms-2'>Disposed</h1> */}
      <h1 className='hh ms-2'>Disposed</h1>
</CCol>

</CForm>
       
      <div className='user_middle_function'>
      </div >
      <div className='allUserTable' style={{ overflowX: 'auto' }}>
        <CTable className='alluserCtable' style={{ tableLayout: 'fixed' }}>
          <CTableHead>
            <CTableRow>

              <CTableHeaderCell className='tablecell user_tableHead ps-5' style={{ width: 160 }}>Registration No</CTableHeaderCell>
              <CTableHeaderCell className='tablecell tablecell_id user_tableHead ps-3'>Year</CTableHeaderCell>
              <CTableHeaderCell className='tablecell user_tableHead'>Make</CTableHeaderCell>
              <CTableHeaderCell className='tablecell user_tableHead'>Model</CTableHeaderCell>
              <CTableHeaderCell className='tablecell user_tableHead'>VIN</CTableHeaderCell>
              <CTableHeaderCell className='tablecell user_tableHead'>Status</CTableHeaderCell>
              <CTableHeaderCell className='tablecell user_tableHead'>Type</CTableHeaderCell>
              <CTableHeaderCell className='tablecell user_tableHead'>Group</CTableHeaderCell>
              <CTableHeaderCell className='tablecell user_tableHead'>Current Meter</CTableHeaderCell>
              <CTableHeaderCell className='tablecellvehicle user_tableHead'>Driver Name</CTableHeaderCell>
  
            </CTableRow>
          </CTableHead>
          {filterResult.map((user,index) => (
            <CTableBody key={index}>
              <CTableRow className='vehicaletable'>
                <CTableDataCell className="tablecell ps-5">
                  {/* <span>
                    <img src={avatar} height={33} width={36} style={{ borderRadius:5 }} className="editavatar" />
                  </span> */}
                  {user.registrationNumber}
                </CTableDataCell>
                {/* <CTableDataCell className="tablecell">{user.vehicle_registration_number}</CTableDataCell> */}
                <CTableDataCell className="tablecell ps-3">{user.year}</CTableDataCell>
                <CTableDataCell className="tablecell">{user.make}</CTableDataCell>
                <CTableDataCell className="tablecell">{user.model}</CTableDataCell>
                <CTableDataCell className="tablecell">
                  {/* {user.user_national_insurance_number} */}JTDKBRFU9J30593O7
                </CTableDataCell>
                <CTableDataCell className="tablecell">{user.status}</CTableDataCell>
                <CTableDataCell className="tablecell">{user.type} </CTableDataCell>
                <CTableDataCell className="tablecell">{user.group_vehicle}</CTableDataCell>
                <CTableDataCell className="tablecell">{user.current_mater}</CTableDataCell>
                <CTableDataCell className="tablecell tablecellvehicle ps-2" style={{ width:280 }}>
                <span>
                    {/* <img src={drivermod} height={33} width={36} style={{ borderRadius:5 }} className="editavatar" /> */}
                  </span>
                  {/* {user.operator} */}Jacob Silva</CTableDataCell>
                

                <CTableDataCell  className='vihicaleditcontent'>
                <button onClick={() => setVisibleUpload(!visibleUpload)} className='vehicleEditBtn'>  <img src={Management} height={20} />      
                </button>
                    <button onClick={() => { editUser(user.id) }} className='vehicleEditBtn'><i className="fas fa-edit" width={15}></i></button>
                    <button onClick={() => { DeletePopUp(user.id) }} className='vehicleEditBtn '><i className="fa-solid fa-trash-can" width={15}></i></button>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          ))}
        </CTable>
      </div>
      {/* <div className="driverpagination">
        <TablePagination
          component="div"
          count={1}
          page={100}
          onPageChange={''}
          rowsPerPage={''}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div> */}

      {/* {conformPopup && <Conformpopup data={userSingleData} onClick={getBoolianVar} />}
      {conformuplord && <Conformuplord onClick={getuplordver} />} */}
    </div>

  )

}

export default Disposed