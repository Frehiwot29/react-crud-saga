import React from 'react'
import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="header">
            <h2 className="logo">Traveler System</h2>

            <button className="nav-button" onClick={() => navigate("/traveler")}>
                Go to Traveler Form
            </button>
        </header>
    )
}
export default Header
