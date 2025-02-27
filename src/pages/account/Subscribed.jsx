import React, { useEffect , useRef, useState ,useLayoutEffect } from 'react'
import { CoursePack } from '../explore/HorizontalSwiper'
import {Card} from './SubscribeCard'
import { Nav } from './../Nav'
import axios from 'axios'
import { Empty } from './Account'
const Subscribed = () => {
    let token = localStorage.getItem('accessToken')
    let [subscribed,setSubscribed] = useState([])
    const [validVideos,setValidVideos]= useState(null)
    const [empty,setEmpty]=useState(true)
    const cardsRef = useRef(null)
    useEffect(()=>{
//       console.log(validVideos,'valid?')
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
//                   console.log(res.data.subscribed,'responsibleee')
                   setSubscribed(res.data.subscribed)
                   setValidVideos(res.data.subscribed.length)
               })
               .catch(err=>{
//                   console.log(err)
               })
        }
    },[])
    useEffect(()=>{
//       console.log(empty,'emmmmmmmm')
    },[empty])
    // useEffect(()=>{
    //   const timeout = setTimeout(()=>{
//    //     console.log(cardsRef.current.clientHeight,'h')
    //     if(cardsRef.current.clientHeight<100){
//    //     console.log('calls')
    //         setEmpty(true)   
    //     }
    //     else{
//    //       console.log('fails')
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
//                console.log(subscribe,'subuuu')
                return <Card validVideos={validVideos} setValidVideos={setValidVideos} setEmpty={setEmpty} setSubscribed={setSubscribed} subscribe={subscribe} />
              })
               
          ):''
        }
        {!validVideos && validVideos<1 ? <Empty userType={'student'} ></Empty>:''}
      </div>
    </div>
  )
}
export default Subscribed