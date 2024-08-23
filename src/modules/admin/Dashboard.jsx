import React, { useState } from 'react'
import '../../Styles/Dashboard.css';
import Button from './components/Buton'
import Customers from './views/Customers';
import Stock from './views/Stock';
import Ships from './views/Ships';
import Store from './views/Store';


const Dashboard = () => {

  const [showPage, setPage] = useState('')
  

  const pageHandler = (page)=>{
    setPage(page)
  }

  return (
    <section className='dashboard'>
      <aside className='sidemenu'>
        <Button label={'Usuarios'} handler={pageHandler} value={'user'} />
        <Button label={'Inventario'} handler={pageHandler} value={'stock'} />
        <Button label={'Pedidos'} handler={pageHandler} value={'ship'} />
        <Button label={'Tienda'} handler={pageHandler} value={'store'} />
      </aside>
      <main className='maincontent'>
        {
          showPage === 'user' ? <Customers/> :
          showPage === 'stock' ? <Stock/> :
          showPage === 'store' ? <Store/> :
          showPage === 'ship' ? <Ships/> :
          null
        }
      </main>

    </section>
  )
}

export default Dashboard