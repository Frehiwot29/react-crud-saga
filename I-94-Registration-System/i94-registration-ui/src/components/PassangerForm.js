// PassengerForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress,editAddress,deleteAddress} from '../redux/address/address.actions';

const PassengerForm = () => {
  const dispatch = useDispatch();
  const { list, lastUsedAddress } = useSelector(state => state.address);

  const [form, setForm] = useState({
    id: null,
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (isEditing) {
      dispatch(editAddress(form));
    } else {
      dispatch(addAddress(form));
    }

    resetForm();
  };

  const handleEdit = (addr) => {
    setForm(addr);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteAddress(id));
  };

  const handleUsePrevious = () => {
    if (lastUsedAddress) {
      setForm(lastUsedAddress);
      setIsEditing(false);
    }
  };

  const resetForm = () => {
    setForm({ id: null, street: '', city: '', state: '', zip: '' });
    setIsEditing(false);
  };

  return (
    <div>
      <h3>Passenger Address</h3>

      <input name="street" value={form.street} onChange={handleChange} placeholder="Street" />
      <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
      <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
      <input name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP" />

      <br />

      <button onClick={handleSubmit}>
        {isEditing ? 'Update' : 'Add'}
      </button>

      <button onClick={handleUsePrevious} disabled={!lastUsedAddress}>
        Use Previous Address
      </button>

      <hr />

      <h4>Saved Addresses</h4>

      {list.map(addr => (
        <div key={addr.id}>
          {addr.street}, {addr.city}, {addr.state}

          <button onClick={() => handleEdit(addr)}>Edit</button>
          <button onClick={() => handleDelete(addr.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PassengerForm;