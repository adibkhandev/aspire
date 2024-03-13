import React, { useEffect , useState } from 'react'
import { CoursePack } from '../explore/HorizontalSwiper'
import {Nav} from './../Nav'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import linkTo from './../../assets/images/link-to.svg'
import smallPlay from './../../assets/images/small-play.svg'
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
    console.log(subscribe,'dat')
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
    if(cardData) return(
        <motion.div
         animate={remove?{x:"-220%"}:{x:0}} 
         className='card'>
           <div className="card-cont">
               <div className="desc-cont">
                    <div className="text">
                       
                        <h1 className='title'>
                          <Link to={`/course/${cardData.courseId}`} >
                            {cardData.courseName}
                          </Link>                       
                        </h1>
                        <SubscribeCta setRemove={setRemove} courseId={cardData.courseId} setSubscribed={setSubscribed} subscribedState={subscribedState} setSubscribedState={setSubscribedState} ></SubscribeCta>
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
                            {cardData.uploaderName}
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
    )
} 


export default Subscribed
