import React, { useState ,useEffect} from 'react'
import Video from './pages/Video'
import Input from './pages/Input'
import {Home} from './pages/Home'
import { Account } from './pages/account/Account'
import { Login } from './pages/login/Login'
import { AuthContextProvider , Context} from './pages/login/AuthContext'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
const App = () => {
  
  return (
    <>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/:username' element={<Account/>}></Route>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
    </>
  )
}

export default App
