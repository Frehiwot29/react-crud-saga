import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createI94Request } from '../i94/actions';

const I94Form = () => {
  const dispatch = useDispatch();
  const { record, loading, error } = useSelector(state => state.i94);

  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');

  const [copied, setCopied] = useState(false);

  const handleGenerateAdmissionNumber = (e) => {
    e.preventDefault();
    dispatch(createI94Request({
      street,
      zipCode,
      city,
      state: stateVal,
    }));
  };

  const handleCopyAddress = async () => {
    const address = `${street}, ${city}, ${stateVal} ${zipCode}`;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address', err);
    }
  };

  useEffect(() => {
    if (record) {
      console.log('New I-94 created:', record);
    }
  }, [record]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>New I-94 Form</h2>
      <form onSubmit={handleGenerateAdmissionNumber}>
        <div>
          <label>Street:</label>
          <input
            type="text"
            value={street}
            onChange={e => setStreet(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Zip-code:</label>
          <input
            type="text"
            value={zipCode}
            onChange={e => setZipCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>State:</label>
          <input
            type="text"
            value={stateVal}
            onChange={e => setStateVal(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '10px' }}>
          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Generate Admission Number'}
          </button>

          <button
            type="button"
            onClick={handleCopyAddress}
            style={{ marginLeft: '10px' }}
          >
            Copy Address
          </button>
          {copied && <span style={{ marginLeft: '10px' }}>Copied!</span>}
        </div>
      </form>

      {record && (
        <div style={{ marginTop: '20px' }}>
          <h3>Generated I-94</h3>
          <p><strong>Admission Number:</strong> {record.admissionNumber}</p>
          <p><strong>Street:</strong> {record.street}</p>
          <p><strong>City:</strong> {record.city}</p>
          <p><strong>State:</strong> {record.state}</p>
          <p><strong>Zip-code:</strong> {record.zipCode}</p>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default I94Form;
