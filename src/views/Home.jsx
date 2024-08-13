import React from 'react'
import BannerSlide from '../components/BannerSlide'
import Banner1 from '../assets/banner.png'

const Home = () => {

  const Banners = [
    {
      id: 1,
      source: '/',
      image: Banner1

    },
    {
      id: 1,
      source: '/',
      image:'/'

    }
  ]

  return (
    <section className=''>
      <BannerSlide images={Banners} title={'Lorem ipsum' } description={'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'} />
    </section>
  )
}

export default Home