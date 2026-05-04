import React from 'react';
import {useNavigate} from 'react-router-dom';

const I94Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/new-i94');
    };

    return (
        <div>
            <h1>Welcome to the I-94 App</h1>
            <button onClick={handleClick}>New I-94 </button>
        </div>
    );
};

export default I94Home;