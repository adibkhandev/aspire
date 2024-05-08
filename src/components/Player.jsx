import React , {useState , useRef , useEffect , useLayoutEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import smallPlus from './../assets/images/small-plus.svg'
import deletePic from './../assets/images/delete.svg'
import whiteEdit from './../assets/images/white-edit.svg'
import SubscribeCta from '../pages/components/SubscribeCta'
import {motion , useScroll , useMotionValueEvent} from 'framer-motion'
import { jwtDecode } from "jwt-decode";
import ReactPlayer from 'react-player'
import axios from 'axios'
const Player = ({course,setCourse,setPopupOpen,deleteMode,setDeleteMode,setHeight,popupRef,deleteInitiated,setDeletePrompt}) => {
    const [adding,setAdding]=useState(false)
    const [activeVideo,setActiveVideo] = useState(null)
    const containerRef = useRef(null)
    const navigate = useNavigate()
    const token = localStorage.getItem('accessToken');
    const decoded = token? jwtDecode(token):null
    const [user,setUser] = useState(localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null)
    const [subscribedState,setSubscribedState] = useState(false)
    const [editing,setEditing]=useState(false)
    const [deleteCourse,setDeleteCourse] = useState(false)
    useLayoutEffect(() => {
        if(popupRef){
            setHeight(popupRef.current.clientHeight);
        }
    });
    
   useEffect(()=>{
       if(deleteCourse && deleteInitiated) deleteHandler()
   },[deleteInitiated])
   useEffect(()=>{
        if(deleteMode){
            setDeleteMode(false)
        }
        if(activeVideo){
            setActiveVideo(null)
        }

   },[course])
    const deleteHandler = () => {
                let headers = {
                    headers:{
                        'Authorization':'Bearer ' + token,
                        'Content-Type':'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
                    }
                }
                let url = `${import.meta.env.VITE_API_URL}/video/delete/${course._id}/course/`
               
                axios.delete(url,headers)
                   .then((response)=>{
//                       console.log(response.data)
                         setEditing(false)
                         if(setPopupOpen && setCourse){
                             setTimeout(()=>{
                                setPopupOpen(false)
                             },500)
                             setTimeout(()=>{
                                window.location.reload()
                            },1000)
                         }
                         else{
                            navigate('/')
                         }
                        //  navigate('/')
                         
                    })
                    .catch(err=>{
                       console.log(err)
                    })
                }
    
                
//vid
    
  return (
    <motion.div  
    onClick={(e)=>{
        e.stopPropagation()
//        console.log(e.target.className,'Tefwr')
        if(e.target.className == 'content-cont'){
            if(deleteMode){
             setDeleteMode(false)
            }
            if(adding){
               setAdding(false)
            }
            if(activeVideo){
                setActiveVideo(null)
            }
            if(editing){
                setEditing(false)
            }
            else if(popupRef){
               navigate(`/course/${course._id}`)
            }
        }
   
       }}  
    className="content-cont">
        <div className="player-cont">
           {
               activeVideo?(
                     <PlayVideo videoLinkBack={activeVideo.videoLink}></PlayVideo>      
                    ):(
                      <div className="coverCont">
                        {
                            decoded && course && course.uploadedBy==decoded._id?(
                                 <div className='editor-cont'>
                                    <div className="editor">
                                        <img onClick={()=> setEditing(true)} className='white-edit' draggable="false" src={whiteEdit} alt="" />
                                        <motion.div 
                                            // style={{bottom:'0'}}
                                            initial={{transformOrigin:"top right",scale:0,rotate:180}}
                                            animate={
                                                editing?(
                                                    {transformOrigin:`top right`,rotate:0,scale:1}
                                            ) :(
                                                {transformOrigin:`top right`,scale:0,rotate:180}
                                            )}
                                            className="options"
                                        >
                                            <div onClick={()=> {
                                                setDeletePrompt(true)
                                                setDeleteCourse(true)
                                            }} className="option" id='first'>
                                                <h1>
                                                Delete course

                                                </h1>
                                            </div>
                                            <Link to={`/${course._id}/edit/course`}>
                                                <div className="option">Edit course</div>
                                            </Link>
                                        </motion.div>
                                    </div>   
                                 </div>                             
                            ):'' 
                        }
                          <img className='coverImage' draggable="false" src={import.meta.env.VITE_API_URL + course.coverPhotoLink} alt="" />
                                               
                      </div>
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
                <SubscribeCta courseId={course._id} subscribedState={subscribedState} setSubscribedState={setSubscribedState} ></SubscribeCta>
        </div>
        <div className="total-cont">
            <div ref={containerRef} className="topper-cont">
                <div onScroll={(e)=>setAdding(false)} className="course-nav-scroll-cont">
                    
                    <div className="course-nav-cont">
                        
                        {
                            (course && course.topics)? course.topics.map((topic)=>{
//                                // console.log(topic,'topic')
                                return (
                                    <CourseNav deleteCourse={deleteCourse} deleteInitiated={deleteInitiated} setDeletePrompt={setDeletePrompt} setDeleteMode={setDeleteMode} deleteMode={deleteMode} activeVideo={activeVideo} containerRef={containerRef} courseId={course._id} author={course.uploadedBy} topic={topic} adding={adding} setAdding={setAdding} setActiveVideo={setActiveVideo} />   
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



const PlayVideo = ({videoLinkBack}) => {
    return(
        <ReactPlayer 
          className='player' 
          controls 
          preload="auto"
          width={'100%'} 
          onProgress={(loaded)=>{
//            console.log(loaded,'l')
          }}
          playing={false}
          url={import.meta.env.VITE_API_URL + videoLinkBack}
        />  
    )
}



const CourseNav = ({deleteCourse,deleteMode, deleteInitiated ,setDeletePrompt ,setDeleteMode ,containerRef,author,topic,adding,setAdding,activeVideo,setActiveVideo,courseId}) => {
    const accessToken = localStorage.getItem('accessToken')
    const decoded = accessToken? jwtDecode(accessToken):null
    const adderContRef = useRef(null)
    const [down,setDown]=useState(false) 
    const [deleted,setDeleted]=useState([])
    useEffect(()=>{
        if(deleteMode){
            setDeleted([])
        }
    },[deleteMode])
    const submitDeletion = () => {
        if(decoded && deleted.length){
            let headers = {
                headers:{
                    'Authorization':'Bearer ' + accessToken,
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
                }
            }
            let url = `${import.meta.env.VITE_API_URL}/video/delete/${courseId}/${topic._id}`
//            console.log(url,'urll')
            let data = {
                videos:deleted
            }
            axios.post(url,data,headers)
               .then((response)=>{
                  console.log(response)
                  if(response.status==201){
                     setDeleteMode(false)
                     setDeletePrompt(false)
                     
                     
                  }
               })
               .catch(err=>{
//                  console.log(err)
               })
        }
    }

    
    useEffect(()=>{
        if(deleteInitiated && !deleteCourse)submitDeletion()
    },[deleteInitiated])



    let callback = entries =>{
        let [entry] = entries
        if(entry){
//          console.log(entry.isIntersecting,'issss')
          setDown(entry.isIntersecting)
        }
        else{
//            console.log('no')

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

//console.log(deleted,'adsd')
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
//                                    console.log('clickssasd')
                                    if(deleteMode){
                                       setDeletePrompt(true)
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
                                className="options"
                            >
                                <Link to={`/${courseId}/${topic._id}/add/video`}>
                                    <div className="option" id='borderBottom'>Add video to topic</div>
                                </Link>
                                <Link to={`/${courseId}/add/topic`}>
                                    <div className="option" id='borderBottom'>Add new topic</div>
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
//                    // console.log(video.videoLink,'link')
                    return(
                      <motion.div 
                        onClick={()=>{
//                            console.log('clicks')
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
                            {video.number}  &nbsp; &nbsp; <span className='name-video'>{video._id}</span> 
                        </div>
                        {
                            deleteMode && (
                            <div className="selector-cont">
                               <div className="selector">
                                    <motion.svg
                                    viewBox="0 0 10 10"
                                    initial={{scale:0}}
                                    animate={deleted.length && deleted.includes(video._id)?{scale:1}:{scale:0}} 
                                    className="selected">
                                        <circle className='circle' r="3" cx="5" cy="5" />
                                    </motion.svg>
                               </div>
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
