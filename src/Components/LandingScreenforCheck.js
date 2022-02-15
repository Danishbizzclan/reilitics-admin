import React from 'react';
import { Redirect } from 'react-router-dom';

const LandingScreenforCheck = () => {
    const Login = localStorage.getItem('Login')
    if (Login === "true") {
        return <>
            <Redirect to="/dashboard" />
        </>
    }
    else {
        return <>
            {localStorage.clear()}
            <Redirect to="/login" />
        </>
    }
}

export default LandingScreenforCheck;