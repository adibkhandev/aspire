import React ,{useContext, useEffect} from 'react'
import {jwtDecode} from 'jwt-decode'
import { useNavigate } from 'react-router'
import { Context } from './login/AuthContext'
import { Nav } from './Nav'
export const Home = () => {
    const {token} = useContext(Context)
    const navigate = useNavigate()
    useEffect(()=>{
         if(token.accessToken && token.refreshToken) {
            const decoded = jwtDecode(token.accessToken)
            if(decoded){
                console.log(decoded,'decoded')
                navigate(`/${decoded.username}`)
            }
            else{
                navigate('/login')
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
