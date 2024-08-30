import React, { useContext } from 'react'
import { CartContext } from '../../../contexts/CartContext'; 
import { CiTrash } from 'react-icons/ci';

const Cart = ({handler}) => {

  const { cart, setCart } = useContext(CartContext);

  return (
    <form className='sidecart'>
      <div className='cartheader' >
        <h2 className='CartTitle'>Tu Carrito</h2>
        <button onClick={handler} className='close' >X</button>
      </div>
      <div className='cartitems' >
        {
          cart.map((item, index) => {
              return(
                <div className='cartitem' >
                  <img className='itemimage' src={item.image} alt="" />
                  <div className='iteminfo' >
                    <h2 className='itemtitle' >{item.title}</h2>
                    <h2 className='itemprice' >${item.price}</h2>
                  </div>
                  <button className='delbtn' >
                    <CiTrash/>
                  </button>
                </div>
              )
          })
        }
      </div>
      <div className='cartbtns' >
        <button className='subtn cart' >Limpiar carrito</button>
        <input className='subtn cart' type="submit" value="Comprar" />
      </div>
    </form>
  )
}

export default Cart