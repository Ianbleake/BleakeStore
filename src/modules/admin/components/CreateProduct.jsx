import React, { useState } from 'react'
import productsServices from '../../../Services/Firebase/Stock';
import { storage } from '../../../Services/Firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNotificacion } from '../../store/contexts/NotificationContext';

export const CreateProduct = ({handler,state,showHandler}) => {

  const { setNotificacion } = useNotificacion();
  const [categoryData,setCategory] = useState('');
  const [nameData,setName] = useState('');
  const [priceData,setPrice] = useState('');
  const [descriptionData,setDescription] = useState('');
  const [stockData,setStockData] = useState('');
  const [skuData,setSkuData] = useState('');
  const [discountData,setDiscountData] = useState('');
  const [imageFile, setImageFile] = useState(null);

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
      setImageFile(event.target.files[0]);
    }else if(name==='stock'){
      setStockData(value);
    }else if(name==='sku'){
      setSkuData(value);
    }else if(name==='discount'){
      setDiscountData(value);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (imageFile) {
      const imageRef = ref(storage, `Products/${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);
      const productObjet = {
        category: categoryData,
        title: nameData,
        price: priceData,
        description: descriptionData,
        stock: stockData,
        sku: skuData,
        discount: discountData,
        image: imageUrl
        
      };

      productsServices
        .create(productObjet)
        .then((response) => {
          setNotificacion({
            role: 'success', 
            message: 'Producto Creado',
            show: true,
          });
          setTimeout(() => {
            setNotificacion((prev) => ({ ...prev, show: false }));
          }, 3000);
          handler(state.concat(response))
          setName(''); 
          setPrice('');
          setDescription('');
          setImageFile(null);
          setCategory('');
          showHandler();
        })
        .catch((error) => {
          setNotificacion({
            role: 'error', 
            message: `Error al cargar la imagen ${error}`,
            show: true,
          });
          setTimeout(() => {
            setNotificacion((prev) => ({ ...prev, show: false }));
          }, 3000);
        });
    } else {
      setNotificacion({
        role: 'Error', 
        message: 'No se cargo imagen de producto',
        show: true,
      });
      setTimeout(() => {
        setNotificacion((prev) => ({ ...prev, show: false }));
      }, 3000);
    }

  };

  return (
    <form action="" className='form' onSubmit={handleSubmit} >
      <button className='close' onClick={showHandler} >X</button>
      <h2 className='headertitle' >CREAR PRODUCTO</h2>
      <div className='inputs'>
        <input className='inpt' onChange={handleChange} value={nameData} name='name' type="text" placeholder='Nombre' required />
        <input className='inpt' onChange={handleChange} value={priceData} name='price' type="text" placeholder='Precio' required />
        <input className='inpt' onChange={handleChange} value={categoryData} name='cat' type="text" placeholder='Categoria' required />
        <input className='inpt' onChange={handleChange} value={descriptionData} name='des' type="text" placeholder='Descripcion' required />
        <input className='inpt' onChange={handleChange} value={stockData} name='stock' type='number' placeholder='Stock' required />
        <input className='inpt' onChange={handleChange} value={skuData} name='sku' type='text' placeholder='SKU' required />
        <input className='inpt' onChange={handleChange} value={discountData} name='discount' type='number' placeholder='Descuento' required />
        <input className='inpt' onChange={handleChange} name='image' type="file" required />
        <input type="submit" className='subtn' value="CREAR" />
      </div>
    </form>
  )
}
