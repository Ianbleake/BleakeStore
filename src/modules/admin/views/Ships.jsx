import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../components/Loader';
import checkoutServices from '../../../Services/Firebase/checkout';
import Buton from '../components/Buton';
import { useNotificacion } from '../../../contexts/NotificationContext';
import CreateShipment from '../components/CreateShipment';
import ShipmentInfo from '../components/ShipmentInfo';

const Ships = () => {

  const [pedidos,setPedidos] = useState(null);
  const { setNotificacion } = useNotificacion();
  const [showInfo,setShowInfo] = useState({show:false,id:''});
  const [showCreate,setShowCreate] = useState(false);

  useEffect(() => { 
    checkoutServices.getAll()
      .then(response=>{
        setPedidos(response);
      })
  }, []);

  const handleDelete = (id) => {
    checkoutServices.remove(id)
      .then(()=>{
        setNotificacion({
          role: 'error', 
          message: `Pedido Eliminado`,
          show: true,
        });
        setTimeout(() => {
          setNotificacion((prev) => ({ ...prev, show: false }));
        }, 3000);
        setPedidos(pedidos.filter(prod => prod.id !== id))
      })
  } 

  const handleStates = (state, id)=>{
    if(state === 'info'){
      setShowInfo({show:!showInfo.show,id:id});
    }else if(state === 'create'){
      setShowCreate(!showCreate)
    }
  }


  return (
    <Fragment>
      {
        !pedidos ? <Loader/> : 
          <div className='adminpage' >
            { showCreate ? <CreateShipment handler={setPedidos} state={pedidos} showHandler={()=>handleStates('create')} /> : '' }
            { showInfo.show ? <ShipmentInfo id={showInfo.id} showhandler={()=>handleStates('info')} /> : '' }
            <div className='Table'>
              <div className='row head' >
                <div className='col head'>
                  ID
                </div>
                <div className='col head'>
                  Cliente
                </div>
                <div className='col head'>
                  Items
                </div>
                <div className='col head'>
                  Direccion
                </div>
                <div className='col head' >
                  Fecha
                </div>
                <div className='col head' >
                
                </div>    
              </div>

              {
                pedidos.map((pedido,index)=> {
                  return(
                    <div className='row ' key={index} >
                      <div className='col click' onClick={()=>handleStates('info',pedido.id)}>{pedido.id}</div>
                      <div className='col'>{pedido.owner}</div>
                      {/* <div className='col'>{pedido.items.map((item) => {return item.title }).join(', ')}</div> */}
                      <div className='col'>{pedido.items.length}</div>
                      <div className='col'>{pedido.shipTo}</div>
                      <div className='col'>{pedido.date}</div>
                      <div className='col' >
                        <button className='btn modify' onClick={()=>handleDelete(pedido.id)} > Borrar </button>
                      </div>   
                  </div>
                  )
                })
              }

            </div>

            <div className='cta'>
              <Buton label={'Crear'} handler={()=>handleStates('create')} />   
            </div>
          </div>
      }
    </Fragment>
  )
}

export default Ships