import { useEffect , useState , useRef } from "react"
import {motion , useAnimate , AnimatePresence} from 'framer-motion'
import trippleDot from './../../assets/images/tripple-dot.svg'
import whiteWrite from  './../../assets/images/white-write.svg'
import whiteDelete from './../../assets/images/white-delete.svg'
import { ComponentPopup } from "../../components/UndoPopup"
import Delete from "../../components/Delete"
import axios from 'axios'
import {useNavigate} from 'react-router'
import { Link } from "react-router-dom"
import MotionCta from './../components/MotionCta'
  const EditTopicVideos = ({deletePrompt,setDeletePrompt,deleteInitiated,setDeleteInitiated,setPopupOpen,setTopicTitleChanged,selectedTopic,setSelectedTopic,topics,courseId,setStep,setError}) => {
    const token = localStorage.getItem('accessToken')
    const [outClick,setOutClick] = useState(true)
   
    const [topicDeleteId,setTopicDeleteId] = useState(null)
    const navigate = useNavigate()
    useEffect(()=>{
        console.log('truing')
        if(deleteInitiated && topicDeleteId) deleteHandler(topicDeleteId)
    },[deleteInitiated])
    const deleteHandler = (id) => {
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
      let url = `${import.meta.env.VITE_API_URL}/video/delete/${courseId}/${id}/topic/`
     
      axios.delete(url,headers)
         .then((response)=>{
             console.log(response.data,'topic')
             navigate('/')
         })
         .catch(err=>{
            console.log(err)
            console.log('trying')
            setDeletePrompt(false)
            setError(err.response.data.message)
         })
  } 
    
     return(
        <div onClick={e=>{
            e.stopPropagation()
            if(!outClick){
               setOutClick(true)
               console.log(outClick,'out')
            }}} className="edit-topic-cont">
                  {deletePrompt && <Delete  setDeletePrompt={setDeletePrompt} deletePrompt={deletePrompt} setDeleteInitiated={setDeleteInitiated} ></Delete>}
               
                  { topics && topics.map((topic)=><Topic setPopupOpen={setPopupOpen} setDeletePrompt={setDeletePrompt} setTopicDeleteId={setTopicDeleteId} outClick={outClick} setOutClick={setOutClick} courseId={courseId} topic={topic} />)}

               <div className="handy-btns">
                <motion.div  whileTap={{ scale: 0.98 }} onClick={()=>{
                    setStep(1)
                }} className="secondary-btn">
                    Go back
                </motion.div>
                <MotionCta submit={true} changesMade={true} text={'Continue'}></MotionCta>
               </div>
         </div>
     )
  }



  const Topic = ({topic,courseId,outClick,setOutClick,setPopupOpen,setDeletePrompt,setTopicDeleteId}) => {
   
    const [editingPopupThere,setEditingPopupThere] = useState(false)
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
           setTopicTitleChanged(true)
       })
       .catch(err=>{
          console.log(err)
       })
     }
  }
  
  
  
 
  useEffect(()=>{
    if(outClick){
        console.log('turnng')
       setEditingPopupThere(false)
    }
 },[outClick])
  useEffect(()=>{
     if(editingPopupThere){
        setOutClick(false)
        console.log('clickkkkk')
     }
  },[editingPopupThere])
    return(
        <>
          <div className="lock-cont">
            <input onBlur={(e)=> topicRenameHandler(e,topic._id)} placeholder={topic.title} type="text" name='topicTitle' className="lock" id='name-input'/>
            <div onClick={()=>{
                // setSelectedTopic(topic._id)
                setEditingPopupThere(true)
                setPopupOpen(true)
            }} className="icon-cont">
                <img src={trippleDot} alt="" />
                <div className="pop">
                <motion.div 
                    
                    initial={{transformOrigin:"top right",scale:0,rotate:-90}}
                    animate={
                       editingPopupThere?(
                            {transformOrigin:`bottom right`,rotate:0,scale:1}
                    ) :(
                        {transformOrigin:`bottom right`,scale:0,rotate:-90}
                    )}
                    className="options"
                >
                    <div onClick={()=>{
                        setDeletePrompt(true)
                        setTopicDeleteId(topic._id)
                    }} className="option" id='first'>
                        Delete topic
                    </div>
                    <Link to={`/${courseId}/edit/course`}>
                        <div className="option">Edit topic</div>
                    </Link>
                    </motion.div>

                </div>
            </div> 
        </div>
            {topic && topic.videos.map((video)=>{
            console.log(video,'map')
                return(
                   <EditVideo courseId={courseId} topicId={topic._id} video={video} />
                )
        })}
        </>
    )
  }



const EditVideo = ({video,courseId,topicId}) => {
    const [remove,setRemove] = useState(false)
    const videoDeleteHandler = (id,topicId) => {
        const token = localStorage.getItem('accessToken')
        let headers = {
          headers:{
              'Authorization':'Bearer ' + token,
              'Content-Type':'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
          }
      }
    //   console.log(selectedTopic,'selected')
      let data = {
         videos:[id]
      } 
      let url = `${import.meta.env.VITE_API_URL}/video/delete/${courseId}/${topicId}/`
      
      axios.post(url,data,headers)
         .then((response)=>{
             console.log(response.data)
            //  setDeleted(false)
         })
         .catch(err=>{
            console.log(err)
         })
      }
      return(
        <>
           <ComponentPopup data={{video:video._id,topic:topicId}} cta={videoDeleteHandler} remove={remove} setRemove={setRemove}>
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
                    <Link to={`/${courseId}/${topicId}/${video._id}/edit/video`}>
                        <img src={whiteWrite} alt="" />
                    </Link>
                </div>
                <div className="cover">
                    <img className='thumbnail' src={import.meta.env.VITE_API_URL + video.thumbnailLink}/>
                    <img className='delete' onClick={()=> setRemove(true)} src={whiteDelete} alt="" />
                </div>
            </div>
           </ComponentPopup>
        </>
      )
}





  export default EditTopicVideos