import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import productsServices from '../../../Services/Firebase/Stock';
import Loader from '../components/Loader';
import { CartContext } from '../../../contexts/CartContext'; 

const ListingProducts = () => {

  const { cart, setCart } = useContext(CartContext);
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

  const addToCart = (id, name, srcimg, price) => {
    const productObjet = {
      id: id,
      title: name,
      image: srcimg,
      price: price,
    };
    const updateCart = [...cart, productObjet];
    setCart(updateCart);
    localStorage.setItem('cart', JSON.stringify(updateCart));
  };
  
  
  
  console.log('Carrito: ',cart)

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
              value={selectedCategory} 
              onChange={handleCategoryChange}
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
                handler={()=>addToCart(product.id,product.title,product.image,product.price)}
              />
            ))}
          </section>
        </>
      )}
    </>
  );
};

export default ListingProducts;
