// store/reducers/authReducer.js
const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTER_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
            return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
        case 'LOGIN_FAILURE':
        case 'REGISTER_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'LOGOUT':
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return { ...state, user: null, token: null };
        default:
            return state;
    }
}