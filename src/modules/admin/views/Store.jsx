import React, {useState} from 'react'
import Buton from '../components/Buton'
import Banners from './Banners';
import Brands from './Brands';

const Store = () => {
  const [showPage, setPage] = useState('');

  const pageHandler = (page)=>{
    setPage(page)
  }

  return (
    <div className='adminpage'>
      <div className='selectsecc'>
       <Buton label={'Banners'} handler={pageHandler} value={'Banners'} />
       <Buton label={'Marcas'} handler={pageHandler} value={'Brands'} />
       <Buton label={'Categorias'} handler={pageHandler} value={'Categorias'} />
       <Buton label={'Listing'} handler={pageHandler} value={'Listing'} />
      </div>
      <div className='content' >
        {
            showPage === 'Banners' ? <Banners/> :
            showPage === 'Brands' ? <Brands/> :
            showPage === 'Categorias' ? '' :
            showPage === 'Listing' ? '' :
            null
        }
      </div>
    </div>
  )
}

export default Store