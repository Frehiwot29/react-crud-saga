// src/store/sagas/requestSaga.js
import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:8080/api';

function* fetchRequestsSaga() {
  try {
    const token = yield select(state => state.auth.token);
    const response = yield call(axios.get, `${API_URL}/requests`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    yield put({ type: 'FETCH_REQUESTS_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_REQUESTS_FAILURE', payload: error.message });
    toast.error('Failed to fetch requests');
  }
}

function* createRequestSaga(action) {
  try {
    const token = yield select(state => state.auth.token);
    const response = yield call(axios.post, `${API_URL}/requests`, action.payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    yield put({ type: 'CREATE_REQUEST_SUCCESS', payload: response.data });
    toast.success('Adoption request sent successfully!');
  } catch (error) {
    yield put({ type: 'CREATE_REQUEST_FAILURE', payload: error.message });
    toast.error(error.response?.data || 'Failed to send request');
  }
}

function* updateRequestStatusSaga(action) {
  try {
    const token = yield select(state => state.auth.token);
    const response = yield call(axios.patch, 
      `${API_URL}/requests/${action.payload.requestId}/status`,
      { status: action.payload.status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    yield put({ 
      type: 'UPDATE_REQUEST_STATUS_SUCCESS', 
      payload: { id: action.payload.requestId, status: action.payload.status }
    });
    toast.success(`Request ${action.payload.status.toLowerCase()} successfully!`);
  } catch (error) {
    yield put({ type: 'UPDATE_REQUEST_STATUS_FAILURE', payload: error.message });
    toast.error('Failed to update request status');
  }
}

export function* watchRequests() {
  yield takeLatest('FETCH_REQUESTS_REQUEST', fetchRequestsSaga);
  yield takeLatest('CREATE_REQUEST_REQUEST', createRequestSaga);
  yield takeLatest('UPDATE_REQUEST_STATUS', updateRequestStatusSaga);
}