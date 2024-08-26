import React, { useEffect, useState } from 'react'
import { bannersServices } from '../../../Services/Firebase/Store';
import Buton from '../components/Buton';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import CrateBanner from '../components/CrateBanner';
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import { useNotificacion } from '../../store/contexts/NotificationContext';
import EditBanner from '../components/EditBanner';

const Banners = () => {

  const { setNotificacion } = useNotificacion();
  const [banners,setBanners] = useState(null)
  const [createForm, setCreateForm] = useState(false);
  const [editForm, setEditForm] = useState({show: false, id: ''});

  const showEdit = (idBanner)=>{
    const editObjet = { show:!editForm.show ,id: idBanner }
    setEditForm(editObjet)
  }

  const showCreate = ()=>{
    setCreateForm(!createForm)
    
  }

  useEffect(() => {
    bannersServices
      .getAllBanners()
        .then((response) => {
          setBanners(response);
        })
  }, []);

  console.log(editForm)

  const handleDelete = (id)=>{
    bannersServices.removeBanner(id).then(()=>{
      setBanners(banners.filter(ban => ban.id !== id ));
      setNotificacion({
        role: 'error', 
        message: `Banner Eliminado`,
        show: true,
      });
      setTimeout(() => {
        setNotificacion((prev) => ({ ...prev, show: false }));
      }, 3000);
    })
  }


  if (!banners) {
    return <Loader />
  }
  return (
    <div className='contentpage'>
      {createForm ? <CrateBanner handler={setBanners} state={banners} showHandler={showCreate} /> : ''}
      {editForm.show ? <EditBanner banner={editForm.id} handler={setBanners} state={banners} showhandler={editForm.show} /> : ''}
      <div className='bansec' >
      {
        banners.map((banner,index) => {
          return(
          <div className={`Bancont`} key={index} >
            <div className='bancol text' >
              <h2>{banner.title}</h2>
              <p>{banner.description}</p>
              <div className='buttons' >
                <Link to={banner.source} ><button className='btn' >{banner.button}</button></Link>
                <div className='modbtns' >
                  <button className='btn delete' onClick={()=>handleDelete(banner.id)} ><CiTrash /></button>
                  <button className='btn edit' onClick={()=>showEdit(banner.id)} ><CiEdit /></button>
                </div>
              </div>
            </div>
            <div className='bancol' >
              <img src={banner.image} alt="banner" className='bannerimg' />
            </div>
          </div>
          )
        })
      }
      </div>
      <div className='cta'>
          <Buton label={'Crear'} handler={showCreate} />   
      </div>
    </div>
  )
}

export default Banners