import React,{useState,useEffect,useContext} from 'react'
import { Context } from './AuthContext'
import {Loader} from './Loader'
import {Nav} from './../Nav'
import {Signup} from './Signup'
import { Signin } from './Signin'
import {CustomAlert} from './CustomAlert'
import { useNavigate } from 'react-router'
export const Login = () => {
    const [userType,setUserType] = useState(null)
    const [error,setError]=useState(null)
    const [mode,setMode] = useState('signup')
    const {token} = useContext(Context)
    const navigate = useNavigate()
    useEffect(()=>{
         if(token.accessToken && token.refreshToken) navigate('/')
    },[token])
    return (
        <>
            <Loader userType={userType} setUserType={setUserType}>
                <div className="login-container">
                    <Nav></Nav>
                    <div style={mode=='signup'?{left:'0'}:{left:'-100vw'}} className="content">
                        <Signup setError={setError} setMode={setMode} userType={userType}></Signup>
                        <Signin setError={setError} setMode={setMode} userType={userType}></Signin>
                    </div>
                    <CustomAlert error={error} setError={setError}/>
                </div>
            </Loader>
        </>
    )
}
