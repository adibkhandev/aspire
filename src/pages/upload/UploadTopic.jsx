import React , {useEffect,useState} from 'react'
import { useParams } from 'react-router'
import axios  from 'axios'
import { Nav } from './../../pages/Nav'
import SecondStep from './SecondStep'
const UploadTopic = () => {
  let {courseId} = useParams()
  const token = localStorage.getItem('accessToken');
  let [error,setError]=useState(null)

  useEffect(()=>{
    if(!token){
     navigate('/login')
     setError('Session Expired')
    }  
  },[])
  const topicAddHandler = (e) => {
        e.preventDefault()
        console.log(courseId,'param',e.target.title.value,e.target.video.files[0])
        if(e.target){
           if(
              e.target.title.value && 
              e.target.description.value &&
              e.target.topicTitle.value && 
              e.target.video.files.length 
           ){
            if(token && courseId){
              let form = new FormData()
              form.append('id',courseId)
              form.append('title',e.target.title.value)
              form.append('topicTitle',e.target.topicTitle.value)
              form.append('description',e.target.description.value)
              form.append('videoFile',e.target.video.files[0])   
              const headers = {
                headers:{
                  'Authorization':'Bearer ' + token,
                  'Content-Type':'multipart/form-data',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                  'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS'
                }
              }
              const url = import.meta.env.VITE_API_URL + '/video/add/topic'
                axios.post(url,form,headers)
                .then((response)=>{
                  console.log(response)
                    if(response.status==201){
                        console.log(response.data,'data','unique')
                    }
                })
                .catch((err)=>{
                  console.log(err);
                  setError(err.response.data.message)
                })  
             }
           }
        }
  }
  return (
    <div className='topic-add-cont'>
        <Nav></Nav>
        <form onSubmit={(e)=>topicAddHandler(e)}>
            <SecondStep></SecondStep>
        </form>
    </div>
  )
}

export default UploadTopic
