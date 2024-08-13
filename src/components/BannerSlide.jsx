import React from 'react'

const BannerSlide = ({images,title,description}) => {

  const bannersCount = images.length ;
  console.log('Bannners: ',bannersCount)

  const bannertest = images[0].image
  return (
    <div className='Bancont' >
      <div className='bancol text' >
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className='bancol' >
        <img src={bannertest} alt="banner" className='bannerimg' />
      </div>
    </div>
  )
}

export default BannerSlide