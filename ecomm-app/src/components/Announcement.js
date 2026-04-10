import React from 'react';
import { useNavigate } from 'react-router-dom';

const Announcement = () => {
    const navigate = useNavigate();

    return (
        <div className="announcement-container" style={{ padding: '40px', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
            <div style={{ border: '1px solid #ddd', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <span><h1>Field Announcement</h1></span>
                <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '30px' }}>
                   Simplified Arrival Enhancements
                </p>
                
                <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }} onSubmit={(e) => e.preventDefault()}>
                    <div className="button-group">
                        <button type="button" onClick={() => navigate('/')} style={{ padding: '10px 30px', marginRight: '15px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
                            View later
                        </button>
                        <button type="button" onClick={() => navigate(-1)} style={{ padding: '10px 30px', cursor: 'pointer', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
                            View
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Announcement;