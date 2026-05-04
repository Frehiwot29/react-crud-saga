// src/store/sagas/index.js
import { all } from 'redux-saga/effects';
import { watchAuth } from './authSaga';
import { watchPets } from './petSaga';
import { watchRequests } from './requestSaga';

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchPets(),
    watchRequests()
  ]);
}