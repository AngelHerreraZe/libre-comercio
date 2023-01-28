import React from 'react';

const Login = () => {
    return (
        <div className='login'>
           <p className='login-text'>Welcome! Enter your email and password to continue</p>
           <div className='test-data'>
            <b className='test-title'>test data</b>
            <div className='test-item'><i class='bx bx-envelope'></i><p>jhon@gmail.com</p></div>
            <div className='test-item'><i class='bx bx-lock-alt' ></i><p>john1234</p></div>
           </div>
        </div>
    );
};

export default Login;