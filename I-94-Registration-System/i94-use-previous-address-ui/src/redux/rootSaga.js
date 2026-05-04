// rootSaga.js
import { all } from 'redux-saga/effects';
import addressSaga from './address/address.saga';

export default function* rootSaga() {
  yield all([
    addressSaga()
  ]);
}