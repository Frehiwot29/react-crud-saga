// rootReducer.js
import { combineReducers } from 'redux';
import addressReducer from './address/address.reducer';

export default combineReducers({
  address: addressReducer
});