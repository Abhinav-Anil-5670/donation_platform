import React from "react";
import image from "../assets/she-YlenJon1O7ieeEoa.avif";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonWrapper from '../Routes/ButtonWrapper'

const Nav = () => {
  const Navigate = useNavigate()
  return (
    <div className="flex justify-between items-center py-2 sm:py-5 px-9 ">
      <img onClick={()=>Navigate('/')}
        src={image}
        className="h-10 w-auto object-contain max-w-[150px] sm:h-12 md:h-14"
        alt=""
      />
      <div className="flex gap-2">
        <ButtonWrapper>
          <NavLink
          to="/signup"
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95"
        >
          SignUp
        </NavLink>

        <NavLink
          to="/Login"
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg active:scale-95"
        >
          Login
        </NavLink>
        </ButtonWrapper>
      </div>
    </div>
  );
};

export default Nav;
