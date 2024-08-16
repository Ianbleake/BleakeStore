import React from 'react'

export const CreateProduct = () => {
  return (
    <form action="" className='form'>
      <h2 className='headertitle' >CREAR PRODUCTO</h2>
      <div className='inputs'>
        <input className='inpt' type="text" placeholder='Nombre' required />
        <input className='inpt' type="text" placeholder='Precio' required />
        <input className='inpt' type="text" placeholder='Stock' required />
        <input className='inpt' type="text" placeholder='Categoria' required />
        <input className='inpt' type="text" placeholder='Descripcion' required />
        <input className='inpt' type="text" placeholder='SKU' required />
        <input className='inpt' type="text" placeholder='Stock' required />
        <input className='inpt' type="text" placeholder='Imagen' required />
        <input type="submit" className='subtn' value="CREAR" />
      </div>
    </form>
  )
}
