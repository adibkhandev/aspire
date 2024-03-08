import React, { useEffect , useState } from 'react'
import { CoursePack } from '../explore/HorizontalSwiper'
import {Nav} from './../Nav'
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
                   console.log(res.data)
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
           subscribed.map(subscribed=>{
              return <Card subscribed={subscribed} />
           })
        ):''}
      </div>
    </div>
  )
}


const Card = ({subscribed}) => {
    const [cardData,setCardData]=useState(null)
    let userData = localStorage.getItem('userData')
    const [subscribedState,setSubscribedState]=useState(true)
    console.log(subscribed,'dat')
    useEffect(()=>{
            let url = `${import.meta.env.VITE_API_URL}/video/get/${subscribed}/compress`
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
        <div className='card'>
           <div className="card-cont">
               <div className="desc-cont">
                    <div className="text">
                        <h1 className='title'>
                            {cardData.courseName}
                        </h1>
                        <SubscribeCta courseId={cardData.courseId} subscribed={subscribedState} setSubscribed={setSubscribedState} ></SubscribeCta>
                    </div>
                    <img src={linkTo} alt="" />
               </div>
               <div className="cover">
                   <img src={import.meta.env.VITE_API_URL + cardData.cover} alt="" />
               </div>
               <div className="end">
                   <div className="author-cont">
                        <div className="pfp-cont">
                            <img src={import.meta.env.VITE_API_URL + cardData.uploaderPicture} alt="" />
                        </div>
                        <div className="author-name">
                            {cardData.uploaderName}
                        </div>
                    </div>
                    <div className="videoCount">
                            <div className="num">
                            {cardData.videos}
                            </div>
                            <img src={smallPlay} alt="" />
                    </div>
               </div>
           </div>
        </div>
    )
} 


export default Subscribed
