import React, { useEffect , useRef, useState ,useLayoutEffect } from 'react'
import { CoursePack } from '../explore/HorizontalSwiper'
import {Nav} from './../Nav'
import { Link } from 'react-router-dom'
import { motion , AnimatePresence , useAnimate, useAnimation , useInView} from 'framer-motion'
import axios from 'axios'
import linkTo from './../../assets/images/link-to.svg'
import smallPlay from './../../assets/images/small-play.svg'
import { Empty } from './Account'
import {DelayedSubscribeCta} from '../components/SubscribeCta'
import DeletePopup from './../../components/DeletePopup'
const Subscribed = () => {
    let token = localStorage.getItem('accessToken')
    let [subscribed,setSubscribed] = useState([])
    const [validVideos,setValidVideos]= useState(null)
    const [empty,setEmpty]=useState(true)
    const cardsRef = useRef(null)
    
    useEffect(()=>{
       console.log(validVideos,'valid?')
    },[validVideos])
    
    useEffect(()=>{
        if(token){
            let headers = {
                headers:{
                    'Authorization':'Bearer ' + token,
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
                }
            }
            let url = `${import.meta.env.VITE_API_URL}/user/subscribed`
            axios.get(url,headers)
               .then(res=>{
                   console.log(res.data.subscribed,'responsibleee')
                   setSubscribed(res.data.subscribed)
                   setValidVideos(res.data.subscribed.length)
               })
               .catch(err=>{
                   console.log(err)
               })
        }
    },[])
    useEffect(()=>{
       console.log(empty,'emmmmmmmm')
    },[empty])
    // useEffect(()=>{
    //   const timeout = setTimeout(()=>{
    //     console.log(cardsRef.current.clientHeight,'h')
    //     if(cardsRef.current.clientHeight<100){
    //     console.log('calls')
    //         setEmpty(true)   
    //     }
    //     else{
    //       console.log('fails')
    //     }
    //   },4000)
    //   return()=>{
    //     clearTimeout(timeout)
    //   }
    // },[cardsRef.current])
    return (
    <div className='subscribed-page'>
      <Nav/>
      <div ref={cardsRef} className="cards">
        {subscribed ?(
              subscribed.map(subscribe=>{
                console.log(subscribe,'subuuu')
                return <Card validVideos={validVideos} setValidVideos={setValidVideos} setEmpty={setEmpty} setSubscribed={setSubscribed} subscribe={subscribe} />
              })
               
          ):''
        }
        {!validVideos && validVideos<1 ? <Empty userType={'student'} ></Empty>:''}
      </div>
    </div>
  )
}


const Card = ({subscribe,setSubscribed,setEmpty,setValidVideos,validVideos}) => {
    const [cardData,setCardData]=useState(null)
    let userData = localStorage.getItem('userData')
    const [subscribedState,setSubscribedState]=useState(true)
    const [remove,setRemove] = useState(false) 
    const [undo,setUndo]=useState(false)
    const [kill,setKill] = useState(false)
    
    const cardRef = useRef(null)
    const isInView = useInView(cardRef)
    console.log(subscribe,'dat')
    useEffect(()=>{
      let url = `${import.meta.env.VITE_API_URL}/video/get/${subscribe}/compress`
      axios.get(url)
          .then(res=>{
              console.log(res.data.data,'card-data')
              setCardData(res.data.data)
              // if(res.data.data) setValidVideos(()=>validVideos+1)
          })
          .catch(err=>{
              console.log(err,'err')
              if(res.data.data) setValidVideos(()=>validVideos-1)
          })
    },[])
    useEffect(()=>{
      console.log(isInView,'ass?')
   },[isInView])
    const [hidden,setHidden] = useState(false)
    const [scope,animate] = useAnimate()
    const controls = useAnimation()
    useEffect(()=>{
      console.log('changing to ' , remove)
         if(remove && !undo){
            const cardAnimation = async() => {
              await animate('.card',{
                x:'-140%'
              },{
                duration:1,
                delay:3
              })
              setHidden(true)
            }
            cardAnimation()
         }
         else{
           console.log('anime called')
          const reverseCardAnimation = async() => {
            await animate('.card',{
              x:0
            },{
              duration:0.2,
            })
          }
          reverseCardAnimation()
         }
    },[remove,undo])
    useEffect(()=>{
       if(hidden && !undo){
          const cardLeaves = async() => {
            await animate('.decoy',{
              height:'0px'
            },{
              duration:1,
            })
            console.log('turned to disappear')
            
            await animate('.card',{
              margin:0
            })
           
          }
          cardLeaves()
       }
       if(undo){
        const reviveSize = async()=> {
          await animate('.decoy',{
            height:`${cardRef.current.clientHeight}px`
          },{
            duration:0.2,
          })
        }
         reviveSize()
         setHidden(false)
       }
    },[hidden,undo])
    if(cardData) return(
      <motion.div
       ref={scope}
       className="card-container">
       <motion.div 
        className="decoy">
        <motion.div
        //  ref={scope}
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
                            {cardData.courseId}
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
    )
} 





// const [remove,setRemove] = useState(false) 












export default Subscribed