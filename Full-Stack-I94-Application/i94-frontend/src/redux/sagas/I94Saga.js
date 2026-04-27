import { call, put, takeLatest } from 'redux-saga/effects';
import { SAVE_I94_REQUEST, LOAD_PREVIOUS_ADDRESS, setPreviousAddress } from '../actions/I94Actions';
import { createI94, getLastI94 } from '../../services/I94Service';

function* saveI94(action) {
  try {
    yield call(createI94, action.payload);
  } catch (e) {
    console.error(e);
  }
}

function* getPreviousAddress() {
  try {
    const response = yield call(getLastI94);
    yield put(setPreviousAddress(response.data));
  } catch (e) {
    console.error(e);
  }
}

export default function* rootSaga() {
  yield takeLatest(SAVE_I94_REQUEST, saveI94);
  yield takeLatest(LOAD_PREVIOUS_ADDRESS, getPreviousAddress);
}