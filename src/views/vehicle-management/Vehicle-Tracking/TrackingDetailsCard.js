/* eslint-disable */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TrackingDetailsCard = (props) => {
    const DetailsCardData = props.data
    const [ LocationName, setLocationName ] = useState('')
    let Time = new Date()

    console.log(Time,"time")

    useEffect(()=>{
        if(DetailsCardData['position.latitude']){
            GetLocationName()
        }
      

    },[DetailsCardData])



    const GetLocationName = () => {
        // Send a request to the Nominatim API
        let startLatitude = DetailsCardData['position.latitude'] ;
        let startLongitude = DetailsCardData['position.longitude'];
        axios
          .get(`https://nominatim.openstreetmap.org/reverse?lat=${startLatitude}&lon=${startLongitude}&format=json`)
          .then((response) => {
            const data = response.data;
            if (data.display_name) {
              const locationName = data.address.road;
              setLocationName(locationName)
              // Now you have the location name, you can use or store it as needed
            //   console.log('Location Name:', locationName);
            } else {
              // Handle the case where no location name is found
            //   console.error('Location name not found.');
            }
          })
          .catch((error) => {
            // Handle any errors that occur during the API request
            // console.error('Error fetching location:', error);
          });
      };
      
    const handle = () => {
        props.onclick(false)
    }
    return (<div className='TrackingDetailsCard_div'>
        <span className='TrackingDetailsCard_close_btn' onClick={() => { handle() }}>X</span>

        {/* {DetailsCardData.length > 0 ? <> */}
        <div className='TrackingDetailsCard_header'></div>

        <div className="TrackingDetailsCard_table">
            <table>
                <tr>
                    <td className='TrackingDetailsCard_table_data'>Speed</td>
                    <td className='TrackingDetailsCard_table_api_data'>
  {DetailsCardData ? DetailsCardData['position.speed'] : 'NA'}
</td>

                </tr>
                <tr>
                    <td className='TrackingDetailsCard_table_data'>Status</td>
                    <td className='TrackingDetailsCard_table_api_data'>
  {DetailsCardData['position.speed'] == 0
    ? 'Parked'
    : DetailsCardData['position.speed']
      ? 'On Going'
      : 'NA'}
</td>

                </tr>
                <tr>
                    <td className='TrackingDetailsCard_table_data'>Altitude</td>
                    <td className='TrackingDetailsCard_table_api_data'>
                        NA</td>
                </tr>
                <tr>
                    <td className='TrackingDetailsCard_table_data'>Time</td>
          
                    <td className='TrackingDetailsCard_table_api_data'> NA </td>
                </tr>
                <tr>
                    <td className='TrackingDetailsCard_table_data'>Odometer</td>
                    <td className='TrackingDetailsCard_table_api_data'> NA </td>
                </tr>
                <tr>
                    <td className='TrackingDetailsCard_table_data'>Location</td>
                 
                    <td className='TrackingDetailsCard_table_api_data'>
  {LocationName ? LocationName : 'NA'}
</td>
 
                </tr>
                <tr>
                    <td className='TrackingDetailsCard_table_data'>Latitude</td>
                    <td className='TrackingDetailsCard_table_api_data'>
                    {DetailsCardData['position.latitude'] ? DetailsCardData['position.latitude'] : 'NA'} 
                        </td>
                </tr>
                <tr>
                    <td className='TrackingDetailsCard_table_data'>Longitude</td>
                    <td className='TrackingDetailsCard_table_api_data'>
                    {DetailsCardData['position.longitude'] ? DetailsCardData['position.longitude'] : 'NA'}  
                        </td>
                </tr>
                <tr>
                    <td className='TrackingDetailsCard_table_data'>Fuel</td>
                    <td className='TrackingDetailsCard_table_api_data'> NA </td>
                </tr>
            </table>
        </div>
        {/* </>:<>Loading . . . </>} */}
    </div>

    )
}

export default TrackingDetailsCard
