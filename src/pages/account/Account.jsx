import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { easeIn, motion , useDragControls } from 'framer-motion'
import { Nav } from '../Nav'
import earth from './../../assets/images/earth.svg'
import axios from 'axios'
import Popup from './Popup'
import { Link } from "react-router-dom";
import {Skeleton} from '@mui/material'
import { jwtDecode } from "jwt-decode";
export const Account = () => {
    let {username} = useParams()
    let [userData,setUserData] = useState(null)
    let [courseActive,setCourseAcitve] = useState(null)
    let hasVideo = true
    const accessToken = localStorage.getItem('accessToken')?JSON.stringify(localStorage.getItem('accessToken')):null
    const decoded = accessToken? jwtDecode(accessToken):null
    console.log(decoded,'pay')
    const [popupOpen,setPopupOpen] = useState(false)
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
                    console.log(response.data,'acount data')
                    setUserData(response.data)
                })
                .catch((err)=>{
                    console.log(err)
                })
    },[])
    const homeVariants = {
        non:{
            filter:'brightness(100%) blur(0px)',
            scale:1,
        },
        blur:{
            filter:'brightness(50%) blur(1px)',
            scale:1.01
        }
    }
    return (
        <div className='home-container'>
            <Popup setPopupOpen={setPopupOpen} popupOpen={popupOpen}  course={courseActive} setCourse={setCourseAcitve}></Popup>
            <motion.div
              className='home'
              variants={homeVariants}
              animate={!popupOpen?"non":"blur"}
              transition={{delay:0.08}}
            >
                <Nav></Nav>
                <div onClick={()=>{
                    if(popupOpen){
                        setPopupOpen(false)
                    }
                    
                }} className="account-container">
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
                                                    <motion.div
                                                            whileTap={{scale:0.9}} 
                                                            className="edit-btn-cont">
                                                            <div className="edit-btn">
                                                        <Link to={`/${decoded._id}/edit`}>
                                                                Edit profile
                                                        </Link>
                                                            </div>
                                                       
                                                          </motion.div>

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
    return(
<div className="video-data">


    {/* //nav */}
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
    

    {/* // */}




    <div className="video-grids">
        <motion.div 
          animate={navState==0?"first":"second"}
          variants={videoNavVariants} 
          transition={{ease:'linear', duration:0.4}}
          className="playlists"
        >

            <div className="grid">
                {userData?(
                   userData.uploadedCourses.length?(
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
            <div className="grid">
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




const Empty = ({userType}) => {
    
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
                            <h1 className="sub">
                                <span className='bold'>
                                    Enroll in
                                </span>
                                your first 
                                <span className='italic'>
                                    course                                
                                </span>
                            </h1> 
                                                            
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
    console.log(uploadedCourses,'ase naki?')
    return(
          <div 
           className="videoListCont">
              {uploadedCourses.map((course,index)=>{
                  return (
                    <div className="videoCont">
                        <img draggable="false" onClick={()=>{
                            setCourseAcitve(course)
                            setPopupOpen(true)
                         }} src={import.meta.env.VITE_API_URL+course.coverPhotoLink} alt="" />
                    </div>
                  )
              })}
          </div>
    )
}

