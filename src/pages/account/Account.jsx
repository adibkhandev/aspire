import React, { useEffect, useState , useRef} from 'react'
import { useNavigate, useParams } from 'react-router'
import { easeIn, motion , useDragControls , useMotionValueEvent , useScroll} from 'framer-motion'
import { Nav , LandingNav } from './../Nav'
import earth from './../../assets/images/earth.svg'
import squarePlay from './../../assets/images/square-play.svg'
import axios from 'axios'
import Popup from './Popup'
import { Link } from "react-router-dom";
import {Skeleton} from '@mui/material'
import { jwtDecode } from "jwt-decode";
import Delete from '../../components/Delete'
export const Account = () => {
    let {username} = useParams()
    let [userData,setUserData] = useState(null)
    let [courseActive,setCourseAcitve] = useState(null)
    let [deletePrompt,setDeletePrompt]=useState(false)
    let [deleteInitiated,setDeleteInitiated]=useState(false)
    const [deleteMode,setDeleteMode] = useState(false)
    const accessToken = localStorage.getItem('accessToken')?JSON.stringify(localStorage.getItem('accessToken')):null
    const decoded = accessToken? jwtDecode(accessToken):null
    const [popupOpen,setPopupOpen] = useState(false)
    const lastscrollY = useRef(0)
    const [direction,setDirection] = useState(null)
    const {scrollY} = useScroll();
    console.log(scrollY,'sc')
    useMotionValueEvent(scrollY,"change",(latest)=>{
      console.log(latest,'pattess',lastscrollY.current)
      if(latest>lastscrollY.current) setDirection("down")
      if(latest<lastscrollY.current) setDirection("up")
      lastscrollY.current = latest
    })
    useEffect(()=>{
        const url = import.meta.env.VITE_API_URL + '/user/' + username
        const headers = {
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
          }
              axios.get(url,headers)
                .then((response)=>{
////                    console.log(response.data,'acount data')
                    setUserData(response.data)
                })
                .catch((err)=>{
////                    console.log(err)
                })
    },[])
    const homeVariants = {
        non:{
            filter:'blur(0px)',
            scale:1,
        },
        blur:{
            filter:'blur(5px)',
            scale:1.01
        }
    }
    const scrollerRef = useRef(null)
    return (
        <div className='home-container'>
            
            <LandingNav homeVariants={homeVariants} popupOpen={popupOpen} direction={direction}></LandingNav>
            <Delete deleteMode={deleteMode} setDeleteMode={setDeleteMode} setDeletePrompt={setDeletePrompt} deletePrompt={deletePrompt} setDeleteInitiated={setDeleteInitiated} ></Delete>
            <Popup deleteMode={deleteMode} setDeleteMode={setDeleteMode} deleteInitiated={deleteInitiated} setDeletePrompt={setDeletePrompt} setPopupOpen={setPopupOpen} popupOpen={popupOpen}  course={courseActive} setCourse={setCourseAcitve}></Popup>
            <motion.div
              ref={scrollerRef}
              className='home'
              variants={homeVariants}
              animate={!popupOpen?"non":"blur"}
              transition={{delay:0.08}}
              >
                <div className="account-container" onClick={()=>{if(popupOpen){setPopupOpen(false)}}} >
                    <div className="details-container">
                        <div className="details">
                            <div className="pfp-cont">
                                {
                                    userData?(
                                        <img draggable="false" className='pfpImage' src={userData?import.meta.env.VITE_API_URL + userData.pfp:''} alt="" />
                                    ):(
                                        <Skeleton
                                         sx={{ bgcolor: '#2B2B2B' }}
                                         className='pfpImage' variant='circlar' animation="wave"/>
                                    )
                                }
                               
                            </div>
                            <div className="text-cont">
                                {
                                    userData?(
                                        <>
                                        {
                                            userData.username?(
                                                <h1 className="username">
                                                    {userData.username}
                                                </h1>

                                            ):''
                                        }
                                        <div className="fields">
                                            {(userData.skills)?(
                                                userData.skills.map((skill)=>{
                                                    return <div className="field">{skill}</div>
                                                })
                                            ):(
                                                <Skeleton variant='rectengular' animation="wave" sx={{ bgcolor: '#2B2B2B' }} className='empty-field' />
                                            )}
                                        </div>
                                        {
                                            (userData)?(
                                                (decoded && decoded._id==userData.id)?(
                                                    <Link to={`/${decoded._id}/edit`}>
                                                    <motion.div
                                                            whileTap={{scale:0.9}} 
                                                            className="edit-btn-cont">
                                                            <div className="edit-btn">
                                                                Edit profile
                                                            </div>
                                                       
                                                          </motion.div>
                                                    </Link>

                                                ):''
                                            ):(
                                               <Skeleton variant='rectengular' animation="wave" sx={{ bgcolor: '#2B2B2B' }} className='empty-field-btn' />
                                            )
                                        }
                                        </>
                                         
                                    ):(
                                        <>
                                            <Skeleton animation="wave"  sx={{ bgcolor: '#2B2B2B' , border:'none' }} className='empty-field-username' width={'70%'} />
                                            <div className="fields">
                                               <Skeleton variant='rectengular' animation="wave" sx={{ bgcolor: '#2B2B2B' }} className='empty-field' />
                                               <Skeleton variant='rectengular' animation="wave" sx={{ bgcolor: '#2B2B2B' }} className='empty-field-btn' />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                <Grids setPopupOpen={setPopupOpen} setCourseAcitve={setCourseAcitve} userData={userData} ></Grids>
            </div>
        </motion.div>
    </div>
  )
}


const Grids = ({userData , setCourseAcitve,setPopupOpen}) => {
    let [navState,setNavState] = useState(0)
    let hasVideo = false
    const navigate = useNavigate()
    const videoNavVariants = {
        first:{
            x:0
        },
        second:{
            x:"-100vw"
        }
    }
   if(userData) return(
<div className="video-data">
    <div className="video-nav">
        <div onClick={()=>setNavState(0)} className="nav-elements">
            <motion.h1 
             className="nav-header"
             animate={navState==0?{color:'#CECECE'}:{color:'#797979'}}
             >
                {
                    (userData && userData.userType=='student')?(
                        'Subscribed'                                            
                    ):(userData && userData.userType=='teacher')?'Posted':''
                }
            </motion.h1>
        </div>
        <div  onClick={()=>setNavState(1)} className="nav-elements">
            <motion.h1 
             className="nav-header"
             animate={navState==0?{color:'#797979'}:{color:'#CECECE'}} 
            >
                {
                    (userData && userData.userType=='student')?(
                        'Posted'                                            
                    ):(userData && userData.userType=='teacher')?'Subscribed':''
                }
            </motion.h1>
        </div>
        <motion.div 
         className="line"
         animate={navState==0?{x:0}:{x:'100%'}}
         transition={{ease:'linear' , duration:0.4}}
        ></motion.div>
    </div>
    <div className="video-grids">
        <motion.div 
          animate={navState==0?"first":"second"}
          variants={videoNavVariants} 
          transition={{ease:'linear', duration:0.4}}
          className="playlists"
        >

            <div style={{order:userData.userType=='student'?2:1}} className="grid">
                {userData?(
                  userData.uploadedCourses && userData.uploadedCourses.length?(
                      <Videos setPopupOpen={setPopupOpen} setCourseAcitve={setCourseAcitve} uploadedCourses={userData.uploadedCourses} thumbnails={userData.thumbnails}/>
                   ):(
                      <Empty userType={userData.userType} />
                   )
                ):(
                    <div className="videoListCont">
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                    </div>
                )}
            </div>
            <div style={{order:userData.userType=='student'?1:2}} className="grid">
                {userData?(
                    userData.subscribedCourses &&  userData.subscribedCourses.length?(
                      <Videos setPopupOpen={setPopupOpen} setCourseAcitve={setCourseAcitve} uploadedCourses={userData.subscribedCourses} thumbnails={userData.thumbnails}/>
                   ):(
                      <Empty userType={userData.userType=="student"?"teacher":"student"} />
                   )
                ):(
                    <div className="videoListCont">
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                        <Skeleton variant='rectengular' animation="wave" className='videoCont' />
                    </div>
                )}
            </div>
          </motion.div>
    </div>
</div>
)}




export const Empty = ({userType}) => {
    
    return(
        <div className="empty-container">
            <img draggable="false" src={earth} alt="" className="earth" />
                <div className="text">
                    <div 
                    onClick={()=>{
                        if(userData.userType=="student"){
                            navigate('/explore')
                        }
                        else{
                            navigate('/upload')
                        }
                    }} 
                    className="notify-heading">
                        {
                            userType=='student'?(
                                    'Find skills from all over the world'                                     
                            ):(
                                'Share your skills with the rest of the world'
                            )
                        }
                    </div>
                <div className="notify-subheading">
                    {
                        userType=='student'?(
                            <Link to="/explore">
                                <h1 className="sub">
                                    <span className='bold'>
                                        Enroll in
                                    </span>
                                    your first 
                                    <span className='italic'>
                                        course                                
                                    </span>
                                </h1> 
                            </Link>
                                                            
                        ):(
                            <Link to="/upload">
                                <h1 className="sub">
                                    <span className='bold'>Create 
                                        <span className='bold'>your</span>
                                    </span>
                                    your first 
                                    <span className='italic'>
                                        course                                
                                    </span>
                                </h1>
                            </Link>
                                
                        )
                    } 
                </div>
            </div>
    </div>
    )
}




const Videos = ({thumbnails,uploadedCourses,setCourseAcitve,setPopupOpen}) => {
    const list = [0,1,2,4]
    let controls = useDragControls()
////    console.log(uploadedCourses,'ase naki?')
    return(
          <div 
           className="videoListCont">
              {uploadedCourses.map((course,index)=>{
////                  console.log(course.subscribedCount,'counts')
                  return (
                    <div className="videoCont">
                        <img draggable="false" onClick={()=>{
                            console.log(course,'non-popu')
                            setCourseAcitve(course)
                            setPopupOpen(true)
                         }} src={import.meta.env.VITE_API_URL+course.coverPhotoLink} alt="" />
                         <div className="subs-cont">
                            <div className="subs">
                               <img src={squarePlay} alt="" />
                               <h1>{course.subscribedCount}</h1>
                            </div>
                         </div>
                    </div>
                  )
              })}
          </div>
    )
}

