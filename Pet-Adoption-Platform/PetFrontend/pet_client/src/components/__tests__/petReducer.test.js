// frontend/src/store/reducers/__tests__/petReducer.test.js
import petReducer from '../petReducer';

describe('Pet Reducer', () => {
  const initialState = {
    pets: [],
    totalPages: 0,
    loading: false,
    error: null,
    filters: {
      location: '',
      breed: '',
      size: ''
    },
    currentPage: 0
  };

  test('should return initial state', () => {
    expect(petReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle FETCH_PETS_REQUEST', () => {
    const action = { type: 'FETCH_PETS_REQUEST' };
    expect(petReducer(initialState, action).loading).toBe(true);
  });

  test('should handle FETCH_PETS_SUCCESS', () => {
    const pets = [{ id: 1, name: 'Buddy' }];
    const action = { 
      type: 'FETCH_PETS_SUCCESS', 
      payload: { content: pets, totalPages: 5 } 
    };
    const newState = petReducer(initialState, action);
    
    expect(newState.loading).toBe(false);
    expect(newState.pets).toEqual(pets);
    expect(newState.totalPages).toBe(5);
  });

  test('should handle SET_FILTERS', () => {
    const filters = { location: 'NYC', breed: 'Lab' };
    const action = { 
      type: 'SET_FILTERS', 
      payload: filters 
    };
    const newState = petReducer(initialState, action);
    
    expect(newState.filters).toEqual({ ...initialState.filters, ...filters });
    expect(newState.currentPage).toBe(0);
  });
});