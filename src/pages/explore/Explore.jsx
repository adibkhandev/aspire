import React from 'react'
import { Nav } from '../Nav'
import {SpecificHorizontalSwiper , HorizontalSwiper} from './HorizontalSwiper'
const Explore = () => {
  const user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')):null
  console.log(user,'user')
  return (
    <div className='explore-page-container'>
      <Nav></Nav>
      {
        user && user.skills?(
            user.skills.map((skill)=>{
               return <HorizontalSwiper skill={skill}></HorizontalSwiper>
            })
        ):''
      }
      <SpecificHorizontalSwiper attribute={'Popular'} ></SpecificHorizontalSwiper>
      <SpecificHorizontalSwiper attribute={'New'} ></SpecificHorizontalSwiper>
    </div>
  )
}

export default Explore
