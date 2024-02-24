import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import MotionCta from '../components/MotionCta'
import { motion } from 'framer-motion'
import bigPlus from './../../assets/images/big-plus.svg'
import { Nav } from '../Nav'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
const EditVideo = () => {
  const {videoId} = useParams()
  const [video,setVideo] = useState(null)
  const user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')):null
  console.log(user,'data')
  const navigate = useNavigate()
  const url = import.meta.env.VITE_API_URL + '/video/get/small/' +videoId
  useEffect(()=>{
      console.log(user.uploadedCourses,'up')  
      if(user && videoId){
        axios.get(url)
            .then(response=>{
                 console.log(response.data,'yyyyyyyy')
                 setVideo(response.data.video)   
             })
            .catch(err=>{
                console.log(err)
            })
      }
      else{
         navigate('/')
      }


  },[])
  const updateHandler = () => {
      
  }
  console.log(video,'vidddd')
  return (
    <div>
      <Nav></Nav>
      <form onSubmit={updateHandler}>
        <EditVideoForm video={video}></EditVideoForm>
      </form>
    </div>
  )
}
const EditVideoForm = ({video}) => {
  const input = useRef(null)
  const videoTitleRef = useRef(null)
  const videoDescribeRef = useRef(null)
  const [changesMade,setChangesMade] = useState(false)
  const [videoThere,setVideoThere]=useState(false)
  const check = (e) => {
    console.log('sadsa')
    if( videoTitleRef.current , videoDescribeRef.current){
       if(
          videoTitleRef.current.value ||
          videoDescribeRef.current.value ||
          videoThere
        ){
            console.log('changing')
            setChangesMade(true)
        }
        else{
          setChangesMade(false)
        }
    }
  }
  useEffect(()=>{
      check()
  },[videoThere])
  console.log(video,'ashee')
   if(video) return (
      <div onClick={e=>{
          e.stopPropagation()
          check()
      }} onChange={()=>check()}  className="upload-parts" id='video'>
        <div className="videos">
          <motion.div 
           whileTap={{ scale: 0.97 }}
           onClick={()=>{
            console.log(input.current)
               if(input){
                 input.current.click()
               } 
           }}
           className="video-clicker">
            <div className="video-clicker-contents">
              <img src={bigPlus} alt="" className="plus" />
              <div className="desc">
                 Click to <span>select</span> video
              </div>
            </div>
          </motion.div>
          <div className="entitle-cont videoNameCont">
              <input ref={videoTitleRef}  placeholder={video.title} id="entitle" type="text" name='title'       className='regular-inputs' />
          </div>
          <div className="textarea-container" id="custom-textarea">
              <textarea ref={videoDescribeRef}  name='description' placeholder={video.description}   id="" className=""rows="9"></textarea>
          </div>
          <div className="handy-btns">
              <motion.div  whileTap={{ scale: 0.98 }} onClick={()=>{
                    navigate(-1)
              }} className="secondary-btn">Go back</motion.div>
              <MotionCta submit={true} changesMade={changesMade} text={'Continue'}></MotionCta>
          </div>
          <input onChange={(e)=>{
            if(e.target.files[0]){
                setVideoThere(true)
            }
          }} ref={input} className="hidden" type="file" name="video" id="" />
        </div>
      </div>
    )
}

export default EditVideo
