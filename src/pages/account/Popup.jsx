import React, { useState } from 'react'
import {motion} from 'framer-motion'
import smallPlus from './../../assets/images/small-plus.svg'
import { jwtDecode } from "jwt-decode";
import {Link} from 'react-router-dom'
const Popup = ({course,setCourse}) => {
  const [lastVal,setLastVal] = useState(0)
  const accessToken = localStorage.getItem('accessToken')?JSON.stringify(localStorage.getItem('accessToken')):null
  const decoded = accessToken? jwtDecode(accessToken):null
  const [adding,setAdding]=useState(false)
  // console.log(decded)
  return (
    <motion.div
      onClick={()=>{
        if(adding){
           setAdding(false)
      }}}
      animate={course?{top: '45vh'}:{top:'180vh'}}
      transition={{delay:0 }}
      className='popup-container'
      drag='y'
      dragConstraints={{ top: window.innerWidth<600?-300 : 600<window.innerWidth<1000? -550: -400 , bottom: 0 }}
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
                        <img draggable="false" src={import.meta.env.VITE_API_URL + course.coverPhotoLink} alt="" />
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
                            {
                                  (course && decoded && decoded._id==course.uploadedBy)?(
                                    <div className="adding">
                                        <motion.img whileTap={{scale:0.8}} onClick={()=>setAdding(true)} src={smallPlus} alt="" />
                                        <motion.div 
                                          animate={adding?{transformOrigin:"bottom right",rotate:0,scale:1}:{transformOrigin:"bottom right",scale:0,rotate:-90}}
                                          className="options">
                                            <Link to={`/${course._id}/add/video`}>
                                               <div className="option" id='first'>Add video to topic</div>
                                            </Link>
                                            <Link to={`/${course._id}/add/topic`}>
                                               <div className="option">Add new topic</div>
                                            </Link>
                                        </motion.div>
                                    </div>
                                  ):''
                            }
                            
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
