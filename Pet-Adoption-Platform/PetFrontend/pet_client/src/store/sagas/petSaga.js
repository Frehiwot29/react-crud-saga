// store/sagas/petSaga.js
import { call, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:8080/api';

function* fetchPetsSaga() {
  try {
    const { filters, currentPage } = yield select(state => state.pets);
    const params = new URLSearchParams({
      page: currentPage,
      ...filters
    });
    const response = yield call(axios.get, `${API_URL}/pets?${params}`);
    yield put({ type: 'FETCH_PETS_SUCCESS', payload: response.data });
  } catch (error) {
    yield put({ type: 'FETCH_PETS_FAILURE', payload: error.message });
    toast.error('Failed to fetch pets');
  }
}

function* createPetSaga(action) {
  try {
    const token = yield select(state => state.auth.token);
    const response = yield call(axios.post, `${API_URL}/pets`, action.payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    yield put({ type: 'CREATE_PET_SUCCESS', payload: response.data });
    toast.success('Pet created successfully!');
    yield put({ type: 'FETCH_PETS_REQUEST' });
  } catch (error) {
    yield put({ type: 'CREATE_PET_FAILURE', payload: error.message });
    toast.error('Failed to create pet');
  }
}

function* deletePetSaga(action) {
  try {
    const token = yield select(state => state.auth.token);
    yield call(axios.delete, `${API_URL}/pets/${action.payload}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    yield put({ type: 'DELETE_PET_SUCCESS', payload: action.payload });
    toast.success('Pet deleted successfully!');
    yield put({ type: 'FETCH_PETS_REQUEST' });
  } catch (error) {
    toast.error('Failed to delete pet');
  }
}

export function* watchPets() {
  yield takeLatest('FETCH_PETS_REQUEST', fetchPetsSaga);
  yield takeLatest('CREATE_PET_REQUEST', createPetSaga);
  yield takeLatest('DELETE_PET_REQUEST', deletePetSaga);
}