import React, { useState ,useEffect} from 'react'
import Video from './pages/Video'
import Input from './pages/Input'
import {Home} from './pages/Home'
import { Account } from './pages/account/Account'
import { Login } from './pages/login/Login'
import { AuthContextProvider , Context} from './pages/login/AuthContext'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { Social } from './pages/login/Social'
import { GoogleOAuthProvider } from '@react-oauth/google';
import UploadCourse from './pages/upload/UploadCourse'
const App = () => {
  
  return (
    <>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_APP_ID || ''}>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/:username' element={<Account/>}></Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/demo' element={<Social/>}/>
          <Route path='/upload/video' element={<UploadCourse/>}/>
        </Routes>
      </AuthContextProvider>
     </GoogleOAuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
