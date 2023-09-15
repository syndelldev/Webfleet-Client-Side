/* eslint-disable */
import axios from 'axios'
const url = 'http://13.43.59.115:8010'
// const url = 'http://localhost:8010'

//for lovin auth
export const loginAuth = async (user) => {
  try {
    return await axios.post(`${url}/loginAuth`, user)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//for register user
export const RegisterUser = async (user) => {
  try {
    return await axios.post(`${url}/registerUser`, user)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to ger user details
export const UserDetails = async () => {
  try {
    return await axios.get(`${url}/userDetails`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to ger user details
export const UsernameDropDownN = async (name) => {
  try {
    console.log(name, 'in api email')
    return await axios.post(`${url}/UsernameDropDownN`, name)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
//for single user
export const userEdit = async (ID) => {
  try {
    return await axios.get(`${url}/userDetails/${ID}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//for update user
export const userEditId = async (user) => {
  try {
    return await axios.put(`${url}/userDetailsUpdate`, user)
  } catch (err) {
    console.log(err, 'err in user update react api')
  }
}

//for delete user
export const userDelete = async (ID) => {
  try {
    return await axios.delete(`${url}/userDelete/${ID}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//for get drivers
export const allDrivers = async () => {
  try {
    return await axios.get(`${url}/allDrivers`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

export const addDriver = async (user) => {
  try {
    return await axios.post(`${url}/addDriver`, user)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

export const driverDetails = async () => {
  try {
    return await axios.get(`${url}/driverList`)
  } catch (err) {
    console.log(err, 'err in react driver list frontend api')
  }
}
//for single driver
export const driverEdit = async (ID) => {
  try {
    return await axios.get(`${url}/driverUpdate/${ID}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
//for delete user
export const driverDelete = async (ID) => {
  try {
    return await axios.delete(`${url}/driverDelete/${ID}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
//for update driver

export const driverEditId = async (user) => {
  try {
    return await axios.put(`${url}/driverEditId`, user)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//for upload data
export const uploadDocs = async (data, id) => {
  try {
    return await axios.post(`${url}/upload/${id}`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//for uploading file
export const UploadFile = async (data) => {
  try {
    return await axios.post(`${url}/userUpload`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
//check user exits or not in forgot password
export const userExist = async (user) => {
  try {
    return await axios.post(`${url}/forgotpassword`, user)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//check whether user is authentic or not to update password
export const authUser = async (credData) => {
  try {
    return await axios.post(`${url}/confirmuser`, credData)
  } catch (error) {}
}

//To send mail
export const sendMail = async (user) => {
  try {
    return await axios.get(`${url}/sendmail?user=${user.user_email}`, user)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//to update password
export const forgotPassword = async (user) => {
  try {
    return await axios.get(
      `${url}/updatePassword?ps=${user.user_password}&email=${user.email}`,
      user,
    )
  } catch (error) {}
}

//to fetch report data
export const reportData = async () => {
  try {
    return await axios.post(`${url}/reportdata`)
  } catch (error) {}
}

// to generate reports
export const genReports = async (dataFilter) => {
  try {
    return await axios.post(`${url}/genreports`, dataFilter)
  } catch (error) {}
}

//for load notification
export const getNotification = async (id) => {
  try {
    return await axios.get(`${url}/getNotification/${id}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//for Archive Notification
export const ArchiveNotification = async (id) => {
  try {
    return await axios.post(`${url}/ArchiveNotification/${id}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//for Archive Notification
export const PushNotificationUser = async (msg) => {
  try {
    return await axios.post(`${url}/PushNotificationUser/${msg}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
// for Mark As ReadMsg
export const clearAllMsg = async (id) => {
  try {
    return await axios.post(`${url}/clearAllMsg/${id}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
// for Mark As ReadMsg
export const markAsReadMsg = async (id) => {
  try {
    return await axios.post(`${url}/MarkAsReadMsg/${id}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
export const deleteNotificationId = async (id) => {
  try {
    return await axios.post(`${url}/deleteNotificationId/${id}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
export const GetUserName = async (email) => {
  try {
    return await axios.get(`${url}/GetUserName/${email}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
export const getProfilePicture = async (userName) => {
  try {
    return await axios.get(`${url}/getProfilePicture/${userName}`)
  } catch (err) {
    console.log( 'err in react get profile Pic api', err)
  }
}

//Maintenance
export const addservices = async (data) => {
  try {
    return await axios.post(`${url}/addservices`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

export const maintenancelist = async () => {
  try {
    return await axios.get(`${url}/maintenancelist`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

export const maintennaceUpdateId = async (ID) => {
  try {
    return await axios.get(`${url}/maintennaceUpdateId/${ID}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

export const editmaintennaceVehicle = async (user) => {
  try {
    return await axios.put(`${url}/editmaintennaceVehicle`, user)
  } catch (err) {
    console.log(err, 'err in maintenance update api')
  }
}

export const maintenanceServiceDelete = async (data) => {
  try {
    return await axios.post(`${url}/maintenanceServiceDelete`, data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//delete garage
export const deleteGarage = async (id) => {
  try {
    return await axios.delete(`${url}/deleteGarage/${id}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

//edit garage
export const editGarageId = async (ID) => {
  try {
    return await axios.get(`${url}/editGarageId/${ID}`)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

export const updateGarage = async (user) => {
  try {
    return await axios.put(`${url}/updateGarage`, user)
  } catch (err) {
    console.log(err, 'err in garage update api')
  }
}

export const profileUpload = async (data) => {
  try {
    return await axios.post(`${url}/api/profileUpload`,data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}

export const UploadDriverImage = async (data) => {
  try {
    return await axios.post(`${url}/api/upload-driver-img`,data)
  } catch (err) {
    console.log(err, 'err in react api')
  }
}
