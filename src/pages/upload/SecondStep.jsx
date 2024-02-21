import React , {useRef,useState,useEffect}  from 'react'
import { motion } from 'framer-motion'
import bigPlus from './../../assets/images/big-plus.svg'
import MotionCta from '../components/MotionCta'
const SecondStep = ({setStep,onlyVideo}) => {
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
    check()
  },[videoThere])
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
            <div className="video-clicker-contents">
              <img src={bigPlus} alt="" className="plus" />
              <div className="desc">
                 Click to <span>select</span> video
              </div>
            </div>
          </motion.div>
          <div className="entitle-cont videoNameCont">
              <input ref={videoTitleRef}  placeholder="Title for your video ..." id="entitle" type="text" name='title'       className='regular-inputs' />
          </div>
          <div className="textarea-container" id="custom-textarea">
              <textarea ref={videoDescribeRef}  name='description' placeholder="Write about your course ...."   id="" className=""rows="9"></textarea>
          </div>
          <div className="handy-btns">
              <motion.div  whileTap={{ scale: 0.98 }} onClick={()=>setStep(1)} className="secondary-btn">Go back</motion.div>
              <MotionCta submit={true} changesMade={changesMade} text={'Continue'}></MotionCta>
          </div>
          <input onChange={(e)=>{
            if(e.target.files[0]){
                setVideoThere(true)
            }
          }} ref={input} className="hidden" type="file" name="video" id="" />
        </div>
      </div>
    )
}
export default SecondStep