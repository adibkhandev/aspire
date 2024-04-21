import React, { useEffect , useRef, useState } from 'react'
import { motion , AnimatePresence , useAnimate } from 'framer-motion'
import DeletePopup from './DeletePopup'
export const ComponentPopup = ({remove,setRemove,subscribe,data,setSubscribed,setEmpty,cta,children}) => {
    const [undo,setUndo]=useState(false)
    const [cardData,setCardData]=useState(null)
    let userData = localStorage.getItem('userData')
    const [subscribedState,setSubscribedState]=useState(true)
    const [kill,setKill] = useState(false) 
    console.log(subscribe,'dat')
    const [hidden,setHidden] = useState(false)
    const [scope,animate] = useAnimate()
    const cardRef = useRef()
    useEffect(()=>{
      console.log('changing to ' , remove)
         if(remove && !undo){
            const cardAnimation = async() => {
              await animate('.card',{
                x:'-140%'
              },{
                duration:1,
                delay:3
              })
              setHidden(true)
            }
            cardAnimation()
         }
         else{
           console.log('anime called')
          const reverseCardAnimation = async() => {
            await animate('.card',{
              x:0
            },{
              duration:0.2,
            })
          }
          reverseCardAnimation()
         }
    },[remove,undo])
    useEffect(()=>{
       if(hidden && !undo){
          const cardLeaves = async() => {
            await animate('.decoy',{
              height:'0px'
            },{
              duration:1,
            })
            console.log('turned to disappear')
            
            await animate('.card',{
              margin:0
            })
          }
          cardLeaves()
       }
       if(undo){
        const reviveSize = async()=> {
          await animate('.decoy',{
            height:`${cardRef.current.clientHeight}px`
          },{
            duration:0.2,
          })
        }
         reviveSize()
         setHidden(false)
       }
    },[hidden,undo])
       
   const timerRef = useRef(null)
       
   useEffect(()=>{
       if(remove){
         console.log('turning tho')
          timerRef.current = setTimeout(cta(data.video,data.topic),8000)
          console.log('setting timeout')
       }
       return()=> clearTimeout(timerRef.current)
   },[remove,cta])
   useEffect(()=> {
      if(undo){
        clearTimeout(timerRef.current)
        setRemove(false)
      }
   },[undo])
     return(
      <motion.div
       ref={scope}
       className="card-container">
       <motion.div 
        className="decoy">
        <motion.div
        //  ref={scope}
        ref={cardRef}
         className='card'>
           {children}
        </motion.div>
  
       </motion.div>
          <AnimatePresence>
            {((remove) || undo) && <DeletePopup undo={undo} setUndo={setUndo} remove={remove} setRemove={setRemove}/>}
          </AnimatePresence>
              
      </motion.div>
    )
  } 