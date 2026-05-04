// components/PetGrid.js
import React from 'react';
import PetCard from './PatCard';

const PetGrid = ({ pets, onRequest }) => {
  if (pets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No pets found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pets.map(pet => (
        <PetCard key={pet.id} pet={pet} onRequest={onRequest} />
      ))}
    </div>
  );
};

export default PetGrid;