import { configureStore } from "@reduxjs/toolkit";
import appointmentSlice from "../reducer/appointmentSlice";
import loginSlice from "../reducer/loginSlice";

const store = configureStore({
    reducer:{
        Login:loginSlice,
        Appointment:appointmentSlice
    }
})

export default store;