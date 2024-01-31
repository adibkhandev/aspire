import React , {useEffect, useRef , useContext, useState , useLayoutEffect} from 'react'
import { BoxAddon } from '../components/BoxAddon';
import { Context } from './AuthContext';
import { Checkbox } from './Checkbox'

import {Social} from './Social'
import Image from '../components/FileImage'
import axios from 'axios'
export const Signup = ({userType , setMode , setError , setToken }) => {
    const [num,setNum] = useState(5)
    const [skills,setSkills]=useState([])
    const {tokenize} = useContext(Context)
    const clickRef = useRef(null)
    useLayoutEffect(()=>{
        console.log(window.innerHeight,'height')
        if(window.innerHeight<700){
            setNum(4)
        }
        if(window.innerWidth>760 && window.innerHeight<900){
            setNum(4)
        }
    },[])
    console.log(num,'num')
    useEffect(()=>{
        console.log(skills,'array')
    },[skills])
    const token = localStorage.getItem('accessToken');
    const signupHandler = (e) =>{
        e.preventDefault()
        console.log('clicked')
        if(e.target){
            if(e.target.username.value && e.target.password.value){
                let formData = new FormData()
                formData.append('userType',userType)
                formData.append('username',e.target.username.value)
                formData.append('password',e.target.password.value)
                formData.append('pfp',e.target.profile.files[0])
                formData.append('skills',JSON.stringify(skills))
                const headers = {
                    'Authorization':'Bearer ' + token,
                    'Content-Type':'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                    'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
                  }
                const url =  import.meta.env.VITE_API_URL + '/auth/register' 
                axios.post(url,formData,headers)
                .then((response)=>{
                    if(response.status==201){
                        console.log(response.data,'data')
                        // setToken({
                        //     accessToken:response.data.accesstoken,
                        //     refreshToken:response.data.refreshtoken,
                        // })
                            tokenize(response.data.accesstoken,response.data.refreshtoken,response.data.user)
                        
                     }
                })
                .catch((err)=>{
                  console.log(err);
                  setError(err.response.data.message)
                })

            }
            else{
                setError('Provide name and password to continue')
            }

        }
    }
    const [imageFile,setImageFile]=useState(null)
    const imageHandler = (e)=>{
        setImageFile(e.target.files[0])
    }
   
    return (
        <form onSubmit={(e)=>signupHandler(e)} className='signup'>
            <Image file={imageFile} input={clickRef}></Image>
            <input className='hidden' onChange={(e)=>imageHandler(e)} ref={clickRef} type="file" name="profile" id="" />
            <input name='username' type="text" className="regular-inputs" id='name-input' placeholder='What should we call you?' />
            <input name='password' type="text" className="regular-inputs" id='password-input' placeholder='Enter a secure password' />
            <div className="data">
                <div className="title">
                    Skills
                </div>
                <BoxAddon setSkills={setSkills} setError={setError} num={num}></BoxAddon>

            </div>
                {
                  userType && userType=='teacher'?(
                        <div className="terms">

                            <Checkbox></Checkbox>
                            <div className="text">
                                I accept all the 
                                
                                <span className='link'>
                                    &#13;
                                terms and conditions
                                    &#13;
                                </span>
                                applied
                            </div>
                        </div>

                    ):''
                }
            <button type='submit' className="signup-btn">
               Signup
            </button>
           
                    <div className="linking">
                        Already a 
                        &#13;
                        <span onClick={()=>setMode('signin')} className='underline-line'>
                            member?
                        </span>
                    </div>
            
            {userType && userType=='student'?<Social/>:''}
             
        </form>
    )
}
