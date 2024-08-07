import React from 'react'
import ProductCard from '../components/ProductCard'
import productsServices from '../Services/products';
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
        <ProductCard key={product.id} name={product.title} description={product.description} srcimg={product.image} price={product.price} />
      ))}
    </section>
  )
}

export default ListingProducts