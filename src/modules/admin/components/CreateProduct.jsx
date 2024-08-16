import React, { useState } from 'react'
import productsServices from '../../../Services/Api/products';

export const CreateProduct = ({handler,state,showHandler}) => {

  const [nameData,setName] = useState('');
  const [priceData,setPrice] = useState('');
  const [categoryData,setCategory] = useState('');
  const [descriptionData,setDescription] = useState('');
  const [imageData,setImage] = useState('');

  const handleChange = (event) => {
    const {name, value } = event.target;
    if(name === 'name'){
      setName(value)
    }else if(name=== 'price'){
      setPrice(value)
    }else if(name=== 'cat'){
      setCategory(value)
    }else if(name=== 'des'){
      setDescription(value)
    }else if(name=== 'image'){
      setImage(value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const productObjet = {
      title: nameData,
      price: priceData,
      description: descriptionData,
      image: imageData,
      category: categoryData
    };
    
    productsServices
      .create(productObjet)
      .then((response) => {
        handler(state.concat(response))
        setName(''); 
        setPrice('');
        setDescription('');
        setImage('');
        setCategory('');
        showHandler();
      })
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };
  

  return (
    <form action="" className='form' onSubmit={handleSubmit} >
      <h2 className='headertitle' >CREAR PRODUCTO</h2>
      <div className='inputs'>
        <input className='inpt' onChange={handleChange} value={nameData} name='name' type="text" placeholder='Nombre' required />
        <input className='inpt' onChange={handleChange} value={priceData} name='price' type="text" placeholder='Precio' required />
        <input className='inpt' onChange={handleChange} value={categoryData} name='cat' type="text" placeholder='Categoria' required />
        <input className='inpt' onChange={handleChange} value={descriptionData} name='des' type="text" placeholder='Descripcion' required />
        <input className='inpt' onChange={handleChange} value={imageData} name='image' type="text" placeholder='Imagen' required />
        <input type="submit" className='subtn' value="CREAR" />
      </div>
    </form>
  )
}
