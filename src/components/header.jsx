import React from 'react'
import TopBanner from './TopBanner'
import { CiMenuBurger } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";

const header = () => {
  return (
    <header>
      <TopBanner text={'Welcome Friends'}/>
      <div className='header' >
        <div className='menubtn'><CiMenuBurger /></div>
        <h1>BleakeStore</h1>
        <div className='icons'>
          <CiUser />
          <CiShoppingCart />
        </div>
      </div>
    </header>
  )
}

export default header