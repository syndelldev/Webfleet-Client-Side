/* eslint-disable */
import React, { useState } from 'react'
import Papa from 'papaparse'
import sliderimage from '../../assets/images/Rectangle 22720 (1).png'


function Conformuplord(props) {
  const [state, setstate] = useState()
  const [validation, setValidation] = useState(false)
  let height = props.height;

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
  const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = []
        const valuesArray = []
   
        setstate(results.data)
      },
    })
  }
  return (
    <div className="editcontentupload" style={{ backgroundColor:'#fff',height: `${height}px`  }}>
      <div className="offersEditconfoBox">
    
            <div className='offerhadding'>Lorem Ipsum is simply<i onClick={recanshel} class="fa fa-times-circle" aria-hidden="true"></i></div>
            <div className='d-grid' style={{ justifyItems:'center',width:'97%',margin:'auto' }}> <img src={sliderimage} style={{ width:'100%'  }}/></div>
             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
             <button>Go to Offer</button>
      
        <div className="">
          {/* <button className="editSubmitdriver" onClick={recanshel}>
            Cancel
          </button> */}
          {/* <button className="editSubmitdriver" onClick={registr}>
            OK
          </button> */}
        </div>
      </div>
    </div>
  )
}
export default Conformuplord