import { jwtDecode } from 'jwt-decode'
import React, { useEffect , useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import FirstStep from '../upload/FirstStep'
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
        if(token && decoded && user){
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
    
    
    const [selectedTopic,setSelectedTopic] = useState(null)
    const [skills,setSkills]=useState([])
    // console.log(skills,'skdsdksdsaldadasda',course.skills)  
    return (
    <div className='edit-course-cont'>
        <Nav></Nav>
       <motion.form 
         className='stepCont' 
         style={selectedTopic?{zIndex:2}:{zIndex:-1}}
         onSubmit={(e)=>uploadHandler(e)}
         animate={step==2?{x:'-100vw'}:{x:0}}
        >
          <FirstStep existing={course?course.coverPhotoLink:null} course={course} skills={skills} setSkills={setSkills} setStep={setStep} setError={setError}/> 
          <EditTopicVideos courseId={courseId} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} topics={course?course.topics:null} ></EditTopicVideos>
       </motion.form>
       <CustomAlert error={error} setError={setError}/>
    </div>
  )
}



const EditTopicVideos = ({topics,selectedTopic,setSelectedTopic,courseId}) => {
  console.log(topics,'easdd') 
  const token = localStorage.getItem('accessToken')
  const [deleted,setDeleted] = useState(false)
  const deleteHandler = () => {
    console.log('clicks')
    let headers = {
        headers:{
            'Authorization':'Bearer ' + token,
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }
    }
    console.log(selectedTopic,'selected')
    let url = `${import.meta.env.VITE_API_URL}/video/delete/${courseId}/${selectedTopic}/topic/`
   
    axios.delete(url,headers)
       .then((response)=>{
           console.log(response.data)
           setDeleted(false)
       })
       .catch(err=>{
          console.log(err)
       })
}   
const videoDeleteHandler = (id,topicId) => {
  let headers = {
    headers:{
        'Authorization':'Bearer ' + token,
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    }
}
console.log(selectedTopic,'selected')
let data = {
   videos:[id]
} 
let url = `${import.meta.env.VITE_API_URL}/video/delete/${courseId}/${topicId}/`

axios.post(url,data,headers)
   .then((response)=>{
       console.log(response.data)
       setDeleted(false)
   })
   .catch(err=>{
      console.log(err)
   })
}
  return(
      <>
        <div onClick={e=>{
           e.stopPropagation()
           if(selectedTopic){
             setSelectedTopic(null)
           }
        }} className="edit-topic-cont">
            {
                topics && topics.map((topic)=>{
                    
                    return(
                      <>
                      <div className="lock-cont">
                          <input placeholder={topic.title} type="text" name='topicName' className="lock" id='name-input'/>
                          <div onClick={()=>{
                               setSelectedTopic(topic._id)
                          }} className="icon-cont">
                            <img src={trippleDot} alt="" />
                            <div className="pop">
                              <motion.div 
                                
                                initial={{transformOrigin:"top right",scale:0,rotate:-90}}
                                animate={
                                    selectedTopic && selectedTopic==topic._id?(
                                        {transformOrigin:`bottom right`,rotate:0,scale:1}
                                ) :(
                                    {transformOrigin:`bottom right`,scale:0,rotate:-90}
                                )}
                                className="options"
                              >
                                  <div onClick={()=>{
                                     deleteHandler()
                                   }} className="option" id='first'>Delete topic</div>
                                  <Link to={`/${course._id}/edit/course`}>
                                      <div className="option">Edit topic</div>
                                  </Link>
                                </motion.div>

                            </div>
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
                                  <Link to={`/${video._id}/edit/video`}>
                                     <img src={whiteWrite} alt="" />
                                  </Link>
                                </div>
                                <div className="cover">
                                    <video src={import.meta.env.VITE_API_URL + video.videoLink}></video>
                                    <img onClick={()=> videoDeleteHandler(video._id,topic._id)} src={whiteDelete} alt="" />
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
