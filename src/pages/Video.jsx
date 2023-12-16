import React from 'react'
import ReactPlayer from 'react-player'
function Video() {
    return (
        <div>
            <ReactPlayer className='player' style={{marginTop:'10px'}} controls width={'100%'} url='http://localhost:3000/images/video1701589077810.mp4' />
        </div>
    )
}

export default Video
