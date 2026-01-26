import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<AdminDashboard />} />
      </Routes>
      
    </div>
  )
}

export default App
