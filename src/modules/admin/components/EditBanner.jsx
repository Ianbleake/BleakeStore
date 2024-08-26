import React, { useState, useEffect } from 'react';
import { bannersServices } from '../../../Services/Firebase/Store';
import Loader from './Loader';
import { useNotificacion } from '../../../contexts/NotificationContext';
import { storage } from '../../../Services/Firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
    bannersServices.getBannerById(banner)
      .then((res) => {
        setInfo(res);
        setTitle(res.title);
        setDescription(res.description);
        setUrl(res.source);
        setBoton(res.button);
        setLoading(false);
      })
    
  }, [banner]);

  const handleChange = (event)=>{
    const {name, value } = event.target
    if(name === 'title' ){
      setTitle(value);
    }else if(name === 'des'){
      setDescription(value);
    }else if(name === 'url'){
      setUrl(value);
    }else if(name === 'button'){
      setBoton(value);
    }else if(name === 'file'){
      setImage(event.target.files[0]);
    }
  }

  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(image){
      const imageRef = ref(storage, `Banners/${image.name}`)
      await uploadBytes(imageRef,image);
      const imageUrl = await getDownloadURL(imageRef);

      const bannerObjet = {
        title: title,
        description: description,
        source: url,
        button: boton,
        image: imageUrl
      }

      bannersServices.updateBanner(banner,bannerObjet)
        .then(resp=>{
          const updatedBanner = state.map(u => 
            u.id === banner ? resp : u
          );
          handler(updatedBanner);
          showhandler();
          setNotificacion({
            role: 'success', 
            message: `Banner actualizado con exito.`,
            show: true,
          });
          setTimeout(() => {
            setNotificacion((prev) => ({ ...prev, show: false }));
          }, 3000);
      })

    }else{
      const bannerObjet = {
        title: title,
        description: description,
        source: url,
        button: boton,
        image: info.image
      }

      bannersServices.updateBanner(banner,bannerObjet)
        .then(resp=>{
          const updatedBanner = state.map(u => 
            u.id === banner ? resp : u
          );
          handler(updatedBanner);
          showhandler();
          setNotificacion({
            role: 'success', 
            message: `Banner actualizado con exito.`,
            show: true,
          });
          setTimeout(() => {
            setNotificacion((prev) => ({ ...prev, show: false }));
          }, 3000);
      })

    }
  }

  if(loading){
    return <Loader/>
  }

  return (
    <form className='window banner' onSubmit={handleSubmit} >
      <button className='close' onClick={showhandler} >X</button>
      <h2 className='title' >Crear Banner</h2>
      <div className='colinfo'>
        <label className='lab' htmlFor="title">Titulo:</label>
        <input required onChange={handleChange} value={title}  className='inpt' placeholder={info.title} name='title' />
        <label className='lab' htmlFor="des">Descripcion:</label>
        <textarea required onChange={handleChange} value={description}  className='inpt text' name="des" placeholder={info.description}></textarea>
        <label className='lab' htmlFor="url">URL:</label>
        <input required onChange={handleChange} value={url} className='inpt' placeholder={info.source} name='url' />
        <label className='lab' htmlFor="button">Boton:</label>
        <input required onChange={handleChange} value={boton}  className='inpt' placeholder={info.button} name='button' />
        <label className='lab' htmlFor="image">Imagen:</label>
        <input onChange={handleChange}  className='inpt' name='image' type='file' />

      </div>
      <div className='cta ban'>
        <input type="submit" className='subtn' value="CREAR"/>  
      </div>
    </form>
  )
}

export default EditBanner