// src/components/PetFilters.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaSearch, FaRedoAlt, FaFilter } from 'react-icons/fa';
import '../styles/components/Filters.scss';

const PetFilters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.pets);
  
  const [localFilters, setLocalFilters] = useState({
    location: '',
    breed: '',
    size: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (e) => {
    setLocalFilters({
      ...localFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_FILTERS', payload: localFilters });
    dispatch({ type: 'FETCH_PETS_REQUEST' });
  };

  const handleReset = () => {
    const emptyFilters = { location: '', breed: '', size: '' };
    setLocalFilters(emptyFilters);
    dispatch({ type: 'SET_FILTERS', payload: emptyFilters });
    dispatch({ type: 'FETCH_PETS_REQUEST' });
  };

  return (
    <div className="filters-container">
      <div className="filters-header">
        <button 
          className="filters-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FaFilter /> 
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="filters-form">
          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={localFilters.location}
                onChange={handleChange}
                placeholder="City or State"
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={localFilters.breed}
                onChange={handleChange}
                placeholder="Enter breed"
                className="filter-input"
              />
            </div>

            <div className="filter-group">
              <label htmlFor="size">Size</label>
              <select
                id="size"
                name="size"
                value={localFilters.size}
                onChange={handleChange}
                className="filter-select"
              >
                <option value="">All Sizes</option>
                <option value="SMALL">Small</option>
                <option value="MEDIUM">Medium</option>
                <option value="LARGE">Large</option>
              </select>
            </div>
          </div>

          <div className="filters-actions">
            <button type="submit" className="btn-apply">
              <FaSearch /> Apply Filters
            </button>
            <button type="button" onClick={handleReset} className="btn-reset">
              <FaRedoAlt /> Reset
            </button>
          </div>
        </form>
      )}

      {/* Active filters display */}
      {(filters.location || filters.breed || filters.size) && (
        <div className="active-filters">
          <span className="active-filters-label">Active filters:</span>
          {filters.location && (
            <span className="filter-tag">
              Location: {filters.location}
              <button onClick={() => {
                const newFilters = { ...filters, location: '' };
                dispatch({ type: 'SET_FILTERS', payload: newFilters });
                dispatch({ type: 'FETCH_PETS_REQUEST' });
              }}>×</button>
            </span>
          )}
          {filters.breed && (
            <span className="filter-tag">
              Breed: {filters.breed}
              <button onClick={() => {
                const newFilters = { ...filters, breed: '' };
                dispatch({ type: 'SET_FILTERS', payload: newFilters });
                dispatch({ type: 'FETCH_PETS_REQUEST' });
              }}>×</button>
            </span>
          )}
          {filters.size && (
            <span className="filter-tag">
              Size: {filters.size.toLowerCase()}
              <button onClick={() => {
                const newFilters = { ...filters, size: '' };
                dispatch({ type: 'SET_FILTERS', payload: newFilters });
                dispatch({ type: 'FETCH_PETS_REQUEST' });
              }}>×</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PetFilters;