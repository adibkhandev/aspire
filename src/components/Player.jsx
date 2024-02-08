import React , {useState , useRef , useEffect , useLayoutEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import smallPlus from './../assets/images/small-plus.svg'
import deletePic from './../assets/images/delete.svg'
import {motion , useScroll , useMotionValueEvent} from 'framer-motion'
import { jwtDecode } from "jwt-decode";
import ReactPlayer from 'react-player'
import axios from 'axios'
const Player = ({course,setHeight,popupRef}) => {
    const [adding,setAdding]=useState(false)
    const [activeVideo,setActiveVideo] = useState(null)
    const [deleteMode,setDeleteMode] = useState(false)
    const containerRef = useRef(null)
    const navigate = useNavigate()
    useLayoutEffect(() => {
        // console.log(popupRef.current.clientHeight)
        if(popupRef){
            setHeight(popupRef.current.clientHeight);

        }
    });
    
       
    console.log(course,'course')
    console.log(activeVideo,'linkactive')
  return (
    <motion.div  
    className="content-cont">
        <div 
              onClick={()=>{
               if(deleteMode){
                setDeleteMode(false)
               }
               if(adding){
                  setAdding(false)
               }
               if(activeVideo){
                   setActiveVideo(null)
               }
               else if(popupRef){
                navigate(`/course/${course._id}`)
               }
           
               }}            
          className="defocus-cont">
          
        </div>
        <div className="player-cont">
           {
               activeVideo?(
                   <ReactPlayer 
                     className='player' 
                     controls 
                     width={'100%'} 
                     playing={false}
                     url={import.meta.env.VITE_API_URL + activeVideo.videoLink} />        
                    ):(
                       <img draggable="false" src={import.meta.env.VITE_API_URL + course.coverPhotoLink} alt="" />
                    )
            }
        </div>
        <div className="texts">
            
                <h1 className="title">
                   {activeVideo?activeVideo.title:course.title}
                </h1>
            <h1 className="description">
                   {activeVideo?activeVideo.description:course.description}
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
                                    <CourseNav setDeleteMode={setDeleteMode} deleteMode={deleteMode} activeVideo={activeVideo} containerRef={containerRef} courseId={course._id} author={course.uploadedBy} topic={topic} adding={adding} setAdding={setAdding} setActiveVideo={setActiveVideo} />   
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



const CourseNav = ({deleteMode, setDeleteMode ,containerRef,author,topic,adding,setAdding,activeVideo,setActiveVideo,courseId}) => {
    const accessToken = localStorage.getItem('accessToken')
    const decoded = accessToken? jwtDecode(accessToken):null
    const adderContRef = useRef(null)
    const [down,setDown]=useState(false) 
    const [deleted,setDeleted]=useState([])

    const submitDeletion = () => {
        if(decoded && deleted.length){
            let headers = {
                headers:{
                    'Authorization':'Bearer ' + accessToken,
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                    'Access-Control-Request-Method': 'POST'
                }
            }
            let url = `${import.meta.env.VITE_API_URL}/video/delete/${courseId}/${topic._id}/`
            console.log(url,'urll')
            let data = {
                videos:deleted
            }
            axios.post(url,data,headers)
               .then((response)=>{
                   console.log(response.data)
               })
               .catch(err=>{
                  console.log(err)
               })
        }
    }






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

console.log(deleted,'adsd')
    return(
        <>
          <div ref={adderContRef} className="topic-cont">
                <motion.div   className="text">
                   Topic : <span className='topic-title'>{topic.title}</span>
                </motion.div>
                {
                    (decoded && decoded._id==author)?(
                        <div className="adding">
                            <div 
                                onClick={()=>{
                                    console.log('clickssasd')
                                    if(deleteMode){
                                       submitDeletion()
                                    }
                                    else{
                                        setAdding(topic._id) 
                                    }
                                }} 
                            
                            className="imgs">
                                <motion.div 
                                    whileTap={{scale:0.8}} 
                                    className="img">
                                    <motion.img 
                                        style={!deleteMode?{zIndex:2}:{zIndex:1}}
                                        animate={deleteMode?{scale:0}:{scale:1}}
                                        transition={!deleteMode?{delay:0.6}:{}}
                                        src={smallPlus} 
                                        alt="" 
                                    />
                                </motion.div>
                                <motion.div 
                                    whileTap={{scale:0.8}} 
                                    onClick={()=>{
                                    }} 
                                  className="img">
                                    <motion.img 
                                        style={deleteMode?{zIndex:2}:{zIndex:1}}
                                        animate={!deleteMode?{scale:0}:{scale:1}}
                                        transition={deleteMode?{delay:0.6}:{}}
                                        src={deletePic} 
                                        alt="" 
                                    />
                                </motion.div>

                            </div>
                            <motion.div 
                            style={!down?{bottom:0}:{top:0}}
                            initial={{transformOrigin:"bottom right",scale:0,rotate:-90}}
                            animate={
                                adding==topic._id ?(
                                    {transformOrigin:`${down?"top":"bottom"} right`,rotate:down?0:0,scale:1}
                            ) :(
                                {transformOrigin:`${down?"top":"bottom"} right`,scale:0,rotate:down?90:-90}
                            )}
                            className="options">
                                <Link to={`/${courseId}/${topic._id}/add/video`}>
                                    <div className="option" id='first'>Add video to topic</div>
                                </Link>
                                <Link to={`/${courseId}/add/topic`}>
                                    <div className="option">Add new topic</div>
                                </Link>
                                <div onClick={()=>{
                                     setAdding(false)
                                     setDeleteMode(true)
                                }} className="option">Delete video</div>
                            </motion.div>
                        </div>
                    ):''}              
            </div>
            {
                (topic && topic.videos)?topic.videos.map((video)=>{
                    // console.log(video.videoLink,'link')
                    return(
                      <motion.div 
                        onClick={()=>{
                            console.log('clicks')
                            if(!deleteMode){
                                setActiveVideo(video)
                            }
                            else{
                                if(!deleted.includes(video._id)){
                                    setDeleted([...deleted,video._id])
                                }
                                else{
                                    setDeleted(deleted.filter((item)=>{{
                                        return item != video._id
                                    }}))

                                }
                            }
                        }} 
                        className="video-title flex"
                        animate={activeVideo==video && !deleteMode?{
                            backgroundColor:'#2b2b2b'
                        }:{
                            backgroundColor:'#242424'
                        }}
                        whileHover={activeVideo!=video && !deleteMode?{
                            height: "3.2em",
                            backgroundColor:'#272727',
                        }:{}}
                        transition={{duration:0.2}}
                       >
                        <div className="div">
                            {video.number}  &nbsp; &nbsp; <span className='name-video'>{video.title}</span> 
                        </div>
                        {
                            deleteMode && (
                            <div className="selector">
                                <motion.div
                                initial={{scale:0}}
                                animate={deleted.length && deleted.includes(video._id)?{scale:1}:{scale:0}} 
                                className="selected"></motion.div>
                            </div>
                          )
                        }
                      </motion.div> 

                    )
                    }
                ):''
            }
        </>
    )
}

export default Player
