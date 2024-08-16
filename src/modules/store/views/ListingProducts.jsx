import React from 'react'
import ProductCard from '../components/ProductCard'
import productsServices from '../../../Services/Api/products';
import { useState, useEffect } from 'react';

const ListingProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    productsServices
      .getAll()
      .then(initproducts => {
        setProducts(initproducts);
      });
  }, []);

  return (
    <section className='Listing'>
      {products.map(product => (
        <ProductCard id={product.id} name={product.title} description={product.description} srcimg={product.image} price={product.price} key={product.id} />
      ))}
    </section>
  )
}

export default ListingProducts