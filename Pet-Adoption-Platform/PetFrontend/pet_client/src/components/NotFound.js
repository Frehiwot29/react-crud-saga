// src/components/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaPaw } from 'react-icons/fa';
import '../styles/NotFound.scss';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="error-code">
                    <span className="digit">4</span>
                    <span className="paw-icon">
                        <FaPaw />
                    </span>
                    <span className="digit">4</span>
                </div>

                <h1>Page Not Found</h1>
                <p>Oops! The page you're looking for seems to have wandered off.</p>
                <p>Maybe it's been adopted or is still finding its way home.</p>

                <div className="action-buttons">
                    <Link to="/" className="btn-primary">
                        <FaHome /> Back to Home
                    </Link>
                    <Link to="/login" className="btn-secondary">
                        <FaSearch /> Find Pets
                    </Link>
                </div>

                <div className="suggestions">
                    <h3>You might want to:</h3>
                    <ul>
                        <li>Check the URL for typos</li>
                        <li>Return to the <Link to="/">homepage</Link></li>
                        <li><Link to="/login">Sign in</Link> to access your dashboard</li>
                        <li>Contact support if you think this is an error</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NotFound;