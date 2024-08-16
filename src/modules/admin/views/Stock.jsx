import React, { useState, useEffect } from 'react';
import stockService from '../../../Services/Firebase/Stock'
import Buton from '../components/Buton';

const Stock = () => {

  const [products, setProducts] = useState([]);
  const [createForm, setCreateForm] = useState(false);

  const showCreate = ()=>{
    setCreateForm(!createForm)
  }

  useEffect(() => {
    stockService
      .getAll()
      .then( allProducts => {
        setProducts(allProducts);
        
      })
  }, [])

  return (
    <div className='adminpage' >
      <div className='Table'>

        <div className='row head' >
          <div className='col head'>
            ID
          </div>
          <div className='col head'>
            Nombre
          </div>
          <div className='col head'>
            Precio
          </div>
          <div className='col head'>
            Stock
          </div>
          <div className='col head'>
            Categoria
          </div>
          <div className='col head'>
            Descripcion
          </div>
          <div className='col head'>
            
          </div>
          <div className='col head' >
           
          </div>   
        </div>

        {
          products.map((product)=> {
            return(
              <div className='row ' >
                <div className='col'>
                 {product.id}
                </div>
                <div className='col'>
                  {product.name}
                </div>
                <div className='col'>
                  {product.price}
                </div>
                <div className='col'>
                  {product.stock}
                </div>
                <div className='col'>
                  {product.category}
                </div>
                <div className='col'>
                  {product.sku}
                </div>
                <div className='col'>
                  <button className='btn modify' > Editar </button>
                </div>
                <div className='col' >
                  <button className='btn modify' > Borrar </button>
                </div>   
            </div>
            )
          })
        }

      </div>

      <div className='cta' >
        <Buton label={'Crear'} handler={showCreate} />   
      </div>
    </div>
  )
}

export default Stock