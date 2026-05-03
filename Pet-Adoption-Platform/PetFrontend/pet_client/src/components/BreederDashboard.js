// components/BreederDashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePetForm from './CreatePetForm';
import PetManagementCard from './PetManagementCard';
import RequestsPanel from './RequestsPanel';

const BreederDashboard = () => {
  const dispatch = useDispatch();
  const { pets } = useSelector(state => state.pets);
  const [activeTab, setActiveTab] = useState('my-pets');

  useEffect(() => {
    dispatch({ type: 'FETCH_BREEDER_PETS_REQUEST' });
    dispatch({ type: 'FETCH_REQUESTS_REQUEST' });
  }, [dispatch]);

  const handleDeletePet = (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      dispatch({ type: 'DELETE_PET_REQUEST', payload: petId });
    }
  };

  const handleToggleStatus = (petId, currentStatus) => {
    const newStatus = currentStatus === 'AVAILABLE' ? 'ADOPTED' : 'AVAILABLE';
    dispatch({ type: 'UPDATE_PET_STATUS', payload: { id: petId, status: newStatus } });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Breeder Dashboard</h1>
      
      <div className="mb-8 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('my-pets')}
            className={`py-2 px-4 ${
              activeTab === 'my-pets'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            My Pets
          </button>
          <button
            onClick={() => setActiveTab('add-pet')}
            className={`py-2 px-4 ${
              activeTab === 'add-pet'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Add New Pet
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-2 px-4 ${
              activeTab === 'requests'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Adoption Requests
          </button>
        </nav>
      </div>

      {activeTab === 'my-pets' && (
        <div className="space-y-4">
          {pets.map(pet => (
            <PetManagementCard
              key={pet.id}
              pet={pet}
              onDelete={handleDeletePet}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      )}

      {activeTab === 'add-pet' && (
        <CreatePetForm />
      )}

      {activeTab === 'requests' && (
        <RequestsPanel />
      )}
    </div>
  );
};

export default BreederDashboard;