import React, { useState, useEffect } from 'react';
import stockService from '../../../Services/Firebase/Stock'
//import stockService from '../../../Services/Api/products'
import Buton from '../components/Buton';
import { CreateProduct } from '../components/CreateProduct';
import Loader from '../components/Loader';

const Stock = () => {

  const [products, setProducts] = useState([]);
  const [createForm, setCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    stockService
      .getAll()
      .then( allProducts => {
        setProducts(allProducts);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading products:", error);
        setLoading(false); // En caso de error, también desactiva el loader
      });
  }, [])

  const showCreate = ()=>{
    setCreateForm(!createForm)
  }



  return (
    <>
    {
      loading ? <Loader/> : 
      <div className='adminpage' >
        { createForm ? <CreateProduct handler={setProducts} state={products} showHandler={showCreate} /> : '' }
        <div className='Table'>
          <div className='row head' >
            <div className='col head'>
              ID
            </div>
            <div className='col head'>
              Categoria
            </div>
            <div className='col head'>
              Nombre
            </div>
            <div className='col head'>
              Precio
            </div>
            <div className='col head' >
              Stock
            </div>
            <div className='col head' >
            
            </div>    
          </div>

          {
            products.map((product,index)=> {
              return(
                <div className='row ' key={index} >
                  <div className='col'>
                  {product.id}
                  </div>
                  <div className='col'>
                    {product.category}
                  </div>
                  <div className='col'>
                    {product.title}
                  </div>
                  <div className='col'>
                    {product.price}
                  </div>
                  <div className='col'>
                    {product.stock}
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
    }
    </>
  )
}

export default Stock