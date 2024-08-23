import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { bannersServices } from '../../../Services/Firebase/Store';
import Loader from '../components/Loader';

const BannerSlide = () => {
  const [banners, setBanners] = useState(null);
  const bannersCountRef = useRef(0);  

  useEffect(() => {
    bannersServices
      .getAllBanners()
      .then((response) => {
        setBanners(response);
        console.log('Response:', response);
        bannersCountRef.current = response.length;
      });
  }, []);

  console.log("Banners:", banners);

  const max = bannersCountRef.current - 1;
  const [showBanner, setShowBanner] = useState(0);
  const [animation, setAnimation] = useState('');

  const nextBannerHandler = () => {
    if (showBanner + 1 < bannersCountRef.current) {
      setShowBanner(showBanner + 1);
      setAnimation('next');
    } else if (showBanner + 1 === bannersCountRef.current) {
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
          { bannersCountRef < 1 ? <button className='arrow left' onClick={backBannerHandler}>ᐊ</button> : '' }
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
          { bannersCountRef < 1 ? <button className='arrow right' onClick={nextBannerHandler}>ᐅ</button> : '' }
          
        </div>
      }
    </>
  );
}

export default BannerSlide;
