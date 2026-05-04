// address.actions.js
import {SAVE_ADDRESS, SET_LAST_ADDRESS,USE_PREVIOUS_ADDRESS} from './address.constants';

export const saveAddress = (address) => ({
  type: SAVE_ADDRESS,
  payload: address
});

export const setLastAddress = (address) => ({
  type: SET_LAST_ADDRESS,
  payload: address
});

export const usePreviousAddress = () => ({
  type: USE_PREVIOUS_ADDRESS
});