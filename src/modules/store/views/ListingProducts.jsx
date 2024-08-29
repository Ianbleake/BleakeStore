import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import productsServices from '../../../Services/Firebase/Stock';
import Loader from '../components/Loader';

const ListingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    productsServices
      .getAll()
      .then(initproducts => {
        setProducts(initproducts);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='searchcont'>
            <input type="text" className='search' placeholder='Search...' value={searchTerm}  onChange={handleSearchChange} />
          </div>
          <section className='Listing'>
            {filteredProducts.map(product => (
              <ProductCard id={product.id} name={product.title} description={product.description} srcimg={product.image} price={product.price} key={product.id} />
            ))}
          </section>
        </>
      )}
    </>
  );
};

export default ListingProducts;
