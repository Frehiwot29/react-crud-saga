// store/sagas/authSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:8080/api';

function* loginSaga(action) {
  try {
    const response = yield call(axios.post, `${API_URL}/auth/login`, action.payload);
    yield put({ type: 'LOGIN_SUCCESS', payload: response.data });
    toast.success('Login successful!');
  } catch (error) {
    yield put({ type: 'LOGIN_FAILURE', payload: error.response?.data || error.message });
    toast.error(error.response?.data || 'Login failed');
  }
}

function* registerSaga(action) {
  try {
    const response = yield call(axios.post, `${API_URL}/auth/register`, action.payload);
    yield put({ type: 'REGISTER_SUCCESS', payload: response.data });
    toast.success('Registration successful!');
  } catch (error) {
    yield put({ type: 'REGISTER_FAILURE', payload: error.response?.data || error.message });
    toast.error(error.response?.data || 'Registration failed');
  }
}

export function* watchAuth() {
  yield takeLatest('LOGIN_REQUEST', loginSaga);
  yield takeLatest('REGISTER_REQUEST', registerSaga);
}