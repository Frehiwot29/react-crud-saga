// store/reducers/petReducer.js
const initialState = {
    pets: [],
    totalPages: 0,
    loading: false,
    error: null,
    filters: {
        location: '',
        breed: '',
        size: ''
    },
    currentPage: 0
};

export default function petReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PETS_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_PETS_SUCCESS':
            return {
                ...state,
                loading: false,
                pets: action.payload.content,
                totalPages: action.payload.totalPages
            };
        case 'FETCH_PETS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'SET_FILTERS':
            return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 0 };
        default:
            return state;
    }
}