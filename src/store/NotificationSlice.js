/* eslint-disable prettier/prettier */
const { createSlice } = require("@reduxjs/toolkit");

// const initialState = {
//     count: 0,
// };

const initialState = []

const NotificationSlice = createSlice (
    {
        name: 'notification',
        initialState,
        reducers: {
            add(state, action){ 
                state.push(action.payload);
                // state.count += action.payload;
            }, 
            remove(state, action) {
                // return state.filter(item => item.id !== action.payload)
                const idToRemove = action.payload;
                return state.filter(item => item.id !== idToRemove);
            }
        }

    }
)

export const {add, remove} = NotificationSlice.actions;
export default NotificationSlice.reducer;