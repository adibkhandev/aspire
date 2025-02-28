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
import EditProfile from './pages/edit/EditProfile'
import EditCourse from './pages/edit/EditCourse'
import EditVideo from './pages/edit/EditVideo'
import Course from './pages/Course'
import Explore from './pages/explore/Explore'
import Subscribed from './pages/account/Subscribed'
import Intro from './pages/Intro'
const App = () => {
  const [loaded,setLoaded] = useState(false)
  useEffect(() => {
    let loading = setTimeout(()=>{
         setLoaded(true)
    },3000);
    return () => {
        clearTimeout(loading)  
    };
  }, [])
  return (
    <>
    {
      true?(
        <BrowserRouter>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GG_APP_ID || ''}>
          <AuthContextProvider>
            <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/profile/:username' element={<Account/>}></Route>
              <Route path='/subscribed' element={<Subscribed/>}></Route>
              <Route path='/:userId/edit' element={<EditProfile/>}></Route>
              <Route path='/course/:courseId' element={<Course/>}></Route>
              <Route path='/login' element={<Login/>}/>
              <Route path='/demo' element={<Demo/>}/>
              <Route path='/explore' element={<Explore/>}/>
              <Route path='/upload' element={<UploadCourse/>}/>
              <Route path='/:courseId/add/topic' element={<UploadTopic/>}/>
              <Route path='/:courseId/edit/course' element={<EditCourse/>}/>
              <Route path='/:courseId/:topicId/add/video' element={<UploadVideo/>}/>
              <Route path='/:courseId/:topicId/:videoId/edit/video' element={<EditVideo/>}/>        
            </Routes>
          </AuthContextProvider>
        </GoogleOAuthProvider>
        </BrowserRouter>
      ):<Intro/>
    }
    </>
  )
}

export default App
