import React, { Fragment, useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import userService from '../../../Services/Firebase/Users';
import checkoutServices from '../../../Services/Firebase/checkout';
import { useNotificacion } from '../../../contexts/NotificationContext';

const Checkout = () => {

  const { user } = useAuth();
  const navigate = useNavigate(); 
  const [info, setInfo] = useState(null);
  const { setNotificacion } = useNotificacion();
  const Order = JSON.parse(localStorage.getItem('Order'));

  useEffect(() => {
    if (user && user.token) {
      userService.getById(user.token)
        .then((response) => {
          setInfo(response);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  
  


  const payment = (event)=>{
    event.preventDefault();

    const now = new Date();
    const fecha = now.toDateString();
    const shipingAddress = `${info.address.street} ${info.address.number}, ${info.address.zip} ${info.address.city}`;


    const orderObjet = {
      ownerId: info.id,
      owner: info.name,
      shipTo: shipingAddress, 
      items: Order,
      date: fecha
    }

    checkoutServices.create(orderObjet).then(()=>{
      setNotificacion({
        role: 'success',
        message: `Pedido realizado`,
        show: true,
      });
      setTimeout(() => {
        setNotificacion((prev) => ({ ...prev, show: false }));
      }, 3000);
      navigate('/userpage');
    })  


  }

  return (
    <Fragment>
      {
        !Order || !info ? <Loader /> : 
        <form className='checkout' onSubmit={payment} >
          <div className='titlecontainer'>
            <h1 className='title'>Resumen de orden</h1>
          </div>
          <div className='userinfo'>
            <h2 className='subtitle'> Información de envío: </h2>
            {info && info.address ? (
              <p className='Orderinfo' >
                {info.name}<br />
                {info.address.street} #{info.address.number} {info.address.zip} {info.address.city}
              </p>
            ) : (
              <p>Información de envío no disponible</p>
            )}
          </div>
          <div className='orderitems'>
            {
              Order.map((item, index) => {
                return(
                  <div className='orderitem' key={index} >
                    <img className='itemimage' src={item.image} alt={item.title} />
                    <div className='iteminfo'>
                      <h2 className='itemtitle'>{item.title}</h2>
                      <h2 className='itemprice'>${item.price}</h2>
                    </div>
                  </div>
                )
              })
            }
            
          </div>
          <div className='paybtn'>
            <input className='subtn' type="submit" value="Comprar" />
          </div>
        </form>
      }
    </Fragment>
  );
};

export default Checkout;
