import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { CREATE_I94_REQUEST } from './types';
import { createI94Success, createI94Failure } from './actions';

const API_BASE = 'http://localhost:8080/api/i94';

function createI94Api(data) {
  return axios.post(API_BASE, data);
}

function* createI94Saga(action) {
  try {
    const response = yield call(createI94Api, action.payload);
    yield put(createI94Success(response.data));
  } catch (err) {
    yield put(createI94Failure(err.message || 'Error creating I-94'));
  }
}

export default function* i94RootSaga() {
  yield takeLatest(CREATE_I94_REQUEST, createI94Saga);
}
