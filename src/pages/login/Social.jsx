import React from 'react'
import fb from './../../assets/images/fb.svg'
import linkedin from './../../assets/images/linkedin.svg'
import google from './../../assets/images/google.svg'
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import {LoginSocialGoogle,LoginSocialFacebook,LoginSocialLinkedin, LoginSocialTwitter} from 'reactjs-social-login'
export const Social = () => {
    console.log('almost')
    return (
        <>
          <div className='social-cont'>
                <LoginSocialFacebook
                  fieldsProfile = 'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                return_scopes = {true}
                  isOnlyGetToken = {false}
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
                    scope = 'https://www.googleapis.com/auth/userinfo.profile'
                    prompt = 'select_account'
                    isOnlyGetToken = {false}
                    cookie_policy = 'single_host_origin'
                    hosted_domain = 'https://iridescent-dusk-085b1e.netlify.app/'
                    redirect_uri = 'https://iridescent-dusk-085b1e.netlify.app/login'
                    fetch_basic_profile = {true}
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
                    <div id='google-btn' className="social-btns">
                        <img src={google} alt="" />
                    </div>
                </LoginSocialGoogle>
                <LoginSocialTwitter
                    client_id={import.meta.env.VITE_TWITTER_CLIENT_ID || ''}
                    onLoginStart={()=>{
                        
                    }}
                    onResolve={({ provider, data }) => {
                        console.log(provider,'provider',data,'data')
                    }}
                    onReject={(err) => {
                        console.log(err)
                    }}
                >

                        <div
                        className="social-btns">
                            <img className='w-5' src={linkedin} alt="" />
                        </div>
                </LoginSocialTwitter>
           
           
            </div>
        </>
        
    )
}
