import { useState , useEffect } from 'react'
import axios from 'axios'
import {motion,useDragControls} from 'framer-motion'
function Demo() {
  const controls = useDragControls()

  function startDrag(event) {
    controls.start(event)
  }

  return (
    <>
         <div className='w-4 h-4 bg-black' onPointerDown={startDrag} />
          {/* <motion.div className='w-4 h-4 bg-blue-400' drag="x" dragControls={controls} /> */}
    </>
  )
}
export default Demo
