
import React, { useState } from 'react';
import { useGoogleLogout } from 'react-google-login';

const clientId = '614024383426-lu7g0gnvhp3h5t6af1lfdrnunim0s8bg.apps.googleusercontent.com'

const GoogleLogoutBtn = () => {

    const onLogoutSuccess = (res) => {
        console.log('logout success');

    }

    const onFailure = (res) => {
        console.log('login failed');
    }

    const { signOut } = useGoogleLogout({
        onLogoutSuccess,
        onFailure,
        clientId
    })

    return (
        <div >
            <button className='form-submit button' onClick={signOut}>
                <img src='https://freesvg.org/img/1534129544.png' />
                <span>Log out with Google</span>
            </button>
        </div>
    );
}

export default GoogleLogoutBtn;
