import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../Pages/Login'
import TextImageMask from '../Components/TextImageMask'
import SignUp from '../Pages/SignUp'
import Dashboard from '../Components/Dashboard'
import AuthWrapper from './AuthWrapper'
import UnAuthWrapper from './UnAuthWrapper'
import DonationForm from '../Pages/DonationForm'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<UnAuthWrapper><TextImageMask/></UnAuthWrapper>}/>
        <Route path='/login' element={<UnAuthWrapper><Login/></UnAuthWrapper>}/>
        <Route path='/signup' element={<UnAuthWrapper><SignUp/></UnAuthWrapper>}/>
        <Route path='/dashboard' element={<AuthWrapper><Dashboard/></AuthWrapper>}/>
        <Route path='/donation' element={<UnAuthWrapper><DonationForm/></UnAuthWrapper>}/>
    </Routes>
  )
}

export default MainRoutes