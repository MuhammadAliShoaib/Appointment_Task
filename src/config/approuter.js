import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Appointment from '../pages/appointment'
import Login from '../pages/form/login'
import ProtectedRoute from './components/ProtectedRoute'


//routes defined of our app
export default function AppRouter() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/appointment" element={<ProtectedRoute Component={Appointment}/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}
