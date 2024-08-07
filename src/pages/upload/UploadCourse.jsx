import React, { useEffect , useState} from 'react'
import { Nav } from '../Nav'
import axios from 'axios'
import { motion } from 'framer-motion'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import { useNavigate } from 'react-router'
import { CustomAlert } from './../components/CustomAlert'
const UploadCourse = (course) => {
  const navigate = useNavigate()
  const [error,setError] = useState(null)
  const [step,setStep]=useState(1)
  const [skills,setSkills]=useState([])
  const token = localStorage.getItem('accessToken');
  useEffect(()=>{
    if(!token){
     navigate('/login')
     setError('Session Expired')
    }  
  },[])
  const uploadHandler = (e) => {
    console.log(JSON.stringify(skills),'array')
    e.preventDefault()
    if(e.target){
      console.log(e.target.courseTitle.value,'tt')
      
          if(
            e.target.title.value && 
            e.target.description.value &&
            e.target.topicTitle.value && 
            e.target.courseTitle.value &&
            e.target.courseDescription.value &&
            e.target.courseImage.files.length &&
            e.target.video.files.length
            ){
            if(token){
              let formData = new FormData()
              formData.append('title',e.target.title.value)
              formData.append('description',e.target.description.value)
              formData.append('topicTitle',e.target.topicTitle.value)
              formData.append('courseTitle',e.target.courseTitle.value)
              formData.append('courseDescription',e.target.courseDescription.value)
              formData.append('skills',JSON.stringify(skills))
              formData.append('courseCoverPhoto',e.target.courseImage.files[0])
              formData.append('videoFile',e.target.video.files[0])
              const headers = {
                  headers:{
                    'Authorization':'Bearer ' + token,
                    'Content-Type':'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                    'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS'
                  }
                }
              const url = import.meta.env.VITE_API_URL + '/video/upload'
              axios.post(url,formData,headers)
              .then((response)=>{
                 console.log(response)
                  if(response.status==201){
                      console.log(response.data,'data')
                      navigate('/')
                   }
              })
              .catch((err)=>{
                console.log(err.response.data);
                setError(err.response.data)
              })
            }
          }
          else{
              console.log('setting')
              setError('Provide data to continue')
          }

        
    }
}
  return (
    <div className="upload flex flex-column items-end">
      <div className='home' id="upload-page">
          <Nav></Nav>
        <motion.form 
          className='stepCont' 
          onSubmit={(e)=>uploadHandler(e)}
          animate={step==2?{x:'-100vw'}:{x:0}}
          >
            <FirstStep skills={skills} setSkills={setSkills} setStep={setStep} error={error} setError={setError}/>
            <SecondStep uploadHandler={uploadHandler} setStep={setStep} error={error} setError={setError} />  
            
        </motion.form>
        
      </div>
      <div className="toast-cont">
        <CustomAlert error={error} setError={setError}/>
      </div>
    </div>
  )

}

export default UploadCourse






