import { call, put, takeLatest } from 'redux-saga/effects';
import { SUBMIT_TRAVELER_REQUEST } from './constants';
import { submitTravelerSuccess, submitTravelerFailure } from './actions';

// Simulated API call
const submitTravelerApi = (travelerData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (travelerData.name) {
                resolve({ message: 'Traveler submitted successfully', data: travelerData });
            } else {
                reject(new Error('Submission failed: Name is required'));
            }
        }, 1000);
    });
}

function* submitTravelerSaga(action) {
    try {
        const response = yield call(submitTravelerApi, action.payload);
        yield put(submitTravelerSuccess(response.data));
    } catch (error) {
        yield put(submitTravelerFailure(error.message));
    }
}

function* travelerSaga() {
    yield takeLatest(SUBMIT_TRAVELER_REQUEST, submitTravelerSaga);
}

export default travelerSaga;

