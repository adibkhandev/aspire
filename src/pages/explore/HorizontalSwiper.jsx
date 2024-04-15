import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import axios from 'axios'
import { Link } from 'react-router-dom';
import smallPlay from './../../assets/images/small-play.svg'
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



export const SpecificHorizontalSwiper = ({attribute,token}) => {
    const [courses,setCourses] = useState()
    // const data = {
    //     skill:skill
    // }
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
    const url = import.meta.env.VITE_API_URL + `/video/explore/course/${attribute}?start=${endpoints.start}&end=${endpoints.end}`
    const [loadingDone,setLoadingDone]=useState(false)
    useEffect(()=>{
        axios.get(url,headers)
        .then((response)=>{
            if(attribute==='Suggested') console.log(response.data.data,'repoii')
            if (courses && courses.length) {
                console.log(response.data.data,'report',endpoints)
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
    useEffect(()=>{
       console.log(courses,'cc')
    },[courses])
    if(courses && courses.length){
       return (
       <div className='slider'> 
            <div className="niche">
               {attribute}
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
               loop={loadingDone}
               speed={400}
            //    onSlideChange={() => }
            //    onSwiper={(swiper) => }
            //    onSliderMove={(swiper,event)=>{
            //        console.log(event,'ev')
            //    }}
            //    onSliderFirstMove={()=>{
            //       console.log('first move')
            //    }}
               onProgress={(swiper,progress)=>{
                  if(progress>0.5 && !loadingDone){
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
                <div className="cont">
               {
                   courses?courses.map((course)=>{
                       return(
                           <SwiperSlide>
                              <CoursePack info={course}></CoursePack>
                           </SwiperSlide>
                       )
                   }):''
               }
               <div className="h-12 w-12 bg-sky-950"></div>

                </div>
            </Swiper>
       </div>
     )

   }
}



export const CoursePack = ({info}) =>{
    console.log(info,'innnn')
        return(
            <div className="course-pack-cont">
                <div className="author">
                    <div className="pfp">
                        <img src={import.meta.env.VITE_API_URL + info.uploaderPicture} alt="" />
                    </div>
                    <div className="texts">
                        <Link to={`/${info.uploaderName}`}>
                            <div className="username">{info.uploaderName}</div>
                            <div className="view">View profile</div>
                       </Link>
                    </div>
                </div>
                <Link to={`/course/${info.courseId}`}>
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
                </Link>
            </div>
        )

}
