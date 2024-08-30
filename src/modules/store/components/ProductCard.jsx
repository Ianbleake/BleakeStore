import React from 'react';
import { CiShoppingCart } from 'react-icons/ci';


const ProductCard = ({ id, name, srcimg, price,handler }) => {

  return (
    <div className="card" key={id} id={`product-${id}`}>
      <div className="card-img">
        <img src={srcimg} alt={name} className='img' />
      </div>
      <div className="card-title">{name}</div>
      <hr className="card-divider"/>
      <div className="card-footer">
        <div className="card-price"><span>$</span>{price}</div>
        <button className="card-btn" onClick={handler}>
          <CiShoppingCart></CiShoppingCart>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
