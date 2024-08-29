import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import productsServices from '../../../Services/Firebase/Stock';
import Loader from '../components/Loader';

const ListingProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    productsServices
      .getAll()
      .then(initproducts => {
        setProducts(initproducts);
        setLoading(false);
        const uniqueCategories = [...new Set(initproducts.map(product => product.category))];
        setCategories(uniqueCategories);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredProducts = products.filter(product => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory)
    );
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='filters' >
            <select 
              name="filter" 
              className='filter' 
              value={selectedCategory} // Vincula el valor del select al estado
              onChange={handleCategoryChange} // Manejador de cambio
            >
              <option value="">Categoria</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className='searchcont'>
              <input 
                type="text" 
                className='search' 
                placeholder='Search...' 
                value={searchTerm}  
                onChange={handleSearchChange} 
              />
            </div>
          </div>
          <section className='Listing'>
            {filteredProducts.map(product => (
              <ProductCard 
                id={product.id} 
                name={product.title} 
                description={product.description} 
                srcimg={product.image} 
                price={product.price} 
                key={product.id} 
              />
            ))}
          </section>
        </>
      )}
    </>
  );
};

export default ListingProducts;
