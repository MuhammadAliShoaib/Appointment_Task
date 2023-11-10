import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Appointment from '../pages/appointment'
import Login from '../pages/form/login'

export default function AppRouter() {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/appointment" element={<Appointment/>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}
