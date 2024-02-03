import React , {useState , useEffect} from "react";
import {motion} from 'framer-motion'
import Cam from '../components/svg/Cam';
const Image = ({file,input,existing}) => {
    const [updated,setUpdated] = useState(false)
    let [url,setUrl] = useState(null)
    const [changerModel,setChangerModel]=useState(false)
    const [detached,setDetached]=useState(true)
    useEffect(()=>{
       
    },[file,existing])
    useEffect(() => {
        if(file && !detached){
        }

    }, [file,detached])













    useEffect(()=>{
        if(detached){
            if(url){
                setTimeout(()=>{
                   setUrl(null)
                },1000)
                setChangerModel(false)
            }
            else{
                if(file){
                    setDetached(false)
                    const reader = new FileReader()
                    reader.onloadend = () =>{
                        setUrl(reader.result)
                    }
                    reader.readAsDataURL(file)
                }
                if(existing){
                    setDetached(false)
                    setUrl(import.meta.env.VITE_API_URL + existing.pfp)
                }
            }
        }
    },[detached,file])
    useEffect(()=>{
        console.log('update -' , file)
    },[file])
    // useEffect(()=>{
    //     if(!url){
    //         setDetached(false)
    //     }
    // },[url])
         return(
            <>
            
            <motion.div 
             whileTap={{ scale: 0.9 }}
             onClick={()=>{
               console.log(input.current)

               if(input){
               if(url){
                   setChangerModel(true)
                }
                if(!url && !changerModel){
                   input.current.click()
                }
              } 
             }}
               className="pfp-clicker">


 
                    <div className="mask">
                        <motion.div 
                        className={`pfpUploadContainer`}
                        initial={{ scale: 0}}
                        animate={!detached ?{ scale: 1 }:{scale:0}}
                        transition={{ ease: "linear", duration: 6 ,type:'spring', mass: 0.8 ,stiffness:80 }}
                        >
                            <img className='pfpUpload' src={url} alt=""/>
                        </motion.div>
                    </div>
                        <motion.div 
                          className="options"
                          initial={{scale:0}}
                          animate={changerModel?{scale:1}:{scale:0}}
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