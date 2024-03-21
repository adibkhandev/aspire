import React, { useEffect , useState } from 'react'
import { CoursePack } from '../explore/HorizontalSwiper'
import {Nav} from './../Nav'
import { Link } from 'react-router-dom'
import { motion , AnimatePresence , useAnimate} from 'framer-motion'
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
    //gen
    let moverTime = 5
    let shrinkTime = 1
    let leaver = shrinkTime + moverTime
    let wait = 0.2
    //err
    let spaceCreateTime = 0.3
   let extraforAppear = 0.05
   let entranceTime = spaceCreateTime + extraforAppear
   let exitTime = entranceTime + moverTime + shrinkTime
   let errorSpan = entranceTime + exitTime
   let cardSpan = entranceTime + wait + moverTime + shrinkTime 
   let totalTime = cardSpan + errorSpan 
   //card
    
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
    const [hidden,setHidden] = useState(false)
    useEffect(()=>{
         if(remove){
            cardAnimation()
            setTimeout(()=>{
               setKill(true)
               setCardData(null)
            },(totalTime+0.4)*1000)
            console.log('removing')
         }
    },[remove])
    const [scope,animate] = useAnimate()
    const cardAnimation = async() => {
       await animate(scope.current,{
         x:'-140%'
       },{
         duration:1,
         delay:2
       })
       await animate(scope.current,{
         height:0
       },{
        duration:1,
      })
    }

    if(cardData) return(
      <div className="card-container">
        <motion.div
         ref={scope}
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
          <AnimatePresence>
            {remove && !kill && <DeletePopup/>}  
            {/* <DeletePopup/> */}
          </AnimatePresence>
              
      </div>
    )
} 


const DeletePopup = () => {
   const [cardRemoved,setCardRemoved]=useState(false)
   //gen
   let moverTime = 5
   let shrinkTime = 1
   let leaver = shrinkTime + moverTime
   //err  
   let spaceCreateTime = 0.3
   let extraforAppear = 0.05
   let entranceTime = spaceCreateTime + extraforAppear
   //card
   let wait = 0.2
   let cardSpan = entranceTime + wait + moverTime + shrinkTime  

   
   let totalTime = cardSpan + entranceTime 
  //  let disapppearTime = 0.5
  //  let startMovingTime = entranceTime+moverTime 
  const [scope,animate] = useAnimate()
  const undoAnimation = async() => {
    await animate(scope.current,{
      x:'-140%'
    },{
      duration:1,
      delay:5
    })
    await animate(scope.current,{
      height:0
    },{
     duration:0.7,
   })
 }
   useEffect(()=>{
     undoAnimation()
   },[])
   return(
    <motion.div
      initial={{scaleY:0,height:0}}
      animate={{
          scaleY:1,
          height:'4em',
          opacity:1,
          x:0
      }} 
      exit={{scaleY:0,height:0}}
      ref={scope}
      className="warn-cont">
      <motion.div
        initial={{y:0}}
        animate={{y:'20em'}}
        transition={{delay:0,duration:1}} 
        className="warn">
          <div className="text">
            <div className="context">
                <img src={whiterDelete} alt="" />
                <h1>Video unsubscribed</h1> 
            </div>
            <h1 className="undo">
                Undo
            </h1>
          </div>
      </motion.div>
    </motion.div>
   )
}


export default Subscribed
