import React, { useState, useEffect } from 'react';
import productService from '../../../Services/Firebase/Stock';
import Loader from './Loader';
import Buton from './Buton';
import { storage } from '../../../Services/Firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNotificacion } from '../../../contexts/NotificationContext';



const ProductInfo = ({ product, showHandler, handler, state }) => {

  const { setNotificacion } = useNotificacion();
  const [info, setInfo] = useState(null);
  const [edit,setEdit] = useState(true);
  const [title,setTitle] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [description,setDescription] = useState('');
  const [sku,setSku] = useState('');
  const [stock,setStock] = useState('');
  const [discount,setDiscount] = useState('');
  const [image,setImage] = useState('');

  const handleChange = (event) => {
    const {name, value } = event.target;
    if(name === 'title'){
      setTitle(value)
    }else if(name=== 'price'){
      setPrice(value)
    }else if(name=== 'cat'){
      setCategory(value)
    }else if(name=== 'des'){
      setDescription(value)
    }else if(name=== 'image'){
      setImage(event.target.files[0]);
    }else if(name==='stock'){
      setStock(value);
    }else if(name==='sku'){
      setSku(value);
    }else if(name==='discount'){
      setDiscount(value);
    }
  }

  const editHandler = ()=>{
    setEdit(!edit);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (image) {
      const imageRef = ref(storage, `Products/${image.name}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      const productObjet = {
        category: category,
        title: title,
        price: price,
        description: description,
        stock: stock,
        sku: sku,
        discount: discount,
        image: imageUrl
      }

      productService.update(product,productObjet).then((resp) => {
        const updatedProduct = state.map(u => 
          u.id === product ? resp : u
        );
        handler(updatedProduct);
        showHandler();
        setNotificacion({
          role: 'success', 
          message: `Producto: ${info.title}. Actualizado con exito.`,
          show: true,
        });
        setTimeout(() => {
          setNotificacion((prev) => ({ ...prev, show: false }));
        }, 3000);
        })
        .catch(error =>{
          setNotificacion({
            role: 'error', 
            message: `Error: ${error}`,
            show: true,
          });
          setTimeout(() => {
            setNotificacion((prev) => ({ ...prev, show: false }));
          }, 3000);
        })

    } else {

      const productObjet = {
        category: category,
        title: title,
        price: price,
        description: description,
        stock: stock,
        sku: sku,
        discount: discount,
        image: info.image
      }

      productService.update(product,productObjet).then((resp) => {
        const updatedProduct = state.map(u => 
          u.id === product ? resp : u
        );
        handler(updatedProduct);
        showHandler();
        setNotificacion({
          role: 'success', 
          message: `Producto: ${info.title}. Actualizado con exito.`,
          show: true,
        });
        setTimeout(() => {
          setNotificacion((prev) => ({ ...prev, show: false }));
        }, 10000);
        })
        .catch(error =>{
          setNotificacion({
            role: 'error', 
            message: `Error: ${error}`,
            show: true,
          });
          setTimeout(() => {
            setNotificacion((prev) => ({ ...prev, show: false }));
          }, 3000);
        })

    }

  };

  useEffect(() => {
    if (product) {
      productService.getById(product).then((respond) => {
        console.log('Producto:', respond);
        setInfo(respond);
        setTitle(respond.title);
        setCategory(respond.category);
        setPrice(respond.price);
        setDescription(respond.description);
        setSku(respond.sku);
        setStock(respond.stock);
        setDiscount(respond.discount);
      });
    }
  }, [product]);

  if (!info) {
    return <Loader/>;
  }

  return (
    <>
    {
      edit ? 
      <div className='window productinfo'>
        <button className='close' onClick={showHandler}>X</button>
        <h2 className='title'>Producto: {info.title}</h2>
        <div className='infoTable'>
          <div className='prodinfo'>
            <div className='infotitle'>Categoria: <span className='infoo'>{info.category}</span></div>
            <div className='infotitle'>Precio: <span className='infoo'>{info.price}</span></div>
            <div className='infotitle'>Descripcion: <span className='infoo'>{info.description}</span></div>
            <div className='infotitle'>SKU: <span className='infoo'>{info.sku}</span></div>
            <div className='infotitle'>Stock: <span className='infoo'>{info.stock}</span></div>
            <div className='infotitle'>Descuento: <span className='infoo'>{info.discount}</span></div>
          </div>
          <div className='prodimagecont'>
            <img src={info.image} alt={info.title} className='prodimage' />
          </div>
        </div>
        <div className='cta'>
          <Buton label={'Editar'} handler={editHandler} />
        </div>
      </div>
      :
      <form className='window productinfo edit' onSubmit={handleSubmit}>
        <button className='close' onClick={showHandler}>X</button>
        <h2 className='title'>Producto:<input value={title} className='inpt' name='title' onChange={handleChange} placeholder={info.title} type="text" /></h2>
        <div className='infoTable'>
          <div className='prodinfo'>
            <div className='infotitle edit'>Categoria: <input value={category} className='inpt' name='cat' onChange={handleChange} placeholder={info.category} type="text" /></div>
            <div className='infotitle edit'>Precio: <input value={price} className='inpt' name='price' onChange={handleChange} placeholder={info.price} type="text" /></div>
            <div className='infotitle edit'>Descripcion: <input value={description} className='inpt' name='des' onChange={handleChange} placeholder={info.description} type="text" /></div>
            <div className='infotitle edit'>SKU: <input value={sku} className='inpt' name='sku' onChange={handleChange} placeholder={info.sku} type="text" /></div>
            <div className='infotitle edit'>Stock: <input value={stock} className='inpt' name='stock' onChange={handleChange} placeholder={info.stock} type="text" /></div>
            <div className='infotitle edit'>Descuento: <input value={discount} className='inpt' name='discount' onChange={handleChange} placeholder={info.discount} type="text" /></div>
          </div>
          <div className='prodimagecont'>
            <img src={info.image} alt={info.title} className='prodimage' />
            <input className='inpt file' onChange={handleChange} name='image' type="file" />
          </div>
          
        </div>
        <div className='cta'>
            <input className="adminbtn"  type="submit" value="Actualizar" />
          </div>
      </form>
    }
    </>
  );
}

export default ProductInfo;
