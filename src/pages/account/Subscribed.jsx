import React, { useEffect , useState } from 'react'
import { CoursePack } from '../explore/HorizontalSwiper'
import {Nav} from './../Nav'
import { Link } from 'react-router-dom'
import { motion , AnimatePresence} from 'framer-motion'
import axios from 'axios'
import linkTo from './../../assets/images/link-to.svg'
import smallPlay from './../../assets/images/small-play.svg'
import whiterDelete from './../../assets/images/whiter-delete.svg'
import SubscribeCta from '../components/SubscribeCta'
const Subscribed = () => {
    let token = localStorage.getItem('accessToken')
    let [subscribed,setSubscribed] = useState([])
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
                   console.log(res.data,'responsibleee')
                   setSubscribed(res.data.subscribed)
               })
               .catch(err=>{
                   console.log(err)
               })

        }
    },[])
    useEffect(()=>{
       console.log(subscribed,'subuu')
    },[subscribed])
    return (
    <div className='subscribed-page'>
      <Nav/>
      <div className="cards">
        {subscribed && subscribed.length?(
           subscribed.map(subscribe=>{
              return <Card setSubscribed={setSubscribed} subscribe={subscribe} />
           })
        ):''}
      </div>
    </div>
  )
}


const Card = ({subscribe,setSubscribed}) => {
    const [cardData,setCardData]=useState(null)
    let userData = localStorage.getItem('userData')
    const [subscribedState,setSubscribedState]=useState(true)
    const [remove,setRemove] = useState(false)
    const [kill,setKill] = useState(false) 
    console.log(cardData,'dat')
    useEffect(()=>{
      let url = `${import.meta.env.VITE_API_URL}/video/get/${subscribe}/compress`
      axios.get(url)
          .then(res=>{
              console.log(res.data.data,'card-data')
              setCardData(res.data.data)

          //    setCardData(res)
          })
          .catch(err=>{
              console.log(err)
          })
    },[])
    useEffect(()=>{
         if(remove){
            setTimeout(()=>{
               setKill(true)
               setCardData(null)
            },5000)
            console.log('removing')
         }
    },[remove])
    if(cardData) return(
      <div className="card-container">
        <motion.div
         animate={remove?{x:'-140%',height:0}:{x:0}}
         transition={{delay:2}}
         className='card'>
           <div className="card-cont">
               <div className="desc-cont">
                    <div className="text">
                        <h1 className='title'>
                          <Link to={`/course/${cardData.courseId}`} >
                            {cardData.courseName}
                          </Link>                       
                        </h1>
                        <SubscribeCta setRemove={setRemove} courseId={cardData.courseId} setSubscribed={setSubscribed} subscribedState={subscribedState} setSubscribedState={setSubscribedState}></SubscribeCta>
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
        {/* <motion.div 
          animate={remove?{x:'-140%',height:0}:{x:0}}
          transition={{delay:4}}
          className="covering"> */}
          <AnimatePresence>
            {remove && !kill && <DeletePopup/>}  
          </AnimatePresence>
        {/* </motion.div> */}
              
      </div>
    )
} 


const DeletePopup = () => {
   const [popupRemoved,setPopupRemoved]=useState(false)
   useEffect(()=>{
      setTimeout(()=>{
         setPopupRemoved(true)
      },2000)
   },[])
   return(
    <motion.div
      initial={{scaleY:0,height:0,opacity:0}}
      animate={
        popupRemoved?{x:'-140%'}:{
          scaleY:1,
          height:'auto',
          opacity:1,
          x:0
        }
      } 
      transition={popupRemoved?{delay:2}:{}}
      exit={{scaleY:0,height:0,opacity:0,height:0}}
      className="warn-cont">
      <div className="warn">
          <div className="text">
            <div className="context">
                <img src={whiterDelete} alt="" />
                <h1>Video unsubscribed</h1> 
            </div>
            <h1 className="undo">
                Undo
            </h1>
          </div>
      </div>
    </motion.div>
   )
}


export default Subscribed
