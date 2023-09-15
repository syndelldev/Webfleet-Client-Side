/* eslint-disable prettier/prettier */

import { configureStore } from "@reduxjs/toolkit";
import NotificationSlice from "./NotificationSlice";
import sidebarSlice from "./SidebarSlice";

const store = configureStore ({
    reducer :{
        sidebar: sidebarSlice,    
        notification: NotificationSlice 
    }
})

export default store;

// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store



