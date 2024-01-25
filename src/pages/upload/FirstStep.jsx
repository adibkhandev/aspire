import { useRef, useState } from "react"
import Image from "../components/FileImage"
import { motion } from "framer-motion"
import { BoxAddon } from "../components/BoxAddon"
const FirstStep = ({setError,setStep,setSkills,skills}) => {
    const courseImageRef = useRef()
    const [imageFile,setImageFile] = useState(null)
    
    return (
      <div className="upload-parts" id='course'>
        <div className="courses">
          <Image file={imageFile} input={courseImageRef} ></Image>
          <div className="entitle-cont">
             <input type="text" name='courseTitle' id="entitle"  placeholder="Title your work ..." />
          </div>
          <div className="textarea-container" id="custom-textarea">
             <textarea  name='courseDescription' placeholder="Write about your course ...."  id="" className=""rows="9"></textarea>
          </div>
          <div className="data">
                <div className="title">
                    Skills
                </div>
                <BoxAddon setSkills={setSkills} setError={setError} ></BoxAddon>

          </div>
          <input className="hidden" onChange={(e)=>setImageFile(e.target.files[0])} type="file" name="courseImage"  id="" ref={courseImageRef} />
        
          <div className="handy-btns">
              <motion.div  whileTap={{ scale: 0.98 }} className="secondary-btn">Discard</motion.div>
              <motion.div  whileTap={{ scale: 0.98 }} onClick={()=>setStep(2)} className="cta-btn">Continue</motion.div>
          </div>
        </div>
      </div>
    )
}
export default FirstStep