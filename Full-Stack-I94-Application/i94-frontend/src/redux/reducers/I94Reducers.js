import { SET_PREVIOUS_ADDRESS } from '../actions/I94Actions';

const initialState = {
  previousAddress: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PREVIOUS_ADDRESS:
      return { ...state, previousAddress: action.payload };
    default:
      return state;
  }
}