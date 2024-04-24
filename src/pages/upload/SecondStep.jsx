import React , {useRef,useState,useEffect}  from 'react'
import { motion , AnimatePresence, delay } from 'framer-motion'
import bigPlus from './../../assets/images/big-plus.svg'
import replace from './../../assets/images/replace.svg'
import videoDelete from './../../assets/images/video-delete.svg'
import MotionCta from '../components/MotionCta'
import { CustomAlert } from '../components/CustomAlert'
import Reverse from '../components/svg/Reverse'
const SecondStep = ({setStep,error,setError,onlyVideo,video}) => {
  const input = useRef(null)
  const topicTitleRef = useRef(null)
  const videoTitleRef = useRef(null)
  const videoDescribeRef = useRef(null)
  const [changesMade,setChangesMade] = useState(false)
  const [videoThere,setVideoThere]=useState(false)
  const check = (e) => {
    console.log('sadsa')
    if(topicTitleRef.current , videoTitleRef.current , videoDescribeRef.current){
      if(onlyVideo){
        if(
          videoThere &&
          videoTitleRef.current.value &&
          videoDescribeRef.current.value
  
        ){
           setChangesMade(true)
        }
        else{
         setChangesMade(false)
         
        }

      }
      else{
        if(
          videoThere &&
          topicTitleRef.current.value &&
          videoTitleRef.current.value &&
          videoDescribeRef.current.value
  
        ){
           setChangesMade(true)
        }
        else{
         setChangesMade(false)
        }
      }
    }
  }
  useEffect(()=>{
    if(!video){
      check()
    }
    else{
      setChangesMade(true)
    }  
  },[videoThere])
  const [file,setFile] = useState(null)
  const [focused,setFocused] = useState(false)
  const [videoUrl,setVideoUrl] = useState(null)
  useEffect(()=>{
    if(file){
      const reader = new FileReader()
      reader.onloadend = () =>{
        setTimeout(()=>{
          setVideoUrl(reader.result)
        },1900)
      }
      reader.readAsDataURL(file)
    }
  },[file])


  console.log(video,'ashee')
    return (
      <div onChange={()=>check()}  className="upload-parts" id='video'>
        <div className="videos">
          {
            !onlyVideo?(
              <div className="entitle-cont courseNameCont">
                <input ref={topicTitleRef} name="topicTitle" type="text" className="regular-inputs courseName" id='entitle' placeholder='Name this part of the course' />
              </div>     
            ):''
          }
          <motion.div 
            whileTap={{ scale: 0.97 }}
             onClick={()=>{
               console.log(input.current)
               if(input){
                 input.current.click()
               } 
             }}
           className="video-clicker">
           {videoUrl &&   
              <div className="contentToPop">
                <motion.div
                  transition={{duration:0.3,type:'linear'}}
                  initial={{scale:0,borderRadius:1000+'px'}}
                  animate={{scale:1,borderRadius:0}} 
                  className="cover"> 
                        <motion.video 
                            initial={{scale:0,borderRadius:0}} 
                            transition={{type:'spring'}}
                            animate={{scale:1,borderRadius:'3px'}} 
                            src={`${videoUrl}#t=2`} className='video-thumbnail' alt="" />
                </motion.div>
              </div>
            }
            <div className="video-clicker-contents">
                {
                  !videoUrl  ? (
                      <motion.img 
                        src={bigPlus}
                        transition={{delay:0.4}}
                        animate={videoThere?{scale:0,rotate:'180deg'}:{scale:1}}
                        alt="" className="plus" />

                  ):videoUrl && (
                 
                      
                      <Reverse/>
                   
                  )
                }
              <motion.h1 initial={{color:`#595959`}} animate={videoUrl?{color:"#FFFFFF",opacity:0.35}:{color:`#595959`}} className="desc">
                 Click to <span>place</span> video
              </motion.h1>
            </div>


          </motion.div>




          <div className="entitle-cont videoNameCont">
              <input ref={videoTitleRef}  placeholder={video?video.title:"Title for your video ..."} id="entitle" type="text" name='title'       className='regular-inputs' />
          </div>
          <div className="textarea-container" id="custom-textarea">
              <textarea ref={videoDescribeRef}  name='description' placeholder="Write about your course ...."   id="" className=""rows="9"></textarea>
          </div>
          <div className="handy-btns">
              <motion.div  whileTap={{ scale: 0.98 }} onClick={()=>{
                 if(video){
                    navigate(-1)
                 } 
                 else{
                  setStep(1)
                 }
                 
              }} className="secondary-btn">Go back</motion.div>
              <MotionCta setError={setError} submit={true} changesMade={changesMade} text={'Continue'}></MotionCta>
          </div>
          <input onChange={(e)=>{
            if(e.target.files[0]){
                setVideoThere(true)
                setFile(e.target.files[0])
            }
          }} onFocus={()=>{
             console.log('kiraa')
          }} ref={input} className="hidden" type="file" name="video" id="" />
        </div>
      </div>
    )
}
export default SecondStep