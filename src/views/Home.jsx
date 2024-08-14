import React from 'react'
import BannerSlide from '../components/BannerSlide'
import Banner1 from '../assets/banner.png'

const Home = () => {

  const Banners = [
    {
      id: 1,
      source: '/Listing',
      image: Banner1,
      title: 'Lorem Ipsum 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a felis ultrices, fermentum sem sit amet, rhoncus ante. Pellentesque hendrerit orci at odio varius, id.',
      button: 'Buy now'
    },
    {
      id: 2,
      source: '/Listing',
      image: Banner1,
      title: 'Lorem Ipsum 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a felis ultrices, fermentum sem sit amet, rhoncus ante. Pellentesque hendrerit orci at odio varius, id.',
      button: 'Buy now'
    },
    {
      id: 3,
      source: '/Listing',
      image: Banner1,
      title: 'Lorem Ipsum 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a felis ultrices, fermentum sem sit amet, rhoncus ante. Pellentesque hendrerit orci at odio varius, id.',
      button: 'Buy now'
    }
  ]

  return (
    <section className=''>
      <BannerSlide data={Banners} />
    </section>
  )
}

export default Home