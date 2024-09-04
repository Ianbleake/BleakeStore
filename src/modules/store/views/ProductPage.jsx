import React, { Fragment, useContext, useEffect, useState } from 'react'
import Loader from '../components/Loader';
import ProductServices from '../../../Services/Firebase/Stock';
import { useNotificacion } from '../../../contexts/NotificationContext';
import { CartContext } from '../../../contexts/CartContext';

const ProductPage = ({id,showhandler,addToCart}) => {

  const { setNotificacion } = useNotificacion();
  const {setShowCart} = useContext(CartContext);
  const [prodninfo,setProdinfo] = useState(null);

  useEffect(() => {
    ProductServices.getById(id)
      .then(response =>{
        setProdinfo(response);
      })
      .catch(error =>{
        setNotificacion({
          role: 'error', 
          message: `Ocurrio un error: ${error}`,
          show: true,
        });

         setTimeout(() => {
           setNotificacion((prev) => ({ ...prev, show: false }));
         }, 3000);
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = ()=> {
    addToCart(prodninfo.id,prodninfo.title,prodninfo.image,prodninfo.price);
    setShowCart(true);
  }

  return (
    <Fragment>
      {
        !prodninfo ? <Loader/> :
        <div className='window pp' >
          <button className='close' onClick={()=>showhandler()} >X</button>
          <div className='imagecont' >
            <img className='prodimg' src={prodninfo.image} alt={prodninfo.title} />
          </div>
          <div className='infocont' >
            <h1 className='titlepp'>{prodninfo.title}</h1>
            <div className='price'>${prodninfo.price}</div>
            <div className='description'>{prodninfo.description}</div>
            <div className='refinfo' >
              <div className='prodinfo' >SKU: {prodninfo.sku}</div>
              <div className='prodinfo' >Categoria: {prodninfo.category}</div>
            </div>
            <button class="CartBtn" onClick={handleClick} >
              <span class="IconContainer"> 
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" fill="rgb(17, 17, 17)" class="cart"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path></svg>
              </span>
              <p class="text">Add to Cart</p>
            </button>
          </div>
        </div>
      }
    </Fragment>
  )
}

export default ProductPage