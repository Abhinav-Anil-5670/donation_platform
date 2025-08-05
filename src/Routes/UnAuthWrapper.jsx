import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const UnAuthWrapper = (props) => {
    const {isAuthenticated} = useSelector((state)=>state.user)
  return !isAuthenticated? props.children : <Navigate to='/dashboard' />
}

export default UnAuthWrapper