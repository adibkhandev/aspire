import React, { useState , useRef, useEffect ,useContext} from 'react'
import { Context } from '../login/AuthContext';
import { Signup } from '../login/Signup'
import { BoxAddon } from '../components/BoxAddon';
import MotionCta from '../components/MotionCta';
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
        if(removePfp) formData.append('removePfp',removePfp)       
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
    const [changesMade,setChangesMade] = useState(false)
    console.log('jj')
    const [popupthere,setPopupthere]=useState(false)
    const [removePfp,setRemovePfp]=useState(false)
    const usernameRef = useRef(null)


    ///


    useEffect(()=>{
       if(user && skills && usernameRef.current){
        if (
            user.skills.slice(-1)[0] == skills.slice(-1)[0] && 
            skills.length == user.skills.length && 
            !imageFile && 
            !removePfp && 
            !usernameRef.current.value
        ){
           setChangesMade(false)
        }
        else{
            setChangesMade(true)
        }
      }
    },[skills,imageFile,removePfp])



    ////
  const [mode,setMode] = useState('edit')
  const titleRef = useRef(null)
  return (
    <div className="edit">
    <Nav></Nav>
    <motion.div animate={mode=='auth'?{translateX:'-100vw'}:{translateX:0}} className="form-parent">
      {user && skills?(
          <form
            onClick={(e)=>{
              e.stopPropagation()
              if(popupthere){
                setPopupthere(false)   
              }
            }}  
            onSubmit={(e)=>updateHandler(e)} className='signup'>
              <Image setRemovePfp={setRemovePfp} popupthere={popupthere} setPopupthere={setPopupthere} existing={user.pfp} file={imageFile} input={clickRef}></Image>
              <input className='hidden' onChange={(e)=>imageHandler(e)} ref={clickRef} type="file" name="profile" id="" />
              <div className="data">
                  <div ref={titleRef} className="title">
                      Skills
                  </div>
              <BoxAddon ref={titleRef} skills={skills} setSkills={setSkills} setError={setError} num={5}></BoxAddon>
              <div className="lock-cont">
                <div className="icon-cont">
                  <img onClick={()=>{
                    console.log('casa')
                    usernameRef.current.focus()
                  }} src={squareReverse} alt="" />
                </div>
                <input 
                onChange={(e)=>{
                  if(e.target.value) setChangesMade(true)
                  else setChangesMade(false)
                }} autoComplete='off' ref={usernameRef} name='username' type="text" className="lock" id='name-input' placeholder={user?user.username:''} />
              </div>

              </div>
              <div className="handy-btns">
                    <motion.div onClick={()=>{
                        navigate('/')   
                    }}  whileTap={{ scale: 0.98 }}  className="secondary-btn">Discard</motion.div>
                    <MotionCta submit={true} changesMade={changesMade} ></MotionCta>
              </div>
              <div className="linking">
                    Wanna change
                    &#13;
                    <span onClick={()=>setMode('auth')} className='underline-line'>
                        password?
                    </span>
              </div>
                  
              </form>
              
      ):''} 
      <ChangePasswordForm tokenize={tokenize} setMode={setMode} setError={setError} ></ChangePasswordForm>
    </motion.div>


      <div className="toast-cont">
        <CustomAlert error={error} setError={setError}/>
      </div>
    </div>
  )
}

const ChangePasswordForm = ({setMode,setError,tokenize}) => {
  const formRef = useRef()
  const navigate = useNavigate()
  const [changesMade,setChangesMade] = useState(false)
  const trackChanges = (e) => {
     console.log(formRef.current.lastPassword,'e')
     if(formRef.current.lastPassword.value && formRef.current.lastPasswordConfirmed.value && formRef.current.newPassword.value){
        setChangesMade(true)
     }
     else{
      setChangesMade(false)
     }
  }

  const passwordHandler = (e) => {
    e.preventDefault()
    const token = localStorage.getItem('accessToken')
    console.log('pass',e.target.lastPassword.value)
    if(e.target.lastPassword.value!=e.target.lastPasswordConfirmed.value){
        setError("Passwords don't match")
        return
    }
    const data = {
       lastPassword:e.target.lastPassword.value,
       lastPasswordConfirmed:e.target.lastPasswordConfirmed.value,
       newPassword:e.target.newPassword.value
    }
    const headers = {
      headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type':'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      }
    }
    console.log(data,'dd')
    const url =  import.meta.env.VITE_API_URL + '/auth/password/update' 
    axios.post(url,data,headers)
              .then((response)=>{
                      console.log(response.data,'data')
                      tokenize(response.data.accesstoken,response.data.refreshtoken,response.data.user)
                      navigate('/') 
              })
              .catch((err)=>{
                console.log(err);
                // setError(err.response.data.message)
              })
  }
  
  return(
    <form 
    ref={formRef}
    onChange={(e)=>trackChanges(e)}
    onSubmit={(e)=>{
        passwordHandler(e)
    }}
    className="change w-screen">
      <div className="inputs">
        <input type="text" name="lastPassword" placeholder='Type your current password' className="regular-inputs" />
        <input type="text" name='lastPasswordConfirmed' placeholder='Type the password again' className="regular-inputs" />
        <input type="text" name='newPassword' placeholder='New password ?' className="regular-inputs" />
        <div className="handy-btns">
                <motion.div onClick={()=>{
                    navigate('/')   
                }}  whileTap={{ scale: 0.98 }}  className="secondary-btn">Discard</motion.div>
                <MotionCta submit={true} changesMade={changesMade} ></MotionCta>
          </div>
          <div className="linking">
                <span onClick={()=>setMode('edit')} className='underline-line'>
                    {'<Edit my profile'}
                </span>
                &#13;
                instead
          </div>
      </div>
  </form>
   )
}


export default EditProfile
