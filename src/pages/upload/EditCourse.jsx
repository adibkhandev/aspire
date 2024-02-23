import { jwtDecode } from 'jwt-decode'
import React, { useEffect , useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import FirstStep from './FirstStep'
import { CustomAlert } from '../components/CustomAlert'
import { Nav } from '../Nav'
import { motion, useScroll } from 'framer-motion'
import trippleDot from './../../assets/images/tripple-dot.svg'
import whiteDelete from './../../assets/images/white-delete.svg'
import whiteWrite from  './../../assets/images/white-write.svg'
import axios from 'axios'
const EditCourse = () => {
    const {courseId} = useParams()
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null
    const decoded = token? jwtDecode(token):null
    
    const [step,setStep]=useState(1)
    const [error , setError] = useState(null)
    console.log(courseId,decoded,'police',user)
    const navigate = useNavigate()
    const [course,setCourse] = useState(null)
    useEffect(()=>{
        if(token && decoded && user && user.uploadedCourses.includes(courseId)){
            console.log('correct')
            const headers = {
              headers:{
                'Authorization':'Bearer ' + token,
                'Content-Type':'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
              }
            }
          const url = import.meta.env.VITE_API_URL + `/video/get/${courseId}`
            axios.get(url,headers)
                .then((response)=>{
                    console.log(response.data.populatedCourse,'dataaa')
                    setCourse(response.data.populatedCourse)
                    setSkills(response.data.populatedCourse.skills)
                })
                .catch((err)=>{
                     console.log(err,'error')
                })
        }
        else navigate('/')
    },[])

   
    const [skills,setSkills]=useState([])
    // console.log(skills,'skdsdksdsaldadasda',course.skills)  
    return (
    <div className='edit-course-cont'>
        <Nav></Nav>
       <motion.form 
         className='stepCont' 
         onSubmit={(e)=>uploadHandler(e)}
         animate={step==2?{x:'-100vw'}:{x:0}}
        >
          <FirstStep existing={course?course.coverPhotoLink:null} course={course} skills={skills} setSkills={setSkills} setStep={setStep} setError={setError}/> 
          <EditTopicVideos topics={course?course.topics:null} ></EditTopicVideos>
       </motion.form>
       <CustomAlert error={error} setError={setError}/>
    </div>
  )
}



const EditTopicVideos = ({topics}) => {
  console.log(topics,'easdd')    
  return(
      <>
        <div className="edit-topic-cont">
            {
                topics && topics.map((topic)=>{
                    return(
                      <>
                      <div className="lock-cont">
                           <input placeholder={topic.title} type="text" name='topicName' className="lock" id='name-input'/>
                          <div className="icon-cont">
                            <img src={trippleDot} alt="" />
                          </div> 
                      </div>
                        {topic && topic.videos.map((video)=>{
                            return(
                            <div className="video-container">
                                <div className="header">
                                  <div className="details">
                                      <div className="video-num">
                                            {video.number}
                                      </div>
                                      <div className="video-name">
                                            {video.title}
                                      </div>  
                                  </div>    
                                  <img src={whiteWrite} alt="" />
                                </div>
                                <div className="cover">
                                    <video src={import.meta.env.VITE_API_URL + video.videoLink}></video>
                                    <img src={whiteDelete} alt="" />
                                </div>
                            </div>
                            )
                        })}
                      </>

                    )
                    
                })
              }
        </div>
      </>
  )
}

export default EditCourse
