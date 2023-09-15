/* eslint-disable */
import axios from 'axios'
// const url = 'https://webfleet-backend.sincprojects.com'
const url = 'http://localhost:8010'

export const addVehicle = async (user) => {
    try {
      return await axios.post(`${url}/addVehicle`, user)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }
  
  export const VehicleDetails = async () => {
      try {
        return await axios.get(`${url}/vehicleManagement`)
      } catch (err) {
        console.log(err, 'err in react api')
      }
    }
  
    //for delete vehicle
    export const vehicleDelete = async (ID) => {
      try {
        return await axios.delete(`${url}/vehicleDelete/${ID}`)
      } catch (err) {
        console.log(err, 'err in react api')
      }
    }
  
    //for single user
  export const vehicleEdit = async (ID) => {
    try {
      return await axios.get(`${url}/vehicleUpdateId/${ID}`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }
  
  export const vehicleEditId = async(user) => {
    try{
        return await axios.put(`${url}/vehicleUpdatetruck`,user)
    }
    catch(err){
        console.log(err,'err in react api');
    }
  }
  
  export const DriverAssignment = async(data) => {
    try{
        return await axios.post(`${url}/DriverAssignment`,data)
    }
    catch(err){
        console.log(err,'err in react api');
    }
  }

  export const DriverUnassigned = async(data) => {
    try{
        return await axios.post(`${url}/DriverUnassigned`,data)
    }
    catch(err){
        console.log(err,'err in react api');
    }
  }

  export const SubmitNewTripRequest = async(data) => {
    try{
        return await axios.post(`${url}/submit-trip-request`,data)
    }
    catch(err){
        console.log(err,'err in react api');
    }
  }
  
  export const maintenanceVehicleDelete = async (ID) => {
    try {
      return await axios.post(`${url}/maintenanceVehicleDelete/${ID}`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  export const TripHistoryDataApi = async () => {
    try {
      return await axios.post(`${url}/trip-history`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  export const serviceVehicle = async (ID) => {
    try {
      return await axios.get(`${url}/maintennaceVehicleId/${ID}`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  export const LoadChartDataApi = async (ID) => {
    try {
      return await axios.get(`${url}/load-chart-data`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }
  export const DriverMaintenance = async(data) => {
    try{
        return await axios.post(`${url}/DriverMaintenance`,data)
    }
    catch(err){
        console.log(err,'err in react api');
    }
  }

  export const ServiceUnassignedDriverApi = async (data) => {
    try {
      return await axios.post(`${url}/serviceUnassignedDriverApi/${data}`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  export const LoadTripHistoryData = async (data) => {
    try {
      return await axios.post(`${url}/load-trip-historyData/${data}`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  export const TripHistoryByName = async (selectedDriverName) => {
    try {
      return await axios.get(`${url}/triphistorybyname/${selectedDriverName}`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }
  

  export const EndTripApi = async (id,number) => {
    try {
      return await axios.post(`${url}/end-trip-api`,{id,number})
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  export const getDriverData = async (data) => {
    try {
      return await axios.post(`${url}/getDriverData/${data}`,{timeout:5000})
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  export const LoadDriverDataApi = async () => {
    try {
      return await axios.post(`${url}/LoadDriverDataApi`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  export const LoadAllVehicle = async () => {
    try {
      return await axios.post(`${url}/LoadAllVehicle`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }
  // assigned vehicle details for driver-dashboard
  export const VehicleDetailsForDriver = async (userName) => {
    try {
      return await axios.get(`${url}/assigned-vehicle/${userName}`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  // for garage
  export const garageDetails = async () => {
    try {
      return await axios.get(`${url}/garageList`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  // find garage by postcode
  export const findGarage = async (postcode) => {
    try {
      return await axios.post(`${url}/findGarage`,{postcode})
    } catch (err) {
      console.log(err, 'err in react api');
    }
  }

  export const LoadNotification = async (userName) => {
    try {
      return await axios.get(`${url}/notification-count`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }
  export const DvlaRegisterNumber = async (data) => {
    try {
      return await axios.post(`${url}/DvlaRegisterNumber/${data}`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  export const addGarage = async (data) => {
    try {
      return await axios.post(`${url}/addGarage`,data)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  export const CheckDeviceIdent = async (data) => {
    try {
      return await axios.post(`${url}/CheckDeviceIdent/${data}`)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }

  
  export const DeleteTheLicenseImage = async (data) => {
    try {
      return await axios.post(`${url}/license-img-delete`,data)
    } catch (err) {
      console.log(err, 'err in react api')
    }
  }