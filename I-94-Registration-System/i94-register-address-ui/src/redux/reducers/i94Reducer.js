// reducers/i94Reducer.js
import { I94_ACTION_TYPES } from '../constants/i94Contants';

const initialState = {
  records: [],
  loading: false,
  error: null,
  editingRecord: null,
  previousAddress: null,  // Store the last used address
  usePreviousAddressFlag: false  // Flag to trigger address reuse
};

const i94Reducer = (state = initialState, action) => {
  switch (action.type) {
    case I94_ACTION_TYPES.FETCH_RECORDS_REQUEST:
    case I94_ACTION_TYPES.CREATE_RECORD_REQUEST:
    case I94_ACTION_TYPES.UPDATE_RECORD_REQUEST:
    case I94_ACTION_TYPES.DELETE_RECORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case I94_ACTION_TYPES.FETCH_RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        records: action.payload
      };
      
    case I94_ACTION_TYPES.CREATE_RECORD_SUCCESS:
      // Store the address from the newly created record as previous address
      const newAddress = {
        address: action.payload.address || '',
        city: action.payload.city || '',
        state: action.payload.state || '',
        zipCode: action.payload.zipCode || ''
      };
      return {
        ...state,
        loading: false,
        records: [...state.records, action.payload],
        previousAddress: newAddress  // Save for next passenger
      };
      
    case I94_ACTION_TYPES.UPDATE_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        records: state.records.map(record =>
          record.id === action.payload.id ? action.payload : record
        ),
        editingRecord: null
      };
      
    case I94_ACTION_TYPES.DELETE_RECORD_SUCCESS:
      return {
        ...state,
        loading: false,
        records: state.records.filter(record => record.id !== action.payload)
      };
      
    case I94_ACTION_TYPES.FETCH_RECORDS_FAILURE:
    case I94_ACTION_TYPES.CREATE_RECORD_FAILURE:
    case I94_ACTION_TYPES.UPDATE_RECORD_FAILURE:
    case I94_ACTION_TYPES.DELETE_RECORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
      
    case I94_ACTION_TYPES.SET_EDITING_RECORD:
      return {
        ...state,
        editingRecord: action.payload
      };
      
    case I94_ACTION_TYPES.CLEAR_EDITING_RECORD:
      return {
        ...state,
        editingRecord: null
      };
      
    case I94_ACTION_TYPES.SET_PREVIOUS_ADDRESS:
      return {
        ...state,
        previousAddress: action.payload
      };
      
    case I94_ACTION_TYPES.USE_PREVIOUS_ADDRESS:
      return {
        ...state,
        usePreviousAddressFlag: true  // Set flag to trigger address fill
      };
      
    case I94_ACTION_TYPES.CLEAR_PREVIOUS_ADDRESS:
      return {
        ...state,
        previousAddress: null,
        usePreviousAddressFlag: false
      };
      
    default:
      return state;
  }
};

export default i94Reducer;