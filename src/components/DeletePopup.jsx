import { useState , useEffect , useRef} from "react"
import { motion , useAnimate } from "framer-motion"
import whiteDelete from './../assets/images/white-delete.svg'
import whiterDelete from './../assets/images/whiter-delete.svg'
import zIndex from "@mui/material/styles/zIndex"
const DeletePopup = ({remove,setRemove,undo,setUndo,setValidVideos,validVideos}) => {
    const [scope,animate] = useAnimate()
    const [isLeaving,setIsLeaving] = useState(false)
    const left = useRef(false)

  ////////////////


    // const leaveHandler = () => {
    //    setIsLeaving(!undo)
    // }

    // useEffect(()=>{
    //   console.log(undo,'unnnnooooo')
    //   const timeoutFunction = setTimeout(()=>{
    //       leaveHandler()    
    //   },5000)
    //   return()=>{
    //     clearTimeout(timeoutFunction)
    //   }
    // },[undo])





    //////////////
    // useEffect(()=> {
    //   console.log('leaving>',isLeaving)
    //       if(isLeaving){
    //         const removeTo = async() => {
    //           await animate(scope.current,{
    //             x:'-140%'
    //           },{
    //             duration:1,
    //             delay:1
    //           })
    //           await animate(scope.current,{
    //             height:0,
    //             marginBlock:0
    //           },{
    //             delay:1,
    //            duration:0.7,
    //          })
    //          if(setValidVideos)setValidVideos(validVideos-1)
    //         }
    //         removeTo()
            
    //       }
    // },[isLeaving])

    const [timeUp,setTimeUp] = useState(false)
    useEffect(()=>{
      if(timeUp && !undo){
        const removeFinalized = async() => {
          await animate(scope.current,{
            x:'-200vw'
          },{
             duration:1,
             onPlay: latest=> {
              console.log('left')
             },
          })
          await animate(scope.current,{
            height:0,
            marginBlock:0
          },{
           duration:0.7,
         })
        }
        removeFinalized()
      }
    },[timeUp,undo]) 
  
    useEffect(()=>{
      if(remove) left.current = true
      if(remove && !undo){
        const spaceOpen = async() => {
          await animate(scope.current,{
            height:'4em',
           
          },{
            duration:0.6
          })
          await animate('.warn',{
            opacity:1
          },{
          })
          await animate('.warn',{
            y:'200%',
          },{
            duration:0.5,
          })
          await animate(scope.current,{
            zIndex:1
          })
          await animate(scope.current,{
            zIndex:2
          },{
            delay:5,
              onComplete: ()=>{
                setTimeUp(true)
                console.log('setting',timeUp)
              }
          })
         

          //////
          
        }
        /////
       spaceOpen()
     }
     else{
        const reverse = async() => {
         await animate(scope.current,{
           zIndex:-1
         },{
           delay:1,
         })
         await animate('.warn',{
           y:'-200%'
         },{
          duration:0.5,
        })
        await animate('.warn',{
          opacity:0
        })
        await animate(scope.current,{
          height:0,
          margin:0
        })
          console.log('coming rth')
        }
          reverse()
     }
  },[remove,undo])
     return(
      <motion.div
        ref={scope}
        className="warn-cont">
        <motion.div
         onClick={()=>{
          setUndo(true)
          setRemove(false)
          console.log('at least clicks')
         }}
          className="warn">
            <div className="text">
              <div className="context">
                  <img src={whiterDelete} alt="" />
                  <h1>Video unsubscribed</h1> 
              </div>
              <motion.h1 whileTap={{scale:0.2}} className="undo">
                  Undo
              </motion.h1>
            </div>
        </motion.div>
      </motion.div>
     )
  }
  
  
export default DeletePopup
  