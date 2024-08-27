import React from 'react'
import Error from '../../../assets/404.svg'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div className='window notaccess' >
      <img src={Error} alt="Acceso denegado" className='noticon' />
      <h1 className='failtitle' >Acceso denegado</h1>
      <Link to={'/'} ><button className='failbtn' >Volver al inicio</button></Link>
    </div>
  )
}

export default Unauthorized