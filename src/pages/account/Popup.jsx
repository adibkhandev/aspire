import React, { useState , useRef , useLayoutEffect } from 'react'
import {motion} from 'framer-motion'
import Player from '../../components/Player';
import { jwtDecode } from "jwt-decode";

const Popup = ({course,setCourse}) => {
  const [lastVal,setLastVal] = useState(0)
  const accessToken = localStorage.getItem('accessToken')?JSON.stringify(localStorage.getItem('accessToken')):null
  const decoded = accessToken? jwtDecode(accessToken):null
  const [height, setHeight] = useState(0);
  const popupRef = useRef(null);

  useLayoutEffect(() => {
    console.log(popupRef.current.clientHeight)
    setHeight(popupRef.current.clientHeight);
  });
  // console.log(decded)
  return (
    <motion.div
      ref={popupRef}
      initial={{top:'180vh'}}
      animate={course?{top:`calc(100vh - ${height}px)`}:{top:'180vh'}}
      transition={{delay:0 }}
      className='popup-container'
      drag='y'
      dragConstraints={{top:0,bottom:0}}
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
