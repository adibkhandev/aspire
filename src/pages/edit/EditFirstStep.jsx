import { useEffect, useRef, useState } from "react"
import Image from "../components/FileImage"
import { motion } from "framer-motion"
import { BoxAddon } from "../components/BoxAddon"
import MotionCta from "../components/MotionCta"
import { CustomAlert } from "../components/CustomAlert"
import { useNavigate } from "react-router"
export const EditFirstStep = ({existing,course,error,setError,setStep,setSkills,skills}) => {
    const courseImageRef = useRef()
    const [imageFile,setImageFile] = useState(null)
    const [changesMade,setChangesMade] = useState(false)
    const titleRef = useRef(null)
    const describeRef = useRef(null)
    const navigate = useNavigate()
    const skillString = course ? JSON.stringify(course.skills) : ''
    const nextStep = () => {
      setStep(2)
    }
    
    const check = () => {
      console.log('codata')
      const currentSkillString = JSON.stringify(skills)
      if(
         currentSkillString!==skillString ||
         imageFile ||
         titleRef.current.value ||
         describeRef.current.value
       ){
         setChangesMade(true)
      }
      else{
       setChangesMade(false)
      }
    }
    useEffect(()=>{
        if(!skills) return
      check()
    },[skills,imageFile])
    return (
      <div onChange={()=>check()} className="upload-parts" id='course'>
        <div className="courses">
          <Image existing={existing} file={imageFile} input={courseImageRef} ></Image>
          <div className="entitle-cont">
             <input ref={titleRef} type="text" name='courseTitle' id="entitle"  placeholder={course && course.title?course.title:"Title your work ..."} />
          </div>
          <div className="textarea-container" id="custom-textarea">
             <textarea ref={describeRef}  name='courseDescription' placeholder={course && course.description ?course.description:"Write about your course ...."}  id="" className=""rows="9"></textarea>
          </div>
          <div className="data">
                <div className="title">
                    Skills
                </div>
                <BoxAddon skills={skills}  setSkills={setSkills} setError={setError} ></BoxAddon>
  
          </div>
          <input className="hidden" onChange={(e)=>setImageFile(e.target.files[0])} type="file" name="courseImage"  id="" ref={courseImageRef} />
        
          <div className="handy-btns">
              {/* <motion.button 
                
                whileTap={{ scale: 0.98 }} 
                className="secondary-btn">
                  Save and exit
              </motion.button> */}
              <MotionCta submit={changesMade} error={error} setError={setError} changesMade={changesMade} text={'Save and exit'}></MotionCta>
              <MotionCta changesMade={true} text={'Continue editing'} onClick={nextStep}></MotionCta>
          </div>
        </div>
      </div>
    )
  }

  export default EditFirstStep