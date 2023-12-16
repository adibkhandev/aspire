import React , {useContext} from 'react'
import { Social } from './Social'
import { Context } from './AuthContext';
import axios from 'axios';
export const Signin = ({userType,setMode,setError , setToken}) => {
    const {tokenize} = useContext(Context)

    const signinHandler = (e) =>{
        console.log(e.target.username.value)
        e.preventDefault()
        if(e.target.username.value && e.target.password.value){
            const data = {
                'username':e.target.username.value,
                'password':e.target.password.value,
            }
            console.log(data,'form')
            const headers = {
                'Content-Type':'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
              }
            const url = import.meta.env.VITE_API_URL + '/auth/login'
            axios.post(url,data,headers)
            .then((response)=>{
                if(response.status==200){
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
    return (
        <form onSubmit={(e)=>signinHandler(e)} className="signin">
            <input name='username' type="text" className="regular-inputs" id='name-input' placeholder='What should we call you?' />
            <input name='password' type="text" className="regular-inputs" id='password-input' placeholder='Enter a secure password' />
            <button type='submit' className="signup-btn">
                Login
            </button>
            <div className="linking">
                <span onClick={()=>setMode('signup')} className='underline-line'>
                    New member?
                </span>
                &#13;
                of aspire
            </div>
            {
                userType && userType=='student'?(
                    <Social/>
                ):''
            }
        </form>
    )
}
