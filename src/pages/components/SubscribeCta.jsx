import React , {useEffect , useState} from 'react'
import axios from 'axios';
import { motion } from 'framer-motion';
const SubscribeCta = ({subscribed,setSubscribed,courseId}) => {
    const token = localStorage.getItem('accessToken');
    const [user,setUser] = useState(localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null)
    const subscribedTo = user ? (user.subscribedCourses.map(course=>{
        return course._id
    })):null
    console.log(user)
    useEffect(()=>{
      console.log(user,courseId,'asee')
        if(subscribedTo[0] && courseId) {
          console.log(subscribedTo,'tooo')
          if(subscribedTo){
            if(subscribedTo.includes(courseId)){
                  setSubscribed(true)
                  console.log('turning true')
              }
              else{
                  setSubscribed(false)
                  console.log('turning false')
              }
          }
        }
    },[courseId,subscribedTo,user])


//   useEffect(()=>{
//       console.log(subscribed,'s')
//   },[subscribed])

// useEffect(()=>{
//    console.log(courseId,'id',subscribedTo)
// },[courseId])

    const subscribe = (process) => {
        console.log(process,'process')
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
          const url =  import.meta.env.VITE_API_URL +  `/user/${process=='un'?'un':''}subscribe` 
          axios.post(url,data,headers)
          .then((response)=>{
              console.log(response.data.user,'ssubbss')
              setUser(response.data.user)
              localStorage.setItem('userData',JSON.stringify(response.data.user))
              if(process=='in') setSubscribed(true)
              else setSubscribed(false)
           })
           .catch((err)=>{
              console.log(err.response.status)
           })
    }
  return (
    <motion.div
                  
                  className="subscription">
                    <svg   viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <motion.path  
                        d="M0.5 5.5C0.5 2.73877 2.73877 0.5 5.5 0.5C8.26123 0.5 10.5 2.73877 10.5 5.5C10.5 8.26123 8.26123 10.5 5.5 10.5C2.73877 10.5 0.5 8.26123 0.5 5.5Z" 
                        initial={{fill:'none',stroke:"#525252"}}
                        animate={subscribed?{fill:"#0085FF",stroke:"#0085FF"}:{fill:'rgba(0,0,0,0)',stroke:"#525252"}}
                        />
                      <motion.path  d="M4.93801 7.74989L2.95801 5.76989L3.75338 4.97452L4.93801 6.15914L7.58738 3.50977L8.38276 4.30514L4.93801 7.74989Z" 
                        fill={subscribed?"#D7D7D7":"#545454"}/>
                    </svg>
                    <h1
                      onClick={()=>{
                        if(subscribed){
                            subscribe('un')
                        }
                        else{
                          subscribe('in')
                        }
                    }} 
                    >
                        {subscribed?'Subscribed':'Subscribe'}
                    </h1>
                </motion.div>
  )
}

export default SubscribeCta
