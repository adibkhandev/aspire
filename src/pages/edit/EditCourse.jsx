import { jwtDecode } from 'jwt-decode'
import React, { useEffect , useState , useRef} from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import EditFirstStep from './EditFirstStep'
import EditTopicVideos from './EditTopicVideos'
import { CustomAlert } from '../components/CustomAlert'
import MotionCta from '../components/MotionCta'
import { Nav } from '../Nav'
import { motion, useScroll } from 'framer-motion'
import Delete from '../../components/Delete'
import axios from 'axios'
const EditCourse = () => {
    const [skills,setSkills]=useState([])
    const {courseId} = useParams()
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null
    const decoded = token? jwtDecode(token):null
    const [deletePrompt,setDeletePrompt] = useState(false)
    const [deleteInitiated,setDeleteInitiated] = useState(false)
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
    const [topicTitleChanged,setTopicTitleChanged] = useState(false)
    const courseUpdateHandler = e => {
      e.preventDefault()
      if(e.target.courseTitle.value || e.target.courseDescription.value ||  e.target.courseImage.files.length || skills.length!==course.skills.length){
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
        if(e.target.courseImage.files[0]) {
          console.log('has file')
          formData.append('courseImage',e.target.courseImage.files[0])
        }
        console.log(e.target.courseImage.files)
        if(skills) formData.append('skills',JSON.stringify(skills)) 
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
      else{
        console.log('triggered')
        setError('Complete all the fields to continue')
      }
    }
    const [popupOpen,setPopupOpen] = useState(false)
    // console.log(skills,'skdsdksdsaldadasda',course.skills)  
    return (
    <div
     onClick={(e)=>{
      e.stopPropagation()
      if(setPopupOpen){
        setPopupOpen(false)
      } 
     }} 
     className='edit-course-cont'>
       
        <Nav></Nav>
        <Delete  setDeletePrompt={setDeletePrompt} deletePrompt={deletePrompt} setDeleteInitiated={setDeleteInitiated} ></Delete>
       <motion.form 
         className='stepCont' 
         style={popupOpen?{zIndex:2}:{zIndex:-1}}
         onSubmit={(e)=>{
            console.log('submits')
            e.preventDefault()
            if(topicTitleChanged) navigate('/')
            else courseUpdateHandler(e)
         }}
         animate={step==2?{x:'-100vw'}:{x:0}}
        >
          <EditFirstStep existing={course?course.coverPhotoLink:null} course={course} skills={skills} setSkills={setSkills} setStep={setStep} setError={setError}/> 
          <EditTopicVideos setPopupOpen={setPopupOpen} deletePrompt={deletePrompt} setDeletePrompt={setDeletePrompt} deleteInitiated={deleteInitiated} setDeleteInitiated={setDeleteInitiated}  topicTitleChanged={topicTitleChanged} setTopicTitleChanged={setTopicTitleChanged} courseId={courseId}  setStep={setStep} topics={course?course.topics:null} setError={setError}></EditTopicVideos>
       </motion.form>
       <div className="toast-cont">
        <CustomAlert error={error} setError={setError}/>
      </div>
    </div>
  )
}





export default EditCourse
