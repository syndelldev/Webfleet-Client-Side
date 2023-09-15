/* eslint-disable prettier/prettier */


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarShow: true,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    set: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { set } = sidebarSlice.actions;
export default sidebarSlice.reducer;

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