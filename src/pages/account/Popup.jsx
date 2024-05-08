import React, { useState , useRef , useLayoutEffect } from 'react'
import {motion} from 'framer-motion'
import Player from '../../components/Player';
import { jwtDecode } from "jwt-decode";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useNavigate } from 'react-router';
const Popup = ({course,deleteMode,setDeleteMode,setCourse,popupOpen,setPopupOpen,deleteInitiated,setDeletePrompt}) => {
  const [lastVal,setLastVal] = useState(0)
  const accessToken = localStorage.getItem('accessToken')?JSON.stringify(localStorage.getItem('accessToken')):null
  const decoded = accessToken? jwtDecode(accessToken):null
  const [height, setHeight] = useState(0);
  const popupRef = useRef(null);
  const navigate = useNavigate()
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 993px) and (max-width : 1200px)"
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1201px)"
  );
  // console.log(popupOpen,'popstate')
  return (
    //container--make
    <motion.div 
     animate={popupOpen?{top:'calc(29rem - 17vw)'}:{top:'100vh'}}
     className="popup-holder" onClick={(e)=>{
      e.stopPropagation()
      console.log('clickssss')
      setPopupOpen(false)
    }}>
    <motion.div
      ref={popupRef}
      initial={{bottom:'-100vh'}}
      animate={popupOpen?
        {
          bottom:0,
          transition:{
             type:'spring' ,
             duration:2,
             mass:isSmallDevice?1.4:isMediumDevice?1.2:isLargeDevice?1.2:0.9
          }
        }:
        {
          bottom:'-100vh'
        }
      }
      className='popup-container'
      drag='y'
      dragConstraints={{top:0,bottom:0}}
      dragElastic={isSmallDevice?0.4:isMediumDevice?0.3:isLargeDevice?0.2:0.1}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 25 }}
      onDragEnd={
        (event, info) =>{
         console.log(info.offset,info.offset.y)
         if(info.offset.y>170){
             setPopupOpen(null)
         }
         if(info.offset.y<-130){
             navigate('/course/'+ course._id)
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
