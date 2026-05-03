// src/components/EditPetModal.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { FaTimes, FaSave } from 'react-icons/fa';
import '../styles/components/Modal.scss';

const EditPetModal = ({ isOpen, onClose, pet }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: pet?.name || '',
    breed: pet?.breed || '',
    age: pet?.age || '',
    size: pet?.size || 'MEDIUM',
    location: pet?.location || '',
    description: pet?.description || '',
    imageUrl: pet?.imageUrl || ''
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
    
    try {
      await dispatch({ 
        type: 'UPDATE_PET_REQUEST', 
        payload: {
          id: pet.id,
          ...formData,
          age: parseInt(formData.age)
        }
      });
      onClose();
    } catch (error) {
      console.error('Error updating pet:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal modal--large"
      overlayClassName="modal-overlay"
      contentLabel="Edit Pet"
    >
      <div className="modal__header">
        <h2>Edit {pet.name}</h2>
        <button className="modal__header-close" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="modal__body">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Breed *</label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Age (years) *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="0"
                step="0.5"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium mb-1">Size *</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="SMALL">Small</option>
                <option value="MEDIUM">Medium</option>
                <option value="LARGE">Large</option>
              </select>
            </div>

            <div className="form-group md:col-span-2">
              <label className="block text-sm font-medium mb-1">Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="form-group md:col-span-2">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>

            <div className="form-group md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
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
            {isSubmitting ? 'Saving...' : (
              <>
                <FaSave className="mr-2" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPetModal;