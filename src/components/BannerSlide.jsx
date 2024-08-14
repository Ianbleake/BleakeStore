import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const BannerSlide = ({data}) => {

  const bannersCount = data.length;
  const max = bannersCount-1
  const [showBanner,setShowBanner] = useState(0);

  const nextBannerHandler = ()=>{
    if(showBanner+1 < bannersCount  ){
      setShowBanner(showBanner+1)
    }else if(showBanner+1 === bannersCount){
      setShowBanner(0)
    }
  }

  const backBannerHandler = ()=>{
    if(showBanner-1>=0){
      setShowBanner(showBanner-1)
    }else if(showBanner-1<0){
      setShowBanner(max)
    }
  }

  return (
    <>
      { data.map((banner, index) => {
        return(
          showBanner === index &&(
          <div className='Bancont' key={index} >
            <button className='arrow left' onClick={backBannerHandler} >ᐊ</button>
            <div className='bancol text' >
              <h2>{banner.title}</h2>
              <p>{banner.description}</p>
              <Link to={banner.source} ><button className='btn' >{banner.button}</button></Link>
            </div>
            <div className='bancol' >
              <img src={banner.image} alt="banner" className='bannerimg' />
            </div>
            <button className='arrow right' onClick={nextBannerHandler} >ᐅ</button>
          </div>
          )
        )
      })}
    </>
  )
}

export default BannerSlide