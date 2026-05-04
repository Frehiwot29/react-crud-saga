export const SAVE_I94_REQUEST = 'SAVE_I94_REQUEST';
export const LOAD_PREVIOUS_ADDRESS = 'LOAD_PREVIOUS_ADDRESS';
export const SET_PREVIOUS_ADDRESS = 'SET_PREVIOUS_ADDRESS';

export const saveI94Request = (data) => ({ type: SAVE_I94_REQUEST, payload: data });
export const loadPreviousAddress = () => ({ type: LOAD_PREVIOUS_ADDRESS });
export const setPreviousAddress = (data) => ({ type: SET_PREVIOUS_ADDRESS, payload: data });