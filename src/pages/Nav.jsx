import React from 'react'
import logo from './../assets/images/aspire-logo.svg'
import hamburger from './../assets/images/hamburger.svg'
export const Nav = () => {
    return (
        <div className='nav-container'>
            <img className='logo' src={logo} alt="" />
            <img src={hamburger} alt="" />
        </div>
    )
}
