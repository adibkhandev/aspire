import React from 'react'
import logo from './../assets/images/aspire-logo.svg'
import hamburger from './../assets/images/hamburger.svg'
export const Nav = () => {
    return (
        <div className='nav-container'>
            <img className='logo' src={logo} alt="" />
            <img onClick={()=>{
                console.log('clcik')
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            }} className='ham' src={hamburger} alt="" />
        </div>
    )
}
