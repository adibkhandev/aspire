import React, { useEffect , useRef, useState ,useLayoutEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { motion , AnimatePresence , useAnimate, useAnimation , useInView} from 'framer-motion'
import {DelayedSubscribeCta} from '../components/SubscribeCta'
import DeletePopup from './../../components/DeletePopup'
import linkTo from './../../assets/images/link-to.svg'
import smallPlay from './../../assets/images/small-play.svg'
import axios from 'axios'
export const Card = ({subscribe,setSubscribed,setEmpty,setValidVideos,validVideos}) => {
    const [cardData,setCardData]=useState(null)
    let userData = localStorage.getItem('userData')
    const [subscribedState,setSubscribedState]=useState(true)
    const [remove,setRemove] = useState(false) 
    const [undo,setUndo]=useState(false)
    const [kill,setKill] = useState(false)
    
    const cardRef = useRef(null)
    const isInView = useInView(cardRef)
//    console.log(subscribe,'dat')
    useEffect(()=>{
      let url = `${import.meta.env.VITE_API_URL}/video/get/${subscribe}/compress`
      axios.get(url)
          .then(res=>{
//              console.log(res.data.data,'card-data')
              setCardData(res.data.data)
              // if(res.data.data) setValidVideos(()=>validVideos+1)
          })
          .catch(err=>{
//              console.log(err,'err')
              if(res.data.data) setValidVideos(()=>validVideos-1)
          })
    },[])
    useEffect(()=>{
//      console.log(isInView,'ass?')
   },[isInView])
    const [hidden,setHidden] = useState(false)
    const [scope,animate] = useAnimate()
    const controls = useAnimation()











    useEffect(()=>{
//      console.log('changing to ' , remove)
         if(remove){
            const cardAnimation = async() => {
              await animate('.card',{
                x:'-140%'
              },{
                duration:1,
                delay:3,
                onComplete: ()=>{
                  setHidden(true)
                }
              })
              console.log('has turned',hidden)
            }
            cardAnimation()
         }
         else{
//           console.log('anime called')
//     undo
          const reverseCardAnimation = async() => {
            await animate('.card',{
              x:0
            },{
              duration:0.2,
            })
            console.log('has turned tto',hidden)
          }
          reverseCardAnimation()
         }
    },[remove])
    useEffect(()=>{
       if(hidden && remove){
          const cardLeaves = async() => {
            await animate('.decoy',{
              height:'0px'
            },{
              duration:1,
              onPlay: ()=>{
                 console.log('shrinkkk')
              }
            })
//            console.log('turned to disappear')
            
            await animate('.card',{
              margin:0
            })
//////////////////////////////////////////////////
          }
          cardLeaves()
       }

       //undo
       if(!remove && hidden){
        const reviveSize = async()=> {
          await animate('.decoy',{
            height:`${cardRef.current.clientHeight}px`,
            marginBlock:'0.6em',
          },{
            duration:0.2,
            onPlay: ()=>{
              console.log('shrinkkk')
           }
          })
        }
         reviveSize()
         setHidden(false)
       }
    },[hidden,remove])







    
    const navigate = useNavigate()
    const ref = useRef(null)
    if(cardData) return(
      // <Link to={`/course/${cardData.courseId}`}>
      
      <motion.div
       ref={scope}
      //  onClick={e=>{
      //    e.stopPropagation()
      //       navigate(`/course/${cardData.courseId}`)
      //  }}
       className="card-container">
       <motion.div 
        className="decoy">
        <motion.div
        //  ref={scope}
        whileTap={{ scale: 0.98 }} 
        ref={cardRef}
         className='card'>
           <div className="card-cont">
               <div className="desc-cont">
                    <div className="text">
                        <h1 className='title'>
                          <Link to={`/course/${cardData.courseId}`} >
                            {cardData.courseName}
                          </Link>                       
                        </h1>
                        <DelayedSubscribeCta undo={undo} setUndo={setUndo} setRemove={setRemove} courseId={cardData.courseId} setSubscribed={setSubscribed} subscribedState={subscribedState} setSubscribedState={setSubscribedState}></DelayedSubscribeCta>
                    </div>
                    <Link to={`/course/${cardData.courseId}`} >
                      <img className='link' src={linkTo} alt="" />
                    </Link>
               </div>
               <div className="cover">
                   <img src={import.meta.env.VITE_API_URL + cardData.cover} alt="" />
               </div>
               <div className="end">
                 <Link to={`/profile/${cardData.uploaderName}`}>
                   <div className="author-cont">
                        <div className="pfp-cont">
                            <img src={import.meta.env.VITE_API_URL + cardData.uploaderPicture} alt="" />
                        </div>
                        <div className="author-name">
                            {cardData.courseName}
                        </div>
                       
                    </div>
                  </Link>
                    <div className="videoCount">
                        <div className="num">
                        {cardData.videos}
                        </div>
                        <img src={smallPlay} alt="" />
                    </div>
               </div>
           </div>
        </motion.div>

       </motion.div>

          <AnimatePresence>
            {((remove) || undo) && <DeletePopup validVideos={validVideos} setValidVideos={setValidVideos} undo={undo} setUndo={setUndo} remove={remove} setRemove={setRemove}/>}
          </AnimatePresence>
              
      </motion.div>
    //  </Link>
    )
} 
