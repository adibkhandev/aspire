import React , {useState , useEffect} from "react";
import {motion} from 'framer-motion'
const Image = ({file,style}) => {

    let [url,setUrl] = useState(null)
    
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
        }, [file])
        
        if(!url) return
        else return(
            <div className="mask">
                <motion.div 
                className={`${style}Container`}
                initial={{ scale: 0.2}}
                animate={{ scale: 1 }}
                transition={{ ease: "linear", duration: 6 ,type:'spring', mass: 0.8 ,stiffness:80 }}
                >
                    <img className={style} src={url} alt=""/>
                </motion.div>

            </div>
            
           
        )
    }


export default Image;