import React, { useEffect, useState } from 'react'
import { spring, useAnimate } from 'framer-motion'
import { motion } from 'framer-motion'
const Intro = () => {
  let duration = 1
  let delay = 2
  const [animationDone,setAnimationDone] = useState(false) 
  const [scope,animate] = useAnimate()
  useEffect(()=>{
    const popOut = async() => {
      console.log('animating')
      await animate(scope.current,{
          scale:1
      },{delay:0.4,duration:0.4,type:'spring'})
      await animate('.star',{
         marginRight:0
      },{delay:0.4})
      await animate('.rest',{
         x:0
      })
    }
    popOut()
    const popIn = async() => {
      //side wing
      await animate('.rest',{
        x:'-10rem',
        scale:0
      },{duration:0.4})
      //A
      await animate('.star',{
        marginRight:'-3rem'
      })
      await animate(scope.current,{
        scale:0
      },{duration:0.2,delay:0.2,type:spring})
    }
    setTimeout(popIn,2000)

  })
  return (
    <div className='intro-frame'>
      <motion.div className="scalar">
        <motion.div
          ref={scope}
          initial={{scale:0}}
          className="center">
              <motion.h1 initial={{marginRight:'-3rem'}} className='star'>A</motion.h1> 
              <motion.span initial={{x:'-10rem'}} className='rest'>spire</motion.span>
        </motion.div>
      </motion.div>
        
    </div>
  )
}

export default Intro
