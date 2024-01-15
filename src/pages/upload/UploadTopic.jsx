import React from 'react'
import { Nav } from './../../pages/Nav'
import SecondStep from './SecondStep'
const UploadTopic = () => {
  const topicAddHandler = (e) => {
        e.preventDefault()
  }
  return (
    <div className='topic-add-cont'>
        <Nav></Nav>
        <form onSubmit={(e)=>topicAddHandler(e)}>
            <SecondStep></SecondStep>
        </form>
    </div>
  )
}

export default UploadTopic
