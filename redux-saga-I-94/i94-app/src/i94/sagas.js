import {call,put,takeLatest} from 'redux-saga/effects';
import {CREATE_I94_REQUEST} from './types';
import axios from 'axios';
import { createI94Success, createI94Failure } from './actions';

const API_URL = 'http://localhost:5000/api/i94';

function* createI94Saga(data) {
    return axios.post(API_URL, data.payload);
}

function* createI94Saga(action) {
    try {
        const response = yield call(axios.post, API_URL , action.payload);
        yield put(createI94Success(response.data));
    } catch (error) {
        yield put(createI94Failure('Failed to create I-94. Please try again.'));
    }
}

function* i94Saga() {
    yield takeLatest(CREATE_I94_REQUEST, createI94Saga);
}

export default i94Saga;