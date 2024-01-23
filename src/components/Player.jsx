import React , {useState , useRef , useEffect} from 'react'
import {Link} from 'react-router-dom'
import smallPlus from './../assets/images/small-plus.svg'
import {motion , useScroll , useMotionValueEvent} from 'framer-motion'
import { jwtDecode } from "jwt-decode";
import ReactPlayer from 'react-player'
const Player = ({course}) => {
    const [adding,setAdding]=useState(false)
    const [activeVideo,setActiveVideo] = useState(null)
    const containerRef = useRef(null)
    
    
       
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
        <div className="total-cont">
            <div ref={containerRef} className="topper-cont">
                <div onScroll={(e)=>setAdding(false)} className="course-nav-scroll-cont">
                    
                    <div className="course-nav-cont">
                        
                        {
                            (course && course.topics)? course.topics.map((topic)=>{
                                console.log(topic,'topic')
                                return (
                                    <CourseNav containerRef={containerRef} courseId={course._id} author={course.uploadedBy} topic={topic} adding={adding} setAdding={setAdding} setActiveVideo={setActiveVideo} />   
                                )

                                }
                            ):''
                        }
                    </div>

                </div>
            </div>

        </div>
    </motion.div>
  )
}



const CourseNav = ({containerRef,author,topic,adding,setAdding,setActiveVideo,courseId}) => {
    const accessToken = localStorage.getItem('accessToken')?JSON.stringify(localStorage.getItem('accessToken')):null
    const decoded = accessToken? jwtDecode(accessToken):null
    const adderContRef = useRef(null)
    const [down,setDown]=useState(false) 
    let callback = entries =>{
        let [entry] = entries
        if(entry){
          console.log(entry.isIntersecting,'issss')
          setDown(entry.isIntersecting)
        }
        else{
            console.log('no')

        }
    }
    let options = {
        root:containerRef.current? containerRef.current:null,
        rootMargin:'0px',
        threshold:0.5
    }
    useEffect(() => {
        let observer = new IntersectionObserver(callback,options)
        if(adderContRef.current){
            observer.observe(adderContRef.current)
        }
        return () => {
            if(adderContRef.current){
                observer.unobserve(adderContRef.current)
            }
        };
     }, [adderContRef,options])


    return(
        <>
          <div ref={adderContRef} className="topic-cont">
                <motion.div   className="text">
                   Topic : <span className='topic-title'>{topic.title}</span>
                </motion.div>
                {
                    (decoded && decoded._id==author)?(
                        <div className="adding">
                            <motion.img 
                                whileTap={{scale:0.8}} 
                                onClick={()=>{
                                setAdding(topic._id) 
                                }} 
                                src={smallPlus} 
                                alt="" 
                            />
                            <motion.div 
                            style={!down?{bottom:0}:{top:0}}
                            initial={{transformOrigin:"bottom right",scale:0,rotate:-90}}
                            animate={
                             



                                adding==topic._id ?(
                                    {transformOrigin:`${down?"top":"bottom"} right`,rotate:0,scale:1}
                            ) :(
                                {transformOrigin:`${down?"top":"bottom"} right`,scale:0,rotate:-90}
                            )}
                            className="options">
                                <Link to={`/${courseId}/add/video`}>
                                    <div className="option" id='first'>Add video to topic</div>
                                </Link>
                                <Link to={`/${courseId}/add/topic`}>
                                    <div className="option">Add new topic</div>
                                </Link>
                            </motion.div>
                        </div>
                    ):''}              
            </div>
            {
                (topic && topic.videos)?topic.videos.map((video)=>{
                    // console.log(video.videoLink,'link')
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

export default Player
