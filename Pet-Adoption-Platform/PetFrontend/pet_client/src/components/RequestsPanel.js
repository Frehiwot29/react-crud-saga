// src/components/RequestsPanel.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCheck, FaTimes, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../styles/components/RequestsPanel.scss';

const RequestsPanel = () => {
  const dispatch = useDispatch();
  const { requests, loading } = useSelector(state => state.requests);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    dispatch({ type: 'FETCH_REQUESTS_REQUEST' });
  }, [dispatch]);

  const handleUpdateStatus = (requestId, status) => {
    dispatch({ 
      type: 'UPDATE_REQUEST_STATUS', 
      payload: { requestId, status } 
    });
  };

  const filteredRequests = requests.filter(request => {
    if (filter === 'ALL') return true;
    return request.status === filter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No adoption requests yet.</p>
      </div>
    );
  }

  return (
    <div className="requests-panel">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Adoption Requests</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'ALL' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('PENDING')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'PENDING' 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('APPROVED')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'APPROVED' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Approved
              </button>
              <button
                onClick={() => setFilter('REJECTED')}
                className={`px-3 py-1 rounded-md ${
                  filter === 'REJECTED' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Rejected
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredRequests.map(request => (
            <div key={request.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{request.petName}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      request.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      request.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-2">
                    <strong>Buyer:</strong> {request.buyerName}
                  </p>
                  
                  <p className="text-gray-600 mb-2">
                    <strong>Message:</strong> {request.message || 'No message provided'}
                  </p>
                  
                  <div className="flex gap-4 mt-2">
                    {request.contactInfo && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        {request.contactInfo.includes('@') ? <FaEnvelope /> : <FaPhone />}
                        {request.contactInfo}
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      Requested: {new Date(request.requestedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {request.status === 'PENDING' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(request.id, 'APPROVED')}
                      className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                      <FaCheck /> Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(request.id, 'REJECTED')}
                      className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      <FaTimes /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestsPanel;