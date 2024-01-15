import React from 'react'
import { Nav } from './../../pages/Nav'
import SecondStep from './SecondStep'
const UploadVideo = () => {
  const videoAddHandler = (e) => {
        e.preventDefault()
  }
  return (
    <div className='video-add-cont'>
        <Nav></Nav>
        <form onSubmit={(e)=>videoAddHandler(e)}>
            <SecondStep onlyVideo={true}></SecondStep>
        </form>
        
    </div>
  )
}

export default UploadVideo
