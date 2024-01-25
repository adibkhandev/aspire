import React from 'react'
import { Nav } from '../Nav'
import HorizontalSwiper from './HorizontalSwiper'
const Explore = () => {
  return (
    <div className='explore-page-container'>
      <Nav></Nav>
      <HorizontalSwiper skill={"Hoe"}></HorizontalSwiper>
    </div>
  )
}

export default Explore
