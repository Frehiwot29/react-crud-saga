// frontend/src/store/reducers/__tests__/authReducer.test.js
import authReducer from '../authReducer';

describe('Auth Reducer', () => {
  const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null
  };

  test('should return initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle LOGIN_REQUEST', () => {
    const action = { type: 'LOGIN_REQUEST' };
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle LOGIN_SUCCESS', () => {
    const user = { id: 1, email: 'test@example.com' };
    const token = 'jwt-token';
    const action = { 
      type: 'LOGIN_SUCCESS', 
      payload: { user, token } 
    };
    const expectedState = {
      ...initialState,
      user,
      token,
      loading: false
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle LOGIN_FAILURE', () => {
    const error = 'Invalid credentials';
    const action = { 
      type: 'LOGIN_FAILURE', 
      payload: error 
    };
    const expectedState = {
      ...initialState,
      error,
      loading: false
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  test('should handle LOGOUT', () => {
    const loggedInState = {
      user: { id: 1 },
      token: 'token',
      loading: false,
      error: null
    };
    const action = { type: 'LOGOUT' };
    expect(authReducer(loggedInState, action)).toEqual(initialState);
  });
});