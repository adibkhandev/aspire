import compass from './../assets/images/compass.svg'
import crop from './../assets/images/crop.svg'
import info from './../assets/images/info.svg'
import logouticon from './../assets/images/logout.svg'
import play from './../assets/images/play.svg'
import reverse from './../assets/images/reverse.svg'
import upload from './../assets/images/upload.svg'
import acc from './../assets/images/acc.svg'
import React , {useState,useContext} from 'react'
import { Context } from './login/AuthContext'
import logo from './../assets/images/aspire-logo.svg'
import hamburger from './../assets/images/hamburger.svg'
import { Drawer } from '@mui/material';
import { Link , useNavigate } from 'react-router-dom'
export const Nav = () => {
    const [drawerOpen,setDrawerOpen] = useState(false)
    const token = localStorage.getItem('accessToken')
    const navigate = useNavigate() 
    const {logout} = useContext(Context)
      return (
        <div className='nav-container'>
           <Link to={'/'}>
               <img className='logo' src={logo} alt="" />
           </Link>
            <img onClick={()=>{
                console.log('clcik')
                setDrawerOpen(true)
                
            }} className='ham' src={hamburger} alt="" />
            <Drawer
              open={drawerOpen}
              variant="temporary"
              onClose={(event,reason)=>{
                  setDrawerOpen(false)
                  console.log(reason,'reason')
              }}
            >
               <div className="drawer-cont">
                    <div className="nav-cont">
                    <div className="logo-imitate">
                        <img className="logo" src={logo} alt="" />
                    </div>

                    </div>
                   <div className="options">
                       <div className="option">
                          <img src={play} alt="" />
                          <h1>Subscribed</h1>
                       </div>
                       <div className="option">
                          <img src={acc} alt="" />
                          <h1>Account</h1>
                       </div>
                       <div className="option">
                          <img src={reverse} alt="" />
                          <h1>Play recent</h1>
                       </div>
                       <div className="option">
                          <img src={crop} alt="" />
                          <h1>Edit profile</h1>
                       </div>
                       <div className="option">
                          <img src={compass} alt="" />
                          <h1>Explore</h1>
                       </div>
                       <div className="option">
                          <img src={upload} alt="" />
                          <h1>Contribute</h1>
                       </div>
                       <div onClick={(e)=>logout()} className="option">
                          <img className='giveMargin' src={logouticon} alt="" />
                          <h1>Logout</h1>
                       </div>
                       <div className="option">
                          <img className='smallMargin' src={info} alt="" />
                          <h1>About us</h1>
                       </div>

                   </div>
               </div>

            </Drawer>
        </div>
    )
}
