import React, { useEffect , useState } from 'react'
import { CoursePack } from '../explore/HorizontalSwiper'
import {Nav} from './../Nav'
import axios from 'axios'
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
    console.log(subscribed,'dat')
    useEffect(()=>{
            let url = `${import.meta.env.VITE_API_URL}/video/get/${subscribed}/compress`
            axios.get(url)
               .then(res=>{
                   console.log(res.data.data)
                   setCardData(res.data.data)

                //    setCardData(res)
               })
               .catch(err=>{
                   console.log(err)
               })
    },[])
    if(cardData) return(
        <div className='card'>
           <CoursePack info={cardData} ></CoursePack>
        </div>
    )
} 


export default Subscribed
