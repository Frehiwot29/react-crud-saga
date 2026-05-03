// src/components/PetManagementCard.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import EditPetModal from './EditPetModal';
import '../styles/components/PetManagementCard.scss';

const PetManagementCard = ({ pet, onDelete, onToggleStatus }) => {
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isAvailable = pet.status === 'AVAILABLE';

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${pet.name}?`)) {
      onDelete(pet.id);
    }
  };

  const handleToggle = () => {
    onToggleStatus(pet.id, pet.status);
  };

  return (
    <>
      <div className="pet-management-card bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-48 h-48 md:h-auto">
            <img 
              src={pet.imageUrl || 'https://via.placeholder.com/200'} 
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm mb-3">
                  <p><span className="font-medium">Breed:</span> {pet.breed}</p>
                  <p><span className="font-medium">Age:</span> {pet.age} years</p>
                  <p><span className="font-medium">Size:</span> {pet.size}</p>
                  <p><span className="font-medium">Location:</span> {pet.location}</p>
                  <p><span className="font-medium">Requests:</span> {pet.requestCount || 0}</p>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{pet.description}</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
                  title="Edit pet"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                  title="Delete pet"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  isAvailable 
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-gray-500 hover:bg-gray-600 text-white'
                }`}
              >
                {isAvailable ? <FaToggleOn /> : <FaToggleOff />}
                {isAvailable ? 'Mark as Adopted' : 'Mark as Available'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditPetModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        pet={pet}
      />
    </>
  );
};

export default PetManagementCard;