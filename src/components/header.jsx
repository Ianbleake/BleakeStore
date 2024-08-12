import React from 'react'
import TopBanner from './TopBanner'
import { CiMenuBurger } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

const Header = ({loginHandler, menuHandler, cartHandler}) => {

  return (
    <header>
      <TopBanner text={'Welcome Friends'}/>
      <div className='header' >
        <button className='menubtn' onClick={menuHandler} ><CiMenuBurger /></button>
        <h1>BleakeStore</h1>
        <div className='icons'>
          <button className='iconbutton' onClick={loginHandler} ><CiUser /></button>
          <button className='iconbutton' onClick={cartHandler} ><CiShoppingCart /></button>
        </div>
      </div>
    </header>
  )
}

export default Header