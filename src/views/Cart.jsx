import React from 'react'

const Cart = ({handler}) => {
  return (
    <div className='sidecart'>
      <button onClick={handler} className='close' >X</button>
    </div>
  )
}

export default Cart