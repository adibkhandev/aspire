import React ,{useContext, useEffect, useState} from 'react'
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router'
import { Context } from './login/AuthContext'
import { Nav } from './Nav'
export const Home = () => {
    const {token,refreshToken} = useContext(Context)
    
    const navigate = useNavigate()
    useEffect(()=>{
         if(token.accessToken && token.refreshToken) {
            const decodedRefresh = jwtDecode(token.refreshToken)
            const decoded = jwtDecode(token.accessToken)
            if(!decoded || !decodedRefresh) navigate('/login')
            else{
               navigate(`/profile/${decoded.username}`)
            }
         }
         else{
            navigate('/login')
         }
    },[])
    return (
        <>
        
              <div className="home">
                 <Nav></Nav>
      
              </div>
        </>
    )
}
