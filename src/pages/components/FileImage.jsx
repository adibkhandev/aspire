import React , {useState , useEffect} from "react";
import {motion} from 'framer-motion'
import Cam from '../components/svg/Cam';
const Image = ({file,input,existing}) => {
    const [updated,setUpdated] = useState(false)
    let [url,setUrl] = useState(null)
    useEffect(() => {
        if(file){
            const reader = new FileReader()
            reader.onloadend = () =>{
                setUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
        if(existing && existing.pfp){
            setUrl( import.meta.env.VITE_API_URL + existing.pfp)
        }
        else{
            setUrl(null)
        }
    }, [file,existing])
    useEffect(()=>{
        console.log('update -' , updated)
    },[updated])
         return(
            <>
            
            <motion.div 
             whileTap={{ scale: 0.9 }}
             onClick={()=>{
               console.log(input.current)
               if(input){
                   input.current.click()
                   setTimeout(()=>{
                      setUrl(null)
                   },2000)
                  } 
             }}
               className="pfp-clicker">



                {url || (existing && existing.pfp) ?(
                    <div className="mask">
                        <motion.div 
                        className={`pfpUploadContainer`}
                        initial={{ scale: 0}}
                        animate={url?{ scale: 1 }:{scale:0}}
                        transition={{ ease: "linear", duration: 6 ,type:'spring', mass: 0.8 ,stiffness:80 }}
                        // onAnimationComplete={()=> {
                        //     setUpdated(true)
                        //     console.log('changing')
                        // }}
                        >
                            <img className='pfpUpload' src={url?url:import.meta.env.VITE_API_URL + existing.pfp} alt=""/>
                        </motion.div>

                    </div>
                ):''}
             
             
             <motion.div
               className="cam-cont">
                <Cam></Cam>
             </motion.div>
            </motion.div> 
            </>
            
           
        )
    }


export default Image;