// src/components/RequestModal.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import '../styles/components/Modal.scss';

// Bind modal to your app element (for accessibility)
if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

const RequestModal = ({ isOpen, onClose, pet, onSubmit }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    message: '',
    contactInfo: user?.phone || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!pet) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const requestData = {
      petId: pet.id,
      buyerId: user?.id,
      message: formData.message,
      contactInfo: formData.contactInfo
    };
    
    try {
      await onSubmit(requestData);
      onClose();
      setFormData({ message: '', contactInfo: user?.phone || '' });
    } catch (error) {
      console.error('Error submitting request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="modal-overlay"
      contentLabel="Request to Adopt"
    >
      <div className="modal__header">
        <h2>Request to Adopt {pet.name}</h2>
        <button className="modal__header-close" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="modal__body">
          <div className="pet-info mb-4">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">Pet Information</h3>
              <p><strong>Name:</strong> {pet.name}</p>
              <p><strong>Breed:</strong> {pet.breed}</p>
              <p><strong>Age:</strong> {pet.age} years</p>
              <p><strong>Location:</strong> {pet.location}</p>
              <p><strong>Breeder:</strong> {pet.breederName}</p>
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="contactInfo" className="block mb-2 font-medium">
              Contact Information *
            </label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Phone number or email"
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="message" className="block mb-2 font-medium">
              Message to Breeder
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell the breeder why you'd like to adopt this pet, your experience with pets, home environment, etc."
            />
          </div>
        </div>

        <div className="modal__footer">
          <button
            type="button"
            onClick={onClose}
            className="modal__footer-cancel"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="modal__footer-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <FaPaperPlane className="mr-2" />
                Submit Request
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default RequestModal;