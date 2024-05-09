import React , {useEffect , useState , useRef} from 'react'
import axios from 'axios';
import { motion } from 'framer-motion';
const SubscribeCta = ({subscribedState,setSubscribedState,setSubscribed,setRemove,courseId}) => {
    const token = localStorage.getItem('accessToken');
    const [user,setUser] = useState(localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null)
    const [justNow,setJustNow]=useState(false)
    console.log(courseId,'ids')
    useEffect(()=>{
      if(courseId && user.subscribedCourses) {
        checkSubscribeState(user.subscribedCourses)
      }
    },[user,courseId])
  const checkSubscribeState = (subscribeArray) => {
      if(subscribeArray.includes(courseId)){
        setSubscribedState(true)
        console.log('turning true')
      }
      else{
          setSubscribedState(false)
          console.log('turning false')
      }
  }
    const subscribe = () => {
        const data = {
            courseId:courseId
        }
        const headers = {
            headers:{
                'Authorization':'Bearer ' + token,
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            }
          }
          const url =  import.meta.env.VITE_API_URL +  `/user/subscribe` 
          axios.post(url,data,headers)
          .then((response)=>{
              console.log(response.data.user,'response receiving')
              setSubscribedState(true)
              setUser(response.data.user)
              localStorage.setItem('userData',JSON.stringify(response.data.user))
              
           })
           .catch((err)=>{
              console.log(err.response.status)
           })
    }
    const unsubscribe = () => {
      const data = {
        courseId:courseId
    }
    const headers = {
        headers:{
            'Authorization':'Bearer ' + token,
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }
      }
      const url =  import.meta.env.VITE_API_URL +  `/user/unsubscribe` 
      axios.post(url,data,headers)
      .then((response)=>{
          console.log(response.data.user,'unssubbss')
          setUser(response.data.user)
          localStorage.setItem('userData',JSON.stringify(response.data.user))
          setSubscribedState(false)
          if(setSubscribed && setRemove){

            ///
            setRemove(true)
            // setTimeout(()=>{
            //   setSubscribed(subscribed=>{
            //     // console.log(subscribed,'did',courseId)
            //     return subscribed.filter((subscribe=>subscribe !== courseId ))
            //   })
            // },1000)
          }
       })
       .catch((err)=>{
          console.log(err)
       })
    }
  return (
    <motion.div
      className="subscription">
        <svg   viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <motion.path  
            d="M0.5 5.5C0.5 2.73877 2.73877 0.5 5.5 0.5C8.26123 0.5 10.5 2.73877 10.5 5.5C10.5 8.26123 8.26123 10.5 5.5 10.5C2.73877 10.5 0.5 8.26123 0.5 5.5Z" 
            initial={{fill:'none',stroke:"#525252"}}
            animate={subscribedState?{fill:"#0085FF",stroke:"#0085FF"}:{fill:'rgba(0,0,0,0)',stroke:"#525252"}}
            />
          <motion.path  d="M4.93801 7.74989L2.95801 5.76989L3.75338 4.97452L4.93801 6.15914L7.58738 3.50977L8.38276 4.30514L4.93801 7.74989Z" 
            fill={subscribedState?"#D7D7D7":"#545454"}/>
        </svg>
        <h1
          onClick={()=>{
            if(subscribedState){
              unsubscribe()
            }
            else{
              subscribe()
            }
        }} 
        >
            {subscribedState?'Subscribed':'Subscribe'}
        </h1>
    </motion.div>   
  )
}





export const DelayedSubscribeCta = ({subscribedState,setSubscribedState,setSubscribed,setRemove,undo,setUndo,courseId}) => {
  const token = localStorage.getItem('accessToken');
  const [user,setUser] = useState(localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null)
  const [justNow,setJustNow]=useState(false)
  console.log(courseId,'delayy')
  const unsubscribe = () => {
    const data = {
      courseId:courseId
  }
  const headers = {
      headers:{
          'Authorization':'Bearer ' + token,
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      }
    }
    const url =  import.meta.env.VITE_API_URL +  `/user/unsubscribe` 
    axios.post(url,data,headers)
    .then((response)=>{
        console.log(response.data.user,'unssubbss')
        setUser(response.data.user)
        localStorage.setItem('userData',JSON.stringify(response.data.user))
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    
const [isUnsubscribed,setIsUnsubscribed]=useState(false)
    

useEffect(()=>{
   console.log('state --' , subscribedState)
},[subscribedState])
    
const timerRef = useRef(null)
    
useEffect(()=>{
  console.log(isUnsubscribed,'is unsubscribing')
    if(isUnsubscribed){
      console.log('turning tho')
       timerRef.current = setTimeout(unsubscribe,8000)
       console.log('setting timeout')
    }
    return()=> clearTimeout(timerRef.current)
},[isUnsubscribed])
useEffect(()=> {
   if(undo){
     clearTimeout(timerRef.current)
     setIsUnsubscribed(false)
   }
},[undo])
// const delayedSubscribe = (undo) => {
//   const timerToSubscribe = setTimeout(unsubscribe,8000)
//   if(undo){
//     clearTimeout(timerToSubscribe)
//   }
// }
// useEffect(()=>{
//    if(!subscribedState){
//     delayedSubscribe(undo)
//    }
// },[undo])
// useEffect(()=> {
//    if(undo){
//      setSubscribedState(true)
//    }
// },[undo])
return (
  <motion.div
    className="subscription">
      <svg   viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path  
          d="M0.5 5.5C0.5 2.73877 2.73877 0.5 5.5 0.5C8.26123 0.5 10.5 2.73877 10.5 5.5C10.5 8.26123 8.26123 10.5 5.5 10.5C2.73877 10.5 0.5 8.26123 0.5 5.5Z" 
          initial={{fill:'none',stroke:"#525252"}}
          animate={!isUnsubscribed?{fill:"#0085FF",stroke:"#0085FF"}:{fill:'rgba(0,0,0,0)',stroke:"#525252"}}
          />
        <motion.path  d="M4.93801 7.74989L2.95801 5.76989L3.75338 4.97452L4.93801 6.15914L7.58738 3.50977L8.38276 4.30514L4.93801 7.74989Z" 
          fill={!isUnsubscribed?"#D7D7D7":"#545454"}/>
      </svg>
      <h1
        onClick={()=>{
            console.log('on')
            setUndo(false)
            setIsUnsubscribed(true)
            setSubscribedState(false)
            setRemove(true)
      }} 
      >
          {subscribedState?'Subscribed':'Subscribe'}
      </h1>
  </motion.div>   
)
}



export default SubscribeCta
