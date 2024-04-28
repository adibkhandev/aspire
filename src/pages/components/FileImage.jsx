import React , {useState , useEffect} from "react";
import {motion} from 'framer-motion'
import Cam from '../components/svg/Cam';
const Image = ({file,input,existing,popupthere,setPopupthere,setRemovePfp}) => {
    const [updated,setUpdated] = useState(false)
    let [url,setUrl] = useState(null)
    const [detached,setDetached]=useState(true)
    
    useEffect(()=>{
        if(url && detached){
            console.log('flood')
            setTimeout(()=>{
               setUrl(null)
            },1000)
            if(setPopupthere) setPopupthere(false)
        }
    },[detached])
    useEffect(()=>{
     if(url) setDetached(false)
    },[url])
    useEffect(()=>{
        if(file){
            const reader = new FileReader()
            reader.onloadend = () =>{
                setUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
        if(existing){
            setUrl(import.meta.env.VITE_API_URL + existing)
        }
        
    },[file,existing])
    useEffect(()=>{
        console.log('update -' , file)
        
    },[file])
         return(
            <>
            <motion.div 
             whileTap={popupthere?{}:{scale:0.8}} 
             onClick={()=>{
               console.log(input.current)

               if(input){
               if(url){
                   if(setPopupthere){
                     setPopupthere(true)
                   } else{
                       setDetached(true)
                      input.current.click()
                   }
                   
                }
                if(!url && !popupthere){
                   input.current.click()
                }
              } 
             }}
               className="pfp-clicker">
                    <motion.div
                      className="mask">
                        <motion.div 
                            className={`pfpUploadContainer`}
                            initial={{ scale: 0}}
                            animate={!detached ?{ scale: 1 }:{scale:0}}
                            transition={{ ease: "linear", duration: 6 ,type:'spring', mass: 0.8 ,stiffness:80 }}
                        >
                            <img className='pfpUpload' src={url} alt=""/>
                        </motion.div>
                    </motion.div>
                        <motion.div 
                          className="options"
                          initial={{scale:0,rotate:90}}
                            animate={popupthere?(
                                    {scale:1,rotate:0}
                            ) :(
                                {scale:0,rotate:90}
                            )}
                        >
                            <div onClick={()=>{
                                if(input){
                                    input.current.click()
                                    setDetached(true)
                                }
                            }} id="first" className="option">Change picture</div>
                            <div
                             onClick={()=>{
                                setDetached(true)
                                setRemovePfp(true)
                             }} 
                             className="option">Remove upload</div>
                        </motion.div>
                        <motion.div
                        className="cam-cont">
                            <Cam></Cam>
                        </motion.div>
                        </motion.div> 
            </>
            
           
        )
    }


export default Image;