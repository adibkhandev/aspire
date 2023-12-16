import React , {useState} from 'react'

export const Loader = ({children,userType,setUserType}) => {
    return (
        <>
            <div className="loader-cont">



                <div onClick={()=>{
                    setUserType('teacher')
                }
            }  className={userType?"teacher-cont topSlide":"teacher-cont"}>
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
                </div>


                     {children} //signup/in



                <div onClick={()=>{
                     setUserType('student')
                   }
                 } 
                 className={userType?"student-cont bottomSlide":"student-cont"}>
                    <div 
                       className={`tap-info ${!userType?'pulse':'vanish'}`}>
                       Tap here if you are a student
                    </div>
                </div>
            </div>
        </>
    )
}
