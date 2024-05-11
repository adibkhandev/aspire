import React,{useEffect,useState} from 'react'
import {useNavigate, useParams} from 'react-router'
import { Nav } from './Nav'
import Player from '../components/Player'
import axios from 'axios'
const Course = () => {
    const [course,setCourse]=useState(null)
    let {courseId} = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('accessToken')
    let [deletePrompt,setDeletePrompt] = useState(false)
    let [deleteInitiated,setDeleteInitiated] = useState(false)
useEffect(()=>{
    const url = import.meta.env.VITE_API_URL + '/video/get/' + courseId
    console.log(localStorage.getItem('accessToken'),'a')
    if (!token) navigate('/')
    const headers = {
      headers:{
          'Authorization':'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
          'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
       }
     }
            axios.get(url,headers)
            .then((response)=>{
                console.log(response.data.populatedCourse,'course popu')
                setCourse(response.data.populatedCourse)
                localStorage.setItem('userData',JSON.stringify(response.data.user))
            })
            .catch((err)=>{
                console.log(err)
            })
},[])
  return (
    <div className='course-cont'>
      <Nav></Nav>
       {course? 
        <Player 
         course={course} 
         deleteInitiated={deleteInitiated} 
         setDeletePrompt={setDeletePrompt}
        />:''}
          
    </div>
  )
}

export default Course
