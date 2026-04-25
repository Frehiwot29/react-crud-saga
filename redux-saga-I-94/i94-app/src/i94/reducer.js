import {CREATE_I94_FAILURE,CREATE_I94_REQUEST,CREATE_I94_SUCCESS} from './types';

const initialState = {
    loading: false,
    record: null,
    error: null
};

const i94Reducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_I94_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_I94_SUCCESS:
            return {
                ...state,
                loading: false,
                record: action.payload,
                error: null
            };
        case CREATE_I94_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default i94Reducer;