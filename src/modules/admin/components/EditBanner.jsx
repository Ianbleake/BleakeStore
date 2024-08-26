import React, { useState, useEffect } from 'react';
import { bannersServices } from '../../../Services/Firebase/Store';
import Loader from './Loader';
import { useNotificacion } from '../../store/contexts/NotificationContext';

const EditBanner = ({banner,showhandler,handler,state}) => {

  const { setNotificacion } = useNotificacion();
  const [info,setInfo] = useState(null);
  const [loading,setLoading] = useState(true);
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [url,setUrl] = useState('');
  const [boton,setBoton] = useState('');
  const [image,setImage] = useState('');

  useEffect(() => {

    
  }, [banner]);

  const handleChange = ()=>{

  }

  const handleSubmit = ()=>{

  }

  return (
    <form className='window banner' onSubmit={handleSubmit} >
      <button className='close' onClick={showhandler} >X</button>
      <h2 className='title' >Crear Banner</h2>
      <div className='colinfo'>
        <label className='lab' htmlFor="title">Titulo:</label>
        <input required onChange={handleChange}  className='inpt' placeholder='Titulo' name='title' />
        <label className='lab' htmlFor="des">Descripcion:</label>
        <textarea required onChange={handleChange}  className='inpt text' name="des" placeholder='Descripcion'></textarea>
        <label className='lab' htmlFor="url">URL:</label>
        <input required onChange={handleChange} className='inpt' placeholder='Url' name='url' />
        <label className='lab' htmlFor="button">Boton:</label>
        <input required onChange={handleChange}  className='inpt' placeholder='Texto del boton' name='button' />
        <label className='lab' htmlFor="image">Imagen:</label>
        <input required onChange={handleChange}  className='inpt' name='image' type='file' />

      </div>
      <div className='cta ban'>
        <input type="submit" className='subtn' value="CREAR"/>  
      </div>
    </form>
  )
}

export default EditBanner