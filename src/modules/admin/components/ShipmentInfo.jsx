import React, { Fragment, useEffect, useState } from 'react'
import checkoutServices from '../../../Services/Firebase/checkout';
import Loader from './Loader';

const ShipmentInfo = ({id, showhandler}) => {

  const [ship, setShip] = useState(null);

  useEffect(() => {
    checkoutServices.getById(id).then(response => {
      setShip(response);
    })
  }, [id]);

  return (
    <Fragment>
      {
        !ship ? <Loader /> :
        <div className='window ship' >
          <button className='close' onClick={showhandler} >X</button>
          <h1 className='title' >Pedido:{id}</h1>
          <div className='prodinfo'>
            <div className='infotitle'>Fecha: <span className='infoo'>{ship.date}</span></div>
            <div className='infotitle'>Cliente: <span className='infoo'>{ship.owner}</span></div>
            <div className='infotitle'>Dirección: <span className='infoo'>{ship.shipTo}</span></div>
          </div>
          <div className='ship' >
            <h2 className='subtitle' >Artículos:</h2>
            <div className='shipitems' >
              {
                ship.items && ship.items.length > 0 ? (
                  ship.items.map((item, index) => {
                    return(
                      <div key={index} className='cartitem'>
                        <img className='itemimage' src={item.image} alt={item.title} />
                        <div className='iteminfo'>
                          <h2 className='itemtitle'>{item.title}</h2>
                          <h2 className='itemprice'>${item.price}</h2>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p>No hay artículos en este pedido.</p>
                )
              }
            </div>
          </div>
        </div>
      }
    </Fragment>
  )
}

export default ShipmentInfo;
