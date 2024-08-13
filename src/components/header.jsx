import React from 'react'
import TopBanner from './TopBanner'
import { CiMenuBurger } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Header = ({loginHandler, menuHandler, cartHandler}) => {

  return (
    <header>
      <div className='header' >
        <button className='menubtn' onClick={menuHandler} ><CiMenuBurger /></button>
        <Link to={"/"} ><h1>BleakeStore</h1></Link>
        <div className='icons'>
          <button className='iconbutton' onClick={loginHandler} ><CiUser /></button>
          <button className='iconbutton' onClick={cartHandler} ><CiShoppingCart /></button>
        </div>
      </div>
    </header>
  )
}

export default Header