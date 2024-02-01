import React, { useState , useRef, useEffect ,useContext} from 'react'
import { Context } from '../login/AuthContext';
import { Signup } from './../login/Signup'
import { BoxAddon } from '../components/BoxAddon';
import { Nav } from '../Nav'
import {CustomAlert} from '../components/CustomAlert'
import Image from '../components/FileImage';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, useParams } from 'react-router';
import { motion } from 'framer-motion';
import squareReverse from './../../assets/images/square-reverse.svg'
import axios from 'axios';
// import { Signin } from './Signin'
const EditProfile = () => {
  const [error,setError] = useState(null)
  const [imageFile,setImageFile]=useState(null)
  const clickRef = useRef(null)
  const [user,setUser]=useState(null)
  const [skills,setSkills]=useState(user && user.skills?user.skills : [])
  const {tokenize} = useContext(Context)
  const token = localStorage.getItem('accessToken')?localStorage.getItem('accessToken'):null
    const imageHandler = (e)=>{
      setImageFile(e.target.files[0])
    }
    const navigate = useNavigate()
    const {userId}= useParams()
    const updateHandler = (e) =>{
      e.preventDefault()
      console.log('clicked')
      if(e.target && user){
        let formData = new FormData()
        if(e.target.username.value) formData.append('username',e.target.username.value)
        if(e.target.profile.files[0]) formData.append('pfp',e.target.profile.files[0])
        if(skills.length && (user.skills.length != skills.length)) formData.append('skills',JSON.stringify(skills))
              const headers = {
                headers:{
                  'Authorization':`Bearer ${token}`,
                  'Content-Type':'multipart/form-data',
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                  'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
                }
              }
              const url =  import.meta.env.VITE_API_URL + '/auth/update' 
              axios.post(url,formData,headers)
              .then((response)=>{
                  if(response.status==200){
                      console.log(response.data,'data')
                      tokenize(response.data.accessToken,response.data.refreshToken,response.data.user)
                      navigate('/') 
                  }
              })
              .catch((err)=>{
                console.log(err);
                setError(err.response.data.message)
              })

          

      }
  }
    useEffect(()=>{
      try{
        
        const decoded = jwtDecode(token)
        if(decoded._id==userId){
           const userData = JSON.parse(localStorage.getItem('userData'))
           setUser(userData)
           setSkills(userData.skills)
           console.log('asdas')
           return 
        }
        else{
           navigate('/login')
        }
      } catch {
        navigate('/login')
      }
    },[])
  return (
    <div className="login-container edit">
    <Nav></Nav>
    {user && skills?(
      <form onSubmit={(e)=>updateHandler(e)} className='signup'>
          <Image existing={user} file={imageFile} input={clickRef}></Image>
          <input className='hidden' onChange={(e)=>imageHandler(e)} ref={clickRef} type="file" name="profile" id="" />
          <div className="data">
              <div className="title">
                  Skills
              </div>
          <BoxAddon skills={skills} setSkills={setSkills} setError={setError} num={5}></BoxAddon>
          <div className="lock-cont">
            <div className="icon-cont">
              <img src={squareReverse} alt="" />
            </div>
            <input name='username' type="text" className="lock" id='name-input' placeholder={user?user.username:''} />
          </div>

          </div>
          <div className="handy-btns">
                <motion.div  whileTap={{ scale: 0.98 }}  className="secondary-btn">Discard</motion.div>
                <motion.button type="submit"  whileTap={{ scale: 0.98 }} className="cta-btn">Save changes</motion.button>
          </div>
          <div className="linking">
                Wanna change
                &#13;
                <span onClick={()=>setMode('signin')} className='underline-line'>
                    password?
                </span>
          </div>
              
          </form>
       
    ):''} 


       <CustomAlert error={error} setError={setError}/>
    </div>
  )
}

export default EditProfile
