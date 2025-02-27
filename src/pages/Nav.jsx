import React , {useState,useEffect,useContext,useMemo,useRef} from 'react'
import compass from './../assets/images/compass.svg'
import crop from './../assets/images/crop.svg'
import info from './../assets/images/info.svg'
import logouticon from './../assets/images/logout.svg'
import play from './../assets/images/play.svg'
import reverse from './../assets/images/reverse.svg'
import upload from './../assets/images/upload.svg'
import acc from './../assets/images/acc.svg'
import { Context } from './login/AuthContext'
import logo from './../assets/images/aspire-logo.svg'
import hamburger from './../assets/images/hamburger.svg'
import { Drawer } from '@mui/material';
import { Link , useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { motion , useMotionValueEvent, useScroll , useTransform} from 'framer-motion'
export const Nav = ({setError}) => {
  const lastscrollY = useRef(0)
  const [direction,setDirection] = useState(null)
  const {scrollY} = useScroll();
////  console.log(scrollY,'sc')
    useMotionValueEvent(scrollY,"change",(latest)=>{
////      console.log(latest,'kattess',lastscrollY.current)
      if(latest>lastscrollY.current) setDirection("down")
      if(latest<lastscrollY.current) setDirection("up")
      lastscrollY.current = latest
    })
    useEffect(()=>{
////       console.log(direction,'f')
////       console.log(lastscrollY)
    },[direction])
////    console.log('declaring state',direction)
    const [drawerOpen,setDrawerOpen] = useState(false)
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null
    const decoded = token ? jwtDecode(token) : null
    const navigate = useNavigate()
    const {logout} = useContext(Context)
      return (
        <motion.div
          initial={{top:0}}
          animate={direction=="up"?{top:0}:direction=="down"?{top:"-100%"}:{top:0}} 
          className='nav-container fav'>
          {/* Bar */}
          <motion.div className="bar">
           <Link to={'/'}>
               <motion.img
                 initial={{x:"-220%"}}
                 animate={drawerOpen?{x:"-220%"}:{x:0}} 
                 transition={drawerOpen?{}:{delay:0.4}}
                 className='logo' src={logo} alt="" />
           </Link>



            <img onClick={()=>{
////                console.log('clcik')
                if(token) setDrawerOpen(true)
                else setError('Signup to experience all features')
            }} className='ham' src={hamburger} alt="" />

          </motion.div>

            {/* Drawer */}
            {decoded && <Drawer
              open={drawerOpen}
              transitionDuration={200}
              variant="temporary"
              onClose={(event,reason)=>{
                  setDrawerOpen(false)
////                  console.log(reason,'reason')
              }}
            >
               <div className="drawer-cont">
                    <div className="nav-cont">
                    <div className="logo-imitate">
                        <motion.img
                          initial={{x:"-220%"}}
                          animate={drawerOpen?{x:0}:{x:"-220%"}} 
                          transition={drawerOpen?{delay:0.3}:{delay:0.2}} 
                          className="logo" src={logo} alt="" />
                    </div>

                    </div>
                   <div className="options">
                      <Link to={'/subscribed'}>
                        <div className="option">
                          <img src={play} alt="" />
                             <h1>Subscribed</h1>
                          
                        </div>
                       </Link>
                       <div
                         className="option"
                         onClick={()=>{
                           navigate('/')
                         }}  
                        >
                          <img src={acc} alt="" />
                          <h1>Account</h1>
                       </div>
                       <Link to={`/course/${user.lastViewed}`} >
                        <div className="option">
                            <img src={reverse} alt="" />
                            <h1>Play recent</h1>
                        </div>
                       </Link>
                       <Link to={`/${decoded._id}/edit`}>
                       <div className="option">
                          <img src={crop} alt="" />
                          <h1>Edit profile</h1>
                       </div>
                       </Link>
                       <div 
                         className="option"
                         onClick={()=>{
                           navigate('/explore')
                         }} 
                        >
                          <img src={compass} alt="" />
                          <h1>Explore</h1>
                       </div>
                       <div 
                         onClick={()=>{
                           navigate('/upload')
                         }} 
                         className="option">
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
          }
        </motion.div>
    )
}


export const LandingNav = ({direction,popupOpen}) => {
  const lastscrollY = useRef(0)
    useEffect(()=>{
////       console.log(direction,'f')
////       console.log(lastscrollY)
    },[direction])
////    console.log('declaring state',direction)
    const [drawerOpen,setDrawerOpen] = useState(false)
    const token = localStorage.getItem('accessToken')
    const user = localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):null
    const decoded = token ? jwtDecode(token) : null
    const navigate = useNavigate()
    const {logout} = useContext(Context)
    const homeVariants = {
      non:{
          filter:'blur(0px)',
          scale:1,
      },
      blur:{
          filter:'blur(5px)',
          scale:1.01
      }
  }
      return (
        <motion.div
          initial={{top:0}}
          animate={direction=="up"?{top:0}:direction=="down"?{top:"-100%"}:{top:0}} 
          className='nav-container fav'>
          {/* Bar */}
          <motion.div
           variants={homeVariants}
           animate={!popupOpen?"non":"blur"} 
           className="bar"
          >
           <Link to={'/'}>
               <motion.img
                 initial={{x:"-220%"}}
                 animate={drawerOpen?{x:"-220%"}:{x:0}} 
                 transition={drawerOpen?{}:{delay:0.4}}
                 className='logo' src={logo} alt="" />
           </Link>



            <img onClick={()=>{
////                console.log('clcik')
                setDrawerOpen(true)
                
            }} className='ham' src={hamburger} alt="" />

          </motion.div>

            {/* Drawer */}
            {decoded && <Drawer
              open={drawerOpen}
              transitionDuration={200}
              variant="temporary"
              onClose={(event,reason)=>{
                  setDrawerOpen(false)
////                  console.log(reason,'reason')
              }}
            >
               <div className="drawer-cont">
                    <div className="nav-cont">
                    <div className="logo-imitate">
                        <motion.img
                          initial={{x:"-220%"}}
                          animate={drawerOpen?{x:0}:{x:"-220%"}} 
                          transition={drawerOpen?{delay:0.3}:{delay:0.2}} 
                          className="logo" src={logo} alt="" />
                    </div>

                    </div>
                   <div className="options">
                      <Link to={'/subscribed'}>
                        <div className="option">
                          <img src={play} alt="" />
                             <h1>Subscribed</h1>
                          
                        </div>
                       </Link>
                       <div
                         className="option"
                         onClick={()=>{
                           navigate('/')
                         }}  
                        >
                          <img src={acc} alt="" />
                          <h1>Account</h1>
                       </div>
                       <Link to={`/course/${user.lastViewed}`} >
                        <div className="option">
                            <img src={reverse} alt="" />
                            <h1>Play recent</h1>
                        </div>
                       </Link>
                       <Link to={`/${decoded._id}/edit`}>
                       <div className="option">
                          <img src={crop} alt="" />
                          <h1>Edit profile</h1>
                       </div>
                       </Link>
                       <div 
                         className="option"
                         onClick={()=>{
                           navigate('/explore')
                         }} 
                        >
                          <img src={compass} alt="" />
                          <h1>Explore</h1>
                       </div>
                       <div 
                         onClick={()=>{
                           navigate('/upload')
                         }} 
                         className="option">
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
          }
        </motion.div>
    )
}