import React,{useEffect} from 'react'
import Alert from '@mui/material/Alert';
import {motion , AnimatePresence} from 'framer-motion'
export const CustomAlert = ({error,setError}) => {
    const MotionAlert = motion(Alert,{forwardMotionProps:true})
    // useEffect(()=>{
    //     if(error){
    //         setTimeout(()=>{
    //             setError(null)
    //         },1000)
    //     }
    // },[error])
    return (
            <AnimatePresence>
                    {error && (
                        <MotionAlert 
                            initial={{y:80}}
                            animate={{y:0}}
                            exit={{y:80}}
                            variant="filled"
                            className='toast' 
                            severity='error'
                            key="modal"
                            >
                            {error}
                        </MotionAlert>

                    )}

            </AnimatePresence>

    )
}


