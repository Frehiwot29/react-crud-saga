// src/components/I94Registration.js (Corrected filename spelling)
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as i94Actions from '../redux/actions/i94Actions';


const I94Registration = () => {
  const dispatch = useDispatch();
  const { 
    records, 
    loading, 
    error, 
    editingRecord, 
    previousAddress,
    addressToFill
  } = useSelector((state) => state.i94);
  
  const [formData, setFormData] = useState({
    passportNumber: '',
    fullName: '',
    flightNumber: '',
    arrivalDate: '',
    visaType: 'B1/B2',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [showAddressButton, setShowAddressButton] = useState(false);
  
  // Fetch records on component mount
  useEffect(() => {
    dispatch(i94Actions.fetchRecords());
  }, [dispatch]);
  
  // Handle editing record - populate form
  useEffect(() => {
    if (editingRecord) {
      setFormData({
        passportNumber: editingRecord.passportNumber || '',
        fullName: editingRecord.fullName || '',
        flightNumber: editingRecord.flightNumber || '',
        arrivalDate: editingRecord.arrivalDate || '',
        visaType: editingRecord.visaType || 'B1/B2',
        address: editingRecord.address || '',
        city: editingRecord.city || '',
        state: editingRecord.state || '',
        zipCode: editingRecord.zipCode || ''
      });
      setShowAddressButton(false);
    } else {
      setShowAddressButton(!!previousAddress);
    }
  }, [editingRecord, previousAddress]);
  
  // Handle filling form with previous address from saga
  useEffect(() => {
    if (addressToFill && !editingRecord) {
      setFormData(prev => ({
        ...prev,
        address: addressToFill.address || '',
        city: addressToFill.city || '',
        state: addressToFill.state || '',
        zipCode: addressToFill.zipCode || ''
      }));
      // Clear the address to fill flag
      dispatch(i94Actions.clearPreviousAddress());
      
      // Show success message
      const messageDiv = document.createElement('div');
      messageDiv.className = 'success-message';
      messageDiv.textContent = '✅ Address copied from previous passenger!';
      const formContainer = document.querySelector('.form-container');
      if (formContainer) {
        formContainer.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 3000);
      }
    }
  }, [addressToFill, editingRecord, dispatch]);
  
  const resetForm = () => {
    setFormData({
      passportNumber: '',
      fullName: '',
      flightNumber: '',
      arrivalDate: '',
      visaType: 'B1/B2',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    });
  };
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  // This is a regular function, not a React Hook
  const handleUsePreviousAddress = () => {
    if (previousAddress) {
      // Dispatch action to trigger address reuse (not a Hook)
      dispatch(i94Actions.usePreviousAddress());
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.passportNumber || !formData.fullName || !formData.arrivalDate) {
      alert('Please fill in all required fields (*)');
      return;
    }
    
    if (editingRecord) {
      dispatch(i94Actions.updateRecord(editingRecord.id, formData));
    } else {
      dispatch(i94Actions.createRecord(formData));
    }
  };
  
  // Reset form after successful creation
  useEffect(() => {
    if (!editingRecord && records.length > 0 && !loading) {
      const lastRecord = records[records.length - 1];
      if (lastRecord && formData.passportNumber === lastRecord.passportNumber) {
        resetForm();
      }
    }
  }, [records, editingRecord, loading, formData.passportNumber]);
  
  const handleEdit = (record) => {
    dispatch(i94Actions.setEditingRecord(record));
  };
  
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(i94Actions.deleteRecord(id));
    }
  };
  
  const handleCancelEdit = () => {
    dispatch(i94Actions.clearEditingRecord());
    resetForm();
  };
  
  return (
    <div className="i94-container">
      <h1>🛂 I-94 Registration System</h1>
      
      <div className="form-container">
        <h2>{editingRecord ? '✏️ Edit Registration' : '📝 New Registration'}</h2>
        
        {/* Address Reuse Button - uses regular function, not a Hook */}
        {showAddressButton && !editingRecord && previousAddress && (
          <button 
            type="button" 
            className="use-address-btn"
            onClick={handleUsePreviousAddress}
          >
            📋 Use Previous Address
          </button>
        )}
        
        {/* Previous Address Info */}
        {showAddressButton && !editingRecord && previousAddress && (
          <div className="previous-address-info">
            <strong>📍 Previous Passenger's Address:</strong><br/>
            {previousAddress.address && `${previousAddress.address}, `}
            {previousAddress.city && `${previousAddress.city}, `}
            {previousAddress.state && `${previousAddress.state} `}
            {previousAddress.zipCode && previousAddress.zipCode}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>🛂 Passport Number *</label>
              <input
                type="text"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
                required
                placeholder="e.g., AB123456"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>👤 Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="First and Last Name"
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>✈️ Flight Number</label>
              <input
                type="text"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                placeholder="e.g., AA123"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>📅 Arrival Date *</label>
              <input
                type="date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>🪪 Visa Type</label>
            <select 
              name="visaType" 
              value={formData.visaType} 
              onChange={handleChange}
              disabled={loading}
            >
              <option value="B1/B2">B1/B2 (Tourism/Business)</option>
              <option value="F1">F1 (Student)</option>
              <option value="H1B">H1B (Work Visa)</option>
              <option value="J1">J1 (Exchange Visitor)</option>
              <option value="L1">L1 (Intra-company Transfer)</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>🏠 Address in US</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street address"
              disabled={loading}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>🌆 City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>🗺️ State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State (e.g., CA)"
                maxLength="2"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label>📮 ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="ZIP Code"
                maxLength="10"
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="form-buttons">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? '⏳ Processing...' : (editingRecord ? '💾 Update Registration' : '✅ Register Passenger')}
            </button>
            {editingRecord && (
              <button type="button" className="cancel-btn" onClick={handleCancelEdit} disabled={loading}>
                ❌ Cancel Edit
              </button>
            )}
          </div>
        </form>
        
        {error && <div className="error-message">❌ Error: {error}</div>}
      </div>
      
      <div className="records-container">
        <h2>📋 Registered Passengers ({records.length})</h2>
        {loading ? (
          <div className="loading">⏳ Loading records...</div>
        ) : records.length === 0 ? (
          <div className="no-records">📭 No passengers registered yet. Add your first passenger above.</div>
        ) : (
          <table className="records-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Passport</th>
                <th>Full Name</th>
                <th>Flight</th>
                <th>Arrival Date</th>
                <th>Visa</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td><strong>{record.passportNumber}</strong></td>
                  <td>{record.fullName}</td>
                  <td>{record.flightNumber || '-'}</td>
                  <td>{record.arrivalDate}</td>
                  <td>{record.visaType}</td>
                  <td>
                    {record.address ? (
                      <div className="address-summary">
                        {record.address}<br/>
                        {record.city && `${record.city}, `}
                        {record.state && `${record.state} `}
                        {record.zipCode && record.zipCode}
                      </div>
                    ) : '-'}
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(record)} disabled={loading}>
                      ✏️ Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(record.id)} disabled={loading}>
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default I94Registration;