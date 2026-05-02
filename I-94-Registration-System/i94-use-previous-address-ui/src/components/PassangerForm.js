// PassengerForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '../redux/address/address.actions';

const PassengerForm = () => {
  const dispatch = useDispatch();
  const lastAddress = useSelector(state => state.address.lastUsedAddress);

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    dispatch(saveAddress(address));
  };

  const handleUsePrevious = () => {
    if (lastAddress) {
      setAddress(lastAddress);
    }
  };

  return (
    <div>
      <h3>Passenger Address</h3>

      <input name="street" value={address.street} onChange={handleChange} placeholder="Street" />
      <input name="city" value={address.city} onChange={handleChange} placeholder="City" />
      <input name="state" value={address.state} onChange={handleChange} placeholder="State" />
      <input name="zip" value={address.zip} onChange={handleChange} placeholder="ZIP" />

      <br />

      <button onClick={handleSave}>Save Address</button>

      <button onClick={handleUsePrevious} disabled={!lastAddress}>
        Use Previous Address
      </button>
    </div>
  );
};

export default PassengerForm;