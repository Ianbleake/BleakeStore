import React, { Fragment, useEffect, useState } from 'react'
import checkoutServices from '../../../Services/Firebase/checkout';
import Loader from './Loader';

const ShipInfo = ({showhandler,id}) => {

  const [ship,setShip] = useState(null);

  useEffect(() => {
    checkoutServices.getById(id)
      .then(response => {setShip(response);} )
  }, [id]);

  console.log("Shipment:",ship);
  return (
    <Fragment>
      { !ship ? <Loader/> :
        <div className='window shipage' >
          <button className='close' onClick={showhandler} >X</button>
          <h2 className='title' >Pedido: {id}</h2>
          <div className='prodinfo'>
            <div className='infotitle'>Fecha: <span className='infoo'>{ship.date}</span></div>
            <div className='infotitle'>Dirección: <span className='infoo'>{ship.shipTo}</span></div>
          </div>
          <div className='ship' >
            <h2 className='subtitle' >Artículos:</h2>
            <div className='shipitems' >
              {
                ship.items && ship.items.length > 0 ? (
                  ship.items.map((item, index) => {
                    return(
                      <div key={index} className='cartitem con'>
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

export default ShipInfo