import React from 'react'
import axios from 'axios'
export const Input = () => {
    const submit = (e) => {
        e.preventDefault()
        console.log('oh')
        let formdata = new FormData()
        formdata.append('video',e.target.video.files[0])
        const url = 'http://127.0.0.1:3000/demo/video/add'
        const headers = {
            'Content-Type':'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
          }
          axios.post(url,formdata,headers)
            .then((response)=>{
                console.log(response)
            })
            .catch((err)=>{
              console.log(err);
            })

    }
    return (
        <div>
            <form onSubmit={(e)=>submit(e)}>
                <input type="file" name='video'/>
                <input type="submit"/>

            </form>
        </div>
    )
}

export default Input