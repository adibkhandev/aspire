import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { Nav } from '../Nav'
import axios from 'axios'
export const Account = () => {
    let {username} = useParams()
    useEffect(()=>{
        const url = import.meta.env.VITE_API_URL + '/user/' + username
            axios.get(url)
            .then((response)=>{
                console.log(response.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    })
    return (
        <div  className='home'>
            <Nav></Nav>
            HI {username}
        </div>
    )
}
