import {SUBMIT_TRAVELER_FFAILURE,SUBMIT_TRAVELER_REQUEST,SUBMIT_TRAVELER_SUCCESS,
FETCH_ANNOUNCEMENT_FAILURE,FETCH_ANNOUNCEMENT_REQUEST,FETCH_ANNOUNCEMENT_SUCCESS
} from "./constants";

const initialState = {
    loading: false,
    traveler: null,
    error: null,
  announcements: [],
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
        case FETCH_ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                announcements: action.payload
            };
        case FETCH_ANNOUNCEMENT_FAILURE:
            return {
                ...state,
                announcements: []
            };
            case FETCH_ANNOUNCEMENT_REQUEST:
                return {
                    ...state,
                    announcements: []
                };
        default:
            return state;
    }
};
export default travelerReducer; 