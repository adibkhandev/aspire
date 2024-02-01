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
import Demo from './pages/Demo'
import UploadCourse from './pages/upload/UploadCourse'
import UploadTopic from './pages/upload/UploadTopic'
import UploadVideo from './pages/upload/UploadVideo'
import Course from './pages/Course'
import Explore from './pages/explore/Explore'
import EditProfile from './pages/account/EditProfile'
const App = () => {
  
  return (
    <>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_APP_ID || ''}>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/:username' element={<Account/>}></Route>
          <Route path='/:userId/edit' element={<EditProfile/>}></Route>
          <Route path='/course/:courseId' element={<Course/>}></Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='/demo' element={<Demo/>}/>
          <Route path='/explore' element={<Explore/>}/>
          <Route path='/upload' element={<UploadCourse/>}/>
          <Route path='/:courseId/add/topic' element={<UploadTopic/>}/>
          <Route path='/:courseId/:topicId/add/video' element={<UploadVideo/>}/>
        </Routes>
      </AuthContextProvider>
     </GoogleOAuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
