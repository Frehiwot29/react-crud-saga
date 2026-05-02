// address.reducer.js
import {
  SET_ADDRESSES,
  SET_LAST_ADDRESS
} from './address.constants';

const initialState = {
  list: [],
  lastUsedAddress: null
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESSES:
      return {
        ...state,
        list: action.payload
      };

    case SET_LAST_ADDRESS:
      return {
        ...state,
        lastUsedAddress: action.payload
      };

    default:
      return state;
  }
};

export default addressReducer;