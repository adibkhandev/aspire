import React , {useEffect, useRef , useContext} from 'react'
import { Context } from './AuthContext';
import { Checkbox } from './Checkbox'
import cam from './../../assets/images/cam.svg'
import {Social} from './Social'
import axios from 'axios'
export const Signup = ({userType , setMode , setError , setToken}) => {
    const {tokenize} = useContext(Context)
    const clickRef = useRef(null)
    useEffect(()=>{
        // setToken({
        //     accessToken:'shits',
        //     refreshToken:'shits',
        // })
    },[])
    const signupHandler = (e) =>{
        e.preventDefault()
        if(e.target){
            if(e.target.username.value && e.target.password.value){
                let formdata = new FormData()
                formdata.append('usertype',userType)
                formdata.append('username',e.target.username.value)
                formdata.append('password',e.target.password.value)
                formdata.append('profile',e.target.profile.files[0])
                const headers = {
                    'Content-Type':'multipart/form-data',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                    'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
                  }
                const url = import.meta.env.VITE_API_URL + '/auth/register'
                axios.post(url,formdata,headers)
                .then((response)=>{
                    if(response.status==201){
                        console.log(response.data.accesstoken,'data')
                        // setToken({
                        //     accessToken:response.data.accesstoken,
                        //     refreshToken:response.data.refreshtoken,
                        // })
                        tokenize(response.data.accesstoken,response.data.refreshtoken)
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
    return (
        <form onSubmit={(e)=>signupHandler(e)} className='signup'>
           <div onClick={()=>{
            console.log(clickRef.current)
                  if(clickRef){
                    clickRef.current.click()
                  } 
             }}
               className="pfp-clicker">
             <div className="cam-cont">
                <img src={cam} alt="" />
             </div>
            </div> 
            <input className='hidden' ref={clickRef} type="file" name="profile" id="" />
            <input name='username' type="text" className="regular-inputs" id='name-input' placeholder='What should we call you?' />
            <input name='password' type="text" className="regular-inputs" id='password-input' placeholder='Enter a secure password' />
            <div className="data">
                <div className="title">
                    Skills
                </div>
                <div className="textarea-container">
                   <textarea className='attributes' name="" id="" cols="40" rows="5" placeholder='Search for skills'></textarea>
                </div>

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
