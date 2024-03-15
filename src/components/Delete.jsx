import React, { useEffect ,useRef} from 'react'
import { motion ,animate} from 'framer-motion'
const Delete = ({setDeleteMode,setDeleteInitiated,deletePrompt,setDeletePrompt}) => {
    const homeVariants = {
        non:{
        },
        blur:{
        }
    }
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
  return (
    <motion.div
    transition={{delay:0.08}}
    ref={scope} 
    onClick={(e)=>{
        e.stopPropagation()
        setDeletePrompt(false)
        setDeleteMode(false)
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
                    setDeleteMode(false)
                    setTimeout(()=>{
                        window.location.reload()
                    },800)
                    
                   }} className="confirm">
                        Confirm
                   </div>
                   <div className="cancel">
                        Cancel
                   </div>
               </div>
          </motion.div>

    </motion.div>
  )
}

export default Delete