import { SUBMIT_TRAVELER_REQUEST, SUBMIT_TRAVELER_FFAILURE, SUBMIT_TRAVELER_SUCCESS } from "./constants";

const initialState = {
    loading: false,
    traveler: null,
    error: null,
};

const travelerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SUBMIT_TRAVELER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SUBMIT_TRAVELER_SUCCESS:
            return {
                ...state,
                loading: false,
                traveler: action.payload,
            };
        case SUBMIT_TRAVELER_FFAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};
export default travelerReducer; 