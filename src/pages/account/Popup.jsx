import React from 'react'
import {motion} from 'framer-motion'
const Popup = ({course}) => {
    console.log(course,'course')
  return (
    <motion.div
      animate={course?{bottom:0}:{bottom:'-70vh'}}
      transition={{delay:0}}
      className='popup-container'
    >
        {
            course?(
                <div className="content-cont">
                    <div className="player">
                        <img src={import.meta.env.VITE_API_URL + course.coverPhotoLink} alt="" />
                    </div>
                    <div className="texts">
                        <h1 className="title">
                        {course.title}
                        </h1>
                        <h1 className="description">
                        {course.description}
                        </h1>
                    </div>
                    <div className="course-nav-cont">
                         <div className="topic-cont">
                            <div className="text">

                            </div>
                            <img src="" alt="" />
                         </div>
                         <div className="video-names">
                            <div className="video"></div>
                         </div>
                    </div>
                    `
                </div>
            ):''
        }
       
    </motion.div>
  )
}

export default Popup
