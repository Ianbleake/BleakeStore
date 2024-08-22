import React from 'react'
import ProductCard from '../components/ProductCard'
//import productsServices from '../../../Services/Api/products';
import productsServices from '../../../Services/Firebase/Stock';
import { useState, useEffect } from 'react';
import Loader from '../components/Loader';

const ListingProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    productsServices
      .getAll()
      .then(initproducts => {
        setProducts(initproducts);
        setLoading(false)
      });
  }, []);

  return (
    <>
      {
        loading ? <Loader/> :
        <section className='Listing'>
        {products.map(product => (
          <ProductCard id={product.id} name={product.title} description={product.description} srcimg={product.image} price={product.price} key={product.id} />
        ))}
      </section>
      }
    </>
  )
}

export default ListingProducts