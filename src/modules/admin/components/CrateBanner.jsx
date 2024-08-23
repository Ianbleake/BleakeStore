import React, { useState } from 'react'
import { bannersServices } from '../../../Services/Firebase/Store';
import { storage } from '../../../Services/Firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNotificacion } from '../../store/contexts/NotificationContext';

const CrateBanner = ({handler,state,showHandler}) => {

  const { setNotificacion } = useNotificacion();
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [url,setUrl] = useState('');
  const [boton,setBoton] = useState('');
  const [image,setImage] = useState(null);

  const handleChange = (event)=>{
    const {name,value} = event.target;
    if(name === 'title'){
      setTitle(value);
    }else if(name === 'des'){
      setDescription(value);
    }else if(name === 'url'){
      setUrl(value);
    }else if(name === 'button'){
      setBoton(value);
    }else if(name === 'image'){
      setImage(event.target.files[0]);
    }
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();

    const imageRef = ref(storage, `Banners/${image.name}`)
    await uploadBytes(imageRef,image);
    const imageUrl = await getDownloadURL(imageRef);

    const bannerObjet = {
      button: boton,
      description: description,
      image: imageUrl,
      source: url,
      title: title
    }

    bannersServices
      .createBanner(bannerObjet)
        .then((response) => {
          setNotificacion({
            role: 'success', 
            message: 'Banner Creado',
            show: true,
          });
          setTimeout(() => {
            setNotificacion((prev) => ({ ...prev, show: false }));
          }, 3000);
          handler(state.concat(response));
          setTitle('');
          setDescription('');
          setUrl('');
          setBoton('');
          setImage(null);
          showHandler()
        })


  }

  return (
    <form className='window banner' onSubmit={handleSubmit} >
      <button className='close' onClick={showHandler} >X</button>
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

export default 
CrateBanner