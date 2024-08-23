import React, { useEffect, useState } from 'react'
import { bannersServices } from '../../../Services/Firebase/Store';
import Buton from '../components/Buton';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import CrateBanner from '../components/CrateBanner';
const Banners = () => {

  const [banners,setBanners] = useState(null)
  const [createForm, setCreateForm] = useState(false);

  const showCreate = ()=>{
    setCreateForm(!createForm)
  }

  useEffect(() => {
    bannersServices
      .getAllBanners()
        .then((response) => {
          setBanners(response);
          console.log('Response:',response )
        })
  }, []);

  console.log('Banners:',banners)

  if (!banners) {
    return <Loader />
  }
  return (
    <div className='contentpage'>
      {createForm ? <CrateBanner handler={setBanners} state={banners} showHandler={showCreate} /> : ''}
      <div className='bansec' >
      {
        banners.map((banner,index) => {
          return(
            <div className={`Bancont`} key={index} >
            <div className='bancol text' >
              <h2>{banner.title}</h2>
              <p>{banner.description}</p>
              <Link to={banner.source} ><button className='btn' >{banner.button}</button></Link>
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