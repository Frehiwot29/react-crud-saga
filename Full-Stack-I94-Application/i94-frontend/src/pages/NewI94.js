import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { saveI94Request, loadPreviousAddress } from '../redux/actions/I94Actions';

export default function NewI94() {
  const dispatch = useDispatch();
  const previousAddress = useSelector(state => state.i94.previousAddress);

  const [form, setForm] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUsePrevious = () => {
    dispatch(loadPreviousAddress());
    if (previousAddress) {
      setForm(previousAddress);
      console.log('Previous address loaded:', previousAddress);
    }
  };

  const handleSubmit = () => {
    dispatch(saveI94Request(form));
    console.log('I-94 form submitted:', form);
  };

  return (
    <div>
      <h2>New I-94 Form</h2>

      <input name="street" value={form.street} onChange={handleChange} placeholder="Street" />
      <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
      <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
      <input name="zip" value={form.zip} onChange={handleChange} placeholder="Zip Code" />

      <button onClick={handleUsePrevious}>Use Previous Address</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}