// address.saga.js
import { takeLatest, put } from 'redux-saga/effects';
import { SAVE_ADDRESS } from './address.constants';
import { setLastAddress } from './address.actions';

function* handleSaveAddress(action) {
  try {
    const address = action.payload;

    // Save to Redux store
    yield put(setLastAddress(address));

    // Optional: Persist to API/localStorage
    localStorage.setItem('lastAddress', JSON.stringify(address));
  } catch (error) {
    console.error('Error saving address', error);
  }
}

export default function* addressSaga() {
  yield takeLatest(SAVE_ADDRESS, handleSaveAddress);
}