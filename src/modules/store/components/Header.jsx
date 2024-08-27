import React from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const Header = ({loginHandler, menuHandler, cartHandler}) => {

  const { user } = useAuth();

  return (
    <header>
      <div className='header' >
        <button className='menubtn' onClick={menuHandler} ><CiMenuBurger /></button>
        <Link to={"/"} ><h1>BleakeStore</h1></Link>
        <div className='icons'>
          {user ? <Link><CiUser /></Link> : <button className='iconbutton' onClick={loginHandler} ><CiUser /></button> }     
          <button className='iconbutton' onClick={cartHandler} ><CiShoppingCart /></button>
        </div>
      </div>
    </header>
  )
}

export default Header