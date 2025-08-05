import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";


import {
  clearUser,
} from "../store/reducers/userSlice";

const ButtonWrapper = (props) => {
    const {isAuthenticated} = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    
    const handlelogout = async ()=>{
      try{
        await signOut(auth);
        dispatch(clearUser());
        Navigate('/')
      }
      catch(err){
        console.log(er)
      }
    }
  return !isAuthenticated? props.children : <button
          onClick={handlelogout}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95"
        >
          Logout
        </button>
}

export default ButtonWrapper