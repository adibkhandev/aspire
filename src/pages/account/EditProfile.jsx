import React, { useState , useRef} from 'react'
import { Signup } from './../login/Signup'
import { BoxAddon } from '../components/BoxAddon';
import { Nav } from '../Nav'
import {CustomAlert} from '../components/CustomAlert'
// import { Signin } from './Signin'
const EditProfile = () => {
    const [error,setError] = useState(null)
    const clickRef = useRef(null)
  return (
    <div className="login-container">
    <Nav></Nav>
    <form onSubmit={(e)=>signupHandler(e)} className='signup'>
        <Image file={imageFile} input={clickRef}></Image>
        <input className='hidden' onChange={(e)=>imageHandler(e)} ref={clickRef} type="file" name="profile" id="" />
        <input name='username' type="text" className="regular-inputs" id='name-input' placeholder='What should we call you?' />
        <div className="data">
            <div className="title">
                Skills
            </div>
            <BoxAddon setSkills={setSkills} setError={setError} num={5}></BoxAddon>

        </div>
        <button type='submit' className="signup-btn">
            Save changes
        </button>
             
        </form>


       <CustomAlert error={error} setError={setError}/>
    </div>
  )
}

export default EditProfile
