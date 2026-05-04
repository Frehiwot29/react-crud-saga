import { call, put, takeLatest } from 'redux-saga/effects';
import * as constant from './constants';
import { submitTravelerSuccess, submitTravelerFailure, fetchAnnouncementSuccess,fetchAnnouncementFailure } from './actions';
import { fetchAnnouncementApi } from './api';


// Simulated API call
const submitTravelerApi = (travelerData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (travelerData.fname && travelerData.lname && travelerData.dob && travelerData.passport && travelerData.citizenship && travelerData.sex && travelerData.residency && travelerData.documentType) {
                resolve({ message: 'Traveler submitted successfully', data: travelerData });
            } else {
                reject(new Error('Submission failed: All fields are required'));
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
function* fetchAnnouncementSaga() {
    try {
        const response = yield call(fetchAnnouncementApi);
        yield put(fetchAnnouncementSuccess(response.data));
    } catch (error) {
        yield put(fetchAnnouncementFailure(error.message));
    }
}

function* travelerSaga() {
    yield takeLatest(constant.SUBMIT_TRAVELER_REQUEST, submitTravelerSaga);
    yield takeLatest(constant.FETCH_ANNOUNCEMENT_REQUEST, fetchAnnouncementSaga);
}

export default travelerSaga;

