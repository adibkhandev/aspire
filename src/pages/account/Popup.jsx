import React, { useState } from 'react'
import {motion} from 'framer-motion'
const Popup = ({course,setCourse}) => {
    // console.log(course.topics[0].videos[0].title,'course')
    const [lastVal,setLastVal] = useState(0)
  return (
    <motion.div
      animate={course?{top: '45vh'}:{top:'180vh'}}
      transition={{delay:0 }}
      className='popup-container'
      drag='y'
      dragConstraints={{ top: window.innerWidth<600?-300 : 600<window.innerWidth<1000? -400: -500 , bottom: 0 }}
      dragElastic={0.6}
      dragTransition={{ bounceStiffness: 100, bounceDamping: 15 }}
      onDragEnd={
        (event, info) =>{
         console.log(info.offset,info.offset.y)
         if(info.offset.y>170){
             setCourse(null)
         }
            
        }  
      }
    >
        {
            course?(
                <motion.div 
                    
                   
                   className="content-cont">
                    <div className="player">
                        <img src={import.meta.env.VITE_API_URL + course.coverPhotoLink} alt="" />
                    </div>
                    <div className="texts">
                        <h1 className="title">
                        {course.title}
                        </h1>
                        <h1 className="description">
                        {course.description}
                        </h1>
                    </div>
                    <div className="course-nav-cont">
                         <div className="topic-cont">
                            <div className="text">
                                  Topic : <span className='topic-title'>{course.topics[0].title}</span>
                            </div>
                            <img src="" alt="" />
                         </div>
                         <div className="video-names">
                            
                            {
                              course && course.topics && course.topics.map((topic)=>{
                                return(
                                  topic && topic.videos.map((video)=>{
                                    return(
                                      <>
                                        <div className="video-title">
                                            {video.number}  &nbsp; &nbsp; <span className='name-video'>{video.title}</span> 
                                        </div> 
                                        <div className="video-title">
                                            {video.number}  &nbsp; &nbsp; <span className='name-video'>{video.title}</span> 
                                        </div> 
                                        <div className="video-title">
                                            {video.number}  &nbsp; &nbsp; <span className='name-video'>{video.title}</span> 
                                        </div> 
                                        <div className="video-title">
                                            {video.number}  &nbsp; &nbsp; <span className='name-video'>{video.title}</span> 
                                        </div> 
                                        <div className="video-title">
                                            {video.number}  &nbsp; &nbsp; <span className='name-video'>{video.title}</span> 
                                        </div> 
                                      </>
                                    )
                                   
                                  })

                                )
                                  
                              })
                            }

                           
                         </div>
                    </div>
                </motion.div>
            ):''
        }
       
    </motion.div>
  )
}

export default Popup
