/* eslint-disable */
import React, { useState } from 'react'
import { UploadFile } from '../api/api';

function Conformuplord(props) {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [state, setstate] = useState()
  const [validation, setValidation] = useState(false)
  const registr = () => {
    if (state.length !== 0) {
      props.onClick(state)
      props.onClick(false)
    } else {
      props.onClick(false)
    }
  }
  const recanshel = () => {

    props.onClick(false)
  }

  //onchange save the file with name
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  //upload file
  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append('fileName', fileName);

    await UploadFile(formData)

  }

  return (
    <div className="editcontent">
      <div className="EditconfoBox">
        <div className="editcontenthad">
          {/* <div className="edithade">are you sure you want to upload data</div> */}
          {/* File Uploader */}
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={saveFile}
            style={{ display: 'block', margin: '68px auto', cursor: 'pointer' }}
          />
        </div>
        {validation && (
          <small className="d-block mb-2 red">
            Password must contain minimum eight characters, at least one uppercase letter, one
            lowercase letter, one number and one special character.
          </small>
        )}
        <div className="editBtn">
          <button className="editSubmitBtn" onClick={recanshel}>
            Cancel
          </button>
          <button className="editCloseBtn" onClick={registr}>
            OK
          </button>
        </div>
      </div>
    </div>
  )
}
export default Conformuplord
