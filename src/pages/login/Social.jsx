import React from 'react'
import fb from './../../assets/images/fb.svg'
import apple from './../../assets/images/apple.svg'
import google from './../../assets/images/google.svg'
import {LoginSocialGoogle,LoginSocialFacebook,LoginSocialApple} from 'reactjs-social-login'

export const Social = () => {
    return (
        <>
          <div className='social-cont'>
                <LoginSocialFacebook
                    isOnlyGetToken
                    appId={import.meta.env.VITE_FB_APP_ID || ''}
                    onLoginStart={()=>{

                    }}
                    onResolve={({ provider, data }) => {
                        console.log(provider,'provider',data,'data')
                    }}
                    onReject={(err) => {
                    console.log(err)
                    }}>
                    <div className="social-btns">
                        <img src={fb} alt="" />
                    </div>
                </LoginSocialFacebook>
                <LoginSocialGoogle
                    isOnlyGetToken
                    client_id={import.meta.env.VITE_GG_APP_ID || ''}
                    onLoginStart={()=>{

                    }}
                    onResolve={({ provider, data }) => {
                        console.log(provider,'provider',data,'data')
                    }}
                    onReject={(err) => {
                    console.log(err)
                    }}
                >
                    <div className="social-btns">
                        <img src={google} alt="" />
                    </div>
                </LoginSocialGoogle>
                
                        <div className="social-btns">
                            <img src={apple} alt="" />
                        </div>
           
           
            </div>
        </>
        
    )
}
