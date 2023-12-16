import { useState , useEffect } from 'react'
import "./index.css"
import "./App.css"
import axios from 'axios'
function Demo() {
  const search = async(e) => {
      e.preventDefault()
      let formdata = new FormData()
      formdata.append('title',e.target.name.value)
      formdata.append('blog',e.target.blog.value)
      formdata.append('img',e.target.image.files[0])
      const url = 'http://127.0.0.1:3000/demo/add'
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
let [data,setData]=useState([])
useEffect(()=>{
  const headers = {
    'Content-Type':'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
  }
  let url = import.meta.env.VITE_API_URL + '/demo/all'
  console.log(url,'url')
  axios.get(url,headers)
  .then((response)=>{
      console.log(response.data)
      setData(response.data)
  })
  .catch((err)=>{
    console.log(err);
  })
},[])  

  return (
    <>
     <form className='flex flex-col' onSubmit={(e)=>search(e)}>
         <input className='border-solid border-2 border-red-100 mb-4' type="text" name="name" placeholder='blog name'/>
         <input className='border-solid border-2 border-sky-500' type="text" name="blog" placeholder='write blog'/>
         <input type="file" name="image" id="" />
         <button  type="submit">submit</button>
     </form>
     {
      data?data.map((item)=>{
           return (
            <>
             <h1>{item.title}</h1>
             <p>{item.desc}</p>
             <img src={import.meta.env.VITE_API_URL + item.img} alt="" />
             <p>{item.postTime}</p>
            </>
         )
      }):''
     }
    </>
  )
}
export default Demo
