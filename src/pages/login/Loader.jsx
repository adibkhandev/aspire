import React , {useState} from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
export const Loader = ({children,userType,setUserType}) => {
    const value = 30
    return (
        <>
            <div className="loader-cont">
              <motion.div 
                // animate={value?{height:`${value}%`}:{height:auto}} 
                onClick={()=>{
                    setUserType('teacher')
                }
            }  className={userType?"teacher-cont topSlide mover":"teacher-cont mover"}>
                    <div className="heading">
                        <h1 className={userType?'goLeft':''}>
                            Choose 
                        </h1>
                        <h1 className={userType?'goRight':''}>
                            your mode
                        </h1>
                    </div>
                    <div className={`tap-info ${!userType?'pulse':'vanish'}`}>
                       Tap here if you are a teacher
                    </div>
                </motion.div>


                     {children} 



                <motion.div 
                //    animate={value?{height:`${100-value}%`}:{height:auto}} 
                  onClick={()=>{
                     setUserType('student')
                   }
                 } 
                 className={userType?"student-cont bottomSlide":"student-cont"}>
                    <div 
                       className={`tap-info ${!userType?'pulse':'vanish'}`}>
                       Tap here if you are a student
                    </div>
                </motion.div>
            </div>
        </>
    )
}
