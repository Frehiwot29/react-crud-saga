// components/PetCard.js
import React from 'react';
import { FaHeart, FaUserCheck } from 'react-icons/fa';

const PetCard = ({ pet, onRequest }) => {
  const isAdopted = pet.status === 'ADOPTED';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={pet.imageUrl || 'https://via.placeholder.com/300x200'} 
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
        {isAdopted && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            Adopted
          </div>
        )}
        {!isAdopted && pet.requestCount > 0 && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full px-2 py-1 text-xs flex items-center">
            <FaUserCheck className="mr-1" /> {pet.requestCount} requests
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{pet.name}</h3>
        <div className="space-y-1 text-gray-600 mb-4">
          <p><span className="font-medium">Breed:</span> {pet.breed}</p>
          <p><span className="font-medium">Age:</span> {pet.age} years</p>
          <p><span className="font-medium">Size:</span> {pet.size}</p>
          <p><span className="font-medium">Location:</span> {pet.location}</p>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-2">{pet.description}</p>
        
        <button
          onClick={() => onRequest(pet)}
          disabled={isAdopted}
          className={`w-full py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
            isAdopted 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <FaHeart />
          {isAdopted ? 'Already Adopted' : 'Request to Adopt'}
        </button>
      </div>
    </div>
  );
};

export default PetCard;