import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      
    </div>
  )
}

export default App
