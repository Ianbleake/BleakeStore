import { CiTrash } from 'react-icons/ci';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../contexts/CartContext';
import { useNotificacion } from '../../../contexts/NotificationContext';
import { useAuth } from '../../../contexts/AuthContext'; // Importa el hook useAuth

const Cart = ({ handler }) => {
  const { setNotificacion } = useNotificacion();
  const { cart, setCart } = useContext(CartContext);
  const { isAuthenticated } = useAuth(); // Usa el hook useAuth para acceder a la autenticación
  const navigate = useNavigate(); 

  const clearCart = (event) => {
    event.preventDefault();
    setCart([]);
    localStorage.setItem('cart', []);
    setNotificacion({
      role: 'success',
      message: `Carrito vaciado`,
      show: true,
    });
    setTimeout(() => {
      setNotificacion((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const removeItem = (event, index) => {
    event.preventDefault();
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    setNotificacion({
      role: 'error',
      message: `Producto eliminado`,
      show: true,
    });
    setTimeout(() => {
      setNotificacion((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (cart.length === 0) {
      setNotificacion({
        role: 'error',
        message: `El carrito está vacío`,
        show: true,
      });
      setTimeout(() => {
        setNotificacion((prev) => ({ ...prev, show: false }));
      }, 3000);
      return;
    }

    if (!isAuthenticated()) { 
      setNotificacion({
        role: 'error',
        message: `Debes iniciar sesión para realizar la compra`,
        show: true,
      });
      setTimeout(() => {
        setNotificacion((prev) => ({ ...prev, show: false }));
      }, 3000);
      navigate('/Login');
      handler();
      return;
    }

    const newOrder = JSON.stringify(cart);
    localStorage.setItem('Order', newOrder);
    setCart([]);
    localStorage.removeItem('cart');
    handler();
    navigate('/checkout');
  };

  return (
    <form className='sidecart' onSubmit={handleSubmit}>
      <div className='cartheader'>
        <h2 className='CartTitle'>Tu Carrito</h2>
        <button onClick={handler} className='close'>X</button>
      </div>
      <div className='cartitems'>
        {cart.map((item, index) => {
          return (
            <div key={index} className='cartitem'>
              <img className='itemimage' src={item.image} alt={item.title} />
              <div className='iteminfo'>
                <h2 className='itemtitle'>{item.title}</h2>
                <h2 className='itemprice'>${item.price}</h2>
              </div>
              <button className='delbtn' onClick={(event) => removeItem(event, index)}>
                <CiTrash />
              </button>
            </div>
          );
        })}
      </div>
      <div className='cartbtns'>
        <button className='subtn cartbtn' onClick={clearCart}>Limpiar</button>
        <input className='subtn cartbtn' type="submit" value="Comprar" />
      </div>
    </form>
  );
};

export default Cart;
