import React from 'react'
import { motion } from 'framer-motion'
const MotionCta = ({changesMade,submit,onClick,text}) => {
    
  return (
    <motion.button 
        onClick={()=>{
            if(onClick){
                  onClick()
            }
        }}
        initial={{backgroundColor:'rgba(0,0,0,0)',border:'3px solid #2E2E2E'}}
        animate={
            changesMade?{
                backgroundColor:'#B8B8B8' ,
                border:'3px solid #B8B8B8'}:{
                backgroundColor:'rgba(0,0,0,0)',
                border:'3px solid #2E2E2E'}
            } 
        type={submit && changesMade?"submit":"button"}  
        whileTap={{ scale: 0.98 }} 
        className="cta-btn">
            {text?text:"Save changes"}
    </motion.button>
  )
}

export default MotionCta
