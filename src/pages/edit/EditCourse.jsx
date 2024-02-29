import { jwtDecode } from 'jwt-decode'
import React, { useEffect , useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import FirstStep from '../upload/FirstStep'
import { CustomAlert } from '../components/CustomAlert'
import MotionCta from '../components/MotionCta'
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
    
    const courseUpdateHandler = e => {
      e.preventDefault()
      if(e.target.courseTitle.value || e.target.courseDescription.value ||  e.target.courseImage.files.length){
        let headers = {
          headers:{
              'Authorization':'Bearer ' + token,
              'Content-Type':'multipart/form-data',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
          }
        }
        console.log(selectedTopic,'selected')
        let data = {
          topicTitle:e.target.value
        } 
        let formData = new FormData()
        if(e.target.courseTitle.value) formData.append('courseTitle',e.target.courseTitle.value)
        if(e.target.courseDescription.value) formData.append('courseDescription',e.target.courseDescription.value)
        if(e.target.courseImage.files[0]) formData.append('courseImage',e.target.courseImage.files[0])
        let url = `${import.meta.env.VITE_API_URL}/video/update/${courseId}/course`
      
      axios.post(url,formData,headers)
         .then((response)=>{
             console.log(response.data)
             navigate('/')
         })
         .catch(err=>{
            console.log(err)
         })
       }
    }
    const [selectedTopic,setSelectedTopic] = useState(null)
    const [skills,setSkills]=useState([])
    // console.log(skills,'skdsdksdsaldadasda',course.skills)  
    return (
    <div className='edit-course-cont'>
        <Nav></Nav>
       <motion.form 
         className='stepCont' 
         style={selectedTopic?{zIndex:2}:{zIndex:-1}}
         onSubmit={(e)=>{
            console.log('submits')
           courseUpdateHandler(e)
         }}
         animate={step==2?{x:'-100vw'}:{x:0}}
        >
          <FirstStep existing={course?course.coverPhotoLink:null} course={course} skills={skills} setSkills={setSkills} setStep={setStep} setError={setError}/> 
          <EditTopicVideos courseId={courseId} selectedTopic={selectedTopic} setSelectedTopic={setSelectedTopic} setStep={setStep} topics={course?course.topics:null} ></EditTopicVideos>
       </motion.form>
       <CustomAlert error={error} setError={setError}/>
    </div>
  )
}



const EditTopicVideos = ({topics,selectedTopic,setSelectedTopic,courseId,setStep}) => {
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
           console.log(response.data,'topic')
           setDeleted(false)
       })
       .catch(err=>{
          console.log(err)
       })
}   

const topicRenameHandler = (e,topicId) => {
   if(e.target.value){
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
      topicTitle:e.target.value
    } 
    let url = `${import.meta.env.VITE_API_URL}/video/update/${courseId}/${topicId}/topic`
  
  axios.post(url,data,headers)
     .then((response)=>{
         console.log(response.data)
     })
     .catch(err=>{
        console.log(err)
     })
   }
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
                          <input onBlur={(e)=> topicRenameHandler(e,topic._id)} placeholder={topic.title} type="text" name='topicTitle' className="lock" id='name-input'/>
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
                                   }} className="option" id='first'>
                                      Delete topic
                                  </div>
                                  <Link to={`/${course._id}/edit/course`}>
                                      <div className="option">Edit topic</div>
                                  </Link>
                                </motion.div>

                            </div>
                          </div> 
                      </div>
                        {topic && topic.videos.map((video)=>{
                          console.log(video,'map')
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
                                  <Link to={`/${courseId}/${topic._id}/${video._id}/edit/video`}>
                                     <img src={whiteWrite} alt="" />
                                  </Link>
                                </div>
                                <div className="cover">
                                    <img className='thumbnail' src={import.meta.env.VITE_API_URL + video.thumbnailLink}/>
                                    <img className='delete' onClick={()=> videoDeleteHandler(video._id,topic._id)} src={whiteDelete} alt="" />
                                </div>
                            </div>
                            )
                        })}
                      </>

                    )
                    
                })
              }
              <div className="handy-btns">
              <motion.div  whileTap={{ scale: 0.98 }} onClick={()=>{
                  setStep(1)
              }} className="secondary-btn">Go back</motion.div>
              <MotionCta submit={true} changesMade={true} text={'Continue'}></MotionCta>
          </div>
        </div>
      </>
  )
}

export default EditCourse
