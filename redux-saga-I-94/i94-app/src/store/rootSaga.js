import {all} from 'redux-saga/effects';
import i94Saga from '../i94/sagas';

export default function* rootSaga() {
    yield all([
        i94Saga(),
    ]);
}   