import React, { createContext , useState , useEffect} from 'react'
import { useNavigate } from 'react-router'
export const Context = createContext()
export const AuthContextProvider = ({children}) => {
    const navigate = useNavigate() 
    const [token,setToken] = useState({
        accessToken: localStorage.getItem('accessToken')?JSON.parse(localStorage.getItem('accessToken')) : null,
        refreshToken:localStorage.getItem('refreshToken')?JSON.parse(localStorage.getItem('refreshToken')) : null,
    })
    useEffect(()=>{
         console.log(token,'updated')
    },[token])
    const tokenize = (access,refresh) => {
        console.log('tokenizing')
        setToken({
            accessToken:access,
            refreshToken:refresh,
        })
        localStorage.setItem('accessToken',JSON.stringify(access))
        localStorage.setItem('refreshToken',JSON.stringify(refresh))
    }
    const logout = () =>{
        setToken({
            accessToken:null,
            refreshToken:null,
        })
       localStorage.removeItem('accessToken')
       localStorage.removeItem('refreshToken')
       navigate('/')
    } 
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
