import React, { useState } from 'react'
import {motion} from 'framer-motion'
import Player from '../../components/Player';
import { jwtDecode } from "jwt-decode";

const Popup = ({course,setCourse}) => {
  const [lastVal,setLastVal] = useState(0)
  const accessToken = localStorage.getItem('accessToken')?JSON.stringify(localStorage.getItem('accessToken')):null
  const decoded = accessToken? jwtDecode(accessToken):null
  
  // console.log(decded)
  return (
    <motion.div
      
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
               <Player course={course} />
            ):''
        }
       
    </motion.div>
  )
}

export default Popup
