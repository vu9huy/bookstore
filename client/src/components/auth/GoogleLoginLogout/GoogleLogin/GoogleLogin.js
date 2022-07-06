
import React, { useState } from 'react';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';

const clientId = '614024383426-lu7g0gnvhp3h5t6af1lfdrnunim0s8bg.apps.googleusercontent.com'

const GoogleLoginBtn = ({ passChildData }) => {

    const onSuccess = (res) => {
        console.log(res.profileObj);
        passChildData(res.profileObj);
    }

    const onFailure = (res) => {
        console.log('login failed');
    }

    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId,
        isSignedIn: true,
        accessType: 'offline'
    })

    return (
        <div >
            {/* <GoogleLogin
                clientId={clientId}
                buttonText='Login with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSigngedIn={true}
            /> */}
            <button className='form-submit button' onClick={signIn}>
                <img src='https://freesvg.org/img/1534129544.png' />
                <span>Sign in with Google</span>
            </button>
        </div>
    );
}

export default GoogleLoginBtn;
