import React from 'react'
import { Link } from 'react-router-dom'

const TopBanner = ({text, route}) => {
  return (
    <Link to={route} ><div className='TopBanner' ><span className='TopText' >{text}</span></div></Link>
  )
}

export default TopBanner