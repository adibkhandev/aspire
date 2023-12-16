import React from 'react'
import fb from './../../assets/images/fb.svg'
import apple from './../../assets/images/apple.svg'
import google from './../../assets/images/google.svg'
export const Social = () => {
    return (
        <div className='social-cont'>
            <div className="social-btns">
                <img src={fb} alt="" />
            </div>
            <div className="social-btns">
                <img src={google} alt="" />
            </div>
            <div className="social-btns">
                <img src={apple} alt="" />
            </div>
        </div>
    )
}
