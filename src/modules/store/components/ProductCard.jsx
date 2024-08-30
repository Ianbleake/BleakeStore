import React, { useContext, useState } from 'react';
import { CiShoppingCart } from 'react-icons/ci';
import { CartContext } from '../../../contexts/CartContext';


const ProductCard = ({ id, name, srcimg, price,addToCart }) => {

  const {setShowCart} = useContext(CartContext);
  
  const handleClick = ()=> {
    addToCart();
    setShowCart(true);
  }

  return (
    <div className="card" key={id} id={`product-${id}`}>
      <div className="card-img">
        <img src={srcimg} alt={name} className='img' />
      </div>
      <div className="card-title">{name}</div>
      <hr className="card-divider"/>
      <div className="card-footer">
        <div className="card-price"><span>$</span>{price}</div>
        <button className="card-btn" onClick={handleClick}>
          <CiShoppingCart></CiShoppingCart>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
