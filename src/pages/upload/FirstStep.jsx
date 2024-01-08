import { useRef, useState } from "react"
import Image from "../components/FileImage"
import { BoxAddon } from "../components/BoxAddon"
const FirstStep = ({setError,setStep}) => {
    const courseImageRef = useRef()
    const [imageFile,setImageFile] = useState(null)
    const [skills,setSkills]=useState([])
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
              <div className="secondary-btn">Discard</div>
              <div onClick={()=>setStep(2)} className="cta-btn">Continue</div>
          </div>
        </div>
      </div>
    )
}
export default FirstStep