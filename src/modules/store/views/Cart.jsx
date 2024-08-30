import React, { useContext } from 'react'
import { CartContext } from '../../../contexts/CartContext'; 
import { CiTrash } from 'react-icons/ci';

const Cart = ({handler}) => {

  const { cart, setCart } = useContext(CartContext);

  const clearCart = (event)=>{
    event.preventDefault();
    setCart([]);
    localStorage.clear();
  }

  const removeItem = (event, index) => {
    event.preventDefault(); // Evita el envío del formulario
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  } 

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
                <div key={index} className='cartitem' >
                  <img className='itemimage' src={item.image} alt="" />
                  <div className='iteminfo' >
                    <h2 className='itemtitle' >{item.title}</h2>
                    <h2 className='itemprice' >${item.price}</h2>
                  </div>
                  <button className='delbtn' onClick={(event) => removeItem(event, index)} >
                    <CiTrash/>
                  </button>
                </div>
              )
          })
        }
      </div>
      <div className='cartbtns' >
        <button className='subtn cartbtn' onClick={clearCart} >Limpiar</button>
        <input className='subtn cartbtn' type="submit" value="Comprar" />
      </div>
    </form>
  )
}

export default Cart
