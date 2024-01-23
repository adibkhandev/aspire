import React , {useRef}  from 'react'
import { motion } from 'framer-motion'
import bigPlus from './../../assets/images/big-plus.svg'

const SecondStep = ({setStep,onlyVideo}) => {
  const input = useRef(null)
    return (
      <div className="upload-parts" id='video'>
        <div className="videos">
          {
            !onlyVideo?(
              <div className="entitle-cont courseNameCont">
                <input name="topicTitle" type="text" className="regular-inputs courseName" id='entitle' placeholder='Name this part of the course' />
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
              <input placeholder="Title for your video ..." id="entitle" type="text" name='title'       className='regular-inputs' />
          </div>
          <div className="textarea-container" id="custom-textarea">
              <textarea  name='description' placeholder="Write about your course ...."   id="" className=""rows="9"></textarea>
          </div>
          <div className="handy-btns">
              <motion.div  whileTap={{ scale: 0.98 }} onClick={()=>setStep(1)} className="secondary-btn">Discard</motion.div>
              <motion.button type="submit"  whileTap={{ scale: 0.98 }} className="cta-btn">Continue</motion.button>
          </div>
          <input ref={input} className="hidden" type="file" name="video" id="" />
        </div>
      </div>
    )
}
export default SecondStep