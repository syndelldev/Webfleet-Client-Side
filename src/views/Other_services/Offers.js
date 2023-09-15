/* eslint-disable */
import React, { useEffect, useState } from 'react'
import logoimages from '../../assets/images/avatars/logo1.ico'
import sliderimage from '../../assets/images/Rectangle 22720.png'
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import { UserDetails } from '../api/api'
import Conformpopup from './Conformpopus.js'
import moment from 'moment'
import { CForm, CCol, CFormInput, CFormSelect, CFormCheck, CButton } from '@coreui/react'



function Offers(props) {
  const [loading, setLoading] = useState(false)
  const [conformuplord, setConformUplord] = useState(false)

  
  let height = document.documentElement.scrollHeight;

  
  const displayshow = () =>{
      setConformUplord(true)
    }
    
    const getuplordver = (boolian) => {
      setConformUplord(boolian)
    }
 
    

 

 

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"> </div>
          <img src={logoimages} style={{ width: 60, height: 60 }} />
        </div>
      ) : (
        <div>
            <div className='offerRowbox'>
                <div className='offerrowbox'>
                    <div className='boxhaddingcontetn'>Lorem Ipsum is simply</div>
                    <img  src={sliderimage}/>
                    <p className='offerboxdetails'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <button onClick={displayshow}>View Offer</button>
                </div>
                <div className='offerrowbox'>
                    <div className='boxhaddingcontetn'>Lorem Ipsum is simply</div>
                    <img  src={sliderimage}/>
                    <p className='offerboxdetails'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <button onClick={displayshow}>View Offer</button>
                </div>
                <div className='offerrowbox'>
                    <div className='boxhaddingcontetn'>Lorem Ipsum is simply</div>
                    <img  src={sliderimage}/>
                    <p className='offerboxdetails'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <button onClick={displayshow}>View Offer</button>
                </div>
                <div className='offerrowbox'>
                    <div className='boxhaddingcontetn'>Lorem Ipsum is simply</div>
                    <img  src={sliderimage}/>
                    <p className='offerboxdetails'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <button onClick={displayshow}>View Offer</button>
                </div>

            </div>
            <div className='offerRowbox'>
                <div className='offerrowbox'>
                    <div className='boxhaddingcontetn'>Lorem Ipsum is simply</div>
                    <img  src={sliderimage}/>
                    <p className='offerboxdetails'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <button onClick={displayshow}>View Offer</button>
                </div>
                <div className='offerrowbox'>
                    <div className='boxhaddingcontetn'>Lorem Ipsum is simply</div>
                    <img  src={sliderimage}/>
                    <p className='offerboxdetails'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <button onClick={displayshow}>View Offer</button>
                </div>
                <div className='offerrowbox'>
                    <div className='boxhaddingcontetn'>Lorem Ipsum is simply</div>
                    <img  src={sliderimage}/>
                    <p className='offerboxdetails'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <button onClick={displayshow}>View Offer</button>
                </div>
                <div className='offerrowbox'>
                    <div className='boxhaddingcontetn'>Lorem Ipsum is simply</div>
                    <img  src={sliderimage}/>
                    <p className='offerboxdetails'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <button onClick={displayshow}>View Offer</button>
                </div>

            </div>
              
              
          
        </div>
      )}
          {conformuplord && <Conformpopup  height={height} onClick={getuplordver} />}
    </div>

  )
}

export default Offers;