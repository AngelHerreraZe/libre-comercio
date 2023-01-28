import React from 'react';
import '../styles/loading-screen.css'

const LoadingScreen = () => {
    return (
        <div>
            <div className='overlay'>
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    );
};

export default LoadingScreen;