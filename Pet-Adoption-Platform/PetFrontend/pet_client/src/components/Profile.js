// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaPaw, FaUsers } from 'react-icons/fa';
import '../styles/components/Profile.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: ''
  });
  const [stats, setStats] = useState({
    totalPets: 0,
    totalRequests: 0,
    approvedRequests: 0,
    pendingRequests: 0
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        location: user.location || ''
      });
      
      // Fetch user stats if breeder
      if (user.role === 'BREEDER') {
        fetchBreederStats();
      } else {
        fetchBuyerStats();
      }
    }
  }, [user]);

  const fetchBreederStats = async () => {
    // Fetch breeder statistics
    dispatch({ type: 'FETCH_BREEDER_STATS_REQUEST' });
  };

  const fetchBuyerStats = async () => {
    // Fetch buyer statistics
    dispatch({ type: 'FETCH_BUYER_STATS_REQUEST' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ 
      type: 'UPDATE_PROFILE_REQUEST', 
      payload: formData 
    });
    setIsEditing(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="profile-title">
          <h1>My Profile</h1>
          <p className="role-badge">{user.role === 'BREEDER' ? 'Pet Breeder' : 'Pet Adopter'}</p>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-card">
            <div className="card-header">
              <h2>Personal Information</h2>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="btn-edit">
                  <FaEdit /> Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button onClick={() => setIsEditing(false)} className="btn-cancel">
                    <FaTimes /> Cancel
                  </button>
                </div>
              )}
            </div>

            {!isEditing ? (
              <div className="profile-info">
                <div className="info-row">
                  <div className="info-label">
                    <FaUser className="info-icon" />
                    Full Name
                  </div>
                  <div className="info-value">{user.name}</div>
                </div>
                
                <div className="info-row">
                  <div className="info-label">
                    <FaEnvelope className="info-icon" />
                    Email Address
                  </div>
                  <div className="info-value">{user.email}</div>
                </div>
                
                {user.phone && (
                  <div className="info-row">
                    <div className="info-label">
                      <FaPhone className="info-icon" />
                      Phone Number
                    </div>
                    <div className="info-value">{user.phone}</div>
                  </div>
                )}
                
                {user.location && (
                  <div className="info-row">
                    <div className="info-label">
                      <FaMapMarkerAlt className="info-icon" />
                      Location
                    </div>
                    <div className="info-value">{user.location}</div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State"
                  />
                </div>
                
                <button type="submit" className="btn-save">
                  <FaSave /> Save Changes
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="stats-card">
            <h3>Account Statistics</h3>
            <div className="stat-item">
              <FaPaw className="stat-icon" />
              <div>
                <div className="stat-value">Member since</div>
                <div className="stat-label">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {user.role === 'BREEDER' && (
            <div className="stats-card">
              <h3>Breeder Stats</h3>
              <div className="stat-item">
                <div className="stat-value">{stats.totalPets}</div>
                <div className="stat-label">Pets Listed</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.totalRequests}</div>
                <div className="stat-label">Total Requests</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.approvedRequests}</div>
                <div className="stat-label">Approved</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.pendingRequests}</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
          )}

          {user.role === 'BUYER' && (
            <div className="stats-card">
              <h3>Activity</h3>
              <div className="stat-item">
                <div className="stat-value">{stats.totalRequests || 0}</div>
                <div className="stat-label">Adoption Requests</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.approvedRequests || 0}</div>
                <div className="stat-label">Approved Requests</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;