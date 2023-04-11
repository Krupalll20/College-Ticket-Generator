import React from 'react'
import { Route, Routes } from "react-router-dom"
import AddQuery from "./components/AddQuery.js"
import Register from "./components/Register.js"
import Login from "./components/Login"
import Home from "./components/Home.js"
import Error from "./components/Error.js"
import UserDisplay from "./components/UserDisplay.js"
import AdminDisplay from "./components/AdminDisplay.js"

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/userDisplay' element={<UserDisplay />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addQuery' element={<AddQuery />} />
        <Route path='/adminDisplay' element={<AdminDisplay />} />
        <Route path='/register' element={<Register />} />
        <Route path='/*' element={<Error />} />

      </Routes>
    </>
  )
}

export default App
