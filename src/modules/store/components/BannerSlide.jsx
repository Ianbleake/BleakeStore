import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bannersServices } from '../../../Services/Firebase/Store';
import Loader from '../components/Loader';

const BannerSlide = () => {
  const [banners, setBanners] = useState(null);
  const [showBanner, setShowBanner] = useState(0);
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await bannersServices.getAllBanners();
        setBanners(response);
        console.log('Response:', response);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();

    // Opcionalmente, puedes establecer un intervalo para verificar nuevas actualizaciones
    const intervalId = setInterval(fetchBanners, 30000); // Verifica cada 30 segundos
    return () => clearInterval(intervalId);
  }, []);

  console.log("Banners:", banners);

  const bannersCount = banners ? banners.length : 0;
  const max = bannersCount - 1;

  const nextBannerHandler = () => {
    if (showBanner + 1 < bannersCount) {
      setShowBanner(showBanner + 1);
      setAnimation('next');
    } else if (showBanner + 1 === bannersCount) {
      setShowBanner(0);
      setAnimation('next');
    }
  };

  const backBannerHandler = () => {
    if (showBanner - 1 >= 0) {
      setShowBanner(showBanner - 1);
      setAnimation('back');
    } else if (showBanner - 1 < 0) {
      setShowBanner(max);
      setAnimation('back');
    }
  };

  return (
    <>
      {
        !banners ? <Loader /> :
        <div className='BannerSection'>
          { bannersCount > 1 && <button className='arrow left' onClick={backBannerHandler}>ᐊ</button> }
          {banners.map((banner, index) => {
            return (
              showBanner === index && (
                <div className={`Bancont ${animation}`} key={index} >
                  <div className='bancol text' >
                    <h2>{banner.title}</h2>
                    <p>{banner.description}</p>
                    <Link to={banner.source}><button className='btn'>{banner.button}</button></Link>
                  </div>
                  <div className='bancol' >
                    <img src={banner.image} alt="banner" className='bannerimg' />
                  </div>
                </div>
              )
            );
          })}
          { bannersCount > 1 && <button className='arrow right' onClick={nextBannerHandler}>ᐅ</button> }
        </div>
      }
    </>
  );
}

export default BannerSlide;
