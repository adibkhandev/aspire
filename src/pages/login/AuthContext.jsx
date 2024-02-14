import React, { createContext , useState , useEffect} from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
export const Context = createContext()
export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate() 
    console.log(localStorage.getItem('accessToken'),'definition')
    const [token,setToken] = useState({
        accessToken:localStorage.getItem('accessToken')?JSON.parse(localStorage.getItem('accessToken')) : null,
        refreshToken:localStorage.getItem('refreshToken')?JSON.parse(localStorage.getItem('refreshToken')) : null,
    })
    useEffect(()=>{
         console.log(token,'updated')
    },[token])
    const tokenize = (access,refresh,userData) => {
        console.log('tokenizing')
        setToken({
            accessToken:access,
            refreshToken:refresh,
        })
        localStorage.setItem('accessToken',JSON.stringify(access))
        localStorage.setItem('refreshToken',JSON.stringify(refresh))
        if(userData) localStorage.setItem('userData',JSON.stringify(userData))
    }
    const logout = () =>{
        setToken({
            accessToken:null,
            refreshToken:null,
        })
       localStorage.removeItem('accessToken')
       localStorage.removeItem('refreshToken')
       localStorage.removeItem('userData')
       navigate('/')
    } 
    const refreshToken = () => {
        console.log('pay')
        const data = {
            refreshToken:token.refreshToken
        }
        axios.post(import.meta.env.VITE_API_URL + '/auth/refresh/',data)
          .then(response=>{
              console.log(response.data,'refresh')
              tokenize(response.data.accesstoken,response.data.refreshtoken)
          
            })
          .catch(err=>{
             console.log(err,'error')
              if(err.response.status == 400){
                 logout()
              }
          })
    }
    useEffect(()=>{
        if(token && token.refreshToken){
           refreshToken()
           console.log('refreshing')
        }
    },[])
    return (
        <Context.Provider value={{
            'token':token,
            'tokenize':tokenize,
            'logout':logout,
        }}>
            {children}
        </Context.Provider>
    )
}
