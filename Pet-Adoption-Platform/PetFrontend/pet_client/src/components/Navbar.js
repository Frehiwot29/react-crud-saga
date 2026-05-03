// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaBars, FaTimes, FaSignOutAlt, FaUserCircle, FaPaw, FaHome, FaList, FaPlusCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout, isBreeder } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const getNavLinks = () => {
    if (!isAuthenticated) return [];
    
    if (isBreeder) {
      return [
        { name: 'Dashboard', path: '/breeder-dashboard', icon: <FaHome /> },
        { name: 'My Pets', path: '/breeder-dashboard', icon: <FaList /> },
        { name: 'Add Pet', path: '/breeder-dashboard?tab=add-pet', icon: <FaPlusCircle /> },
      ];
    } else {
      return [
        { name: 'Find Pets', path: '/', icon: <FaHome /> },
        { name: 'My Requests', path: '/my-requests', icon: <FaList /> },
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <FaPaw className="logo-icon" />
            <span>Pet Adoption</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="navbar__mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links - Desktop */}
        <div className={`navbar__nav ${isMenuOpen ? 'active' : ''}`}>
          {isAuthenticated && (
            <div className="navbar__links">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="navbar__user-menu">
          {isAuthenticated ? (
            <>
              <button 
                className="navbar__user-menu-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-label="User menu"
              >
                <FaUserCircle className="user-icon" />
                <span className="user-name">{user?.name?.split(' ')[0]}</span>
                <span className="dropdown-arrow">▼</span>
              </button>
              
              {isDropdownOpen && (
                <div className="navbar__user-menu-dropdown">
                  <div className="dropdown-header">
                    <strong>{user?.name}</strong>
                    <small>{user?.email}</small>
                  </div>
                  <hr />
                  <Link to="/profile" onClick={() => setIsDropdownOpen(false)}>
                    <FaUserCircle /> My Profile
                  </Link>
                  <button onClick={handleLogout} className="logout-btn">
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="navbar__auth-links">
              <Link to="/login" className="login-link">Sign In</Link>
              <Link to="/register" className="register-link">Sign Up</Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div className="navbar__overlay" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </nav>
  );
};

export default Navbar;