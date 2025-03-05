import React, { useEffect ,useRef , useState} from 'react'
import { motion ,animate} from 'framer-motion'

const Delete = ({deleteMode,setDeleteMode,setDeleteInitiated,deletePrompt,setDeletePrompt}) => {
    const scope = useRef(null)
    const animateDelete = async () => {
        if(deletePrompt){
            await animate(scope.current,{
                backdropFilter:'brightness(50%) blur(10px)',
                background:'#2727270c',
                zIndex:5
                
            })
        }
        else{
            await animate(scope.current,{
                backdropFilter:'brightness(100%) blur(0px)',
                background:'transparent',
            })
            await animate(scope.current,{
                zIndex:-1
            })
        }
    } 
    useEffect(()=>{
        animateDelete()
    },[deletePrompt])
 if(deletePrompt) return (
    <motion.div
    transition={{delay:0.08}}
    ref={scope} 
    onClick={(e)=>{
        e.stopPropagation()
        setDeletePrompt(false)
        if(setDeleteMode) setDeleteMode(false)
    }}
      className='delete-screen'>
          <motion.div
            initial={{y:"100vh"}}
            animate={deletePrompt?{y:0,scale:1}:{y:"100vh",scale:0.4}} 
            transition={deletePrompt?{delay:0.2}:{delay:0}}
            className="delete-dialog">
               <div className="text">
                    Are you sure you want to delete the following?
               </div>
               <div className="options">
                   <div onClick={()=>{
                    setDeleteInitiated(true)
                    setDeletePrompt(false)
                    if(setDeleteMode){
                     setDeleteMode(false)
                     setTimeout(()=>{
                         window.location.reload()
                     },800)}
                   }} className="confirm">
                        Confirm
                   </div>
                   <div onClick={()=>setDeletePrompt(false)} className="cancel">
                        Cancel
                   </div>
               </div>
          </motion.div>

    </motion.div>
  )
}


export const LogoutPopup = ({logout,loggingOut,setLoggingOut}) => {
    const scope = useRef(null)
    const timeForClose = 0.5
    const [closing,setClosing] = useState(false)
    const animateDelete = async () => {
        if(loggingOut && !closing){
            // await animate(scope.current,{
            //      opacity:1  
            // },{
            //     delay:1
            // })
            await animate(scope.current,{
                opacity:1,
                backdropFilter:'brightness(50%) blur(10px)',
                background:'#2727270c',
                zIndex:5
                
            },{
                delay:timeForClose
            })
        }
        else{
            console.log('condition workds')
            await animate(scope.current,{
                backdropFilter:'brightness(100%) blur(0px)',
                background:'transparent',
            },{
                delay:0.2,
            })
            await animate(scope.current,{

                zIndex:-1
            },{
                onComplete: ()=> {
                    setLoggingOut(false)
                    setClosing(false)
                } 
            })
        }
    } 
    useEffect(()=>{
        animateDelete()
    },[loggingOut,closing])


 if(loggingOut) return (
    <motion.div
    style={{opacity:0}}
    transition={{delay:0.08}}
    ref={scope} 
    onClick={(e)=>{
        e.stopPropagation()
        // setLoggingOut(false)
        setClosing(true)
    }}
      className='delete-screen'>
          <motion.div
            initial={{y:"100vh"}}
            animate={loggingOut && !closing?{y:0,scale:1}:{y:"100vh",scale:0.4}} 
            transition={loggingOut && !closing?{delay:timeForClose + 0.2}:{delay:0}}
            className="delete-dialog">
               <div className="text">
                    Are you sure you want to discontinue?
               </div>
               <div className="options">
                   <div onClick={()=>{
                    //    setLoggingOut(false)
                    setClosing(true)
                       logout()
                    }} className="confirm">
                        Confirm
                   </div>
                   <div onClick={()=>{
                    //    setLoggingOut(false)
                    setClosing(true)
                    }} className="cancel">
                        Cancel
                   </div>
               </div>
          </motion.div>

    </motion.div>
  )
}

export default Delete