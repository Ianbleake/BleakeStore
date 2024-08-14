import React, { useState } from 'react'
import '../../Styles/Dashboard.css';
import Button from './components/Buton'
import Customers from './views/Customers';
import Stock from './views/Stock';
import Banners from './views/Banners';
import Brands from './views/Brands';
import Ships from './views/Ships';


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
        <Button label={'Banners'} handler={pageHandler} value={'banner'} />
        <Button label={'Marcas'} handler={pageHandler} value={'brand'}  />
        <Button label={'Pedidos'} handler={pageHandler} value={'ship'} />
      </aside>
      <main className='maincontent'>
        {
          showPage === 'user' ? <Customers/> :
          showPage === 'stock' ? <Stock/> :
          showPage === 'banner' ? <Banners/> :
          showPage === 'brand' ? <Brands /> :
          showPage === 'ship' ? <Ships/> :
          null
        }
      </main>

    </section>
  )
}

export default Dashboard