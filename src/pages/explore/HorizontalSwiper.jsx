import React, { useEffect, useState , useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import smallPlay from './../../assets/images/small-play.svg'
import emptyPfp from './../../assets/images/empty_pfp2.svg'
import {Skeleton} from '@mui/material'
export const HorizontalSwiper = ({skill}) => {
    const [courses,setCourses] = useState()
    const data = {
        skill:skill
    }
    const headers = {
        headers:{
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }
      }
      const [endpoints,setEndPoints] = useState({
        start:0,
        end:2
     })
    const url = import.meta.env.VITE_API_URL + `/video/explore/${skill}?start=${endpoints.start}&end=${endpoints.end}`
    
    useEffect(()=>{
        axios.get(url,headers)
        .then((response)=>{
            console.log(response.data.data)
            setCourses(response.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    if(courses && courses.length){
       return (
       <div className='slider'> 
            <div className="niche">
               {skill}
            </div>
            <Swiper
               slidesPerView={2}
               slidesPerGroup={1}
               breakpoints={{
                   1312:{
                       slidesPerView:4
                   },
                   992:{
                       slidesPerView:3
                   },
                   688:{
                       slidesPerView:2
                   },
   
               }}
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
}



export const SpecificHorizontalSwiper = ({attribute,token,skill}) => {
    const [courses,setCourses] = useState()
    // const data = {
    //     skill:skill
    // }
    console.log(skill,'sk')
    const headers = attribute=="Suggested"?{
        headers:{
          'Authorization':'Bearer ' + token,
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }
      }:{
        headers:{
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }
      }
    const [endpoints,setEndPoints] = useState({
        start:0,
        end:5
    })
    const url = skill?(
       import.meta.env.VITE_API_URL + `/video/explore/${skill}?start=${endpoints.start}&end=${endpoints.end}`
    ): import.meta.env.VITE_API_URL + `/video/explore/course/${attribute}?start=${endpoints.start}&end=${endpoints.end}`
    // const url = import.meta.env.VITE_API_URL + `/video/explore/${skill}?start=${endpoints.start}&end=${endpoints.end}`
    const [loadingDone,setLoadingDone]=useState(false)
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
        axios.get(url,headers)
        .then((response)=>{
            if (courses && courses.length) {
                setIsLoading(false)
                if(response.data && !response.data.data.length){
                    setLoadingDone(true)
                }
                setCourses([...courses,...response.data.data])
            }
            else setCourses(response.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[endpoints])
    const courseRef = useRef(null)
    const [cardHeight,setCardHeight] = useState(null)
    useEffect(()=>{
       console.log(courses,'cc')
    },[courses])
    // useEffect(()=>{
    //     if(courseRef.current){
    //        console.log(courseRef.current,'heii')
    //     setCardHeight(courseRef.current.clientHeight)
    //    }
    // },[courseRef.current])
    if(courses && courses.length){
       return (
       <div className='slider'> 
            <div className="niche">
               {attribute || skill}
            </div>
            <Swiper
               slidesPerView={2}
               slidesPerGroup={1}
               breakpoints={{
                   1312:{
                       slidesPerView:4
                   },
                   992:{
                       slidesPerView:3
                   },
                   688:{
                       slidesPerView:2
                   },
   
               }}
               loop={loadingDone && !isLoading}
               speed={400}
            //    onSlideChange={() => }
               onSwiper={(swiper) => {
                   setCardHeight(swiper.height)
               }}
            //    onSliderMove={(swiper,event)=>{
            //        console.log(event,'ev')
            //    }}
            //    onSliderFirstMove={()=>{
            //       console.log('first move')
            //    }}
               onProgress={(swiper,progress)=>{
                  if(progress>0.5 && !loadingDone){
                     setIsLoading(true)
                     setEndPoints({
                        start:endpoints.start+5,
                        end:endpoints.end+5
                     })
                  }
                  console.log(progress,'prog')}
               }
               onReachEnd={()=>{
                   console.log('this is the end')
                //    setCourses([...courses,...courses])
               }}
            >
                <div  className="cont">
               {
                   courses?courses.map((course)=>{
                       return(
                           <SwiperSlide>
                              <CoursePack ref={courseRef}  info={course}></CoursePack>
                           </SwiperSlide>
                       )
                   }):''
               }
                {isLoading?(
                    <SwiperSlide>
                        <Skeleton
                        sx={{ bgcolor: '#2B2B2B' ,height:cardHeight + 'px'}}
                        className='course-pack-cont shadow-explore' variant='circlar' animation="wave"/>
                    </SwiperSlide>
                ):''}
               

                </div>
            </Swiper>
       </div>
     )

   }
}



export const CoursePack = ({info}) =>{
    console.log(info,'innnn')
        return(
                <Link to={`/course/${info.courseId}`}>
                    <div className="course-pack-cont">
                        <div className="author">
                            <Link to={`/profile/${info.uploaderName}`}>
                            <div className="pfp">
                                <img src={info.uploaderPicture?import.meta.env.VITE_API_URL + info.uploaderPicture:emptyPfp} alt="" />
                            </div>
                            </Link>
                            <div className="texts">
                                <Link to={`/profile/${info.uploaderName}`}>
                                    <div className="username">{info.uploaderName}</div>
                                    <div className="view">View profile</div>
                            </Link>
                            </div>
                        </div>
                            <div className="cover-image">
                                <img src={import.meta.env.VITE_API_URL + info.cover} alt="" />
                            </div>
                            <div className="specs">
                                <div className="name">{info.courseName}</div>
                                <div className="videoCount">
                                    <div className="num">
                                      {info.videos}
                                    </div>
                                    <img src={smallPlay} alt="" />
                                </div>
                            </div>
                    </div>
                </Link>
        )

}
