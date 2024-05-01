import React, { useState , useRef , useLayoutEffect } from 'react'
import {motion} from 'framer-motion'
import Player from '../../components/Player';
import { jwtDecode } from "jwt-decode";

const Popup = ({course,deleteMode,setDeleteMode,setCourse,popupOpen,setPopupOpen,deleteInitiated,setDeletePrompt}) => {
  const [lastVal,setLastVal] = useState(0)
  const accessToken = localStorage.getItem('accessToken')?JSON.stringify(localStorage.getItem('accessToken')):null
  const decoded = accessToken? jwtDecode(accessToken):null
  const [height, setHeight] = useState(0);
  const popupRef = useRef(null);
  // console.log(popupOpen,'popstate')
  return (
    //container--make
    <motion.div 
     animate={popupOpen?{top:0}:{top:'100vh'}}
     className="popup-holder" onClick={(e)=>{
      e.stopPropagation()
      console.log('clickssss')
      setPopupOpen(false)
    }}>
    <motion.div
      ref={popupRef}
      initial={{bottom:'-180vh'}}
      animate={popupOpen?
        {
          bottom:0,
          transition:{
             type:'spring' ,
             duration:1
          }
        }:
        {
          bottom:'-180vh'
        }
      }
      className='popup-container'
      drag='y'
      dragConstraints={{top:0,bottom:0}}
      dragElastic={0.6}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
      onDragEnd={
        (event, info) =>{
         console.log(info.offset,info.offset.y)
         if(info.offset.y>170){
             setPopupOpen(null)
         }
            
        }  
      }
    >
        {
            course?(
               <Player setPopupOpen={setPopupOpen} deleteMode={deleteMode} setDeleteMode={setDeleteMode}  deleteInitiated={deleteInitiated} setDeletePrompt={setDeletePrompt} popupOpen={popupOpen} course={course} setCourse={setCourse} popupRef={popupRef} setHeight={setHeight}/>
            ):''
        }
       
    </motion.div>
    </motion.div>
  )
}

export default Popup
