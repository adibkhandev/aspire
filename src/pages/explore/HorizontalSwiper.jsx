import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios'
import smallPlay from './../../assets/images/small-play.svg'
const HorizontalSwiper = ({skill}) => {
    const [courses,setCourses] = useState()
    const data = {
        skill:skill
    }
    const headers = {
        headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS'
        }
      }
    const url = import.meta.env.VITE_API_URL + '/video/get/explore'
    useEffect(()=>{
        axios.post(url,data,headers)
        .then((response)=>{
            console.log(response.data.data)
            setCourses(response.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
  
    return (
    <div className='slider'> 
         <div className="niche">
            {skill}
         </div>
        <Swiper
        slidesPerView={'auto'}
        slidesPerGroup={1}
        loop={true}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
            {
                courses?courses.map((course)=>{
                    return(
                        <SwiperSlide>
                        <CoursePack info={course}></CoursePack>
                        </SwiperSlide>
                    )
                }):''
            }
        
        </Swiper>
    </div>
  )
}



const CoursePack = ({info}) =>{
    console.log(info,'innnn')
    return(
        <div className="course-pack-cont">
            <div className="author">
                <div className="pfp">
                    <img src={import.meta.env.VITE_API_URL + info.uploaderPicture} alt="" />
                </div>
                <div className="texts">
                    <div className="username">{info.uploaderName}</div>
                    <div className="view">View profile</div>
                </div>
            </div>
            <div className="cover-image">
                <img src={import.meta.env.VITE_API_URL + info.cover} alt="" />
            </div>
            <div className="specs">
                <div className="name">{info.name}</div>
                <div className="videoCount">
                    <div className="num">
                      {info.videos}
                    </div>
                    <img src={smallPlay} alt="" />
                </div>
            </div>
        </div>
    )
}

export default HorizontalSwiper
