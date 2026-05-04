// src/store/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import petReducer from './petReducer';
import requestReducer from './requestReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  pets: petReducer,
  requests: requestReducer
});
export default rootReducer;