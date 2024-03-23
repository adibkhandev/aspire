import React, { useEffect , useState } from 'react'
import { CoursePack } from '../explore/HorizontalSwiper'
import {Nav} from './../Nav'
import { Link } from 'react-router-dom'
import { motion , AnimatePresence , useAnimate, useAnimation} from 'framer-motion'
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
    const [scope,animate] = useAnimate()
    const controls = useAnimation()
    useEffect(()=>{
      console.log('changing to ' , remove)
         if(remove){
            const cardAnimation = async() => {
              await animate(scope.current,{
                x:'-140%'
              },{
                duration:1,
                delay:3
              })
              await animate(scope.current,{
                height:0,
              },{
                duration:1,
              })
              
              await animate('.card',{
                margin:0
              })
            }
            cardAnimation()
         }
         else{
          const reverseCardAnimation = async() => {
            await animate(scope.current,{
              height:'100%',
            },{
              duration:1,
            })
            await animate(scope.current,{
              x:0
            },{
              duration:1,
            })
          }
          reverseCardAnimation()
         }
    },[remove])

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
            {remove && !kill && <DeletePopup remove={remove} setRemove={setRemove} setKill={setKill}/>}  
            {/* <DeletePopup remove={true}/> */}
          </AnimatePresence>
              
      </div>
    )
} 


const DeletePopup = ({remove,setRemove,setKill}) => {
  const [scope,animate] = useAnimate()
//   const undoAnimation = async() => {
//     await animate(scope.current,{
//       x:'-140%'
//     },{
//       duration:1,
//       delay:6
//     })
//     await animate(scope.current,{
//       height:0,
//       marginBlock:0
//     },{
//      duration:0.7,
//    })
//  }

 const openingUndoAnimation = async() => {
  await animate(scope.current,{
    height:'4em'
  },{
    duration:0.6
  })
 }
 
 const unhideModal = async() => {
   await animate('.warn',{
    opacity:1
  },{
    delay:1
  })
  await animate('.warn',{
    y:'200%'
  },{
    duration:0.5,
  })
  await animate(scope.current,{
    zIndex:0
  })
}
// const closingUndoAnimation = async() => {
//  await animate(scope.current,{
//    height:0
//  },{
//    duration:0.6,
//    delay:4
//  })
//  setKill(true)
// }
//  const hideModal = async() => {
//    await animate('.warn',{
//      y:0
//     },{
//       duration:0.5,
//       delay:3
//     })
//     await animate('.warn',{
//       opacity:1
//     },{
//       delay:1
//     })
//  }
   useEffect(()=>{
    if(remove){
      // undoAnimation()
      unhideModal()
      openingUndoAnimation()
    }
   },[remove])
   return(
    <motion.div
      exit={{height:0,marginBlock:0}}
      ref={scope}
      className="warn-cont">
      <motion.div
       onClick={()=>{
        setRemove(false)
        console.log('at least clicks')
       }}
        className="warn">
          <div className="text">
            <div className="context">
                <img src={whiterDelete} alt="" />
                <h1>Video unsubscribed</h1> 
            </div>
            <motion.h1 whileTap={{scale:0.2}} className="undo">
                Undo
            </motion.h1>
          </div>
      </motion.div>
    </motion.div>
   )
}


export default Subscribed
