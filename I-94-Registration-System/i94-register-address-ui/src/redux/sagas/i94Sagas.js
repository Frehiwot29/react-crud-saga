// sagas/i94Sagas.js
import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';
import { I94_ACTION_TYPES, API_ENDPOINTS } from '../constants/i94Contants';
import * as actions from '../actions/i94Actions';

const API_URL = API_ENDPOINTS.BASE_URL;

// API Calls
const api = {
  fetchRecords: () => axios.get(API_URL),
  createRecord: (data) => axios.post(API_URL, data),
  updateRecord: (id, data) => axios.put(`${API_URL}/${id}`, data),
  deleteRecord: (id) => axios.delete(`${API_URL}/${id}`)
};

// Worker Sagas
function* fetchRecordsSaga() {
  try {
    const response = yield call(api.fetchRecords);
    yield put(actions.fetchRecordsSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchRecordsFailure(error.response?.data?.message || error.message));
  }
}

function* createRecordSaga(action) {
  try {
    const response = yield call(api.createRecord, action.payload);
    yield put(actions.createRecordSuccess(response.data));
    
    // After successful creation, store the address for future use
    if (response.data.address || response.data.city || response.data.state || response.data.zipCode) {
      const addressData = {
        address: response.data.address || '',
        city: response.data.city || '',
        state: response.data.state || '',
        zipCode: response.data.zipCode || ''
      };
      yield put(actions.setPreviousAddress(addressData));
    }
  } catch (error) {
    yield put(actions.createRecordFailure(error.response?.data?.message || error.message));
  }
}

function* updateRecordSaga(action) {
  try {
    const { id, recordData } = action.payload;
    const response = yield call(api.updateRecord, id, recordData);
    yield put(actions.updateRecordSuccess(response.data));
  } catch (error) {
    yield put(actions.updateRecordFailure(error.response?.data?.message || error.message));
  }
}

function* deleteRecordSaga(action) {
  try {
    yield call(api.deleteRecord, action.payload);
    yield put(actions.deleteRecordSuccess(action.payload));
  } catch (error) {
    yield put(actions.deleteRecordFailure(error.response?.data?.message || error.message));
  }
}

// This saga handles the address reuse functionality
function* usePreviousAddressSaga() {
  // Get the previous address from the store
  const state = yield select();
  const previousAddress = state.i94.previousAddress;
  
  if (previousAddress) {
    // You can dispatch an action to update the form
    // This will be handled by the reducer to update the form state
    yield put(actions.fillFormWithPreviousAddress(previousAddress));
  }
}

// Watcher Saga
function* i94Saga() {
  yield takeLatest(I94_ACTION_TYPES.FETCH_RECORDS_REQUEST, fetchRecordsSaga);
  yield takeLatest(I94_ACTION_TYPES.CREATE_RECORD_REQUEST, createRecordSaga);
  yield takeLatest(I94_ACTION_TYPES.UPDATE_RECORD_REQUEST, updateRecordSaga);
  yield takeLatest(I94_ACTION_TYPES.DELETE_RECORD_REQUEST, deleteRecordSaga);
  yield takeLatest(I94_ACTION_TYPES.USE_PREVIOUS_ADDRESS, usePreviousAddressSaga);
}

export default i94Saga;