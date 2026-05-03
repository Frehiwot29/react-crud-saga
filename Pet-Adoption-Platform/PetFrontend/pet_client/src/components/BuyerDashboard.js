// components/BuyerDashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PetGrid from './PetGrid';
import PetFilters from './PetFilters';
import Pagination from './Pagination';
import RequestModal from './RequestModal';

const BuyerDashboard = () => {
  const dispatch = useDispatch();
  const { pets, totalPages, currentPage, filters } = useSelector(state => state.pets);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_PETS_REQUEST' });
  }, [dispatch, currentPage, filters]);

  const handlePageChange = (page) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
  };

  const handleRequest = (pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleSubmitRequest = (requestData) => {
    dispatch({ type: 'CREATE_REQUEST_REQUEST', payload: requestData });
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Pet</h1>
      <PetFilters />
      <PetGrid pets={pets} onRequest={handleRequest} />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <RequestModal 
        isOpen={isModalOpen}
        pet={selectedPet}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitRequest}
      />
    </div>
  );
};

export default BuyerDashboard;