import { createSlice } from "@reduxjs/toolkit";



const appointmentSlice = createSlice({
    name:'Login',
    initialState:{},
    reducers:{
        addData(state,action){
            state.max_hour = action.payload.MAX_HOUR;
            state.min_hour = action.payload.MIN_HOUR;
            delete action.payload.MAX_HOUR;
            delete action.payload.MIN_HOUR;
            state.items = Object.values(action.payload);
        }
    }
})

export const {addData} = appointmentSlice.actions;
export default appointmentSlice.reducer;