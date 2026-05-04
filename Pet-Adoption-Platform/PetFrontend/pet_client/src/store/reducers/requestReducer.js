// src/store/reducers/requestReducer.js
const initialState = {
  requests: [],
  loading: false,
  error: null,
  totalRequests: 0,
  pendingRequests: 0,
  approvedRequests: 0,
  rejectedRequests: 0
};

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_REQUESTS_REQUEST':
    case 'CREATE_REQUEST_REQUEST':
    case 'UPDATE_REQUEST_STATUS':
      return { ...state, loading: true, error: null };
      
    case 'FETCH_REQUESTS_SUCCESS':
      return {
        ...state,
        loading: false,
        requests: action.payload,
        totalRequests: action.payload.length,
        pendingRequests: action.payload.filter(r => r.status === 'PENDING').length,
        approvedRequests: action.payload.filter(r => r.status === 'APPROVED').length,
        rejectedRequests: action.payload.filter(r => r.status === 'REJECTED').length
      };
      
    case 'CREATE_REQUEST_SUCCESS':
      return {
        ...state,
        loading: false,
        requests: [...state.requests, action.payload]
      };
      
    case 'UPDATE_REQUEST_STATUS_SUCCESS':
      return {
        ...state,
        loading: false,
        requests: state.requests.map(request =>
          request.id === action.payload.id
            ? { ...request, status: action.payload.status }
            : request
        )
      };
      
    case 'FETCH_REQUESTS_FAILURE':
    case 'CREATE_REQUEST_FAILURE':
    case 'UPDATE_REQUEST_STATUS_FAILURE':
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
}