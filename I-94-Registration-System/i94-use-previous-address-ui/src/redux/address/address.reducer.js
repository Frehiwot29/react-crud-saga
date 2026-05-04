// address.reducer.js
import { SET_LAST_ADDRESS } from './address.constants';

const initialState = {
    lastUsedAddress: null
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LAST_ADDRESS:
            return { ...state, lastUsedAddress: action.payload };
        default:
            return state;
    }
};
export default addressReducer;