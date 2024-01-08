import React , {useState , useEffect} from "react";
import {motion} from 'framer-motion'
import Cam from '../components/svg/Cam';
const Image = ({file,input}) => {

    let [url,setUrl] = useState(null)
    let fileIns = file
    useEffect(() => {
        if(file){
            const reader = new FileReader()
            reader.onloadend = () =>{
                setUrl(reader.result)
            }
            reader.readAsDataURL(file)
        }
        else{
            setUrl(null)
        }
    }, [fileIns])
         return(
            <>
            
            <motion.div 
             whileTap={{ scale: 0.9 }}
             onClick={()=>{
               console.log(input.current)
                  if(input){
                    input.current.click()
                  } 
             }}
               className="pfp-clicker">



                {url?(
                    <div className="mask">
                        <motion.div 
                        className={`pfpUploadContainer`}
                        initial={{ scale: 0.2}}
                        animate={{ scale: 1 }}
                        transition={{ ease: "linear", duration: 6 ,type:'spring', mass: 0.8 ,stiffness:80 }}
                        >
                            <img className='pfpUpload' src={url} alt=""/>
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