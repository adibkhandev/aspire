import React , {useState} from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'
export const Loader = ({children,userType,setUserType}) => {
    const escapeTime = 0.1
    return (
        <>
            <div className="loader-cont">
              <motion.div 
                initial={{height:'25%'}}
                animate={!userType?{height:['25%','70%','25%']}:{y:'-150vh'}} 
                transition={!userType?{duration:6,repeat:Infinity,repeatType:'loop'}:{duration:0.1,delay:0.6}}
                onClick={()=>{
                    setUserType('teacher')
                }
            }  className={userType?"teacher-cont topSlide mover":"teacher-cont mover"}>
                    <div className="heading">
                        <motion.h1
                         animate={userType?{x:'-100vw'}:{x:0}}>
                            Choose 
                        </motion.h1>
                        <motion.h1 animate={userType?{x:'100vw'}:{x:0}}>
                            your mode
                        </motion.h1>
                    </div>
                    <motion.div
                      initial={{opacity:0.5}}
                      animate={!userType?{
                           opacity:1
                      }:{}} 
                      transition={!userType?{
                           delay:0.6,
                           duration:0.6,
                           repeat:Infinity,
                           repeatType:'mirror'
                      }:{}} 
                      className={`tap-info ${!userType?'pulse':'vanish'}`}>
                       Tap here if you are a teacher
                    </motion.div>
                </motion.div>


                     {children} 



                <motion.div 
                //    animate={value?{height:`${100-value}%`}:{height:auto}} 
                animate={!userType?{y:0}:{y:'100vh'}}
                transition={{duration:0.1,delay:0.6}}
                  onClick={()=>{
                     setUserType('student')
                   }
                 } 
                 className={"student-cont"}>
                    <motion.div
                       initial={{opacity:0.5}}
                       animate={!userType?{
                            opacity:1
                       }:{}} 
                       transition={!userType?{
                            duration:0.6,
                            repeat:Infinity,
                            repeatType:'mirror'
                       }:{}}
                       className={`tap-info ${!userType?'pulse':'vanish'}`}>
                       Tap here if you are a student
                    </motion.div>
                </motion.div>
            </div>
        </>
    )
}
