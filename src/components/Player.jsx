import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import smallPlus from './../assets/images/small-plus.svg'
import {motion} from 'framer-motion'
import { jwtDecode } from "jwt-decode";
import ReactPlayer from 'react-player'
const Player = ({course}) => {
    const [adding,setAdding]=useState(false)
    const [activeVideo,setActiveVideo] = useState(null) 
    const accessToken = localStorage.getItem('accessToken')?JSON.stringify(localStorage.getItem('accessToken')):null
    const decoded = accessToken? jwtDecode(accessToken):null
    console.log(course,'course')
    console.log(activeVideo,'linkactive')
  return (
    <motion.div  
       onClick={()=>{
        if(adding){
           setAdding(false)
        }}}            
        className="content-cont">
        <div className="player-cont">
           {
               activeVideo?(
                   <ReactPlayer 
                     className='player' 
                     controls 
                     width={'100%'} 
                     playing={false}
                     url={import.meta.env.VITE_API_URL + activeVideo} />        
                    ):(
                       <img draggable="false" src={import.meta.env.VITE_API_URL + course.coverPhotoLink} alt="" />
                    )
            }
        </div>
        <div className="texts">
            <Link to={`/course/${course._id}`} >
                <h1 className="title">
                   {course.title}
                </h1>
            </Link>
            <h1 className="description">
            {course.description}
            </h1>
        </div>

        <div className="course-nav-scroll-cont">
            <div className="course-nav-cont">
                
                {
                    (course && course.topics)? course.topics.map((topic)=>{
                        return(
                            <>
                            <div className="topic-cont">
                                <div className="text">
                                    Topic : <span className='topic-title'>{topic.title}</span>
                                </div>
                                {
                                    (decoded && decoded._id==course.uploadedBy)?(
                                        <div className="adding">
                                            <motion.img whileTap={{scale:0.8}} onClick={()=>setAdding(true)} src={smallPlus} alt="" />
                                            <motion.div 
                                            initial={{transformOrigin:"bottom right",scale:0,rotate:-90}}
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
                            {
                                (topic && topic.videos)?topic.videos.map((video)=>{
                                    console.log(video.videoLink,'link')
                                    return(
                                        <div onClick={()=>{
                                            console.log('clicks')
                                            setActiveVideo(video.videoLink)
                                        }} className="video-title">
                                            {video.number}  &nbsp; &nbsp; <span className='name-video'>{video.title}</span> 
                                        </div> 

                                    )
                                  }
                                ):''
                            }
                            </>
                            
                        )

                        }
                    ):''
                }
            </div>

        </div>
    </motion.div>
  )
}

export default Player
